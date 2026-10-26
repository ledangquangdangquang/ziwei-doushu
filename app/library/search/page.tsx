/**
 * /library/search?q=… — kết quả tìm kiếm cổ thư
 */

import Link from 'next/link';
import { searchClassics, getParagraphById } from '@/lib/classics';
import LibrarySearch from '../LibrarySearch';

export const metadata = {
  title: 'Tìm kiếm · Cổ thư Tử Vi',
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const sp = await searchParams;
  const q = sp.q?.trim() || '';
  const hits = q ? searchClassics(q, 50) : [];

  return (
    <main className="page page--read">
      <nav aria-label="Đường dẫn" className="crumbs">
        <Link href="/library">Cổ thư</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Tìm kiếm</span>
      </nav>

      <header className="index-head">
        <h1>{q ? `“${q}”` : 'Tìm trong cổ thư'}</h1>
        {q && <p className="num">Tìm thấy {hits.length} đoạn.</p>}
      </header>

      <LibrarySearch initial={q} />

      {hits.length === 0 ? (
        <p className="field__hint">
          {q ? 'Chưa có đoạn nào chứa từ khóa này. Thử: Thất Sát triều Đẩu · Song Lộc · hóa kỵ · cung Mệnh · Cơ Nguyệt Đồng Lương.' : 'Nhập từ khóa để tìm.'}
        </p>
      ) : (
        <div>
          {hits.map((hit, i) => {
            const chapterIdx = getParagraphById(hit.paragraphId)?.chapterIdx ?? 0;
            return (
              <Link key={i} href={`/library/${hit.bookSlug}/${chapterIdx}#${hit.paragraphId}`} className="hit">
                <div className="hit__src"><b>{hit.bookTitle}</b> · {hit.chapterTitle}</div>
                {/* snippet đã được escape trong searchClassics, chỉ chèn thẻ <mark> */}
                <div className="hit__text" dangerouslySetInnerHTML={{ __html: hit.snippet }} />
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
