'use client';
import { useState, useMemo, useEffect, useId } from 'react';
import type { BirthInfo } from '@/lib/ziwei/types';
import { SHICHEN, BRANCHES } from '@/lib/ziwei/constants';
import { VN_PROVINCES } from '@/lib/ziwei/vn-provinces';
import { vnBirthToChartInput, vnClockUtcOffset } from '@/lib/ziwei/vn-calendar';
import { branchFromSolarMinutes } from '@/lib/ziwei/true-solar-time';
import { vi } from '@/lib/ziwei/vi';

export interface BirthFormState {
  name: string;
  year: string;
  month: string;
  day: string;
  clockHour: string;
  clockMinute: string;
  unknownTime: boolean;
  province: string;
  city: string;
  longitude: number;
  gender: 'male' | 'female';
}

interface BirthFormProps {
  onSubmit: (info: BirthInfo) => void;
  loading?: boolean;
  initialData?: Partial<BirthFormState>;
  onFormSave?: (data: BirthFormState) => void;
  /** Ẩn nút「Lập lá số」(trang hợp hôn tự gọi) */
  hideSubmit?: boolean;
}

const SHICHEN_NAMES = BRANCHES.map(vi);
const CURRENT_YEAR = new Date().getFullYear();
const pad = (n: number) => String(Math.floor(n)).padStart(2, '0');

