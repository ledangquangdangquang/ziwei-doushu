'use client';
import { useState } from 'react';
import type { ZiweiChart, Palace } from '@/lib/ziwei/types';
import { BRANCHES, STEMS, tamPhuongTuChinh } from '@/lib/ziwei/constants';
import { vi } from '@/lib/ziwei/vi';
import PalaceCell, { Hoa } from './PalaceCell';
import TimeNav, { type TimeView, getYearStemIndex, buildSiHuaOverlay } from './TimeNav';

interface ChartBoardProps {
  chart: ZiweiChart;
  onPalaceSelect?: (palace: Palace) => void;
}

const BRANCH_GRID_POS: Record<number, [number, number]> = {
  5: [1, 1], 6: [1, 2], 7: [1, 3], 8: [1, 4],
  4: [2, 1], 9: [2, 4],
  3: [3, 1], 10: [3, 4],
  2: [4, 1], 1: [4, 2], 0: [4, 3], 11: [4, 4],
};

// Tọa độ tâm mỗi cung trên lưới (phần trăm)
const BRANCH_SVG_POS: Record<number, [number, number]> = {
  5: [12.5, 12.5], 6: [37.5, 12.5], 7: [62.5, 12.5], 8: [87.5, 12.5],
  4: [12.5, 37.5],                                      9: [87.5, 37.5],
  3: [12.5, 62.5],                                     10: [87.5, 62.5],
  2: [12.5, 87.5], 1: [37.5, 87.5], 0: [62.5, 87.5], 11: [87.5, 87.5],
};

const ANIMATION_ORDER = [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4];

export default function ChartBoard({ chart, onPalaceSelect }: ChartBoardProps) {
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [timeView, setTimeView] = useState<TimeView>('mingpan');
  const [liunianYear, setLiunianYear] = useState<number>(new Date().getFullYear());

  const palaceMap: Record<number, Palace> = {};
  chart.palaces.forEach(p => { palaceMap[p.branch] = p; });

  // Tứ Hóa chồng lớp của đại hạn hoặc lưu niên đang xem
  const currentDx = chart.daXians[chart.currentDaXianIndex];
  const overlayData: Record<string, string> = (() => {
    if (timeView === 'daxian' && currentDx) {
      const dxPalace = chart.palaces.find(p => p.branch === currentDx.palaceBranch);
      if (dxPalace) return buildSiHuaOverlay(dxPalace.stem);
    }
    if (timeView === 'liunian') return buildSiHuaOverlay(getYearStemIndex(liunianYear));
    return {};
  })();
  const overlayLabel = timeView === 'daxian' ? 'ĐH' : timeView === 'liunian' ? 'LN' : undefined;

  const handlePalaceClick = (branch: number) => {
    setSelectedBranch(branch);
    if (palaceMap[branch]) onPalaceSelect?.(palaceMap[branch]);
  };

  const sanFang = selectedBranch !== null ? tamPhuongTuChinh(selectedBranch) : null;
  const sanFangSet = sanFang ? new Set(sanFang) : null;
  const { lunarInfo: l } = chart;

  return (
    <div>
      <TimeNav chart={chart} view={timeView} liunianYear={liunianYear} onViewChange={setTimeView} onYearChange={setLiunianYear} />

      <div className="board">
        {ANIMATION_ORDER.map((branch, i) => {
          const palace = palaceMap[branch];
          if (!palace) return null;
          return (
            <PalaceCell
              key={branch}
              palace={palace}
              gridArea={BRANCH_GRID_POS[branch]}
              index={i * 0.4}
              onClick={() => handlePalaceClick(branch)}
              isSelected={selectedBranch === branch}
              isSanFang={!!(sanFangSet?.has(branch) && selectedBranch !== branch)}
              overlayStarSiHua={Object.keys(overlayData).length > 0 ? overlayData : undefined}
              overlayLabel={overlayLabel}
            />
          );
        })}

        {/* Thiên bàn (ô giữa) */}
        <div className="board__center">
          <h3>{chart.birthInfo.name || 'Thiên bàn'}</h3>
          <p className="board__facts">
            <span>Mệnh <b>{vi(BRANCHES[chart.mingGongBranch])}</b> · Thân <b>{vi(BRANCHES[chart.shenGongBranch])}</b></span>
            <span>{vi(chart.wuxingJuName)}</span>
            <span className="num">Âm lịch {l.lunarDay}/{l.lunarMonth}{l.isLeapMonth ? ' nhuận' : ''} · năm {vi(STEMS[l.yearStem])} {vi(BRANCHES[l.yearBranch])}</span>
          </p>
          {currentDx && (
            <p className="board__dx num">
              Đại hạn hiện tại
              <strong>{currentDx.startAge}–{currentDx.endAge} tuổi</strong>
              Cung {vi(currentDx.palaceName)}
            </p>
          )}
        </div>

        {/* Đường nối tam phương tứ chính */}
        {sanFang && (
          <svg className="board__lines" width="100%" height="100%" aria-hidden="true">
            {(() => {
              const [p0, p1, p2, p3] = sanFang.map(b => BRANCH_SVG_POS[b]);
              const seg = (a: [number, number], b: [number, number], k: string) => (
                <line key={k} x1={`${a[0]}%`} y1={`${a[1]}%`} x2={`${b[0]}%`} y2={`${b[1]}%`} />
              );
              return (
                <>
                  {seg(p0, p1, 'xung')}
                  {seg(p0, p2, 'a')}
                  {seg(p2, p3, 'b')}
                  {seg(p3, p0, 'c')}
                  {[p0, p1, p2, p3].map((p, i) => <circle key={i} cx={`${p[0]}%`} cy={`${p[1]}%`} r={i === 0 ? 4 : 3} />)}
                </>
              );
            })()}
          </svg>
        )}
      </div>

      <p className="legend">
        <Hoa siHua="禄" /> <Hoa siHua="权" /> <Hoa siHua="科" /> <Hoa siHua="忌" />
        <span>Bấm vào một cung để xem luận giải và tam phương tứ chính</span>
      </p>
    </div>
  );
}
