/**
 * Hồi quy: lịch Việt Nam (âm lịch UTC+7, đồng hồ miền Nam UTC+8 thời 1960–1975).
 *
 * Sai âm lịch → sai can năm / tháng / ngày → cả lá số sai. Kiểm tra:
 * ① thuật toán ở UTC+8 khớp lunar-javascript từng ngày 1921–2056 (chứng minh thuật toán đúng);
 * ② các ngày Tết VN đã biết (khác TQ);
 * ③ mọi ngày đổi được sang lịch TQ đều giữ đúng ngày âm VN, ngày không đổi được chỉ là ngày 30;
 * ④ múi giờ đồng hồ và giờ mặt trời thật theo vùng/thời kỳ.
 */
import { Solar } from 'lunar-javascript';
import { solarToLunar, toCnSolarDate, vnClockUtcOffset, vnBirthToChartInput } from '../../lib/ziwei/vn-calendar';
import { VN_PROVINCES } from '../../lib/ziwei/vn-provinces';
import { generateChart } from '../../lib/ziwei/algorithm';

let bad = 0;
const fail = (m: string) => { bad++; console.log(`  ❌ ${m}`); };
const province = (name: string) => VN_PROVINCES.find(p => p.name === name)!;

function eachDay(from: number, to: number, fn: (y: number, m: number, d: number) => void) {
  const t = new Date(Date.UTC(from, 0, 1));
  while (t.getUTCFullYear() <= to) {
    fn(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
    t.setUTCDate(t.getUTCDate() + 1);
  }
}

/* ① UTC+8 khớp lunar-javascript */
{
  let n = 0;
  eachDay(1921, 2056, (y, m, d) => {
    const cn = Solar.fromYmd(y, m, d).getLunar();
    const a = solarToLunar(d, m, y, 8);
    if (a.year !== cn.getYear() || (a.isLeap ? -a.month : a.month) !== cn.getMonth() || a.day !== cn.getDay()) {
      if (n++ < 5) fail(`${y}-${m}-${d} UTC+8 ra ${a.day}/${a.month} — lunar-javascript ${cn.getDay()}/${cn.getMonth()}`);
    }
  });
  if (!n) console.log('  ✅ UTC+8 khớp lunar-javascript từng ngày 1921–2056');
}

/* ② Tết VN */
for (const [y, m, d, lunarYear] of [[1968, 1, 29, 1968], [1985, 1, 21, 1985], [2007, 2, 17, 2007], [2024, 2, 10, 2024], [2030, 2, 2, 2030]]) {
  const v = solarToLunar(d, m, y, 7);
  if (v.year !== lunarYear || v.month !== 1 || v.day !== 1 || v.isLeap) fail(`${d}/${m}/${y} phải là Mùng 1 Tết ${lunarYear}, ra ${JSON.stringify(v)}`);
  else console.log(`  ✅ Tết ${lunarYear}: ${d}/${m}/${y}`);
}

/* ③ đổi sang lịch TQ giữ đúng ngày âm */
{
  let unmapped = 0, wrong = 0;
  eachDay(1968, 2049, (y, m, d) => {
    const v = solarToLunar(d, m, y, 7);
    const cn = toCnSolarDate({ year: y, month: m, day: d });
    if (!cn) {
      unmapped++;
      if (v.day !== 30) fail(`${y}-${m}-${d} (VN ${v.day}/${v.month}) không đổi được nhưng không phải ngày 30`);
      return;
    }
    const l = Solar.fromYmd(cn.year, cn.month, cn.day).getLunar();
    const lm = Math.abs(l.getMonth());
    const ok = l.getDay() === v.day && (
      (l.getYear() === v.year && lm === v.month) ||
      // tháng nhuận VN mà TQ không có, nửa sau tháng (split) → sang tháng kế
      (v.isLeap && v.day > 15 && (v.month === 12 ? l.getYear() === v.year + 1 && lm === 1 : l.getYear() === v.year && lm === v.month + 1))
    );
    if (!ok) {
      if (wrong++ < 5) fail(`${y}-${m}-${d} VN ${v.day}/${v.month}${v.isLeap ? 'N' : ''} → TQ ${l.getDay()}/${l.getMonth()}`);
    }
  });
  if (!wrong) console.log(`  ✅ 1968–2049: mọi ngày đổi được đều giữ đúng ngày âm VN (${unmapped} ngày 30 không có trong lịch TQ)`);
  if (unmapped > 40) fail(`quá nhiều ngày không đổi được: ${unmapped}`);
}

/* ④ múi giờ đồng hồ + giờ mặt trời thật */
{
  const cases: [number, number, number, number, number, boolean, number, string][] = [
    [1965, 6, 1, 8, 0, true, 8, 'miền Nam 1965 dùng UTC+8'],
    [1965, 6, 1, 8, 0, false, 7, 'miền Bắc 1965 dùng UTC+7'],
    [1975, 6, 12, 22, 59, true, 8, 'Sài Gòn trước 23:00 12/6/1975 còn UTC+8'],
    [1975, 6, 12, 23, 0, true, 7, 'Sài Gòn từ 23:00 12/6/1975 về UTC+7'],
    [1944, 1, 1, 12, 0, false, 8, 'cả nước 1944 dùng UTC+8'],
    [2000, 1, 1, 12, 0, true, 7, '2000 dùng UTC+7'],
  ];
  for (const [y, m, d, h, min, south, want, name] of cases) {
    const got = vnClockUtcOffset(y, m, d, h, min, south);
    if (got !== want) fail(`${name} → ra UTC+${got}`);
    else console.log(`  ✅ ${name}`);
  }

  // 9:20 đồng hồ: TP.HCM 1970 (UTC+8) lùi ~53 phút → giờ Thìn; Hà Nội 2000 → giờ Tỵ
  const s1970 = vnBirthToChartInput({ year: 1970, month: 6, day: 1, clockHour: 9, clockMinute: 20, gender: 'male', province: province('TP. Hồ Chí Minh') });
  const n2000 = vnBirthToChartInput({ year: 2000, month: 6, day: 1, clockHour: 9, clockMinute: 20, gender: 'male', province: province('Hà Nội') });
  if (s1970.birthInfo.hour !== 4) fail(`TP.HCM 1970 9:20 phải giờ Thìn (4), ra ${s1970.birthInfo.hour}`);
  else console.log('  ✅ TP.HCM 1970 9:20 → giờ Thìn');
  if (n2000.birthInfo.hour !== 5) fail(`Hà Nội 2000 9:20 phải giờ Tỵ (5), ra ${n2000.birthInfo.hour}`);
  else console.log('  ✅ Hà Nội 2000 9:20 → giờ Tỵ');

  // 23:30 là giờ Tý của ngày hôm sau
  const late = vnBirthToChartInput({ year: 2000, month: 3, day: 10, clockHour: 23, clockMinute: 30, gender: 'female' });
  if (late.birthInfo.day !== 11 || late.birthInfo.hour !== 0) fail(`23:30 10/3/2000 phải giờ Tý ngày 11, ra ngày ${late.birthInfo.day} giờ ${late.birthInfo.hour}`);
  else console.log('  ✅ 23:30 → giờ Tý ngày hôm sau');
}

/* ⑤ lá số thật: 17/2/2007 là Mùng 1 Tết Đinh Hợi ở VN (TQ vẫn là 30 tháng Chạp Bính Tuất) */
{
  const input = vnBirthToChartInput({ year: 2007, month: 2, day: 17, clockHour: 8, clockMinute: 0, gender: 'male', province: province('Hà Nội') });
  const c = generateChart(input.birthInfo);
  const { yearStem, yearBranch, lunarMonth, lunarDay } = c.lunarInfo;
  if (yearStem !== 3 || yearBranch !== 11 || lunarMonth !== 1 || lunarDay !== 1 || input.birthInfo.calendarFallback) {
    fail(`17/2/2007 phải Mùng 1/1 Đinh Hợi, ra can ${yearStem} chi ${yearBranch} ${lunarDay}/${lunarMonth}`);
  } else console.log('  ✅ 17/2/2007 → lá số năm Đinh Hợi, Mùng 1 tháng Giêng');
}

if (bad) {
  console.error(`\n❌ ${bad} mục sai — âm lịch / giờ sinh VN lệch thì cả lá số sai.`);
  process.exit(1);
}
console.log('\n✅ Lịch Việt Nam: tất cả đều đúng.');
