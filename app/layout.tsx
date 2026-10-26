import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Be_Vietnam_Pro } from 'next/font/google';
import '../tokens.css';
import './globals.css';
import './ui.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SiteNav, SiteFooter } from '@/components/SiteNav';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE_URL } from '@/lib/site';

// Hai font đều có subset tiếng Việt; tiêu đề dùng kiểu đứng (không nghiêng)
const display = Cormorant_Garamond({ subsets: ['vietnamese', 'latin'], weight: ['500', '600'], variable: '--font-cormorant', display: 'swap' });
const body = Be_Vietnam_Pro({ subsets: ['vietnamese', 'latin'], weight: ['300', '400', '500', '600'], variable: '--font-be-vietnam', display: 'swap' });

// themeColor = --color-paper đổi sang sRGB (thẻ meta không đọc được biến CSS)
export const viewport: Viewport = { themeColor: '#080811', colorScheme: 'dark' };

export const metadata: Metadata = {
  title: 'Tử Vi Đẩu Số · Lập lá số theo âm lịch Việt Nam',
  description: 'Lập lá số Tử Vi miễn phí theo âm lịch Việt Nam (UTC+7), có quy đổi giờ sinh theo nơi sinh và luận giải 12 cung bằng tiếng Việt.',
  keywords: 'tử vi, lá số tử vi, tử vi đẩu số, lập lá số, âm lịch, xem tử vi',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tử Vi Đẩu Số · Lập lá số theo âm lịch Việt Nam',
    description: 'Lập lá số Tử Vi theo âm lịch Việt Nam, luận giải 12 cung bằng tiếng Việt.',
    url: SITE_URL,
    siteName: 'Tử Vi Đẩu Số',
    locale: 'vi_VN',
    type: 'website',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" data-theme="dark" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>
          <SiteNav />
          {children}
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
