/**
 * /knowledge/nhap-mon — Nhập môn cho người chưa biết gì về Tử Vi.
 * Bảng Tứ Hóa và độ sáng lấy thẳng từ engine nên luôn khớp lá số.
 */

import { Fragment } from 'react';
import Link from 'next/link';
import { DO_SANG } from '@/lib/seo/knowledge';
import { CUNG, CUNG_Y_NGHIA } from '@/lib/ziwei/vn-luan-giai';
import { SI_HUA_TABLE, STEMS } from '@/lib/ziwei/constants';
import { vi } from '@/lib/ziwei/vi';
import { Hoa } from '@/components/PalaceCell';

export const metadata = {
  title: 'Nhập môn Tử Vi · Cách xem lá số cho người mới',
  description: 'Tử Vi cho người mới bắt đầu: lá số gồm những gì, 12 cung, chính tinh, độ sáng, Tứ Hóa, Tuần Triệt, đại hạn — và ý nghĩa 14 chính tinh ở từng cung.',
  keywords: ['tử vi', 'tử vi cho người mới', 'cách xem lá số', 'chính tinh', '14 chính tinh', '12 cung', 'tứ hóa', 'đại hạn'],
};

const MUC = [
  ['tu-vi-la-gi', 'Tử Vi là gì'],
  ['la-so', 'Lá số'],
  ['menh-than', 'Mệnh và Thân'],
  ['cuc', 'Cục'],
  ['12-cung', '12 cung'],
  ['sao', 'Chính tinh, phụ tinh'],
  ['do-sang', 'Độ sáng'],
  ['tu-hoa', 'Tứ Hóa'],
  ['tuan-triet', 'Tuần, Triệt'],
  ['tam-phuong-tu-chinh', 'Tam phương tứ chính'],
  ['van-han', 'Đại hạn, lưu niên'],
  ['cach-doc', 'Đọc lá số của bạn'],
];

const HOA = ['禄', '权', '科', '忌'];

const DO_SANG_GIAI_THICH: Record<string, string> = {
  '庙': 'mạnh nhất, mặt tốt của sao phát huy trọn vẹn',
  '旺': 'rất mạnh',
  '得': 'khá, được việc',
  '利': 'tạm được',
  '平': 'trung bình, tốt xấu tùy sao đi cùng',
  '不': 'yếu, mặt tốt khó phát huy',
  '陷': 'yếu nhất, mặt xấu của sao dễ lộ ra',
};

