/**
 * Tên Hán trong engine (iztro zh-CN) → Hán Việt, dùng bản dịch vi-VN có sẵn của iztro.
 * Engine giữ nguyên tên Hán bên trong; chỉ lớp hiển thị gọi vi().
 */
import zhCN from 'iztro/lib/i18n/locales/zh-CN';
import viVN from 'iztro/lib/i18n/locales/vi-VN';

const ZH_TO_VI: Record<string, string> = {};
for (const [key, zh] of Object.entries(zhCN as Record<string, string>)) {
  ZH_TO_VI[zh] = (viVN as Record<string, string>)[key] ?? zh;
}
Object.assign(ZH_TO_VI, {
  // iztro dịch 陷 là "Hạn" — đúng phải là "Hãm"; 闲/地 là bậc độ sáng engine thêm vào
  '陷': 'Hãm', '闲': 'Nhàn', '地': 'Địa',
  // lá số Việt ghi gọn Tuần / Triệt, cặp cung phụ cũng ghi như vậy
  '截空': 'Triệt', '副截': 'Triệt', '旬空': 'Tuần', '副旬': 'Tuần',
  '子女': 'Tử Tức',
});

export const vi = (zh: string): string => ZH_TO_VI[zh] ?? zh;

/** 化禄 → Hóa Lộc */
export const viHoa = (siHua: string): string => `Hóa ${vi(siHua)}`;

/** Bỏ dấu + chữ thường, giữ nguyên độ dài chuỗi (từng ký tự → đúng 1 ký tự) để cắt đoạn theo vị trí khớp. */
export function foldVi(s: string): string {
  return Array.from(s.normalize('NFC'), c => {
    const f = c.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
    return f.length === c.length ? f : c;
  }).join('');
}

/** "Thiên Tướng" → "thien-tuong" */
export const slugVi = (s: string): string => foldVi(s).trim().replace(/\s+/g, '-');
