/**
 * Trang kiến thức — 14 chính tinh × 12 cung = 168 trang, nội dung lấy từ luận giải tiếng Việt (vn-luan-giai.ts).
 * URL dùng slug không dấu: /knowledge/thien-co/phu-the
 */

import { CAP_DS, CUNG, CUNG_Y_NGHIA, LUAN_GIAI, SAO_TINH_CHAT } from '@/lib/ziwei/vn-luan-giai';
import { vi, slugVi } from '@/lib/ziwei/vi';
import { BRANCHES, SI_HUA_TABLE, STEMS } from '@/lib/ziwei/constants';
import { schoolStarBrightness } from '@/lib/ziwei/school-data';
import type { SiHua } from '@/lib/ziwei/types';

export const ALL_STARS = [
  '紫微', '天机', '太阳', '武曲', '天同', '廉贞', '天府',
  '太阴', '贪狼', '巨门', '天相', '天梁', '七杀', '破军',
];

const invert = (m: Record<string, string>) => Object.fromEntries(Object.entries(m).map(([k, v]) => [v, k]));

export const STAR_TO_SLUG: Record<string, string> = Object.fromEntries(ALL_STARS.map(s => [s, slugVi(vi(s))]));
export const SLUG_TO_STAR: Record<string, string> = invert(STAR_TO_SLUG);
export const CUNG_TO_SLUG: Record<string, string> = Object.fromEntries(CUNG.map(c => [c, slugVi(vi(c))]));
export const SLUG_TO_CUNG: Record<string, string> = invert(CUNG_TO_SLUG);

export interface KnowledgeData {
  star: string;
  cung: string;
  /** "Thiên Cơ" */
  starVi: string;
  /** "Phu Thê" */
  cungVi: string;
  cungYNghia: string;
  tinhChat: string;
  text: string;
  /** Độ sáng ở 12 ô, gom theo bậc: [['庙', ['丑', '午', '未']], …] */
  doSang: [string, string[]][];
  /** Năm can nào sao được hóa: [['禄', '甲'], …] */
  tuHoa: [SiHua, string][];
  /** id đoạn cổ thư luận về sao này */
  coThu: string;
}

/** 7 bậc độ sáng, mạnh → yếu (bảng 全书 mà lá số đang dùng) */
export const DO_SANG = ['庙', '旺', '得', '利', '平', '不', '陷'];

/** Cùng hàm engine dùng khi vẽ lá số, nên trang kiến thức luôn khớp lá số */
export function doSangTheoBac(star: string): [string, string[]][] {
  return DO_SANG
    .map(b => [b, BRANCHES.filter((_, i) => schoolStarBrightness(star, i) === b)] as [string, string[]])
    .filter(([, ds]) => ds.length > 0);
}

const HOA: SiHua[] = ['禄', '权', '科', '忌'];

export function tuHoaCuaSao(star: string): [SiHua, string][] {
  return Object.entries(SI_HUA_TABLE).flatMap(([stem, sao]) =>
    sao.flatMap((s, k): [SiHua, string][] => (s === star ? [[HOA[k], STEMS[+stem]]] : [])));
}

/** Đoạn cổ thư (lib/classics) luận về từng chính tinh */
const CO_THU: Record<string, string> = {
  '紫微': 'qj-2-1', '天机': 'qj-4-2', '太阳': 'qj-4-3', '武曲': 'qj-4-4', '天同': 'gsf-5-1',
  '廉贞': 'qj-4-5', '天府': 'qj-3-1', '太阴': 'qj-3-2', '贪狼': 'qj-3-3', '巨门': 'qj-3-4',
  '天相': 'qj-3-5', '天梁': 'qj-3-6', '七杀': 'gsf-3-1', '破军': 'qj-4-6',
};

export function getKnowledge(starSlug: string, cungSlug: string): KnowledgeData | null {
  const star = SLUG_TO_STAR[starSlug];
  const cung = SLUG_TO_CUNG[cungSlug];
  const text = star && cung ? LUAN_GIAI[star]?.[CUNG.indexOf(cung)] : undefined;
  if (!text) return null;
  return {
    star, cung, text,
    starVi: vi(star),
    cungVi: vi(cung),
    cungYNghia: CUNG_Y_NGHIA[cung],
    tinhChat: SAO_TINH_CHAT[star],
    doSang: doSangTheoBac(star),
    tuHoa: tuHoaCuaSao(star),
    coThu: CO_THU[star],
  };
}

/** Mọi tổ hợp sao × cung (cho generateStaticParams và sitemap) */
export function getAllKnowledgeRoutes() {
  return ALL_STARS.flatMap(s => CUNG.map(c => ({ star: STAR_TO_SLUG[s], topic: CUNG_TO_SLUG[c] })));
}

/** Cặp sao → slug: "tu-vi-thien-phu" */
export const CAP_SLUG: [string, [string, string]][] = CAP_DS.map(([a, b]) => [`${slugVi(vi(a))}-${slugVi(vi(b))}`, [a, b]]);
export const capTheoSlug = (slug: string) => CAP_SLUG.find(([s]) => s === slug)?.[1];
