# Design — Tử Vi Đẩu Số (bản tiếng Việt)

Hệ thiết kế đã khóa cho toàn app. Mọi lần sửa giao diện đọc file này trước khi viết code.
Không tạo lại hệ mới cho từng trang — khi cần thêm, sửa file này.

## Genre
atmospheric — huyền bí, nền đêm, người dùng trẻ.

## Họ cấu trúc trang

- Trang vào (`/chart` trước khi lập): **Split Studio** — tiêu đề + lede + minh họa Bắc Đẩu (trái) · form (phải). Trên điện thoại: tiêu đề → form → minh họa.
- Trang công cụ (`/chart` sau khi lập, `/heming`): **Workbench** — tiêu đề nhỏ, chức năng là chính, không minh họa.
- Trang mục lục (`/knowledge`, `/library`, `/library/[book]`, `/library/search`): **Index-First** — đoạn giới thiệu ngắn, danh sách liên kết có đường kẻ mảnh.
- Trang đọc (`/knowledge/[sao]/[cung]`, `/library/[sách]/[chương]`, `/privacy`, `/terms`): **Long Document** — một cột, `--measure` 65ch, line-height 1.75, liên kết nằm trong câu.

## Theme
custom · vibe: "đêm Bắc Đẩu, mực tím chàm, ánh vàng cổ" · axes: dark / roman-serif / chromatic-amber ~82° · chỉ nền tối.

- `--color-paper`   oklch(14% 0.020 285)
- `--color-paper-2` oklch(18% 0.022 285)
- `--color-paper-3` oklch(22% 0.024 285)
- `--color-ink`     oklch(94% 0.010 285)
- `--color-ink-2`   oklch(82% 0.014 285)
- `--color-muted`   oklch(68% 0.016 285) — ≈ 6.9:1 trên paper
- `--color-rule`    oklch(32% 0.022 285) — đường kẻ trang trí
- `--color-rule-strong` oklch(50% 0.025 285) — viền ô nhập, ≥ 3:1
- `--color-accent`  oklch(80% 0.13 82) — vàng cổ (màu vàng đồng cũ của dự án, chỉnh cho nền tối)
- `--color-focus`   oklch(84% 0.17 82)
- `--color-select`  oklch(72% 0.10 285) — chọn cung, tam phương tứ chính
- Ngữ nghĩa lá số: `--color-loc` (Lộc), `--color-quyen`, `--color-khoa` (vàng-xanh, tách khỏi màu nhấn), `--color-ky`, `--color-cat` (cát tinh), `--color-sat` (sát tinh). Nhãn Tứ Hóa luôn có chữ, không chỉ dựa vào màu.
- Nền: hai quầng sáng tĩnh (`--color-bloom` vàng, `--color-bloom-2` tím), cố định, không chuyển động.

## Typography
- Display: Cormorant Garamond 600 (500 cho câu chân trang), kiểu đứng — **không in nghiêng tiêu đề**.
- Body: Be Vietnam Pro 400 (300 cho lede), 500/600 cho nhãn.
- Không có font thứ ba. Số dùng `.num` (tabular-nums).
- Cả hai font nạp qua `next/font/google` với subset `vietnamese`.
- Thang cỡ chữ major third (1.25), `--text-display` = clamp(2.5rem, 4vw + 1.25rem, 4.75rem). Tiêu đề trang vào ≤ 7 chữ.

## Spacing
Thang 4pt có tên trong `tokens.css` (`--space-3xs` … `--space-3xl`), lề trang `--page-gutter`. Dùng token, không gõ số thô.

## Motion
- Easings `--ease-out` / `--ease-in` / `--ease-in-out`; thời lượng `--dur-micro` 120ms, `--dur-short` 220ms, `--dur-long` 420ms.
- Chỉ **hiện dần** (`.reveal`, opacity) một lần khi tải trang, stagger ≤ 500ms. Không trượt, không phóng to, không parallax.
- `prefers-reduced-motion`: animation/transition ≤ 150ms; framer-motion dùng `MotionConfig reducedMotion="user"`.

## Microinteractions
- Thành công im lặng: lập lá số xong thì hiện lá số, không toast.
- Vòng focus 2px `--color-focus`, hiện ngay, không animate.
- Hover chỉ dưới `(hover: hover) and (pointer: fine)`; mọi thứ hover được đều có trạng thái focus.
- Vùng chạm ≥ 44px (nút, link menu, tab, ô nhập 48px).

## CTA voice
- Chính: `.btn--primary` — viên thuốc, nền vàng cổ, chữ `--color-accent-ink`, động từ ngắn ("Lập lá số", "Xem hợp tuổi", "Tìm").
- Phụ: `.btn--ghost` — viền `--color-rule-strong`, nền trong suốt ("← Lập lá số khác").
- Trong bài đọc: liên kết nằm trong câu, màu vàng cổ, gạch chân.
- Nút có đủ 8 trạng thái: default · hover · focus · active · disabled · loading · error · success.

## Nav & footer
- Nav: **N5 Floating pill** (`.nav-pill`), sticky, nhãn "Lá số · Hợp tuổi · Kiến thức · Cổ thư" (vừa một dòng ở 320px), trang đang xem có `aria-current="page"` màu vàng.
- Footer: **Ft5 Statement** — "Lá số là tấm bản đồ, không phải bản án." + miễn trừ trách nhiệm + Quyền riêng tư / Điều khoản.

## Per-page allowances
- Chỉ trang vào được có minh họa: Bắc Đẩu thất tinh (Tier-B SVG, `components/BacDauStars.tsx`) — tọa độ chiếu từ xích kinh/xích vĩ thật, nhãn là tên sao Tử Vi tương ứng.
- Trang công cụ, mục lục, bài đọc: không minh họa.
- Không eyebrow/nhãn chương trang trí. Số chương chỉ dùng ở mục lục sách (nội dung thật sự có thứ tự).
- Lưới lá số 4×4 giữ nguyên hình học truyền thống.

## What pages MUST share
Tên "Tử Vi" + chấm vàng ở nav · màu nhấn vàng cổ và vị trí của nó (≤ 5% khung nhìn) · Cormorant Garamond + Be Vietnam Pro · hình dạng nút · `.panel`/`.form-card` (paper-2, viền rule, bo `--radius-card`).

## What pages MAY differ on
Cấu trúc trong họ của loại trang (bảng trên). Không đổi theme hay màu nhấn để "cho khác".

## Exports

### tokens.css
Xem `tokens.css` ở gốc dự án (nguồn duy nhất). `app/globals.css` chỉ giữ bí danh tên cũ (`--bg-0`, `--tx-1`, `--ac`, `--t-*`…) trỏ về token mới cho các component cũ.

### Tailwind
`tailwind.config.ts` → `theme.extend.colors` trỏ `var(--color-*)`; `fontFamily.sans` = `var(--font-body)`, `fontFamily.display` = `var(--font-display)`.
