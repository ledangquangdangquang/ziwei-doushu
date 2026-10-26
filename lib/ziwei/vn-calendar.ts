/**
 * Lịch Việt Nam cho engine lập lá số.
 *
 * 1. Âm lịch VN tính theo UTC+7 (miền Bắc từ 1968, cả nước từ 1976), TQ theo UTC+8.
 *    Khi sóc rơi vào 23:00–24:00 giờ VN, tháng âm VN bắt đầu sớm hơn TQ 1 ngày
 *    → có năm lệch cả Tết (1985, 2007, 2030). iztro chỉ biết lịch TQ, nên ta đổi
 *    ngày dương VN sang ngày dương TQ có cùng ngày âm rồi mới đưa vào engine.
 * 2. Miền Nam dùng đồng hồ UTC+8 giai đoạn 1960–1975 (và vài giai đoạn trước đó),
 *    giờ đồng hồ phải quy về đúng kinh tuyến khi tính giờ mặt trời thật.
 *
 * Thuật toán âm lịch: Hồ Ngọc Đức (https://www.informatik.uni-leipzig.de/~duc/amlich/),
 * cũng là nguồn mà phần lớn lịch vạn niên / phần mềm tử vi Việt Nam đang dùng.
 */
import { Lunar, LunarMonth } from 'lunar-javascript';
import type { BirthInfo } from './types';
import { calculateTrueSolarTime, resolveZiweiDayOffset, shiftGregorianDate, type GregorianDate } from './true-solar-time';
import type { VnProvince } from './vn-provinces';

const PI = Math.PI;

function jdFromDate(dd: number, mm: number, yy: number): number {
  const a = Math.floor((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  if (jd < 2299161) jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  return jd;
}

function newMoon(k: number): number {
  const T = k / 1236.85;
  const T2 = T * T, T3 = T2 * T, dr = PI / 180;
  let jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
  C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  const deltat = T < -11
    ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
    : -0.000278 + 0.000265 * T + 0.000262 * T2;
  return jd1 + C1 - deltat;
}

function sunLongitude(jdn: number): number {
  const T = (jdn - 2451545.0) / 36525;
  const T2 = T * T, dr = PI / 180;
  const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
  let L = (L0 + DL) * dr;
  L = L - PI * 2 * Math.floor(L / (PI * 2));
  return L;
}

const getSunLongitude = (dayNumber: number, tz: number) => Math.floor(sunLongitude(dayNumber - 0.5 - tz / 24) / PI * 6);
const getNewMoonDay = (k: number, tz: number) => Math.floor(newMoon(k) + 0.5 + tz / 24);

function getLunarMonth11(yy: number, tz: number): number {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = Math.floor(off / 29.530588853);
  const nm = getNewMoonDay(k, tz);
  return getSunLongitude(nm, tz) >= 9 ? getNewMoonDay(k - 1, tz) : nm;
}

function getLeapMonthOffset(a11: number, tz: number): number {
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k + i, tz), tz);
  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i, tz), tz);
  } while (arc !== last && i < 14);
  return i - 1;
}

export interface VnLunarDate {
  year: number;
  month: number;
  day: number;
  isLeap: boolean;
}

/** Dương lịch → âm lịch theo múi giờ tz (7 = VN, 8 = TQ). */
export function solarToLunar(dd: number, mm: number, yy: number, tz = 7): VnLunarDate {
  const dayNumber = jdFromDate(dd, mm, yy);
  let k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853) + 1;
  let monthStart = getNewMoonDay(k, tz);
  // bản gốc chỉ lùi 1 lần → có ngày ra "mùng 0" (vd. 26/3/2009 ở UTC+8)
  while (monthStart > dayNumber) monthStart = getNewMoonDay(--k, tz);
  let a11 = getLunarMonth11(yy, tz);
  let b11 = a11;
  let year: number;
  if (a11 >= monthStart) {
    year = yy;
    a11 = getLunarMonth11(yy - 1, tz);
  } else {
    year = yy + 1;
    b11 = getLunarMonth11(yy + 1, tz);
  }
  const day = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);
  let isLeap = false;
  let month = diff + 11;
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, tz);
    if (diff >= leapMonthDiff) {
      month = diff + 10;
      if (diff === leapMonthDiff) isLeap = true;
    }
  }
  if (month > 12) month -= 12;
  if (month >= 11 && diff < 4) year -= 1;
  return { year, month, day, isLeap };
}

