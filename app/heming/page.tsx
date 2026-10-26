'use client';
import { useState } from 'react';
import BirthForm, { type BirthFormState } from '@/components/BirthForm';
import { formToBirthInfo } from '@/lib/ziwei/share';
import { generateChart } from '@/lib/ziwei/algorithm';
import type { ZiweiChart } from '@/lib/ziwei/types';
import { xemHopTuoi, type DiemXet } from '@/lib/ziwei/vn-hop-tuoi';
import { luanGiaiCung } from '@/lib/ziwei/vn-luan-giai';

/**
 * /heming — xem hợp tuổi hai người, phân tích theo quy tắc (lib/ziwei/vn-hop-tuoi.ts), không dùng AI.
 */

interface KetQua {
  a: ZiweiChart;
  b: ZiweiChart;
  tenA: string;
  tenB: string;
  diem: DiemXet[];
}

const NHOM: { loai: DiemXet['loai']; tieuDe: string }[] = [
  { loai: 'tot', tieuDe: 'Điểm thuận' },
  { loai: 'xau', tieuDe: 'Cần lưu ý' },
  { loai: 'binh', tieuDe: 'Trung tính' },
];

const isFormReady = (f: BirthFormState | null): f is BirthFormState =>
  !!(f && f.year && f.month && f.day && f.gender);

export default function HemingPage() {
  const [formA, setFormA] = useState<BirthFormState | null>(null);
  const [formB, setFormB] = useState<BirthFormState | null>(null);
  const [ketQua, setKetQua] = useState<KetQua | null>(null);
  const [loi, setLoi] = useState<string | null>(null);

  const xem = () => {
    setLoi(null);
    if (!isFormReady(formA) || !isFormReady(formB)) {
      setLoi('Hãy điền đủ ngày, tháng, năm sinh của cả hai người.');
      return;
    }
    try {
      const a = generateChart(formToBirthInfo(formA));
      const b = generateChart(formToBirthInfo(formB));
      const tenA = formA.name.trim() || 'Người thứ nhất';
      const tenB = formB.name.trim() || 'Người thứ hai';
      setKetQua({ a, b, tenA, tenB, diem: xemHopTuoi(a, b, tenA, tenB) });
    } catch {
      // generateChart báo lỗi khi ngày không tồn tại (vd. 30/2)
      setLoi('Ngày sinh không hợp lệ, hãy kiểm tra lại.');
    }
  };

  const dem = (loai: DiemXet['loai']) => ketQua?.diem.filter(d => d.loai === loai).length ?? 0;

  return (
    <main className="page page--wide">
      <div className="bench-head">
        <h1>Xem hợp tuổi</h1>
      </div>
      <p className="hero__lede" style={{ marginBottom: 'var(--space-xl)', maxWidth: '60ch' }}>
        Nhập ngày giờ sinh của hai người. Hệ thống so mệnh nạp âm, thiên can, địa chi năm sinh,
        rồi đối chiếu cung Phu Thê, cung Mệnh và Tứ Hóa trên hai lá số Tử Vi.
      </p>

      <div className="duo">
        <div>
          <p className="duo__label">Người thứ nhất</p>
          <BirthForm hideSubmit onSubmit={() => {}} onFormSave={setFormA} />
        </div>
        <div>
          <p className="duo__label">Người thứ hai</p>
          <BirthForm hideSubmit onSubmit={() => {}} onFormSave={setFormB} initialData={{ gender: 'female' }} />
        </div>
      </div>

      <div style={{ margin: 'var(--space-xl) 0', display: 'grid', justifyItems: 'start', gap: 'var(--space-sm)' }}>
        <button type="button" className="btn btn--primary" onClick={xem}>Xem hợp tuổi</button>
        {loi && <p role="alert" className="field__error">{loi}</p>}
      </div>

      {ketQua && (
        <section className="verdict" aria-live="polite">
          <div className="panel">
            <div>
              <h2>{ketQua.tenA} & {ketQua.tenB}</h2>
              <p className="verdict__count num">
                {dem('tot')} điểm thuận · {dem('xau')} điểm cần lưu ý · {dem('binh')} điểm trung tính
              </p>
            </div>
            {NHOM.map(({ loai, tieuDe }) => {
              const ds = ketQua.diem.filter(d => d.loai === loai);
              if (!ds.length) return null;
              return (
                <div key={loai} className={`verdict__group verdict__group--${loai}`}>
                  <h3>{tieuDe}</h3>
                  <ul>
                    {ds.map((d, i) => (
                      <li key={i}><span className="verdict__tag">[{d.nhom}]</span>{d.noiDung}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="duo">
            {([[ketQua.a, ketQua.tenA], [ketQua.b, ketQua.tenB]] as const).map(([c, ten]) => {
              const phuThe = c.palaces.find(p => p.name === '夫妻');
              if (!phuThe) return null;
              const lg = luanGiaiCung(phuThe, c);
              return (
                <div key={ten} className="reading__cung">
                  <h3>Cung Phu Thê của {ten}</h3>
                  {lg.doan.map((t, i) => <p key={i}>{t}</p>)}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
