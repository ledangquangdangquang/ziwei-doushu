/**
 * Xem hợp tuổi hai người (không dùng AI):
 * 1. Theo tuổi — mệnh nạp âm sinh/khắc, thiên can hợp/khắc, địa chi tam hợp / lục hợp / xung / hại.
 * 2. Theo Tử Vi — chính tinh Phu Thê người này so với Mệnh người kia; Hóa Lộc / Hóa Kỵ năm sinh
 *    của người này rơi vào cung nào trên lá số người kia.
 */
import type { ZiweiChart, Palace } from './types';
import { STEMS, BRANCHES } from './constants';
import { vi, viHoa } from './vi';

/** 30 nạp âm theo thứ tự lục thập hoa giáp (mỗi tên ứng với 2 năm liền nhau) */
const NAP_AM = [
  'Hải Trung Kim', 'Lư Trung Hỏa', 'Đại Lâm Mộc', 'Lộ Bàng Thổ', 'Kiếm Phong Kim',
  'Sơn Đầu Hỏa', 'Giản Hạ Thủy', 'Thành Đầu Thổ', 'Bạch Lạp Kim', 'Dương Liễu Mộc',
  'Tuyền Trung Thủy', 'Ốc Thượng Thổ', 'Tích Lịch Hỏa', 'Tùng Bách Mộc', 'Trường Lưu Thủy',
  'Sa Trung Kim', 'Sơn Hạ Hỏa', 'Bình Địa Mộc', 'Bích Thượng Thổ', 'Kim Bạch Kim',
  'Phú Đăng Hỏa', 'Thiên Hà Thủy', 'Đại Trạch Thổ', 'Thoa Xuyến Kim', 'Tang Đố Mộc',
  'Đại Khê Thủy', 'Sa Trung Thổ', 'Thiên Thượng Hỏa', 'Thạch Lựu Mộc', 'Đại Hải Thủy',
];
const SINH: Record<string, string> = { Kim: 'Thủy', Thủy: 'Mộc', Mộc: 'Hỏa', Hỏa: 'Thổ', Thổ: 'Kim' };
const KHAC: Record<string, string> = { Kim: 'Mộc', Mộc: 'Thổ', Thổ: 'Thủy', Thủy: 'Hỏa', Hỏa: 'Kim' };

/** Nạp âm của năm can chi; hành = chữ cuối của tên (Hải Trung Kim → Kim) */
export function napAm(stem: number, branch: number): { ten: string; hanh: string } {
  const ten = NAP_AM[Math.floor(((stem * 6 - branch * 5 + 60) % 60) / 2)];
  return { ten, hanh: ten.split(' ').pop()! };
}

export interface DiemXet {
  loai: 'tot' | 'xau' | 'binh';
  nhom: 'Tuổi' | 'Tử Vi';
  noiDung: string;
}

const canChi = (c: ZiweiChart) => `${vi(STEMS[c.lunarInfo.yearStem])} ${vi(BRANCHES[c.lunarInfo.yearBranch])}`;
const cung = (c: ZiweiChart, name: string) => c.palaces.find(p => p.name === name);
/** Chính tinh của cung; cung vô chính diệu thì lấy chính tinh mượn từ cung đối */
const chinhTinh = (p?: Palace) => p ? (p.isEmpty ? p.borrowedStars ?? [] : p.stars.filter(s => s.type === 'major').map(s => s.name)) : [];

const CUNG_TOT_KHI_LOC = ['命宫', '夫妻', '财帛', '福德'];
const CUNG_XAU_KHI_KY = ['命宫', '夫妻', '福德'];

