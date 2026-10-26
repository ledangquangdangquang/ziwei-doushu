/**
 * Bắc Đẩu thất tinh — vị trí chiếu từ xích kinh / xích vĩ thật của bảy sao chòm Đại Hùng,
 * mỗi sao mang tên một vì sao Tử Vi tương ứng (Thiên Xu = Tham Lang … Dao Quang = Phá Quân).
 * Tham Lang – Cự Môn chỉ về Bắc Cực, ngôi của sao Tử Vi (khoảng cách thu ngắn cho vừa khung).
 */

const STARS: { ten: string; x: number; y: number; r: number; lx: number; ly: number; anchor: 'start' | 'middle' | 'end' }[] = [
  { ten: 'Tham Lang', x: 48.4, y: 154, r: 3.9, lx: 62, ly: 159, anchor: 'start' },
  { ten: 'Cự Môn', x: 44.2, y: 239.9, r: 3.2, lx: 30, ly: 266, anchor: 'start' },
  { ten: 'Lộc Tồn', x: 162, y: 283, r: 3.2, lx: 162, ly: 309, anchor: 'middle' },
  { ten: 'Văn Khúc', x: 210.9, y: 229.5, r: 2.2, lx: 232, ly: 203, anchor: 'middle' },
  { ten: 'Liêm Trinh', x: 298.4, y: 246.6, r: 3.9, lx: 308, ly: 229, anchor: 'middle' },
  { ten: 'Vũ Khúc', x: 366.1, y: 263.1, r: 3.4, lx: 380, ly: 244, anchor: 'start' },
  { ten: 'Phá Quân', x: 419.6, y: 353, r: 3.8, lx: 419.6, ly: 381, anchor: 'middle' },
];
const POLARIS = { x: 54.1, y: 38 };

const pts = (idx: number[]) => idx.map(i => `${STARS[i].x},${STARS[i].y}`).join(' ');

export default function BacDauStars() {
  return (
    <figure className="dipper reveal" style={{ '--i': 2 } as React.CSSProperties}>
      <svg
        viewBox="0 0 480 400"
        role="img"
        aria-label="Chòm Bắc Đẩu: bảy sao Tham Lang, Cự Môn, Lộc Tồn, Văn Khúc, Liêm Trinh, Vũ Khúc, Phá Quân. Hai sao Cự Môn và Tham Lang chỉ về sao Bắc Cực, ngôi của sao Tử Vi."
      >
        <line className="dipper__pointer" x1={STARS[1].x} y1={STARS[1].y} x2={POLARIS.x} y2={POLARIS.y} />
        <polyline className="dipper__line" points={pts([0, 1, 2, 3, 0])} />
        <polyline className="dipper__line" points={pts([3, 4, 5, 6])} />
        {STARS.map(s => (
          <g key={s.ten}>
            <circle className="dipper__star" cx={s.x} cy={s.y} r={s.r} />
            <text className="dipper__label" x={s.lx} y={s.ly} textAnchor={s.anchor}>{s.ten}</text>
          </g>
        ))}
        <circle className="dipper__polaris-halo" cx={POLARIS.x} cy={POLARIS.y} r={11} />
        <circle className="dipper__polaris" cx={POLARIS.x} cy={POLARIS.y} r={4.2} />
        <text className="dipper__label dipper__label--polaris" x={POLARIS.x + 18} y={POLARIS.y + 5}>Tử Vi · Bắc Cực</text>
      </svg>
      <figcaption>
        Bắc Đẩu thất tinh — bảy ngôi sao mang tên bảy vì sao của Tử Vi. Tham Lang và Cự Môn chỉ đường về Bắc Cực,
        ngôi của sao Tử Vi.
      </figcaption>
    </figure>
  );
}
