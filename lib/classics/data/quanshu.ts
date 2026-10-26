/**
 * Tử Vi Đẩu Số Toàn Thư (紫微斗数全书) — chọn lọc.
 * Chữ Hán ở đây là bản tóm lược bằng lời văn hiện đại, có xen quan điểm trường phái Nghê Hải Hạ — không phải nguyên văn sách.
 */

import type { Book } from '../types';

export const ziWeiQuanShu: Book = {
  title: 'Tử Vi Đẩu Số Toàn Thư',
  titleHan: '紫微斗数全书',
  slug: 'quanshu',
  dynasty: 'Đời Minh',
  author: 'La Hồng Tiên biên soạn',
  intro: 'Bộ sách có hệ thống nhất của Tử Vi Đẩu Số, nhấn mạnh quan hệ giữa mười hai cung và Tứ Hóa. Phần chữ Hán ở đây là bản tóm lược bằng lời văn hiện đại, có xen quan điểm của trường phái Nghê Hải Hạ — không phải nguyên văn sách.',
  wordCount: 100000,
  chapters: [
    {
      title: 'Luận 12 cung · Cung Mệnh',
      subtitle: 'Gốc rễ của việc xem số',
      paragraphs: [
        {
          id: 'qs-1-1',
          idx: 1,
          text: '命宫者，一身之根本，万事之枢纽。命宫定，则一生格局定。看命宫先看主星，次看辅煞，再看四化与三方四正之会照。',
          translation: 'Cung Mệnh là gốc của một thân, then chốt của vạn sự. Mệnh định thì cách cục một đời định. Xem cung Mệnh trước xem chính tinh, sau xem phụ tinh và sát tinh, rồi xem Tứ Hóa và sự hội chiếu của tam phương tứ chính.',
        },
        {
          id: 'qs-1-2',
          idx: 2,
          text: '命宫主星庙旺，主先天优势，做事事半功倍；落陷则主先天劣势，但反主大成——落陷之人有"不甘"二字推动，反能爆发出庙旺命格做不到的逆袭。',
          translation: 'Chính tinh cung Mệnh miếu vượng chủ có ưu thế bẩm sinh, làm việc ít công mà nhiều kết quả; hãm địa chủ bất lợi bẩm sinh, nhưng lại có thể làm nên lớn — người có sao hãm được hai chữ "không cam" thúc đẩy, đôi khi bứt phá được điều mà người có sao miếu vượng không làm được.',
        },
        {
          id: 'qs-1-3',
          idx: 3,
          text: '命宫见六吉星（左辅右弼文昌文曲天魁天钺），主一生贵人不绝；命宫见六煞星（擎羊陀罗火星铃星地空地劫），主多波折磨砺，但若能忍过，反成大器。',
          translation: 'Cung Mệnh gặp lục cát tinh (Tả Phù, Hữu Bật, Văn Xương, Văn Khúc, Thiên Khôi, Thiên Việt) chủ một đời quý nhân không dứt; gặp lục sát tinh (Kình Dương, Đà La, Hỏa Tinh, Linh Tinh, Địa Không, Địa Kiếp) chủ nhiều sóng gió rèn giũa, nhưng nếu nhẫn qua được lại thành đại khí.',
        },
      ],
    },
    {
      title: 'Luận 12 cung · Cung Tài Bạch',
      subtitle: 'Nguồn tiền ở đâu',
      paragraphs: [
        {
          id: 'qs-2-1',
          idx: 1,
          text: '财帛宫主一生之财源、收入、理财方式。财帛宫主星不同，赚钱方式各异：紫微在财主官财，武曲在财主商财，太阴在财主田宅财，巨门在财主口才财。',
          translation: 'Cung Tài Bạch chủ nguồn tiền, thu nhập, cách quản lý tiền của một đời. Chính tinh khác nhau thì cách kiếm tiền khác nhau: Tử Vi ở Tài Bạch chủ tiền từ quan chức, Vũ Khúc chủ tiền từ buôn bán, Thái Âm chủ tiền từ nhà đất, Cự Môn chủ tiền từ tài ăn nói.',
        },
        {
          id: 'qs-2-2',
          idx: 2,
          text: '财帛宫化禄入命，主财源广进；财帛宫化忌，主财来财去；财帛宫见禄存，主稳定积累；财帛宫遇空劫，主财耗虚名。',
          translation: 'Tài Bạch hóa Lộc nhập Mệnh, chủ tiền vào dồi dào; Tài Bạch hóa Kỵ, chủ tiền đến rồi đi; Tài Bạch có Lộc Tồn, chủ tích lũy ổn định; Tài Bạch gặp Không Kiếp, chủ hao tài, hư danh.',
        },
      ],
    },
    {
      title: 'Luận 12 cung · Cung Quan Lộc',
      subtitle: 'Gốc của sự nghiệp',
      paragraphs: [
        {
          id: 'qs-3-1',
          idx: 1,
          text: '官禄宫主事业、地位、社会成就。官禄宫主星不同，事业方向各异：紫微在官宜大平台高位，太阳在官宜公务名声，武曲在官宜金融实业，廉贞在官宜文武兼备。',
          translation: 'Cung Quan Lộc chủ sự nghiệp, địa vị, thành tựu xã hội. Chính tinh khác nhau thì hướng sự nghiệp khác nhau: Tử Vi ở Quan Lộc hợp tổ chức lớn, vị trí cao; Thái Dương hợp việc công, danh tiếng; Vũ Khúc hợp tài chính, sản xuất kinh doanh; Liêm Trinh hợp việc văn võ kiêm toàn.',
        },
        {
          id: 'qs-3-2',
          idx: 2,
          text: '官禄宫化权入命，主能独当一面；化禄入官，主财从职业来；化忌入官，主职场波折。',
          translation: 'Quan Lộc hóa Quyền nhập Mệnh, chủ tự gánh vác một phương; Hóa Lộc vào Quan Lộc, chủ tiền đến từ nghề nghiệp; Hóa Kỵ vào Quan Lộc, chủ chốn công sở nhiều trắc trở.',
        },
      ],
    },
    {
      title: 'Luận 12 cung · Cung Phu Thê',
      subtitle: 'Khí chất người phối ngẫu',
      paragraphs: [
        {
          id: 'qs-4-1',
          idx: 1,
          text: '夫妻宫主配偶气质、婚姻状态。夫妻宫紫微主配偶端庄威权，宜迟婚；夫妻宫贪狼主配偶多情，桃花重；夫妻宫天梁主配偶成熟稳重，年长。',
          translation: 'Cung Phu Thê chủ khí chất người phối ngẫu và tình trạng hôn nhân. Phu Thê có Tử Vi chủ người phối ngẫu đoan trang, có uy quyền, nên lấy muộn; có Tham Lang chủ người phối ngẫu đa tình, đào hoa nặng; có Thiên Lương chủ người phối ngẫu chín chắn, lớn tuổi hơn.',
        },
        {
          id: 'qs-4-2',
          idx: 2,
          text: '夫妻宫化忌冲命，主婚姻多波折。夫妻宫见六煞，需特别注意感情之磨砺。夫妻宫见六吉，主配偶贵人。',
          translation: 'Phu Thê hóa Kỵ xung Mệnh, chủ hôn nhân nhiều sóng gió. Phu Thê gặp lục sát, cần đặc biệt lưu ý những thử thách trong tình cảm. Phu Thê gặp lục cát, chủ người phối ngẫu là quý nhân.',
        },
      ],
    },
    {
      title: 'Luận Tứ Hóa',
      subtitle: 'Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ',
      paragraphs: [
        {
          id: 'qs-5-1',
          idx: 1,
          text: '四化为命盘之精华——化禄主财、化权主势、化科主名、化忌主病。四化所在宫位，决定一生重大事件之节点。',
          translation: 'Tứ Hóa là tinh hoa của lá số — Hóa Lộc chủ tài, Hóa Quyền chủ thế, Hóa Khoa chủ danh, Hóa Kỵ chủ bệnh. Cung có Tứ Hóa quyết định các mốc sự kiện lớn trong đời.',
        },
        {
          id: 'qs-5-2',
          idx: 2,
          text: '生年四化为本命四化，永远固定；倪师强调四化星不动，只看大限流年走到何处。北派飞星派之自化、宫干飞化、来因宫等，倪师不主张使用。',
          translation: 'Tứ Hóa năm sinh là Tứ Hóa bản mệnh, cố định suốt đời; thầy Nghê Hải Hạ nhấn mạnh sao Tứ Hóa không di chuyển, chỉ xem đại hạn, lưu niên đi tới đâu. Các phép tự hóa, phi hóa theo can cung, cung Lai Nhân của phái Phi Tinh, thầy Nghê không chủ trương dùng. [Ghi chú: đoạn này là quan điểm hiện đại, không có trong sách cổ.]',
        },
        {
          id: 'qs-5-3',
          idx: 3,
          text: '化禄入命三方四正：财源稳定，缘分广，能力可变现。化禄入夫妻：婚姻甜蜜。化禄入官禄：事业财源相应。',
          translation: 'Hóa Lộc vào tam phương tứ chính của Mệnh: nguồn tiền ổn định, duyên rộng, năng lực biến được thành của cải. Hóa Lộc vào Phu Thê: hôn nhân ngọt ngào. Hóa Lộc vào Quan Lộc: sự nghiệp đi cùng tiền tài.',
        },
        {
          id: 'qs-5-4',
          idx: 4,
          text: '化忌入命三方四正：一生有深刻功课，宜面对而非逃避。化忌入夫妻：婚姻多磨砺。化忌入官禄：事业多波折，但磨练后反成专业人才。',
          translation: 'Hóa Kỵ vào tam phương tứ chính của Mệnh: một đời có bài học sâu sắc, nên đối diện chứ đừng trốn tránh. Hóa Kỵ vào Phu Thê: hôn nhân nhiều thử thách. Hóa Kỵ vào Quan Lộc: sự nghiệp nhiều trắc trở, nhưng qua rèn luyện lại thành người giỏi chuyên môn.',
        },
      ],
    },
    {
      title: 'Cách Cơ Nguyệt Đồng Lương',
      subtitle: 'Số tích lũy ổn định',
      paragraphs: [
        {
          id: 'qs-6-1',
          idx: 1,
          text: '天机太阴天同天梁四星齐入命三方四正，称机月同梁格。文质彬彬、聪慧善谋，最适合公职、学术、文艺、医疗、服务等需稳定累积的行业。',
          translation: 'Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương cùng vào tam phương tứ chính của Mệnh gọi là cách Cơ Nguyệt Đồng Lương. Người nho nhã, thông minh, giỏi mưu tính; hợp nhất việc công, học thuật, văn nghệ, y tế, dịch vụ — những nghề cần tích lũy ổn định.',
        },
        {
          id: 'qs-6-2',
          idx: 2,
          text: '机月同梁作吏人——古云此格者宜担任公职、行政文书工作，安稳一生。再会昌曲化科，主名声远播。最忌煞星过多，则反主多变难安。',
          translation: '"Cơ Nguyệt Đồng Lương tác lại nhân" — người xưa nói người có cách này hợp làm việc công, hành chính, văn thư, một đời yên ổn. Gặp thêm Xương Khúc, Hóa Khoa thì danh tiếng vang xa. Kỵ nhất sát tinh quá nhiều, khi ấy lại chủ hay thay đổi, khó yên.',
        },
      ],
    },
    {
      title: 'Cách Song Lộc triều viên',
      subtitle: 'Giàu như Đào Chu',
      paragraphs: [
        {
          id: 'qs-7-1',
          idx: 1,
          text: '化禄与禄存同会命宫三方四正，称双禄朝垣格。古云"双禄朝垣，富比陶朱"，主一生不愁财，多有正财横财兼得。',
          translation: 'Hóa Lộc và Lộc Tồn cùng hội ở tam phương tứ chính của Mệnh gọi là cách Song Lộc triều viên. Người xưa nói "Song Lộc triều viên, giàu như Đào Chu", chủ một đời không lo tiền, thường có cả chính tài lẫn tiền bất ngờ.',
        },
        {
          id: 'qs-7-2',
          idx: 2,
          text: '双禄朝垣最忌空劫——空劫一冲，则双禄成虚名。需见左辅右弼或文昌文曲，方为正格。',
          translation: 'Song Lộc triều viên kỵ nhất Không Kiếp — Không Kiếp xung vào thì Song Lộc thành hư danh. Cần gặp Tả Phù, Hữu Bật hoặc Văn Xương, Văn Khúc mới là chính cách.',
        },
      ],
    },
  ],
};