/** Kiểm tra ngày có tồn tại */
function isValidDate(y: number, m: number, d: number): boolean {
  if (!y || !m || !d) return false;
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

export default function BirthForm({ onSubmit, loading, initialData, onFormSave, hideSubmit }: BirthFormProps) {
  const [form, setForm] = useState<BirthFormState>({
    name: initialData?.name ?? '',
    year: initialData?.year ?? '',
    month: initialData?.month ?? '',
    day: initialData?.day ?? '',
    clockHour: initialData?.clockHour ?? '8',
    clockMinute: initialData?.clockMinute ?? '0',
    unknownTime: initialData?.unknownTime ?? false,
    province: initialData?.province ?? '',
    city: initialData?.city ?? '',
    longitude: initialData?.longitude ?? 105,
    gender: initialData?.gender ?? 'male',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Đồng bộ trạng thái form cho trang cha (trang hợp hôn cần dữ liệu cả hai người)
  useEffect(() => {
    onFormSave?.({ ...form });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const province = VN_PROVINCES.find(p => p.name === form.province);

  // ─── Kiểm tra dữ liệu ──────────────────────────────────
  const y = parseInt(form.year) || 0;
  const m = parseInt(form.month) || 0;
  const d = parseInt(form.day) || 0;
  const clockHour = parseInt(form.clockHour) || 0;
  const clockMinute = parseInt(form.clockMinute) || 0;

  const errors = {
    year: !form.year ? 'Chọn năm sinh'
      : y < 1900 || y > CURRENT_YEAR ? `Năm từ 1900 đến ${CURRENT_YEAR}`
      : '',
    month: !form.month ? 'Chọn tháng' : '',
    day: !form.day ? 'Chọn ngày'
      : form.year && form.month && !isValidDate(y, m, d) ? `Tháng ${m} không có ngày ${d}`
      : '',
  };
  const hasError = Object.values(errors).some(Boolean);

  // Cùng một hàm cho xem trước và khi gửi → giờ hiển thị luôn khớp lá số
  const chartInput = useMemo(() => {
    if (hasError) return null;
    return vnBirthToChartInput({
      year: y, month: m, day: d, clockHour, clockMinute,
      unknownTime: form.unknownTime, gender: form.gender, name: form.name, province,
    });
  }, [hasError, y, m, d, clockHour, clockMinute, form.unknownTime, form.gender, form.name, province]);

  // chưa có ngày hợp lệ thì tạm tính canh giờ theo giờ đồng hồ
  const branch = form.unknownTime ? 0 : chartInput?.birthInfo.hour ?? branchFromSolarMinutes(clockHour * 60 + clockMinute);
  const shichenInfo = SHICHEN[branch];
  const solarMinutes = chartInput?.solarMinutes;
  const clockOffset = y ? vnClockUtcOffset(y, m || 1, d || 1, clockHour, clockMinute, !!province?.south) : 7;

  // ─── Tóm tắt: hiện khi đã điền đủ ngày sinh hợp lệ ─────
  const showSummary = !hasError;
  const summaryText = showSummary
    ? [
        `${d}/${m}/${y}`,
        form.province,
        form.unknownTime ? 'Không rõ giờ' : `Giờ ${SHICHEN_NAMES[branch]}`,
        form.gender === 'male' ? 'Nam' : 'Nữ',
      ].filter(Boolean).join(' · ')
    : '';

  const handleProvince = (prov: string) => {
    const provData = VN_PROVINCES.find(p => p.name === prov);
    setForm({ ...form, province: prov, city: '', longitude: provData?.longitude ?? 105 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setTouched({ year: true, month: true, day: true });
    if (hasError || !chartInput) return;
    onFormSave?.({ ...form });
    onSubmit(chartInput.birthInfo);
  };

  const showErr = (field: keyof typeof errors) => (touched[field] || submitAttempted) && errors[field];
  const dateError = showErr('day') || showErr('month') || showErr('year') || '';
  const uid = useId(); // hai form trên trang hợp tuổi cần id khác nhau
  const id = (k: string) => `bf${uid}${k}`;

  return (
    <form className="form-card reveal" style={{ '--i': 1 } as React.CSSProperties} onSubmit={handleSubmit} noValidate>
      <h2 className="form-card__title">Ngày giờ sinh</h2>

      <div className="field">
        <label className="field__label" htmlFor={id('name')}>Họ tên (không bắt buộc)</label>
        <input
          id={id('name')}
          className="field__input"
          type="text"
          autoComplete="name"
          placeholder="Nguyễn Văn An"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <fieldset className="field">
        <legend className="field__label">Ngày sinh (dương lịch)</legend>
        <div className="field__row field__row--date">
          <select
            aria-label="Ngày sinh"
            className="field__input num"
            value={form.day}
            aria-invalid={!!showErr('day') || undefined}
            aria-describedby={dateError ? id('date-err') : undefined}
            onChange={e => { setForm({ ...form, day: e.target.value }); setTouched(t => ({ ...t, day: true })); }}
          >
            <option value="">Ngày</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map(dy => <option key={dy} value={String(dy)}>{dy}</option>)}
          </select>
          <select
            aria-label="Tháng sinh"
            className="field__input num"
            value={form.month}
            aria-invalid={!!showErr('month') || undefined}
            aria-describedby={dateError ? id('date-err') : undefined}
            onChange={e => { setForm({ ...form, month: e.target.value }); setTouched(t => ({ ...t, month: true })); }}
          >
            <option value="">Tháng</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(mo => <option key={mo} value={String(mo)}>{mo}</option>)}
          </select>
          <select
            aria-label="Năm sinh"
            className="field__input num"
            value={form.year}
            aria-invalid={!!showErr('year') || undefined}
            aria-describedby={dateError ? id('date-err') : undefined}
            onChange={e => { setForm({ ...form, year: e.target.value }); setTouched(t => ({ ...t, year: true })); }}
          >
            <option value="">Năm</option>
            {Array.from({ length: CURRENT_YEAR - 1899 }, (_, i) => CURRENT_YEAR - i).map(yr => <option key={yr} value={String(yr)}>{yr}</option>)}
          </select>
        </div>
        {/* luôn giữ chỗ cho lỗi để form không bị đẩy xuống khi lỗi hiện */}
        <p className="field__error" id={id('date-err')} role="alert">{dateError}</p>
      </fieldset>

      <div className="field">
        <label className="field__label" htmlFor={id('prov')}>Nơi sinh</label>
        <select
          id={id('prov')}
          aria-label="Nơi sinh"
          className="field__input"
          value={form.province}
          aria-describedby={id('prov-hint')}
          onChange={e => handleProvince(e.target.value)}
        >
          <option value="">Không rõ / nước ngoài</option>
          {VN_PROVINCES.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
        </select>
        <p className="field__hint" id={id('prov-hint')}>
          {province
            ? `Kinh độ ${form.longitude.toFixed(1)}°E · đồng hồ UTC+${clockOffset}${clockOffset !== 7 ? ' — giai đoạn này miền Nam dùng giờ khác, đã quy đổi' : ''}`
            : 'Để quy về giờ mặt trời thật. Sinh ở miền Nam 1960–1975 nên chọn (đồng hồ khi đó theo UTC+8).'}
        </p>
      </div>

      <fieldset className="field" disabled={form.unknownTime}>
        <legend className="field__label">Giờ sinh (giờ đồng hồ)</legend>
        <div className="field__row field__row--2">
          <select
            aria-label="Giờ sinh"
            className="field__input num"
            value={form.clockHour}
            onChange={e => setForm({ ...form, clockHour: e.target.value })}
          >
            {Array.from({ length: 24 }, (_, i) => i).map(h => <option key={h} value={String(h)}>{h.toString().padStart(2, '0')} giờ</option>)}
          </select>
          <select
            aria-label="Phút sinh"
            className="field__input num"
            value={form.clockMinute}
            onChange={e => setForm({ ...form, clockMinute: e.target.value })}
          >
            {Array.from({ length: 60 }, (_, i) => i).map(min => <option key={min} value={String(min)}>{min.toString().padStart(2, '0')} phút</option>)}
          </select>
        </div>
      </fieldset>
      <div className="field__timeinfo">
        <p className="field__solar num" aria-live="polite">
          {form.unknownTime
            ? 'Tạm lập theo'
            : province && solarMinutes !== undefined ? `Giờ mặt trời thật ${pad(solarMinutes / 60)}:${pad(solarMinutes % 60)} →` : 'Giờ sinh →'}
          <strong>Giờ {SHICHEN_NAMES[branch]}</strong>
          {shichenInfo && <span>({shichenInfo.range})</span>}
        </p>
        <label className="check">
          <input type="checkbox" checked={form.unknownTime} onChange={e => setForm({ ...form, unknownTime: e.target.checked })} />
          Không rõ giờ sinh
        </label>
      </div>

      <fieldset className="field">
        <legend className="field__label">Giới tính</legend>
        <div className="seg">
          {(['male', 'female'] as const).map(g => (
            <label key={g} className="seg__opt">
              <input type="radio" name={id('gender')} value={g} checked={form.gender === g} onChange={() => setForm({ ...form, gender: g })} />
              <span>{g === 'male' ? 'Nam' : 'Nữ'}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {showSummary && <p className="summary num">{summaryText}</p>}

      {!hideSubmit && (
        <button
          type="submit"
          className="btn btn--primary btn--block"
          disabled={loading}
          data-state={loading ? 'loading' : undefined}
          aria-busy={loading || undefined}
        >
          {loading ? 'Đang lập lá số…' : 'Lập lá số'}
        </button>
      )}
    </form>
  );
}
