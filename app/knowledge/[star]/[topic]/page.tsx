/**
 * /knowledge/[star]/[topic] — một chính tinh ở một cung (topic = slug cung, vd. /knowledge/thien-co/phu-the)
 * 168 trang tĩnh. Bài luận 4 phần dịch từ bộ dữ liệu Metis (lib/ziwei/metis); chưa dịch thì dùng lib/ziwei/vn-luan-giai.ts
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import { ALL_STARS, STAR_TO_SLUG, CUNG_TO_SLUG, getKnowledge, getAllKnowledgeRoutes } from '@/lib/seo/knowledge';
import { CUNG } from '@/lib/ziwei/vn-luan-giai';
import { vi } from '@/lib/ziwei/vi';
import { getParagraphById } from '@/lib/classics';
import { Hoa } from '@/components/PalaceCell';
import { CanCuList, NguonMetis, XuatXuList } from '@/components/BaiLuan';
import { baiLuan } from '@/lib/ziwei/metis';
import { SITE_URL } from '@/lib/site';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllKnowledgeRoutes();
}

type Params = { params: Promise<{ star: string; topic: string }> };

export async function generateMetadata({ params }: Params) {
  const { star, topic } = await params;
  const k = getKnowledge(star, topic);
  if (!k) return {};
  const title = `${k.starVi} ở cung ${k.cungVi} · Ý nghĩa trong Tử Vi`;
  const url = `${SITE_URL}/knowledge/${star}/${topic}`;
  const description = baiLuan(k.cung, [k.star])?.dinhDieu ?? k.text;
  return {
    title,
    description,
    openGraph: { title, description, type: 'article', url },
    alternates: { canonical: url },
    keywords: ['tử vi', k.starVi, `cung ${k.cungVi}`, `${k.starVi} cung ${k.cungVi}`, `${k.starVi} thủ ${k.cungVi}`],
  };
}

export default async function KnowledgePage({ params }: Params) {
  const { star, topic } = await params;
  const k = getKnowledge(star, topic);
  if (!k) notFound();
  const coThu = getParagraphById(k.coThu);
  const [sangNhat, oSang] = k.doSang[0];
  const [yeuNhat, oYeu] = k.doSang[k.doSang.length - 1];
  const bl = baiLuan(k.cung, [k.star]);
  const tinhCach = k.cung === '命宫' ? baiLuan(k.cung, [k.star], 'personality') : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${k.starVi} ở cung ${k.cungVi}`,
    description: k.text,
    inLanguage: 'vi',
    mainEntityOfPage: `${SITE_URL}/knowledge/${star}/${topic}`,
  };

  return (
    <main className="page page--read">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Đường dẫn" className="crumbs">
        <Link href="/knowledge">Kiến thức</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/knowledge#${star}`}>{k.starVi}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Cung {k.cungVi}</span>
      </nav>

      <article className="prose">
        <h1>{k.starVi} ở cung {k.cungVi}</h1>
        <p className="lede">{bl?.dinhDieu ?? k.text}</p>
        <p>
          <strong>Cung {k.cungVi}</strong> là ô nói về {k.cungYNghia}. <strong>Sao {k.starVi}</strong>: {k.tinhChat}
        </p>

        {bl?.cotLoi && (
          <>
            <h2>Luận điểm cốt lõi</h2>
            <p className="aside">Bài này nói khi {k.starVi} đứng một mình trong cung. Khi đi cặp với chính tinh khác, xem <Link href="/knowledge/cap-sao">trang cặp sao</Link>.</p>
            {bl.cotLoi.map(t => <p key={t}>{t}</p>)}
          </>
        )}

        {tinhCach?.cotLoi && (
          <>
            <h2>Tính cách</h2>
            <p><strong>{tinhCach.dinhDieu}</strong></p>
            {tinhCach.cotLoi.map(t => <p key={t}>{t}</p>)}
          </>
        )}

        <h2>{k.starVi} sáng hay hãm?</h2>
        <p>
          Cùng là {k.starVi} ở cung {k.cungVi}, nhưng mạnh yếu khác nhau tùy cung {k.cungVi} của bạn rơi vào ô nào.
          Ví dụ ở ô {vi(oSang[0])} thì {k.starVi} {vi(sangNhat)}, ở ô {vi(oYeu[0])} thì {vi(yeuNhat)}.
          Bảng đầy đủ (giống bảng app dùng để vẽ lá số):
        </p>
        <dl className="facts">
          {k.doSang.map(([bac, o]) => (
            <Fragment key={bac}>
              <dt>{vi(bac)}</dt>
              <dd>{o.map(vi).join(', ')}</dd>
            </Fragment>
          ))}
        </dl>
        {bl?.sang?.map(t => <p key={t}><strong>Khi sáng:</strong> {t}</p>)}
        {bl?.ham?.map(t => <p key={t}><strong>Khi hãm:</strong> {t}</p>)}
        <p className="aside">
          Sáng (Miếu, Vượng) thì những điều tốt ở trên rõ hơn; yếu (Bất, Hãm) thì điều tốt giảm, mặt xấu dễ lộ. <Link href="/knowledge/nhap-mon#do-sang">Độ sáng là gì?</Link>
        </p>

        <h2>{k.starVi} và Tứ Hóa</h2>
        {k.tuHoa.length ? (
          <ul>
            {k.tuHoa.map(([hoa, can]) => (
              <li key={can}><Hoa siHua={hoa} /> Người sinh năm can <strong>{vi(can)}</strong>: {k.starVi} hóa {vi(hoa)}.</li>
            ))}
          </ul>
        ) : (
          <p>
            Theo bảng app dùng, {k.starVi} không bao giờ được hóa theo can năm sinh
            {k.star === '天府' && ' (nhiều sách Việt cho Thiên Phủ hóa Khoa năm Nhâm)'}.
          </p>
        )}
        {bl?.hoa && Object.entries(bl.hoa).flatMap(([hoa, ds]) => ds.map(t => (
          <p key={t}><Hoa siHua={hoa} /> {t}</p>
        )))}
        <p className="aside">
          Gặp Tứ Hóa thì tính chất của sao trong cung {k.cungVi} được nhấn thêm: Lộc thêm thuận lợi, Quyền thêm chủ động,
          Khoa thêm danh tiếng, Kỵ thêm vướng mắc. <Link href="/knowledge/nhap-mon#tu-hoa">Tứ Hóa là gì?</Link>
        </p>

        {bl?.canCu && (
          <>
            <h2>Căn cứ trên lá số</h2>
            <CanCuList ds={bl.canCu} />
          </>
        )}

        {bl?.xuatXu && (
          <>
            <h2>Xuất xứ kinh điển</h2>
            <XuatXuList ds={bl.xuatXu} />
          </>
        )}

        {coThu && (
          <>
            <h2>{bl ? 'Đọc thêm trong cổ thư' : 'Cổ thư nói'}</h2>
            <blockquote>
              <p>{coThu.paragraph.translation}</p>
              <footer>
                <Link href={`/library/${coThu.book.slug}/${coThu.chapterIdx}#${coThu.paragraph.id}`}>
                  {coThu.book.title} · {coThu.chapter.title}
                </Link>
              </footer>
            </blockquote>
          </>
        )}

        <p className="aside">
          Bài này nói ý nghĩa chung khi chỉ xét riêng {k.starVi}. Trên lá số thật còn phải xem chính tinh đi cùng,
          các <Link href="/knowledge/nhap-mon#sao">phụ tinh</Link>, <Link href="/knowledge/nhap-mon#tuan-triet">Tuần, Triệt</Link> và{' '}
          <Link href="/knowledge/nhap-mon#tam-phuong-tu-chinh">tam phương tứ chính</Link>. <Link href="/chart">Lập lá số của bạn</Link> để
          xem cung {k.cungVi} thực sự có gì.
        </p>
        {bl && <NguonMetis />}
      </article>

      <section className="related">
        <h2>{k.starVi} ở các cung khác</h2>
        <ul className="links">
          {CUNG.filter(c => c !== k.cung).map(c => (
            <li key={c}><Link className="link-chip" href={`/knowledge/${star}/${CUNG_TO_SLUG[c]}`}>{vi(c)}</Link></li>
          ))}
        </ul>
      </section>

      <section className="related">
        <h2>Các sao khác ở cung {k.cungVi}</h2>
        <ul className="links">
          {ALL_STARS.filter(s => s !== k.star).map(s => (
            <li key={s}><Link className="link-chip" href={`/knowledge/${STAR_TO_SLUG[s]}/${topic}`}>{vi(s)}</Link></li>
          ))}
        </ul>
      </section>
    </main>
  );
}
