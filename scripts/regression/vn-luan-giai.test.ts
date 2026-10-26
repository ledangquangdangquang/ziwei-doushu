/**
 * Hồi quy nội dung tiếng Việt: luận giải đủ 14 chính tinh × 12 cung, mọi cung của lá số thật đều ra lời giải,
 * tên sao/cung đã dịch hết; 168 trang kiến thức; cổ thư đủ bản dịch và tìm kiếm không dấu.
 */
import { generateChart } from '../../lib/ziwei/algorithm';
import { ALL_STARS, getAllKnowledgeRoutes, getKnowledge } from '../../lib/seo/knowledge';
import { ALL_BOOKS, searchClassics } from '../../lib/classics';
import { CUNG, LUAN_GIAI, capSao, luanGiaiCung, tongQuan, vanHan } from '../../lib/ziwei/vn-luan-giai';
import { vi } from '../../lib/ziwei/vi';

let bad = 0;
const fail = (m: string) => { bad++; console.log(`  ❌ ${m}`); };
const HAN = /[一-鿿]/;

for (const s of ALL_STARS) {
  if (LUAN_GIAI[s]?.length !== CUNG.length || LUAN_GIAI[s].some(t => !t)) fail(`${s}: thiếu luận giải (cần ${CUNG.length} cung)`);
}
if (!bad) console.log(`  ✅ ${ALL_STARS.length} chính tinh × ${CUNG.length} cung đủ nội dung`);

let palaces = 0;
const caps = new Set<string>();
for (let y = 1950; y < 2010; y += 3) {
  for (let h = 0; h < 12; h += 5) {
    const c = generateChart({ year: y, month: (y % 12) + 1, day: (y % 28) + 1, hour: h, gender: y % 2 ? 'male' : 'female' });
    const tq = tongQuan(c);
    const vh = vanHan(c, 2026);
    if (tq.length !== 4 || tq.some(m => !m.doan.length)) fail(`${y} giờ ${h}: tóm tắt thiếu mục`);
    if (!vh.some(m => m.tieuDe.startsWith('Năm 2026'))) fail(`${y} giờ ${h}: thiếu vận năm 2026`);
    const tqText = [...tq, ...vh].flatMap(m => [m.tieuDe, ...m.doan]).join(' ');
    if (HAN.test(tqText) || /undefined/.test(tqText)) fail(`${y} giờ ${h}: tóm tắt/vận hạn lỗi — ${tqText.match(/[一-鿿]+|undefined/g)?.join(',')}`);
    for (const p of c.palaces) {
      const ms = p.stars.filter(s => s.type === 'major').map(s => s.name);
      if (ms.length === 2) {
        caps.add([...ms].sort().join('+'));
        if (!capSao(ms[0], ms[1])) fail(`cặp ${ms.join('+')} chưa có luận giải`);
      }
      palaces++;
      const lg = luanGiaiCung(p, c);
      if (lg.doan.length === 0) fail(`${y} giờ ${h} cung ${p.name}: không có lời giải`);
      const text = [lg.tieuDe, ...lg.doan, ...p.stars.map(s => vi(s.name))].join(' ');
      if (HAN.test(text)) fail(`${y} cung ${p.name}: còn chữ Hán — ${text.match(/[一-鿿]+/g)?.join(',')}`);
    }
  }
}
if (!bad) console.log(`  ✅ ${palaces} cung của lá số thật đều có lời giải tiếng Việt; tóm tắt, vận hạn đủ; ${caps.size} cặp sao gặp đều có luận`);

const routes = getAllKnowledgeRoutes();
const urls = new Set(routes.map(r => `${r.star}/${r.topic}`));
if (routes.length !== 168 || urls.size !== 168) fail(`trang kiến thức: ${routes.length} route, ${urls.size} URL khác nhau (cần 168)`);
for (const r of routes) if (!getKnowledge(r.star, r.topic)) fail(`/knowledge/${r.star}/${r.topic} không có nội dung`);
if (!bad) console.log(`  ✅ 168 trang kiến thức, URL không trùng (vd. /knowledge/${routes[15].star}/${routes[15].topic})`);

for (const b of ALL_BOOKS) {
  const shown = [b.title, b.dynasty, b.author, b.intro, ...b.chapters.flatMap(c => [c.title, c.subtitle ?? '', ...c.paragraphs.map(p => p.translation ?? '')])];
  if (shown.some(t => HAN.test(t))) fail(`${b.slug}: phần tiếng Việt còn chữ Hán`);
  const thieu = b.chapters.flatMap(c => c.paragraphs).filter(p => !p.translation).map(p => p.id);
  if (thieu.length) fail(`${b.slug}: thiếu bản dịch ${thieu.join(',')}`);
}
const tim = searchClassics('hoa ky');
if (!tim.length || !/<mark>hóa kỵ<\/mark>/i.test(tim[0].snippet)) fail(`tìm "hoa ky" phải khớp "Hóa Kỵ": ${tim[0]?.snippet}`);
if (!bad) console.log(`  ✅ cổ thư đủ bản dịch; tìm "hoa ky" ra ${tim.length} đoạn`);

if (bad) {
  console.error(`\n❌ ${bad} mục sai.`);
  process.exit(1);
}
console.log('\n✅ Nội dung tiếng Việt: đầy đủ.');
