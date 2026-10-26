'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Palace, ZiweiChart } from '@/lib/ziwei/types';
import { BRANCHES, tamPhuongTuChinh } from '@/lib/ziwei/constants';
import { CUNG_Y_NGHIA, luanGiaiCung } from '@/lib/ziwei/vn-luan-giai';
import { STAR_TO_SLUG, CUNG_TO_SLUG } from '@/lib/seo/knowledge';
import { vi } from '@/lib/ziwei/vi';

interface CungDialogProps {
  chart: ZiweiChart;
  /** Cung đang mở; null = đóng */
  palace: Palace | null;
  onClose: () => void;
}

/** Popup luận giải một cung. <dialog> gốc của trình duyệt lo phím Esc, khóa nền và trả focus. */
export default function CungDialog({ chart, palace, onClose }: CungDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (palace && !d?.open) d?.showModal();
    if (!palace && d?.open) d.close();
  }, [palace]);

  const lg = palace ? luanGiaiCung(palace, chart, true) : null;
  const tenCung = (b: number) => {
    const p = chart.palaces.find(x => x.branch === b);
    return `${p ? vi(p.name) : ''} (${vi(BRANCHES[b])})`;
  };
  const chinhTinh = palace?.stars.filter(s => s.type === 'major' && STAR_TO_SLUG[s.name]) ?? [];

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="cung-dialog-title"
      onClose={onClose}
      // bấm ra vùng tối bên ngoài thì đóng
      onClick={e => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
    >
      {palace && lg && (
        <div className="sheet__body">
          <header className="sheet__head">
            <h2 id="cung-dialog-title">
              Cung {vi(palace.name)}
              {palace.isShenGong && <span className="reading__than"> · Thân cư</span>}
            </h2>
            <button type="button" className="sheet__close" aria-label="Đóng" onClick={() => ref.current?.close()}>×</button>
          </header>
          <p className="sheet__meta num">
            Ô {vi(BRANCHES[palace.branch])} · nói về {CUNG_Y_NGHIA[palace.name]}
            {palace.daXianAge && <> · cầm đại hạn {palace.daXianAge[0]}–{palace.daXianAge[1]} tuổi</>}
          </p>
          <p className="sheet__meta">
            Tam phương tứ chính: {tamPhuongTuChinh(palace.branch).map(tenCung).join(', ')}
          </p>
          <div className="sheet__text">
            {lg.doan.map((t, i) => <p key={i}>{t}</p>)}
          </div>
          {chinhTinh.length > 0 && CUNG_TO_SLUG[palace.name] && (
            <p className="sheet__meta">
              Đọc thêm:{' '}
              {chinhTinh.map((s, i) => (
                <span key={s.name}>
                  {i > 0 && ', '}
                  <Link href={`/knowledge/${STAR_TO_SLUG[s.name]}/${CUNG_TO_SLUG[palace.name]}`}>{vi(s.name)} ở cung {vi(palace.name)}</Link>
                </span>
              ))}
            </p>
          )}
        </div>
      )}
    </dialog>
  );
}