function xetTuoi(a: ZiweiChart, b: ZiweiChart, tenA: string, tenB: string): DiemXet[] {
  const out: DiemXet[] = [];
  const add = (loai: DiemXet['loai'], noiDung: string) => out.push({ loai, nhom: 'Tuổi', noiDung });

  const na = napAm(a.lunarInfo.yearStem, a.lunarInfo.yearBranch);
  const nb = napAm(b.lunarInfo.yearStem, b.lunarInfo.yearBranch);
  const menh = `Mệnh ${tenA} là ${na.ten} (${canChi(a)}), mệnh ${tenB} là ${nb.ten} (${canChi(b)})`;
  if (SINH[na.hanh] === nb.hanh || SINH[nb.hanh] === na.hanh) {
    const [g, n] = SINH[na.hanh] === nb.hanh ? [na.hanh, nb.hanh] : [nb.hanh, na.hanh];
    add('tot', `${menh}: ${g} sinh ${n} — ngũ hành tương sinh, dễ nâng đỡ nhau.`);
  } else if (KHAC[na.hanh] === nb.hanh || KHAC[nb.hanh] === na.hanh) {
    const [k, bi] = KHAC[na.hanh] === nb.hanh ? [na.hanh, nb.hanh] : [nb.hanh, na.hanh];
    add('xau', `${menh}: ${k} khắc ${bi} — ngũ hành tương khắc, cần nhường nhịn.`);
  } else {
    add('binh', `${menh}: cùng hành ${na.hanh} — bình hòa.`);
  }

  const sa = a.lunarInfo.yearStem, sb = b.lunarInfo.yearStem;
  const can = `Thiên can ${vi(STEMS[sa])} – ${vi(STEMS[sb])}`;
  const dCan = (sa - sb + 10) % 10;
  if (dCan === 5) add('tot', `${can}: tương hợp.`);
  else if (dCan === 4 || dCan === 6) add('xau', `${can}: tương khắc.`);
  else add('binh', `${can}: không hợp không khắc.`);

  const ba = a.lunarInfo.yearBranch, bb = b.lunarInfo.yearBranch;
  const chi = `Địa chi ${vi(BRANCHES[ba])} – ${vi(BRANCHES[bb])}`;
  const dChi = (ba - bb + 12) % 12;
  const quanHe: [DiemXet['loai'], string][] = [];
  if (dChi === 4 || dChi === 8) quanHe.push(['tot', 'tam hợp']);
  if ((ba + bb) % 12 === 1) quanHe.push(['tot', 'lục hợp']);
  if (dChi === 6) quanHe.push(['xau', 'lục xung (thuộc tứ hành xung)']);
  if (dChi === 3 || dChi === 9) quanHe.push(['xau', 'tứ hành xung']);
  if ((ba + bb) % 12 === 7) quanHe.push(['xau', 'lục hại']);
  if (quanHe.length === 0) add('binh', `${chi}: ${dChi === 0 ? 'cùng tuổi' : 'không hợp không xung'}.`);
  for (const [loai, ten] of quanHe) add(loai, `${chi}: ${ten}.`);
  return out;
}

function xetTuVi(a: ZiweiChart, b: ZiweiChart, tenA: string, tenB: string): DiemXet[] {
  const out: DiemXet[] = [];
  const add = (loai: DiemXet['loai'], noiDung: string) => out.push({ loai, nhom: 'Tử Vi', noiDung });

  // Phu Thê của người này có chính tinh trùng Mệnh của người kia
  const trung = (x: ZiweiChart, y: ZiweiChart) => chinhTinh(cung(x, '夫妻')).filter(s => chinhTinh(cung(y, '命宫')).includes(s));
  const ab = trung(a, b), ba = trung(b, a);
  if (ab.length && ba.length) {
    add('tot', `Cung Phu Thê của mỗi người đều có chính tinh trùng cung Mệnh người kia (${ab.map(vi).join(', ')} / ${ba.map(vi).join(', ')}) — cách "thiên tác chi hợp", duyên rất hợp.`);
  } else if (ab.length) {
    add('tot', `Cung Phu Thê của ${tenA} có ${ab.map(vi).join(', ')}, trùng chính tinh cung Mệnh của ${tenB} — ${tenB} gần với mẫu người phối ngẫu trong lá số ${tenA}.`);
  } else if (ba.length) {
    add('tot', `Cung Phu Thê của ${tenB} có ${ba.map(vi).join(', ')}, trùng chính tinh cung Mệnh của ${tenA} — ${tenA} gần với mẫu người phối ngẫu trong lá số ${tenB}.`);
  } else {
    add('binh', 'Chính tinh cung Phu Thê của hai người không trùng chính tinh cung Mệnh người kia.');
  }

  // Hóa Lộc / Hóa Kỵ năm sinh của người này rơi vào cung nào của người kia
  for (const [x, y, tx, ty] of [[a, b, tenA, tenB], [b, a, tenB, tenA]] as const) {
    for (const hoa of ['禄', '忌'] as const) {
      const sao = x.palaces.flatMap(p => p.stars).find(s => s.siHua === hoa)?.name;
      const noi = sao && y.palaces.find(p => p.stars.some(s => s.name === sao));
      if (!sao || !noi) continue;
      const cau = `${viHoa(hoa)} năm sinh của ${tx} là ${vi(sao)}, rơi vào cung ${vi(noi.name)} của ${ty}`;
      if (hoa === '禄' && CUNG_TOT_KHI_LOC.includes(noi.name)) add('tot', `${cau} — ${tx} mang lại thuận lợi cho ${ty}.`);
      else if (hoa === '忌' && CUNG_XAU_KHI_KY.includes(noi.name)) add('xau', `${cau} — ${tx} dễ gây áp lực, lo nghĩ cho ${ty}.`);
      else add('binh', `${cau}.`);
    }
  }
  return out;
}

export function xemHopTuoi(a: ZiweiChart, b: ZiweiChart, tenA: string, tenB: string): DiemXet[] {
  return [...xetTuoi(a, b, tenA, tenB), ...xetTuVi(a, b, tenA, tenB)];
}
