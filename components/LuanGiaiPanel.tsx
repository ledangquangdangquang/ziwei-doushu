'use client';
import Link from 'next/link';
import type { ZiweiChart, Palace } from '@/lib/ziwei/types';
import { STEMS, BRANCHES, SHICHEN } from '@/lib/ziwei/constants';
import { CUNG, luanGiaiCung, tongQuan, vanHan, type LuanGiai } from '@/lib/ziwei/vn-luan-giai';
import { vi } from '@/lib/ziwei/vi';
import { NguonMetis } from './BaiLuan';

interface LuanGiaiPanelProps {
  chart: ZiweiChart;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Các mục luận giải cùng một kiểu trình bày: tiêu đề nhỏ + đoạn văn */
function Muc({ ds }: { ds: LuanGiai[] }) {
  return ds.map(lg => (
    <section key={lg.tieuDe} className="reading__cung">
      <h3>{lg.tieuDe}</h3>
      {lg.doan.map((t, i) => <p key={i}>{t}</p>)}
    </section>
  ));
}

/** Thông tin lá số, tóm tắt, vận hạn và luận giải 12 cung (văn bản soạn sẵn). */
export default function LuanGiaiPanel({ chart }: LuanGiaiPanelProps) {
  const { birthInfo: b, lunarInfo: l } = chart;
  const o = b.origInput;
  const palaces = CUNG.map(name => chart.palaces.find(p => p.name === name)).filter((p): p is Palace => !!p);
  const info: [string, string][] = [
    ['Dương lịch', o ? `${o.day}/${o.month}/${o.year} lúc ${pad(o.clockHour)}:${pad(o.clockMinute)}` : `${b.day}/${b.month}/${b.year}`],
    ['Âm lịch', `ngày ${l.lunarDay} tháng ${l.lunarMonth}${l.isLeapMonth ? ' nhuận' : ''} năm ${vi(STEMS[l.yearStem])} ${vi(BRANCHES[l.yearBranch])}`],
    ['Giờ sinh', `giờ ${vi(BRANCHES[b.hour])} (${SHICHEN[b.hour].range})`],
    ['Nơi sinh', b.province ?? 'không rõ'],
    ['Âm dương', `${l.yearStem % 2 === 0 ? 'Dương' : 'Âm'} ${b.gender === 'male' ? 'Nam' : 'Nữ'}`],
    ['Cục', vi(chart.wuxingJuName)],
    ['Mệnh chủ · Thân chủ', `${vi(chart.mingZhu ?? '')} · ${vi(chart.shenZhu ?? '')}`],
    ['Tuổi (tuổi mụ)', String(chart.currentAge)],
  ];

  return (
    <aside className="panel" aria-label="Thông tin và luận giải lá số">
      <section>
        <h2>Thông tin lá số</h2>
        <dl className="facts num">
          {info.map(([k, v]) => (
            <div key={k} className="contents">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {b.calendarFallback && (
        <p className="notice" role="note">
          <b>Lưu ý:</b> ngày này là ngày 30 âm lịch Việt Nam nhưng lịch Trung Quốc (mà engine dùng) chỉ có 29 ngày,
          nên lá số đang tính theo ngày 29. Kết quả có thể lệch so với lá số tính theo lịch Việt.
        </p>
      )}

      <section className="reading">
        <h2>Tóm tắt</h2>
        <p className="reading__hint">Đọc từ cung chính và tam phương tứ chính của nó. Chưa biết các từ này? Xem <Link href="/knowledge/nhap-mon">Nhập môn</Link>.</p>
        <Muc ds={tongQuan(chart)} />
      </section>

      <section className="reading">
        <h2>Vận hạn</h2>
        <Muc ds={vanHan(chart, new Date().getFullYear())} />
      </section>

      <section className="reading">
        <h2>Luận giải 12 cung</h2>
        <p className="reading__hint">Bấm vào một cung trên lá số để xem nhanh trong cửa sổ nổi.</p>
        {palaces.map(p => {
          const lg = luanGiaiCung(p, chart);
          return (
            <section key={p.name} className="reading__cung">
              <h3>
                {lg.tieuDe}
                {p.isShenGong && <span className="reading__than"> · Thân cư</span>}
              </h3>
              {lg.doan.map((t, i) => <p key={i}>{t}</p>)}
            </section>
          );
        })}
      </section>
      <NguonMetis />
    </aside>
  );
}
