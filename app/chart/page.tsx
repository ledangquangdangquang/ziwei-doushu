'use client';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import BirthForm, { type BirthFormState } from '@/components/BirthForm';
import BacDauStars from '@/components/BacDauStars';
import ChartBoard from '@/components/ChartBoard';
import { generateChart } from '@/lib/ziwei/algorithm';
import { useHistory } from '@/lib/ziwei/history';
import { formToBirthInfo } from '@/lib/ziwei/share';
import type { BirthInfo, ZiweiChart, Palace } from '@/lib/ziwei/types';

// Hai khối này mang toàn bộ bài luận (~1,1 MB); chỉ tải khi đã lập lá số
const LuanGiaiPanel = dynamic(() => import('@/components/LuanGiaiPanel'));
const CungDialog = dynamic(() => import('@/components/CungDialog'));

/**
 * /chart — Split Studio (form) → Workbench (lá số + luận giải). Xem design.md.
 * BirthForm quy đổi giờ/lịch Việt Nam (lib/ziwei/vn-calendar.ts) → generateChart().
 */
export default function ChartPage() {
  const [chart, setChart] = useState<ZiweiChart | null>(null);
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);
  const { history, save, remove } = useHistory();
  // BirthForm chỉ trả BirthInfo khi gửi; giữ bản form mới nhất để lưu vào lịch sử
  const formRef = useRef<BirthFormState | null>(null);

  const show = (info: BirthInfo) => { setChart(generateChart(info)); window.scrollTo({ top: 0 }); };

  if (!chart) {
    return (
      <main className="page">
        <div className="hero-split">
          <div className="hero-split__text">
            <h1 className="hero__title reveal">Lá số Tử Vi theo lịch Việt.</h1>
            <p className="hero__lede reveal" style={{ '--i': 1 } as React.CSSProperties}>
              Nhập ngày giờ sinh dương lịch. Lá số được đổi sang âm lịch Việt Nam, quy giờ theo nơi sinh,
              rồi luận giải đủ mười hai cung.
            </p>
          </div>
          <div className="hero-split__form">
            <BirthForm
              onFormSave={f => { formRef.current = f; }}
              onSubmit={(info: BirthInfo) => { if (formRef.current) save(formRef.current); show(info); }}
            />
          </div>
          <div className="hero-split__art">
            <BacDauStars />
          </div>
        </div>

        {history.length > 0 && (
          <section className="history" aria-labelledby="history-title">
            <h2 id="history-title">Lá số đã xem</h2>
            <p className="history__note">Chỉ lưu trên trình duyệt này, không gửi đi đâu.</p>
            <ul>
              {history.map(e => (
                <li key={e.id} className="history__row">
                  <button type="button" className="history__open" onClick={() => { save(e.form); show(formToBirthInfo(e.form)); }}>
                    <b>{e.form.name || 'Không tên'}</b>
                    <span className="num">{e.label}</span>
                  </button>
                  <button type="button" className="history__del" aria-label={`Xóa ${e.form.name || e.label}`} onClick={() => remove(e.id)}>Xóa</button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    );
  }

  return (
    <main className="page page--wide">
      <div className="bench-head">
        <h1>{chart.birthInfo.name ? `Lá số của ${chart.birthInfo.name}` : 'Lá số của bạn'}</h1>
        <button
          type="button"
          className="btn btn--ghost bench-head__chip"
          onClick={() => { setChart(null); setSelectedPalace(null); }}
        >
          ← Lập lá số khác
        </button>
      </div>

      <div className="workbench">
        <ChartBoard chart={chart} onPalaceSelect={setSelectedPalace} />
        <LuanGiaiPanel chart={chart} />
      </div>
      <CungDialog chart={chart} palace={selectedPalace} onClose={() => setSelectedPalace(null)} />
    </main>
  );
}
