'use client';
import { STEMS, SI_HUA_TABLE } from '@/lib/ziwei/constants';
import type { ZiweiChart } from '@/lib/ziwei/types';
import { vi } from '@/lib/ziwei/vi';
import { Hoa } from './PalaceCell';

export type TimeView = 'mingpan' | 'daxian' | 'liunian';

interface TimeNavProps {
  chart: ZiweiChart;
  view: TimeView;
  liunianYear: number;
  onViewChange: (view: TimeView) => void;
  onYearChange: (year: number) => void;
}

/** Can của năm dương lịch (0-9) */
export function getYearStemIndex(year: number): number {
  return ((year - 4) % 10 + 10) % 10;
}

/** Tứ Hóa theo can: tên sao → loại hóa */
export function buildSiHuaOverlay(stemIndex: number): Record<string, string> {
  const stars = SI_HUA_TABLE[stemIndex];
  if (!stars) return {};
  return {
    [stars[0]]: '禄',
    [stars[1]]: '权',
    [stars[2]]: '科',
    [stars[3]]: '忌',
  };
}

export default function TimeNav({ chart, view, liunianYear, onViewChange, onYearChange }: TimeNavProps) {
  const currentDx = chart.daXians[chart.currentDaXianIndex];

  // Tứ Hóa chồng lớp đang xem
  const stemIndex = view === 'daxian' && currentDx
    ? chart.palaces.find(p => p.branch === currentDx.palaceBranch)?.stem
    : view === 'liunian' ? getYearStemIndex(liunianYear) : undefined;
  const overlay = stemIndex !== undefined ? buildSiHuaOverlay(stemIndex) : null;

  const stepYear = (delta: number) => { onYearChange(liunianYear + delta); if (view !== 'liunian') onViewChange('liunian'); };

  return (
    <div className="timenav">
      <div className="timenav__tabs" role="group" aria-label="Chế độ xem lá số">
        <button type="button" className="timenav__tab" aria-pressed={view === 'mingpan'} onClick={() => onViewChange('mingpan')}>
          Bản mệnh
        </button>
        <button type="button" className="timenav__tab num" aria-pressed={view === 'daxian'} onClick={() => onViewChange('daxian')}>
          {currentDx ? `Đại hạn ${currentDx.startAge}–${currentDx.endAge}` : 'Đại hạn'}
        </button>
        <div className="timenav__tab num" data-active={view === 'liunian'}>
          <button type="button" className="timenav__step" aria-label="Năm trước" onClick={() => stepYear(-1)}>‹</button>
          <button type="button" className="timenav__step timenav__step--year" onClick={() => onViewChange('liunian')} aria-pressed={view === 'liunian'} aria-label={`Lưu niên ${liunianYear}`}>
            {liunianYear}
          </button>
          <button type="button" className="timenav__step" aria-label="Năm sau" onClick={() => stepYear(1)}>›</button>
        </div>
      </div>

      {overlay && stemIndex !== undefined && (
        <p className="timenav__overlay" aria-live="polite">
          <span>{view === 'daxian' ? 'Đại hạn' : `Lưu niên ${liunianYear}`} · can {vi(STEMS[stemIndex])}:</span>
          {(['禄', '权', '科', '忌'] as const).map(sh => {
            const sao = Object.keys(overlay).find(k => overlay[k] === sh);
            return sao ? <span key={sh}>{vi(sao)} <Hoa siHua={sh} /></span> : null;
          })}
        </p>
      )}
    </div>
  );
}