export default function NhapMonPage() {
  return (
    <main className="page page--read">
      <nav aria-label="Đường dẫn" className="crumbs">
        <Link href="/knowledge">Kiến thức</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Nhập môn</span>
      </nav>
      <header className="index-head">
        <h1>Nhập môn Tử Vi</h1>
        <p>
          Viết cho người chưa biết gì. Đọc hết trang này (khoảng 10 phút) là đủ để tự nhìn hiểu lá số của mình,
          rồi tra từng sao ở từng cung trong mục <Link href="/knowledge">Kiến thức</Link>.
        </p>
      </header>

      <nav aria-label="Mục lục">
        <ul className="links">
          {MUC.map(([id, ten]) => (
            <li key={id}><a className="link-chip" href={`#${id}`}>{ten}</a></li>
          ))}
        </ul>
      </nav>

      <article className="prose primer">
        <h2 id="tu-vi-la-gi">Tử Vi là gì</h2>
        <p>
          Tử Vi Đẩu Số là một môn xem số cổ của Trung Hoa, tương truyền do Trần Đoàn (Hi Di tiên sinh) đời Tống soạn ra,
          và đã được dùng ở Việt Nam từ lâu. Từ <strong>giờ, ngày, tháng, năm sinh âm lịch</strong> và <strong>giới tính</strong>,
          người ta đặt (gọi là “an”) các ngôi sao vào 12 ô. Mỗi ô nói về một mặt của cuộc sống, các sao trong ô cho biết mặt đó ra sao.
        </p>
        <p>
          Tử Vi là kinh nghiệm truyền thống, không phải khoa học đã được kiểm chứng. Nên dùng nó để hiểu mình và cân nhắc,
          không nên dựa vào đó để quyết định thay cho bản thân.
        </p>

        <h2 id="la-so">Lá số gồm những gì</h2>
        <p>
          Lá số là một khung vuông: <strong>12 ô</strong> bao quanh và <strong>một ô giữa</strong>. Mỗi ô ứng với một
          trong 12 địa chi (Tý, Sửu, Dần… Hợi), vị trí các địa chi trên khung luôn cố định. Còn <strong>tên cung</strong> (Mệnh, Phu Thê, Tài Bạch…)
          thì xoay theo từng người: cung Mệnh của người này có thể ở ô Dần, của người khác ở ô Ngọ.
        </p>
        <p>
          Ô giữa ghi thông tin chung: cung Mệnh và cung Thân nằm ở ô nào, Cục, ngày tháng âm lịch, năm sinh theo can chi, và đại hạn bạn đang đi.
        </p>
        <p>
          <strong>Giờ sinh rất quan trọng.</strong> Một ngày âm lịch có 12 giờ, mỗi giờ dài 2 tiếng: Tý (23h–1h), Sửu (1h–3h), Dần (3h–5h),
          Mão (5h–7h), Thìn (7h–9h), Tỵ (9h–11h), Ngọ (11h–13h), Mùi (13h–15h), Thân (15h–17h), Dậu (17h–19h), Tuất (19h–21h), Hợi (21h–23h).
          Sai giờ sinh là cung Mệnh lệch sang ô khác, cả lá số sẽ sai. App tính người sinh từ 23h đến trước 0h là giờ Tý của ngày hôm sau.
        </p>
        <p>
          <strong>Tuổi trên lá số là tuổi âm (tuổi mụ)</strong>: năm đang xem trừ năm sinh âm lịch, rồi cộng 1.
          Người sinh tháng 1 hoặc đầu tháng 2 dương lịch, trước Tết, thì năm sinh âm lịch là năm trước đó.
        </p>

        <h2 id="menh-than">Mệnh và Thân</h2>
        <p>
          <strong>Cung Mệnh</strong> là ô quan trọng nhất: nói về con người bạn, tính cách, tư chất và hướng đi chung của cả đời.
          Vị trí cung Mệnh được tính từ tháng sinh và giờ sinh.
        </p>
        <p>
          <strong>Cung Thân</strong> nói về con người bạn sẽ trở thành, rõ dần từ trung niên (khoảng ngoài 30 tuổi). Thân không có ô riêng,
          mà luôn nằm chung với một trong sáu cung, tùy giờ sinh: Mệnh (giờ Tý, Ngọ), Phúc Đức (Sửu, Mùi), Quan Lộc (Dần, Thân),
          Thiên Di (Mão, Dậu), Tài Bạch (Thìn, Tuất), Phu Thê (Tỵ, Hợi). Lá số ghi “Thân cư Quan Lộc” nghĩa là
          Thân nằm chung với cung Quan Lộc: về sau sự nghiệp là điều bạn đặt nặng nhất.
        </p>
        <p>
          <strong>Mệnh chủ, Thân chủ</strong> là hai sao “đại diện”, tra theo địa chi của cung Mệnh và địa chi năm sinh.
          Chúng chỉ để tham khảo thêm, người mới có thể bỏ qua.
        </p>

        <h2 id="cuc">Cục</h2>
        <p>
          Mỗi lá số thuộc một trong năm Cục: Thủy nhị cục, Mộc tam cục, Kim tứ cục, Thổ ngũ cục, Hỏa lục cục. Cục được tính từ can năm sinh
          và vị trí cung Mệnh. Con số trong tên Cục (2, 3, 4, 5, 6) là <strong>tuổi bắt đầu đại hạn đầu tiên</strong>.
          Ví dụ Kim tứ cục thì đại hạn đầu bắt đầu từ 4 tuổi.
        </p>
        <p>
          Cục khác với “mệnh Kim, mệnh Mộc…” mà mọi người hay nói theo năm sinh. Cái đó là nạp âm của năm sinh, một thứ khác.
        </p>

        <h2 id="12-cung">12 cung</h2>
        <p>Mỗi cung là một mặt của đời sống. Khi muốn biết về chuyện gì, bạn xem cung tương ứng:</p>
        <dl className="facts">
          {CUNG.map(c => (
            <Fragment key={c}>
              <dt>{vi(c)}</dt>
              <dd>{CUNG_Y_NGHIA[c]}</dd>
            </Fragment>
          ))}
        </dl>

        <h2 id="sao">Chính tinh và phụ tinh</h2>
        <p>
          <strong>Chính tinh</strong> là 14 sao chính, quyết định tính chất chủ yếu của một cung: Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc,
          Thiên Đồng, Liêm Trinh, Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương, Thất Sát, Phá Quân.
          Mỗi cung có thể có 0, 1 hoặc 2 chính tinh.
        </p>
        <p>
          <strong>Phụ tinh</strong> là các sao nhỏ hơn, làm tốt thêm hoặc xấu đi. Quan trọng nhất là hai nhóm:
        </p>
        <ul>
          <li><strong>Lục cát tinh</strong> (sáu sao tốt): Tả Phù, Hữu Bật, Văn Xương, Văn Khúc, Thiên Khôi, Thiên Việt. Chủ có người giúp, học hành, quý nhân.</li>
          <li><strong>Lục sát tinh</strong> (sáu sao xấu): Kình Dương, Đà La, Hỏa Tinh, Linh Tinh, Địa Không, Địa Kiếp. Chủ va chạm, trì trệ, hao tán.</li>
        </ul>
        <p>
          Ngoài ra còn Lộc Tồn (tiền bạc) và Thiên Mã (di chuyển). Cung không có chính tinh gọi là <strong>vô chính diệu</strong>:
          khi đó mượn chính tinh của cung đối diện để luận, nhưng sức yếu hơn.
        </p>

        <h2 id="do-sang">Độ sáng: Miếu, Vượng… Hãm</h2>
        <p>
          Cùng một sao, đứng ở ô này thì mạnh, ở ô khác thì yếu, giống cây trồng hợp đất hay không hợp đất. Mức mạnh yếu đó gọi là độ sáng,
          ghi ngay cạnh tên sao trên lá số. Có 7 bậc, từ mạnh đến yếu:
        </p>
        <dl className="facts">
          {DO_SANG.map(b => (
            <Fragment key={b}>
              <dt>{vi(b)}</dt>
              <dd>{DO_SANG_GIAI_THICH[b]}</dd>
            </Fragment>
          ))}
        </dl>
        <p>
          Độ sáng phụ thuộc <strong>ô địa chi</strong> sao đứng, không phụ thuộc tên cung. Sao tốt mà hãm thì kém hẳn; sao dữ mà sáng thì
          thành có uy, có tài. App dùng bảng độ sáng của sách <em>Tử Vi Đẩu Số Toàn Thư</em>; sách Việt có thể ghi khác ở vài ô.
        </p>

        <h2 id="tu-hoa">Tứ Hóa: Lộc, Quyền, Khoa, Kỵ</h2>
        <p>
          Tùy <strong>can</strong> của năm sinh (chữ đầu trong tên năm, như <em>Giáp</em> Tý, <em>Ất</em> Sửu), có 4 sao được “hóa”,
          tức nhận thêm một tính chất. Trên lá số, chúng là các nhãn nhỏ cạnh tên sao:
        </p>
        <ul>
          <li><Hoa siHua="禄" /> <strong>Hóa Lộc</strong>: tiền bạc, cơ hội, thuận lợi.</li>
          <li><Hoa siHua="权" /> <strong>Hóa Quyền</strong>: quyền hành, chủ động, có tiếng nói.</li>
          <li><Hoa siHua="科" /> <strong>Hóa Khoa</strong>: danh tiếng, học hành, gặp người giúp lúc khó.</li>
          <li><Hoa siHua="忌" /> <strong>Hóa Kỵ</strong>: vướng mắc, trắc trở, hay bận lòng. Đây là chỗ cần cẩn thận, không có nghĩa cung đó hỏng.</li>
        </ul>
        <p>
          Cách tìm can năm sinh nhanh: nhìn số cuối của năm sinh âm lịch. 4 là Giáp, 5 Ất, 6 Bính, 7 Đinh, 8 Mậu, 9 Kỷ, 0 Canh, 1 Tân, 2 Nhâm, 3 Quý.
          Ví dụ 1990 là Canh Ngọ, 2004 là Giáp Thân. Bảng Tứ Hóa app dùng:
        </p>
        <dl className="facts">
          {STEMS.map((stem, i) => (
            <Fragment key={stem}>
              <dt>{vi(stem)}</dt>
              <dd>{SI_HUA_TABLE[i].map((s, k) => `${vi(s)} ${vi(HOA[k])}`).join(' · ')}</dd>
            </Fragment>
          ))}
        </dl>
        <p className="aside">
          Năm Nhâm, app theo <em>Toàn Thư</em> cho Tả Phù hóa Khoa; nhiều sách Việt ghi Thiên Phủ hóa Khoa.
        </p>
        <p>
          Ngoài Tứ Hóa của năm sinh, mỗi đại hạn và mỗi năm cũng có Tứ Hóa riêng. Khi bạn bấm xem đại hạn hoặc một năm trên lá số,
          app vẽ thêm các nhãn viền đứt có chữ ĐH (đại hạn) hoặc LN (lưu niên).
        </p>

        <h2 id="tuan-triet">Tuần và Triệt</h2>
        <p>
          Tuần và Triệt là hai “vùng trống”, mỗi vùng chặn ngang hai ô liền nhau, tính theo năm sinh. Sao trong ô bị chặn yếu đi:
          sao tốt bớt tốt, sao xấu cũng bớt xấu. Sách Việt thường nói Triệt mạnh ở tuổi trẻ (trước khoảng 30 tuổi),
          Tuần ảnh hưởng về sau và dịu hơn.
        </p>

        <h2 id="tam-phuong-tu-chinh">Tam phương tứ chính</h2>
        <p>
          Không bao giờ xem một cung đứng riêng. Muốn luận một cung phải xem bốn ô: <strong>chính nó</strong>, <strong>ô đối diện</strong>
          (xung chiếu), và <strong>hai ô tam hợp</strong> (cách nó 4 ô về hai phía). Ví dụ cung Mệnh luôn đi cùng Thiên Di (đối diện),
          Tài Bạch và Quan Lộc (tam hợp). Trên lá số, bấm vào một cung sẽ thấy đường nối bốn ô này.
        </p>

        <h2 id="van-han">Đại hạn và lưu niên</h2>
        <p>
          <strong>Đại hạn</strong> là vận 10 năm. Mỗi cung lần lượt “cầm” 10 năm của đời bạn; con số tuổi ghi trong mỗi ô (ví dụ 24–33)
          là 10 năm cung đó cầm. Đại hạn đầu tiên luôn ở cung Mệnh, bắt đầu từ tuổi bằng số của Cục. Sau đó đi sang ô bên cạnh:
          nam sinh năm can dương (Giáp, Bính, Mậu, Canh, Nhâm) và nữ sinh năm can âm (Ất, Đinh, Kỷ, Tân, Quý) đi thuận (theo thứ tự Tý, Sửu, Dần…);
          hai trường hợp còn lại đi nghịch.
        </p>
        <p>
          Trong 10 năm đó, cung đang cầm vận và tam phương tứ chính của nó là phần đáng xem nhất.
        </p>
        <p>
          <strong>Lưu niên</strong> là vận của từng năm. Năm nào thì xem ô có địa chi trùng với năm đó: năm Ngọ xem ô Ngọ, năm Mùi xem ô Mùi.
        </p>

        <h2 id="cach-doc">Đọc lá số của bạn trong 4 bước</h2>
        <ol>
          <li><strong>Xem cung Mệnh</strong>: có chính tinh nào, sáng hay hãm, có Tứ Hóa không. Đây là tính cách gốc.</li>
          <li><strong>Xem tam phương tứ chính của Mệnh</strong>: Thiên Di, Tài Bạch, Quan Lộc. Bốn ô này cho thấy sức mạnh chung của lá số.</li>
          <li><strong>Xem cung bạn quan tâm</strong> (tình cảm thì Phu Thê, tiền thì Tài Bạch…). Bấm vào ô đó trên lá số để đọc luận giải.</li>
          <li><strong>Xem đại hạn hiện tại</strong>: cung nào đang cầm 10 năm này, và năm nay rơi vào ô nào.</li>
        </ol>
        <p>
          Đừng kết luận từ một sao. Cùng một sao, tốt hay xấu còn tùy độ sáng, Tứ Hóa, các phụ tinh đi cùng và tam phương tứ chính.
          Các bài bên dưới chỉ nói ý nghĩa chung của từng sao.
        </p>
        <p><Link href="/chart">Lập lá số của bạn</Link>, rồi tra <Link href="/knowledge#chinh-tinh">14 chính tinh</Link> và <Link href="/knowledge/cap-sao">24 cặp sao</Link>.</p>
      </article>

    </main>
  );
}
