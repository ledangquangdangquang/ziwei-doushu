import { NGUON_METIS, tachCanCu, type TrichDan } from '@/lib/ziwei/metis';

/** Căn cứ trên lá số: in đậm phần "tiêu đề" trước dấu " — " */
export function CanCuList({ ds }: { ds: string[] }) {
  return (
    <ul>
      {ds.map(s => {
        const t = tachCanCu(s);
        return <li key={s}>{t ? <><strong>{t[0]}</strong> — {t[1]}</> : s}</li>;
      })}
    </ul>
  );
}

/** Xuất xứ kinh điển: bản dịch, nguồn, kèm nguyên văn chữ Hán để đối chiếu */
export function XuatXuList({ ds }: { ds: TrichDan[] }) {
  return (
    <ul className="trich">
      {ds.map(t => (
        <li key={t.nguon + t.dich}>
          <p>“{t.dich}”</p>
          <p className="trich__nguon">
            {t.nguon}
            {t.goc && <span lang="zh" className="trich__goc">{t.goc}</span>}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** Ghi nguồn bắt buộc theo giấy phép CC BY 4.0 của bộ dữ liệu */
export function NguonMetis() {
  return (
    <p className="aside">
      Phần luận dịch và lược từ {NGUON_METIS.ten}, tác giả {NGUON_METIS.tacGia},{' '}
      <a href={NGUON_METIS.url} rel="noopener">{NGUON_METIS.url.replace('https://', '')}</a>, giấy phép CC BY 4.0.
      Lời trích thầy Nghê Hải Hạ theo giấy phép CC BY-NC-SA 4.0, chỉ dùng phi thương mại.
    </p>
  );
}
