'use client';
import type { Palace } from '@/lib/ziwei/types';
import { STEMS, BRANCHES } from '@/lib/ziwei/constants';
import { vi } from '@/lib/ziwei/vi';
import clsx from 'clsx';

interface PalaceCellProps {
  palace: Palace;
  onClick?: () => void;
  isSelected?: boolean;
  isSanFang?: boolean;
  /** Thứ tự hiện dần khi tải trang */
  index?: number;
  /** Vị trí trên lưới 4×4 */
  gridArea: [number, number];
  /** Tứ Hóa chồng lớp: tên sao → loại hóa ('禄'/'权'/'科'/'忌') */
  overlayStarSiHua?: Record<string, string>;
  /** Nhãn chồng lớp: 'LN' (lưu niên) hoặc 'ĐH' (đại hạn) */
  overlayLabel?: string;
}

const HOA_CLASS: Record<string, string> = { '禄': 'hoa--loc', '权': 'hoa--quyen', '科': 'hoa--khoa', '忌': 'hoa--ky' };

export function Hoa({ siHua, label }: { siHua: string; label?: string }) {
  return (
    <span className={clsx('hoa', HOA_CLASS[siHua], label && 'hoa--overlay')}>
      {label && <span className="hoa__src">{label}·</span>}
      {vi(siHua)}
    </span>
  );
}

export default function PalaceCell({
  palace, onClick, isSelected, isSanFang, index = 0, gridArea, overlayStarSiHua, overlayLabel,
}: PalaceCellProps) {
  const { branch, stem, name, stars, daXianAge, isCurrentDaXian, isMingGong, isShenGong } = palace;
  const majorStars = stars.filter(s => s.type === 'major');
  const minorStars = stars.filter(s => s.type === 'lucky' || s.type === 'sha');

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={!!isSelected}
      className={clsx(
        'palace reveal',
        isMingGong && 'palace--menh',
        isCurrentDaXian && 'palace--current',
        isSanFang && 'palace--sanfang',
        isSelected && 'palace--selected',
      )}
      style={{ gridRow: gridArea[0], gridColumn: gridArea[1], '--i': index } as React.CSSProperties}
    >
      {daXianAge && <span className="palace__age num">{daXianAge[0]}–{daXianAge[1]}{isCurrentDaXian && <span className="sr-only"> tuổi, đại hạn hiện tại</span>}</span>}
      <span className="palace__name">
        <span className="sr-only">Cung </span>{vi(name)}
        {isShenGong && <span className="palace__tag palace__tag--than">Thân</span>}
      </span>
      <span className="palace__ganzhi">{vi(STEMS[stem])} {vi(BRANCHES[branch])}</span>

      <span className="palace__majors">
        {majorStars.length === 0 && <span className="palace__empty">Vô chính diệu</span>}
        {majorStars.map(star => {
          const overlay = overlayStarSiHua?.[star.name];
          return (
            <span
              key={star.name}
              className={clsx('star star--major', star.brightness === 'bright' && 'star--bright', star.brightness === 'dim' && 'star--dim')}
            >
              {vi(star.name)}
              {star.brightnessRaw && <span className="sr-only">({vi(star.brightnessRaw)})</span>}
              {star.siHua && <Hoa siHua={star.siHua} />}
              {overlay && <Hoa siHua={overlay} label={overlayLabel} />}
            </span>
          );
        })}
      </span>

      {minorStars.length > 0 && (
        <span className="palace__minors">
          {minorStars.map(s => {
            const overlay = overlayStarSiHua?.[s.name];
            return (
              <span key={s.name} className={clsx('star star--minor', s.type === 'lucky' ? 'star--cat' : 'star--sat')}>
                {vi(s.name)}
                {s.siHua && <Hoa siHua={s.siHua} />}
                {overlay && <Hoa siHua={overlay} label={overlayLabel} />}
              </span>
            );
          })}
        </span>
      )}
    </button>
  );
}
