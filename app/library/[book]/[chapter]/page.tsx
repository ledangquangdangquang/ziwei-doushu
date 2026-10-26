/**
 * /library/[book]/[chapter] — đọc một chương: bản dịch tiếng Việt, chữ Hán bên dưới
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_BOOKS, getChapter } from '@/lib/classics';

export async function generateStaticParams() {
  return ALL_BOOKS.flatMap(b =>
    b.chapters.map((_, i) => ({ book: b.slug, chapter: String(i) }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ book: string; chapter: string }> }) {
  const { book: bookSlug, chapter: chIdx } = await params;
  const result = getChapter(bookSlug, parseInt(chIdx));
  if (!result) return {};
  return {
    title: `${result.chapter.title} · ${result.book.title}`,
    description: result.chapter.subtitle || `${result.book.title} — ${result.chapter.title}`,
  };
}

export default async function ChapterPage({ params }: { params: Promise<{ book: string; chapter: string }> }) {
  const { book: bookSlug, chapter: chIdx } = await params;
  const result = getChapter(bookSlug, parseInt(chIdx));
  if (!result) notFound();

  const { book, chapter, chapterIdx } = result;
  const prev = book.chapters[chapterIdx - 1];
  const next = book.chapters[chapterIdx + 1];

  return (
    <main className="page page--read">
      <nav aria-label="Đường dẫn" className="crumbs">
        <Link href="/library">Cổ thư</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/library/${book.slug}`}>{book.title}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{chapter.title}</span>
      </nav>

      <article className="prose">
        <h1>{chapter.title}</h1>
        {chapter.subtitle && <p className="meta">{chapter.subtitle}</p>}
        <div>
          {chapter.paragraphs.map(p => (
            <div key={p.id} id={p.id} className="passage">
              <span className="passage__no num">{String(p.idx).padStart(2, '0')}</span>
              <div>
                {p.translation && <p className="passage__vi">{p.translation}</p>}
                <p className="passage__han" lang="zh"><span lang="vi">Chữ Hán</span>{p.text}</p>
                {p.niNote && <p className="aside">Ghi chú của thầy Nghê: {p.niNote}</p>}
              </div>
            </div>
          ))}
        </div>
      </article>

      <nav className="pager" aria-label="Chương trước và sau">
        {prev && (
          <Link href={`/library/${book.slug}/${chapterIdx - 1}`}>
            <small>← Chương trước</small>
            <span>{prev.title}</span>
          </Link>
        )}
        {next && (
          <Link href={`/library/${book.slug}/${chapterIdx + 1}`} className="pager__next">
            <small>Chương sau →</small>
            <span>{next.title}</span>
          </Link>
        )}
      </nav>
    </main>
  );
}
