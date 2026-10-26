/**
 * /knowledge — mục lục: Nhập môn, 14 chính tinh (mỗi sao 12 cung), 24 cặp sao.
 */

import Link from 'next/link';
import { ALL_STARS, STAR_TO_SLUG, CUNG_TO_SLUG, CAP_SLUG } from '@/lib/seo/knowledge';
import { CUNG, SAO_TINH_CHAT } from '@/lib/ziwei/vn-luan-giai';
import { vi } from '@/lib/ziwei/vi';

export const metadata = {
  title: 'Kiến thức Tử Vi · Nhập môn, 14 chính tinh, 24 cặp sao',
  description: 'Tử Vi cho người mới bắt đầu: nhập môn cách xem lá số, ý nghĩa 14 chính tinh ở từng cung và 24 cặp sao đứng chung, có dẫn nguồn cổ thư.',
  keywords: ['tử vi', 'tử vi cho người mới', 'cách xem lá số', 'chính tinh', '14 chính tinh', '12 cung', 'cặp sao', 'tứ hóa'],
};

export default function KnowledgeHomePage() {
  return (
    <main className="page page--read">
      <header className="index-head">
        <h1>Kiến thức Tử Vi</h1>
        <p>
          Chưa biết gì thì đọc <Link href="/knowledge/nhap-mon">Nhập môn</Link> trước (khoảng 10 phút).
          Sau đó tra từng sao ở từng cung, hoặc tra cặp sao khi hai chính tinh đứng chung một cung.
        </p>
      </header>

      <ul className="links">
        <li><Link className="link-chip" href="/knowledge/nhap-mon">Nhập môn: cách xem lá số</Link></li>
        <li><a className="link-chip" href="#chinh-tinh">14 chính tinh</a></li>
        <li><Link className="link-chip" href="/knowledge/cap-sao">24 cặp sao</Link></li>
      </ul>

      <h2 id="chinh-tinh" className="primer__list-title">14 chính tinh ở 12 cung</h2>
      <ol className="index-list">
        {ALL_STARS.map(star => (
          <li key={star} id={STAR_TO_SLUG[star]} className="index-row">
            <h3 className="index-row__title">{vi(star)}</h3>
            <div className="index-row__body">
              <p>{SAO_TINH_CHAT[star]}</p>
              <ul className="links" aria-label={`${vi(star)} ở các cung`}>
                {CUNG.map(c => (
                  <li key={c}>
                    <Link className="link-chip" href={`/knowledge/${STAR_TO_SLUG[star]}/${CUNG_TO_SLUG[c]}`}>{vi(c)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="primer__list-title">24 cặp sao đứng chung</h2>
      <ul className="links">
        {CAP_SLUG.map(([slug, [a, b]]) => (
          <li key={slug}><Link className="link-chip" href={`/knowledge/cap-sao/${slug}`}>{vi(a)} – {vi(b)}</Link></li>
        ))}
      </ul>
    </main>
  );
}
