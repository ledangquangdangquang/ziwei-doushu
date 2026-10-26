/**
 * /knowledge/cap-sao/[cap] — một cặp chính tinh ở 12 cung (bài dịch từ bộ dữ liệu Metis nếu đã có)
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CAP_SLUG, capTheoSlug } from '@/lib/seo/knowledge';
import { CUNG, CUNG_Y_NGHIA, capSao } from '@/lib/ziwei/vn-luan-giai';
import { baiLuan } from '@/lib/ziwei/metis';
import { vi } from '@/lib/ziwei/vi';
import { CanCuList, NguonMetis, XuatXuList } from '@/components/BaiLuan';

export const dynamicParams = false;

export function generateStaticParams() {
  return CAP_SLUG.map(([cap]) => ({ cap }));
}

type Params = { params: Promise<{ cap: string }> };

export async function generateMetadata({ params }: Params) {
  const cap = capTheoSlug((await params).cap);
  if (!cap) return {};
  return {
    title: `${vi(cap[0])} – ${vi(cap[1])} đồng cung · Ý nghĩa ở 12 cung`,
    description: capSao(cap[0], cap[1]),
  };
}

export default async function CapSaoPage({ params }: Params) {
  const cap = capTheoSlug((await params).cap);
  if (!cap) notFound();
  const ten = `${vi(cap[0])} – ${vi(cap[1])}`;
  const bai = CUNG.map(c => [c, baiLuan(c, cap)] as const);
  const daDich = bai.filter(([, b]) => b);

  return (
    <main className="page page--read">
      <nav aria-label="Đường dẫn" className="crumbs">
        <Link href="/knowledge">Kiến thức</Link>
        <span aria-hidden="true">/</span>
        <Link href="/knowledge/cap-sao">Cặp sao</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{ten}</span>
      </nav>

      <article className="prose">
        <h1>{ten} đồng cung</h1>
        <p className="lede">{capSao(cap[0], cap[1])}</p>
        {daDich[0]?.[1]?.tom && <p><em>{daDich[0][1].tom}</em></p>}
        <p className="aside">
          Cặp sao này đứng ở cung nào thì đọc phần của cung đó. Chưa rõ cung là gì? Xem <Link href="/knowledge/nhap-mon#12-cung">12 cung</Link>.
        </p>

        {bai.map(([c, b]) => b && (
          <section key={c}>
            <h2 id={c}>Ở cung {vi(c)}</h2>
            <p className="aside">Cung {vi(c)} nói về {CUNG_Y_NGHIA[c]}.</p>
            <p><strong>{b.dinhDieu}</strong></p>
            {b.cotLoi?.map(t => <p key={t}>{t}</p>)}
            {b.canCu && <CanCuList ds={b.canCu} />}
            {b.xuatXu && b.xuatXu.length > 0 && <XuatXuList ds={b.xuatXu} />}
          </section>
        ))}

        {daDich.length < CUNG.length && (
          <p className="aside">
            Đang dịch phần luận cho các cung: {bai.filter(([, b]) => !b).map(([c]) => vi(c)).join(', ')}.
          </p>
        )}
        {daDich.length > 0 && <NguonMetis />}
      </article>
    </main>
  );
}
