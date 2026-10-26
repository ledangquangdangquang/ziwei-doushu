/**
 * /library — Index-First: danh sách cổ thư + ô tìm kiếm
 */

import Link from 'next/link';
import { ALL_BOOKS, TOTAL_PARAGRAPHS } from '@/lib/classics';
import LibrarySearch from './LibrarySearch';

export const metadata = {
  title: 'Cổ thư Tử Vi · Cốt Tủy Phú, Toàn Tập, Toàn Thư',
  description: 'Đọc và tìm kiếm các đoạn chọn lọc từ Cốt Tủy Phú, Tử Vi Đẩu Số Toàn Tập, Tử Vi Đẩu Số Toàn Thư — bản dịch tiếng Việt kèm chữ Hán.',
};

export default function LibraryHomePage() {
  return (
    <main className="page">
      <header className="index-head">
        <h1>Cổ thư Tử Vi</h1>
        <p>
          <span className="num">{ALL_BOOKS.length}</span> sách, <span className="num">{TOTAL_PARAGRAPHS}</span> đoạn chọn lọc —
          dịch tiếng Việt kèm chữ Hán. Phần chữ Hán là bản tóm lược theo ý bằng lời văn hiện đại, không phải nguyên văn;
          chỗ nào khác kiến thức thông dụng đều có ghi chú trong ngoặc vuông.
        </p>
      </header>

      <LibrarySearch />

      <ul className="index-list">
        {ALL_BOOKS.map(book => (
          <li key={book.slug} className="index-row">
            <div>
              <h2 className="index-row__title"><Link href={`/library/${book.slug}`}>{book.title}</Link></h2>
              <p className="index-row__sub"><span lang="zh">{book.titleHan}</span> · {book.dynasty} · {book.author}</p>
            </div>
            <div className="index-row__body">
              <p>{book.intro}</p>
              <p className="num">
                {book.chapters.length} chương · {book.chapters.reduce((s, c) => s + c.paragraphs.length, 0)} đoạn ·{' '}
                <Link href={`/library/${book.slug}`}>Đọc →</Link>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
