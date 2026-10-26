/**
 * Hồi quy: xem hợp tuổi — bảng nạp âm khớp NAYIN_ELEMENTS của engine, quan hệ can chi đúng các cặp kinh điển,
 * và kết quả cho lá số thật không còn chữ Hán.
 */
import { NAYIN_ELEMENTS } from '../../lib/ziwei/constants';
import { napAm, xemHopTuoi } from '../../lib/ziwei/vn-hop-tuoi';
import { generateChart } from '../../lib/ziwei/algorithm';

let bad = 0;
const fail = (m: string) => { bad++; console.log(`  ❌ ${m}`); };
const HANH: Record<string, string> = { '金': 'Kim', '木': 'Mộc', '水': 'Thủy', '火': 'Hỏa', '土': 'Thổ' };

/* ① 60 năm can chi: nạp âm tiếng Việt cùng hành với bảng của engine */
for (let i = 0; i < 60; i++) {
  const { ten, hanh } = napAm(i % 10, i % 12);
  if (hanh !== HANH[NAYIN_ELEMENTS[Math.floor(i / 2)]]) fail(`năm thứ ${i} trong hoa giáp: ${ten} khác ${NAYIN_ELEMENTS[Math.floor(i / 2)]}`);
}
for (const [s, b, want] of [[0, 0, 'Hải Trung Kim'], [3, 3, 'Lư Trung Hỏa'], [9, 11, 'Đại Hải Thủy'], [6, 6, 'Lộ Bàng Thổ']] as const) {
  if (napAm(s, b).ten !== want) fail(`can ${s} chi ${b} phải là ${want}, ra ${napAm(s, b).ten}`);
}
if (!bad) console.log('  ✅ nạp âm 60 năm khớp bảng của engine');

/* ② quan hệ can chi trên lá số thật (năm âm lịch → can chi): chọn ngày giữa năm để khỏi vướng Tết */
const chart = (year: number, gender: 'male' | 'female' = 'male') => generateChart({ year, month: 7, day: 15, hour: 6, gender });
const tuoi = (ya: number, yb: number) => xemHopTuoi(chart(ya), chart(yb, 'female'), 'A', 'B').filter(d => d.nhom === 'Tuổi').map(d => d.noiDung).join(' | ');
const cases: [number, number, string, string][] = [
  [1984, 1989, 'Giáp – Kỷ: tương hợp', 'Giáp Tý – Kỷ Tỵ'],
  [1984, 1985, 'lục hợp', 'Tý – Sửu'],
  [1984, 1990, 'lục xung', 'Tý – Ngọ'],
  [1986, 1989, 'lục hại', 'Dần – Tỵ'],
  [1980, 1984, 'tam hợp', 'Thân – Tý'],
  [1984, 1990, 'Giáp – Canh: tương khắc', 'Giáp – Canh'],
];
for (const [ya, yb, want, name] of cases) {
  const got = tuoi(ya, yb);
  if (!got.includes(want)) fail(`${name}: thiếu "${want}" — ${got}`);
  else console.log(`  ✅ ${name}: ${want}`);
}

/* ③ lá số thật: luôn có kết quả, không còn chữ Hán */
let n = 0;
for (let y = 1960; y < 2005; y += 7) {
  for (let y2 = 1962; y2 < 2005; y2 += 11) {
    const r = xemHopTuoi(chart(y), chart(y2, 'female'), 'A', 'B');
    n++;
    if (r.length < 5) fail(`${y}–${y2}: chỉ có ${r.length} điểm xét`);
    const han = r.map(d => d.noiDung).join(' ').match(/[一-鿿]+/g);
    if (han) fail(`${y}–${y2}: còn chữ Hán ${han.join(',')}`);
  }
}
if (!bad) console.log(`  ✅ ${n} cặp lá số đều có kết quả tiếng Việt`);

if (bad) {
  console.error(`\n❌ ${bad} mục sai.`);
  process.exit(1);
}
console.log('\n✅ Xem hợp tuổi: đúng.');
