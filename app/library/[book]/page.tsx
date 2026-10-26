/**
 * /library/[book] — mục lục một sách
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_BOOKS, getBookBySlug } from '@/lib/classics';

export async function generateStaticParams() {
  return ALL_BOOKS.map(b => ({ book: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ book: string }> }) {
  const { book: slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return {};
  return {
    title: `${book.title} (${book.titleHan}) · Cổ thư Tử Vi`,
    description: book.intro,
  };
}

export default async function BookPage({ params }: { params: Promise<{ book: string }> }) {
  const { book: slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  return (
    <main className="page page--read">
      <nav aria-label="Đường dẫn" className="crumbs">
        <Link href="/library">Cổ thư</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{book.title}</span>
      </nav>

      <header className="index-head">
        <h1>{book.title}</h1>
        <p className="index-row__sub"><span lang="zh">{book.titleHan}</span> · {book.dynasty} · {book.author}</p>
        <p>{book.intro}</p>
      </header>

      <ol className="toc">
        {book.chapters.map((chapter, i) => (
          <li key={i}>
            <Link href={`/library/${book.slug}/${i}`}>
              <span className="toc__no num">{String(i + 1).padStart(2, '0')}</span>
              <span className="toc__title">
                {chapter.title}
                {chapter.subtitle && <span className="toc__sub">{chapter.subtitle}</span>}
              </span>
              <span className="toc__count num">{chapter.paragraphs.length} đoạn</span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
