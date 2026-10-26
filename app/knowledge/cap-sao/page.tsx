/**
 * /knowledge/cap-sao — 24 cặp chính tinh có thể đứng chung một cung
 */

import Link from 'next/link';
import { CAP_SLUG } from '@/lib/seo/knowledge';
import { capSao } from '@/lib/ziwei/vn-luan-giai';
import { vi } from '@/lib/ziwei/vi';

export const metadata = {
  title: '24 cặp sao trong Tử Vi · Khi hai chính tinh đứng chung',
  description: 'Hai chính tinh đứng chung một cung không phải là cộng hai sao lại: 24 tổ hợp như Tử Phủ, Cơ Âm, Cự Nhật, Liêm Tham… và ý nghĩa ở từng cung.',
};

export default function CapSaoIndexPage() {
  return (
    <main className="page page--read">
      <nav aria-label="Đường dẫn" className="crumbs">
        <Link href="/knowledge">Kiến thức</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Cặp sao</span>
      </nav>
      <header className="index-head">
        <h1>24 cặp sao</h1>
        <p>
          Một cung có thể có hai chính tinh. Trong Tử Vi chỉ có đúng 24 cặp như vậy, mỗi cặp chỉ xuất hiện ở hai ô nhất định.
          Hai sao đứng chung không phải cộng hai nghĩa lại, mà thành một tính chất riêng; khi luận, ưu tiên bài của cặp hơn bài từng sao.
        </p>
      </header>
      <ol className="index-list">
        {CAP_SLUG.map(([slug, [a, b]]) => (
          <li key={slug} className="index-row">
            <h2 className="index-row__title"><Link href={`/knowledge/cap-sao/${slug}`}>{vi(a)} – {vi(b)}</Link></h2>
            <div className="index-row__body"><p>{capSao(a, b)}</p></div>
          </li>
        ))}
      </ol>
    </main>
  );
}
