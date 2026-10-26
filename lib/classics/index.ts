/**
 * Thư viện cổ thư — dữ liệu tĩnh + tra cứu/tìm kiếm (không DB, không mạng)
 */

import type { Book, SearchHit } from './types';
import { foldVi } from '@/lib/ziwei/vi';
import { guSuiFu } from './data/gusuifu';
import { ziWeiQuanJi } from './data/quanji';
import { ziWeiQuanShu } from './data/quanshu';

/** Các sách đã có */
export const ALL_BOOKS: Book[] = [
  guSuiFu,
  ziWeiQuanJi,
  ziWeiQuanShu,
];

/** Tổng số đoạn */
export const TOTAL_PARAGRAPHS = ALL_BOOKS.reduce(
  (sum, b) => sum + b.chapters.reduce((s, c) => s + c.paragraphs.length, 0),
  0,
);

/** Lấy sách theo slug */
export function getBookBySlug(slug: string): Book | null {
  return ALL_BOOKS.find(b => b.slug === slug) ?? null;
}

/** Lấy chương theo số thứ tự */
export function getChapter(bookSlug: string, chapterIdx: number) {
  const book = getBookBySlug(bookSlug);
  if (!book) return null;
  const chapter = book.chapters[chapterIdx];
  if (!chapter) return null;
  return { book, chapter, chapterIdx };
}

/** Lấy đoạn theo id (kèm sách và chương) */
export function getParagraphById(id: string) {
  for (const book of ALL_BOOKS) {
    for (let i = 0; i < book.chapters.length; i++) {
      const ch = book.chapters[i];
      const p = ch.paragraphs.find(p => p.id === id);
      if (p) {
        return { book, chapter: ch, chapterIdx: i, paragraph: p };
      }
    }
  }
  return null;
}

/**
 * Tìm toàn văn trong bản dịch tiếng Việt và chữ Hán.
 * Không phân biệt hoa thường và dấu: "hoa ky" khớp "Hóa Kỵ".
 */
export function searchClassics(query: string, limit = 30): SearchHit[] {
  const q = foldVi(query.trim());
  if (q.length < 1) return [];

  const hits: SearchHit[] = [];
  for (const book of ALL_BOOKS) {
    for (const chapter of book.chapters) {
      for (const p of chapter.paragraphs) {
        // foldVi giữ nguyên độ dài chuỗi nên vị trí khớp dùng được cho chuỗi gốc
        const source = [p.translation ?? '', p.text].find(t => foldVi(t).includes(q));
        if (!source) continue;
        const idx = foldVi(source).indexOf(q);

        // ngữ cảnh 60 ký tự mỗi bên
        const start = Math.max(0, idx - 60);
        const end = Math.min(source.length, idx + q.length + 60);
        const snippet = (start > 0 ? '…' : '')
          + escapeHtml(source.slice(start, idx))
          + `<mark>${escapeHtml(source.slice(idx, idx + q.length))}</mark>`
          + escapeHtml(source.slice(idx + q.length, end))
          + (end < source.length ? '…' : '');

        hits.push({
          bookSlug: book.slug,
          bookTitle: book.title,
          chapterTitle: chapter.title,
          paragraphId: p.id,
          snippet,
          text: p.text,
        });

        if (hits.length >= limit) return hits;
      }
    }
  }
  return hits;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export type { Book, Chapter, Paragraph, SearchHit } from './types';
