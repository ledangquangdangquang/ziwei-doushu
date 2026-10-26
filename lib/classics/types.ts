/**
 * Thư viện cổ thư — kiểu dữ liệu (dữ liệu tĩnh đóng gói trong code, không cần DB)
 */

export interface Paragraph {
  /** id duy nhất (dùng làm neo liên kết) */
  id: string;
  /** Số thứ tự trong chương */
  idx: number;
  /** Chữ Hán (tóm lược theo ý, xem intro của sách) */
  text: string;
  /** Bản dịch tiếng Việt */
  translation?: string;
  /** Ghi chú của thầy Nghê Hải Hạ (nếu có, ghi rõ nguồn) */
  niNote?: string;
}

export interface Chapter {
  /** Tên chương */
  title: string;
  /** Phụ đề chương */
  subtitle?: string;
  paragraphs: Paragraph[];
}

export interface Book {
  /** Tên sách tiếng Việt */
  title: string;
  /** Tên chữ Hán */
  titleHan: string;
  /** slug dùng trong URL */
  slug: string;
  /** Triều đại */
  dynasty: string;
  /** Tác giả */
  author: string;
  /** Giới thiệu */
  intro: string;
  /** Số chữ của nguyên bản (ước lượng) */
  wordCount: number;
  chapters: Chapter[];
}

export interface SearchHit {
  bookSlug: string;
  bookTitle: string;
  chapterTitle: string;
  paragraphId: string;
  /** Đoạn trích có <mark> quanh chỗ khớp (đã escape HTML) */
  snippet: string;
  /** Chữ Hán */
  text: string;
}
