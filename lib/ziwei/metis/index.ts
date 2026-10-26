/**
 * Luận giải dịch từ "紫微斗数开源解读数据集 v4.0" (Metis紫微 · 王多鱼AI, CC BY 4.0;
 * lời trích thầy Nghê Hải Hạ theo CC BY-NC-SA 4.0). Đã dịch sang tiếng Việt và lược bớt:
 * chỉ giữ phần cố định theo (cung, chính tinh), bỏ phần suy luận riêng từng lá số và ghi chú hiệu đính.
 * Nguồn: https://github.com/Renhuai123/ziwei-doushu · Công cụ tách: xem README mục dữ liệu.
 *
 * Khóa mỗi file: tên Hán của chính tinh trong cung, cặp sao nối bằng "+" (thứ tự bất kỳ).
 */
import type { SiHua } from '../types';
import overview from './overview.json';
import personality from './personality.json';
import love from './love.json';
import career from './career.json';
import wealth from './wealth.json';
import health from './health.json';
import family from './family.json';
import children from './children.json';
import move from './move.json';
import friends from './friends.json';
import home from './home.json';
import spirit from './spirit.json';
import parents from './parents.json';

export interface TrichDan {
  /** "Toàn Thư, quyển 1, Chư Tinh Vấn Đáp Luận – Tử Vi" */
  nguon: string;
  /** Bản dịch tiếng Việt */
  dich: string;
  /** Nguyên văn chữ Hán, để đối chiếu */
  goc?: string;
}

export interface BaiLuan {
  /** Một câu nói gọn */
  dinhDieu: string;
  /** Câu tóm của cặp sao (chỉ cặp sao) */
  tom?: string;
  /** Luận điểm cốt lõi */
  cotLoi?: string[];
  /** Thêm khi sao sáng (Miếu/Vượng) / khi sao hãm */
  sang?: string[];
  ham?: string[];
  /** Thêm khi sao có Tứ Hóa năm sinh */
  hoa?: Partial<Record<SiHua, string[]>>;
  /** Căn cứ trên lá số: "Tiêu đề — giải thích" hoặc câu thường */
  canCu?: string[];
  /** Xuất xứ kinh điển */
  xuatXu?: TrichDan[];
}

type ChuDe = 'overview' | 'personality' | 'love' | 'career' | 'wealth' | 'health' | 'family'
  | 'children' | 'move' | 'friends' | 'home' | 'spirit' | 'parents';

const raw: Record<ChuDe, Record<string, BaiLuan>> = {
  overview, personality, love, career, wealth, health, family, children, move, friends, home, spirit, parents,
} as Record<ChuDe, Record<string, BaiLuan>>;

const khoa = (stars: string[]) => [...stars].sort().join('+');

/** Khóa đã chuẩn hóa (sắp thứ tự sao) để tra không phụ thuộc thứ tự engine trả về */
const DATA = Object.fromEntries(
  Object.entries(raw).map(([cd, m]) => [cd, Object.fromEntries(Object.entries(m).map(([k, v]) => [khoa(k.split('+')), v]))]),
) as Record<ChuDe, Record<string, BaiLuan>>;

/** Tên cung (iztro zh-CN) → chủ đề trong bộ dữ liệu; cung Mệnh có thêm chủ đề "tính cách" */
export const CUNG_CHU_DE_METIS: Record<string, ChuDe> = {
  '命宫': 'overview', '夫妻': 'love', '官禄': 'career', '财帛': 'wealth', '疾厄': 'health', '兄弟': 'family',
  '子女': 'children', '迁移': 'move', '仆役': 'friends', '田宅': 'home', '福德': 'spirit', '父母': 'parents',
};

/** Bài luận cho các chính tinh (1 sao hoặc cặp sao) đứng trong một cung; undefined nếu chưa dịch. */
export function baiLuan(cung: string, stars: string[], chuDe: ChuDe = CUNG_CHU_DE_METIS[cung]): BaiLuan | undefined {
  return chuDe && stars.length ? DATA[chuDe]?.[khoa(stars)] : undefined;
}

/** Tách "Tiêu đề — giải thích" để in đậm phần tiêu đề */
export function tachCanCu(s: string): [string, string] | null {
  const i = s.indexOf(' — ');
  return i > 0 ? [s.slice(0, i), s.slice(i + 3)] : null;
}

export const NGUON_METIS = {
  ten: 'Bộ dữ liệu luận giải Tử Vi Đẩu Số mã nguồn mở v4.0 (674.976 lá số × 13 chủ đề)',
  tacGia: '王多鱼AI (Metis紫微)',
  url: 'https://github.com/Renhuai123/ziwei-doushu',
};