/** Múi giờ dùng để tính âm lịch: trước 1968 cả nước theo lịch UTC+8, miền Nam giữ UTC+8 đến hết 1975. */
export function vnCalendarTz(year: number, south = false): number {
  if (year < 1968) return 8;
  if (south && year < 1976) return 8;
  return 7;
}

// Giờ đồng hồ Sài Gòn theo tzdata (Asia/Ho_Chi_Minh), mốc tính theo giờ địa phương yyyymmddhhmm.
const SOUTH_CLOCK: [number, number][] = [
  [194301010000, 8], [194503150000, 9], [194509012200, 7], [194704010100, 8],
  [195507010000, 7], [196001010000, 8], [197506122300, 7],
];

/**
 * Múi giờ của đồng hồ lúc sinh.
 * shortcut: miền Bắc coi là UTC+7 từ 2/9/1945 (bỏ qua vùng Pháp chiếm 1947–1954); nếu cần chính xác hơn thì thêm bảng riêng cho miền Bắc.
 */
export function vnClockUtcOffset(year: number, month: number, day: number, hour: number, minute: number, south = false): number {
  const t = (((year * 100 + month) * 100 + day) * 100 + hour) * 100 + minute;
  let offset = 7;
  for (const [start, off] of SOUTH_CLOCK) {
    if (t < start) break;
    if (!south && start > 194509012200) break;
    offset = off;
  }
  return offset;
}

/**
 * Ngày dương VN → ngày dương mà lịch TQ (lunar-javascript / iztro) cho ra cùng ngày âm VN.
 * Trả về null khi ngày âm VN không có trong lịch TQ (ngày 30 mà tháng TQ chỉ có 29 ngày).
 */
export function toCnSolarDate(date: GregorianDate, south = false): GregorianDate | null {
  if (vnCalendarTz(date.year, south) === 8) return date;
  let { year, month, day, isLeap } = solarToLunar(date.day, date.month, date.year, 7);
  // Tháng nhuận VN mà lịch TQ không có (vd. 1985 nhuận 2, 1987 nhuận 7): làm như engine
  // với DEFAULT_LEAP_MONTH = 'split' — nửa đầu tính tháng trước, từ ngày 16 tính tháng sau.
  if (isLeap && !LunarMonth.fromYm(year, -month)) {
    isLeap = false;
    if (day > 15 && ++month > 12) { month = 1; year++; }
  }
  const lunarMonth = isLeap ? -month : month;
  try {
    const solar = Lunar.fromYmd(year, lunarMonth, day).getSolar();
    const back = solar.getLunar();
    // lunar-javascript không báo lỗi khi ngày tràn tháng → kiểm tra ngược
    if (back.getYear() !== year || back.getMonth() !== lunarMonth || back.getDay() !== day) return null;
    return { year: solar.getYear(), month: solar.getMonth(), day: solar.getDay() };
  } catch {
    return null;
  }
}

export interface VnBirthInput extends GregorianDate {
  clockHour: number;
  clockMinute: number;
  unknownTime?: boolean;
  gender: 'male' | 'female';
  name?: string;
  province?: VnProvince;
}

export interface VnChartInput {
  birthInfo: BirthInfo;
  /** Giờ mặt trời thật (phút trong ngày) dùng để chọn canh giờ; undefined khi không rõ giờ sinh */
  solarMinutes?: number;
}

/** Dữ liệu form (giờ đồng hồ VN) → BirthInfo cho generateChart(). */
export function vnBirthToChartInput(input: VnBirthInput): VnChartInput {
  const south = !!input.province?.south;
  const solar = calculateTrueSolarTime({
    year: input.year,
    month: input.month,
    day: input.day,
    clockHour: input.clockHour,
    clockMinute: input.clockMinute,
    longitude: input.province?.longitude,
    utcOffsetHours: vnClockUtcOffset(input.year, input.month, input.day, input.clockHour, input.clockMinute, south),
  });
  const chartDay = input.unknownTime ? input : shiftGregorianDate(input, resolveZiweiDayOffset(solar));
  const cn = toCnSolarDate(chartDay, south);
  const date = cn ?? chartDay;
  return {
    birthInfo: {
      year: date.year,
      month: date.month,
      day: date.day,
      hour: input.unknownTime ? 0 : solar.branch,
      gender: input.gender,
      name: input.name || undefined,
      province: input.province?.name,
      longitude: input.province?.longitude,
      origInput: { year: input.year, month: input.month, day: input.day, clockHour: input.clockHour, clockMinute: input.clockMinute },
      ...(cn ? {} : { calendarFallback: true }),
    },
    solarMinutes: input.unknownTime ? undefined : solar.normalizedMinutes,
  };
}
