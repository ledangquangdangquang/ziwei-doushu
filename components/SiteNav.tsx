'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// N5 · Viên thuốc nổi — nhãn ngắn để cả hàng vừa một dòng ở 320px
const LINKS = [
  { href: '/chart', label: 'Lá số' },
  { href: '/heming', label: 'Hợp tuổi' },
  { href: '/knowledge', label: 'Kiến thức' },
  { href: '/library', label: 'Cổ thư' },
];

export function SiteNav() {
  const path = usePathname() ?? '';
  return (
    <div className="nav-wrap">
      <nav className="nav-pill" aria-label="Menu chính">
        <Link href="/chart" className="nav-pill__brand">Tử Vi</Link>
        {LINKS.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className="nav-pill__link"
            aria-current={path === l.href || path.startsWith(`${l.href}/`) ? 'page' : undefined}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

// Ft5 · Câu khép trang
export function SiteFooter() {
  return (
    <footer className="foot-stmt">
      <p className="foot-stmt__line">Lá số là tấm bản đồ, không phải bản án.</p>
      <div className="foot-stmt__meta">
        <p>Nội dung mang tính tham khảo, chiêm nghiệm văn hóa truyền thống; không thay thế tư vấn y tế, pháp lý hay tài chính.</p>
        <div className="foot-stmt__links">
          <Link href="/privacy">Quyền riêng tư</Link>
          <Link href="/terms">Điều khoản</Link>
        </div>
      </div>
    </footer>
  );
}
