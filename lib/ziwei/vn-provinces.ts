/**
 * 63 tỉnh/thành (địa giới trước sáp nhập 2025 — người dùng nhớ nơi sinh theo tên cũ).
 * longitude: kinh độ tỉnh lỵ, dùng tính giờ mặt trời thật.
 * south: thuộc miền Nam 1954–1975 (từ Quảng Trị trở vào) — đồng hồ và âm lịch theo UTC+8 giai đoạn đó.
 */
export interface VnProvince {
  name: string;
  longitude: number;
  south: boolean;
}

const NORTH: [string, number][] = [
  ['Hà Nội', 105.85], ['Hà Giang', 104.98], ['Cao Bằng', 106.25], ['Bắc Kạn', 105.83],
  ['Tuyên Quang', 105.22], ['Lào Cai', 103.97], ['Điện Biên', 103.02], ['Lai Châu', 103.46],
  ['Sơn La', 103.91], ['Yên Bái', 104.87], ['Hòa Bình', 105.34], ['Thái Nguyên', 105.84],
  ['Lạng Sơn', 106.76], ['Quảng Ninh', 107.08], ['Bắc Giang', 106.19], ['Phú Thọ', 105.40],
  ['Vĩnh Phúc', 105.60], ['Bắc Ninh', 106.07], ['Hải Dương', 106.33], ['Hải Phòng', 106.68],
  ['Hưng Yên', 106.05], ['Thái Bình', 106.34], ['Hà Nam', 105.92], ['Nam Định', 106.17],
  ['Ninh Bình', 105.97], ['Thanh Hóa', 105.78], ['Nghệ An', 105.68], ['Hà Tĩnh', 105.90],
  ['Quảng Bình', 106.62],
];

const SOUTH: [string, number][] = [
  ['Quảng Trị', 107.19], ['Thừa Thiên Huế', 107.59], ['Đà Nẵng', 108.21], ['Quảng Nam', 108.47],
  ['Quảng Ngãi', 108.80], ['Bình Định', 109.22], ['Phú Yên', 109.32], ['Khánh Hòa', 109.19],
  ['Ninh Thuận', 108.99], ['Bình Thuận', 108.10], ['Kon Tum', 108.00], ['Gia Lai', 108.00],
  ['Đắk Lắk', 108.04], ['Đắk Nông', 107.69], ['Lâm Đồng', 108.44], ['Bình Phước', 106.90],
  ['Tây Ninh', 106.10], ['Bình Dương', 106.65], ['Đồng Nai', 106.82], ['Bà Rịa – Vũng Tàu', 107.17],
  ['TP. Hồ Chí Minh', 106.70], ['Long An', 106.41], ['Tiền Giang', 106.36], ['Bến Tre', 106.38],
  ['Trà Vinh', 106.34], ['Vĩnh Long', 105.97], ['Đồng Tháp', 105.63], ['An Giang', 105.43],
  ['Kiên Giang', 105.08], ['Cần Thơ', 105.78], ['Hậu Giang', 105.47], ['Sóc Trăng', 105.97],
  ['Bạc Liêu', 105.72], ['Cà Mau', 105.15],
];

export const VN_PROVINCES: VnProvince[] = [
  ...NORTH.map(([name, longitude]) => ({ name, longitude, south: false })),
  ...SOUTH.map(([name, longitude]) => ({ name, longitude, south: true })),
].sort((a, b) => a.name.localeCompare(b.name, 'vi'));
