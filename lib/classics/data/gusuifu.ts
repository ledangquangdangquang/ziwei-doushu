/**
 * Cốt Tủy Phú (骨髓赋) — khẩu quyết cốt lõi của Tử Vi Đẩu Số.
 * Chữ Hán ở đây là bản tóm lược theo ý bằng lời văn hiện đại, không phải nguyên văn bài phú.
 */

import type { Book } from '../types';

export const guSuiFu: Book = {
  title: 'Cốt Tủy Phú',
  titleHan: '骨髓赋',
  slug: 'gusuifu',
  dynasty: 'Đời Minh (lưu truyền)',
  author: 'Không rõ tác giả',
  intro: 'Bài phú cô đọng những khẩu quyết cốt lõi của Tử Vi Đẩu Số. Phần chữ Hán ở đây là bản tóm lược theo ý, viết bằng lời văn hiện đại — không phải nguyên văn bài phú.',
  wordCount: 1500,
  chapters: [
    {
      title: 'Tổng luận',
      subtitle: 'Nền tảng lập luận của Tử Vi Đẩu Số',
      paragraphs: [
        {
          id: 'gsf-1-1',
          idx: 1,
          text: '太极星曜，乃群星之主。紫微帝座，为众星之尊。天府令星，南北斗化禄、化权、令星；左辅右弼，主祭祀之星。',
          translation: 'Sao Thái Cực là chủ của các sao. Tử Vi ngự ngôi đế, được muôn sao tôn kính. Thiên Phủ là lệnh tinh; các sao Nam, Bắc Đẩu có hóa Lộc, hóa Quyền. Tả Phù, Hữu Bật là sao chủ việc tế tự.',
        },
        {
          id: 'gsf-1-2',
          idx: 2,
          text: '紫微为君，以左辅右弼为相。天府为臣，以禄存为府库。天机为善，天梁为荫，遇之则吉；廉贞为囚，破军为耗，逢之则凶。',
          translation: 'Tử Vi là vua, lấy Tả Phù, Hữu Bật làm tướng phò tá. Thiên Phủ là bề tôi, lấy Lộc Tồn làm kho. Thiên Cơ là thiện tinh, Thiên Lương là ấm tinh, gặp thì tốt; Liêm Trinh là tù tinh, Phá Quân là hao tinh, gặp thì xấu.',
        },
        {
          id: 'gsf-1-3',
          idx: 3,
          text: '看命之要，先看命宫。命宫主星定其格局，三方四正定其用武。次看身宫，身宫定其晚景与依归。再看大限流年，定其一生进退之节。',
          translation: 'Muốn xem số, trước hết xem cung Mệnh: chính tinh ở Mệnh định cách cục, tam phương tứ chính cho biết đất dụng võ. Kế đến xem cung Thân để định hậu vận và chỗ nương tựa về sau. Sau cùng xem đại hạn, lưu niên để biết những bước tiến lui trong đời.',
        },
      ],
    },
    {
      title: 'Luận sao Tử Vi',
      subtitle: 'Ngôi đế tôn quý, có phò tá thì sang',
      paragraphs: [
        {
          id: 'gsf-2-1',
          idx: 1,
          text: '紫微为帝座之星，得辅弼则贵，得昌曲则秀，得魁钺则贵人扶持。紫微独坐无辅，纵贵不久；得三方四正之吉星会照，方为正宗大格。',
          translation: 'Tử Vi là sao đế tọa: được Tả Hữu thì quý, được Xương Khúc thì thanh tú, được Khôi Việt thì có quý nhân nâng đỡ. Tử Vi đứng một mình không người phò tá thì dù quý cũng không bền; được cát tinh ở tam phương tứ chính hội chiếu mới là đại cách chính tông.',
        },
        {
          id: 'gsf-2-2',
          idx: 2,
          text: '紫微在子午为「面南背北」之贵，主大富大贵；紫微在丑未与破军同宫，主刚毅果决；紫微在寅申与天府同宫，称「紫府同宫」格，主品端衣食丰足。',
          translation: 'Tử Vi ở Tý, Ngọ là thế quý "mặt hướng Nam, lưng tựa Bắc", chủ đại phú đại quý; Tử Vi ở Sửu, Mùi đồng cung Phá Quân, chủ cương nghị quyết đoán; Tử Vi ở Dần, Thân đồng cung Thiên Phủ gọi là cách "Tử Phủ đồng cung", chủ phẩm hạnh đoan chính, cơm áo đủ đầy.',
        },
        {
          id: 'gsf-2-3',
          idx: 3,
          text: '紫微居官禄，无煞冲破，必为高官；紫微居田宅，主有祖业，又能自置；紫微居夫妻，主配偶端庄，气质不凡，但宜迟婚不宜早。',
          translation: 'Tử Vi ở Quan Lộc, không bị sát tinh xung phá, ắt làm quan cao; Tử Vi ở Điền Trạch, chủ có của tổ để lại và tự tạo thêm được; Tử Vi ở Phu Thê, chủ người phối ngẫu đoan trang, khí chất hơn người, nhưng nên lấy muộn, không nên lấy sớm.',
        },
        {
          id: 'gsf-2-4',
          idx: 4,
          text: '紫微忌空劫，主有位无禄。紫微忌孤君无辅，主孤峰独峙，难成大事。紫微化权主独断，紫微化科主名声，紫微化忌主受制于人。',
          translation: 'Tử Vi kỵ Không Kiếp, chủ có địa vị mà không có lộc. Tử Vi kỵ cảnh "vua cô độc không người phò", như núi đứng trơ trọi, khó thành việc lớn. Tử Vi hóa Quyền chủ độc đoán, hóa Khoa chủ danh tiếng, hóa Kỵ chủ bị người khác chế ngự. [Ghi chú: theo bảng Tứ Hóa thông dụng, Tử Vi không có Hóa Kỵ.]',
        },
      ],
    },
    {
      title: 'Luận sao Thất Sát',
      subtitle: 'Tướng tinh cô độc, hợp nghiệp võ',
      paragraphs: [
        {
          id: 'gsf-3-1',
          idx: 1,
          text: '七杀为将星，性刚毅果决。七杀守命，不喜与诸吉同宫，独行其道方为本格。七杀逢空劫，主孤独漂泊，事业难成。',
          translation: 'Thất Sát là tướng tinh, tính cương nghị quyết đoán. Thất Sát thủ Mệnh không thích đồng cung với các cát tinh, tự đi đường riêng mới đúng bản cách. Thất Sát gặp Không Kiếp chủ cô độc phiêu bạt, sự nghiệp khó thành.',
        },
        {
          id: 'gsf-3-2',
          idx: 2,
          text: '七杀朝斗格：七杀居子午、寅申，对宫紫微天府相照，主爵禄荣昌。最宜军警武职、开疆拓土。一生贵气难挡，但需经磨炼方成大器。',
          translation: 'Cách Thất Sát triều Đẩu: Thất Sát ở Tý, Ngọ, Dần, Thân, cung đối có Tử Vi, Thiên Phủ chiếu về, chủ tước lộc vinh xương. Hợp nhất với quân đội, võ chức, mở mang bờ cõi. Cả đời quý khí khó ngăn, nhưng phải qua rèn luyện mới thành đại khí.',
        },
        {
          id: 'gsf-3-3',
          idx: 3,
          text: '七杀逢羊陀，主刑伤血光；七杀逢火铃，主威武刚烈；七杀逢化禄，主一身武贵；七杀逢化忌，反主消沉，事业多败。',
          translation: 'Thất Sát gặp Kình Đà chủ thương tích, huyết quang; gặp Hỏa Linh chủ uy vũ cương liệt; gặp Hóa Lộc chủ võ quý một đời; gặp Hóa Kỵ lại chủ tiêu trầm, sự nghiệp nhiều thất bại.',
        },
      ],
    },
    {
      title: 'Cách Sát Phá Tham',
      subtitle: 'Số khai phá, xông pha, nhiều biến động',
      paragraphs: [
        {
          id: 'gsf-4-1',
          idx: 1,
          text: '七杀、破军、贪狼三星会命迁财官，称「杀破狼格」。主一生变动多、不甘平凡，宜创业、军警、业务。年轻易冲动失利，中年后方能稳定守成。',
          translation: 'Thất Sát, Phá Quân, Tham Lang cùng hội ở Mệnh, Thiên Di, Tài Bạch, Quan Lộc gọi là cách Sát Phá Tham. Chủ một đời nhiều thay đổi, không cam chịu tầm thường, hợp khởi nghiệp, quân đội, kinh doanh. Thời trẻ dễ nóng vội thất bại, trung niên trở đi mới ổn định giữ được thành quả.',
        },
        {
          id: 'gsf-4-2',
          idx: 2,
          text: '杀破狼三方有化禄或化权，主动得有力，可成大事；若三方煞星过重（羊陀火铃齐照），主动而无成，宜静守。',
          translation: 'Tam phương của Sát Phá Tham có Hóa Lộc hoặc Hóa Quyền thì động mà có lực, có thể thành việc lớn; nếu sát tinh ở tam phương quá nặng (Kình, Đà, Hỏa, Linh cùng chiếu) thì động mà không thành, nên giữ yên.',
        },
      ],
    },
    {
      title: 'Cách Cơ Nguyệt Đồng Lương',
      subtitle: 'Tích lũy ổn định, hợp việc công',
      paragraphs: [
        {
          id: 'gsf-5-1',
          idx: 1,
          text: '天机、太阴、天同、天梁四星齐入命迁财官，称「机月同梁格」。主文质彬彬、聪慧善谋。最适合公职、学术、文艺、医疗、服务等需稳定累积的行业，不宜大冒险大投机。',
          translation: 'Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương cùng vào Mệnh, Thiên Di, Tài Bạch, Quan Lộc gọi là cách Cơ Nguyệt Đồng Lương. Chủ người nho nhã, thông minh, giỏi mưu tính. Hợp nhất với việc công, học thuật, văn nghệ, y tế, dịch vụ — những nghề cần tích lũy ổn định; không hợp mạo hiểm, đầu cơ lớn.',
        },
        {
          id: 'gsf-5-2',
          idx: 2,
          text: '机月同梁作吏人——古云此格者宜担任公职、行政文书工作，安稳一生。再会昌曲化科，主名声远播。最忌煞星过多，则反主多变难安。',
          translation: '"Cơ Nguyệt Đồng Lương tác lại nhân" — người xưa nói người có cách này hợp làm việc công, hành chính, văn thư, một đời yên ổn. Gặp thêm Xương Khúc, Hóa Khoa thì danh tiếng vang xa. Kỵ nhất sát tinh quá nhiều, khi ấy lại chủ hay thay đổi, khó yên.',
        },
      ],
    },
    {
      title: 'Luận Tứ Hóa',
      subtitle: 'Cát hung của Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ',
      paragraphs: [
        {
          id: 'gsf-6-1',
          idx: 1,
          text: '化禄主财、主缘、主能力变现；化权主权、主决断、主独当一面；化科主名、主贵人、主文书；化忌主病、主煞、主深刻功课。',
          translation: 'Hóa Lộc chủ tài, chủ duyên, chủ biến năng lực thành của cải; Hóa Quyền chủ quyền, chủ quyết đoán, chủ tự gánh vác một phương; Hóa Khoa chủ danh, chủ quý nhân, chủ văn thư; Hóa Kỵ chủ bệnh, chủ sát, chủ những bài học sâu sắc.',
        },
        {
          id: 'gsf-6-2',
          idx: 2,
          text: '化禄入命，财源广进；化权入命，能担大任；化科入命，名声远播；化忌入命，须经磨炼方能成器。',
          translation: 'Hóa Lộc vào Mệnh, tiền tài dồi dào; Hóa Quyền vào Mệnh, gánh được việc lớn; Hóa Khoa vào Mệnh, danh tiếng vang xa; Hóa Kỵ vào Mệnh, phải qua rèn luyện mới thành người.',
        },
        {
          id: 'gsf-6-3',
          idx: 3,
          text: '化忌入财，主财来财去；化忌入官，主事业受挫；化忌入夫妻，主婚姻多波折；化忌入子女，主子女缘薄或亲子摩擦。',
          translation: 'Hóa Kỵ vào Tài Bạch, chủ tiền đến rồi đi; vào Quan Lộc, chủ sự nghiệp trắc trở; vào Phu Thê, chủ hôn nhân nhiều sóng gió; vào Tử Tức, chủ duyên con mỏng hoặc cha mẹ con cái va chạm.',
        },
        {
          id: 'gsf-6-4',
          idx: 4,
          text: '禄存与化禄同会命三方，称「双禄朝垣」，主富比陶朱；化科与化权同会，称「科权双会」，主名权双美。',
          translation: 'Lộc Tồn và Hóa Lộc cùng hội ở tam phương của Mệnh gọi là "Song Lộc triều viên", chủ giàu như Đào Chu; Hóa Khoa và Hóa Quyền cùng hội gọi là "Khoa Quyền song hội", chủ danh và quyền đều đẹp.',
        },
      ],
    },
    {
      title: 'Luận Phụ Bật, Khôi Việt',
      subtitle: 'Cái quý của lục cát tinh',
      paragraphs: [
        {
          id: 'gsf-7-1',
          idx: 1,
          text: '左辅右弼为「相星」，主助力贵人；文昌文曲为「文星」，主聪明俊秀；天魁天钺为「贵人星」，主关键时刻有人扶持。',
          translation: 'Tả Phù, Hữu Bật là "tướng tinh" phò tá, chủ có người giúp sức, quý nhân; Văn Xương, Văn Khúc là "văn tinh", chủ thông minh tuấn tú; Thiên Khôi, Thiên Việt là "quý nhân tinh", chủ lúc then chốt có người nâng đỡ.',
        },
        {
          id: 'gsf-7-2',
          idx: 2,
          text: '六吉星齐会命宫三方四正，主一生贵人不绝、人缘极佳。即使命格平常，亦能借六吉之力达成不凡之业。',
          translation: 'Lục cát tinh cùng hội ở tam phương tứ chính của Mệnh, chủ một đời quý nhân không dứt, nhân duyên rất tốt. Dù mệnh cách bình thường cũng có thể nhờ sức lục cát mà làm nên việc không tầm thường.',
        },
        {
          id: 'gsf-7-3',
          idx: 3,
          text: '辅弼夹命：左辅右弼夹于命宫前后两宫，主一生贵人扶持，遇困有助。最宜与紫微同宫，称「君臣庆会」格。',
          translation: 'Phụ Bật giáp Mệnh: Tả Phù, Hữu Bật nằm ở hai cung trước sau cung Mệnh, chủ một đời có quý nhân nâng đỡ, gặp khó có người giúp. Tốt nhất là cùng Tử Vi, gọi là cách "Quân thần khánh hội".',
        },
      ],
    },
    {
      title: 'Luận lục sát tinh',
      subtitle: 'Cái hung của Kình, Đà, Hỏa, Linh, Không, Kiếp',
      paragraphs: [
        {
          id: 'gsf-8-1',
          idx: 1,
          text: '擎羊陀罗为「煞星」，主血光、是非、阻碍；火星铃星为「燥星」，主冲动、急躁、伤灾；地空地劫为「空亡」，主财耗、虚名、不实。',
          translation: 'Kình Dương, Đà La là "sát tinh", chủ huyết quang, thị phi, trở ngại; Hỏa Tinh, Linh Tinh là "táo tinh", chủ bốc đồng, nóng nảy, tai nạn thương tích; Địa Không, Địa Kiếp là "không vong", chủ hao tài, hư danh, không thực.',
        },
        {
          id: 'gsf-8-2',
          idx: 2,
          text: '煞星不全是凶——煞星犹如磨刀石，能炼出常人没有的破局力。年轻时易冲动伤己，中年后方能化煞为权。',
          translation: 'Sát tinh không hẳn là xấu — sát tinh như đá mài dao, có thể rèn ra sức phá thế mà người thường không có. Lúc trẻ dễ bốc đồng tự hại, trung niên về sau mới hóa sát thành quyền.',
        },
        {
          id: 'gsf-8-3',
          idx: 3,
          text: '羊陀夹忌：擎羊陀罗夹于化忌星所在宫，主大凶。其年其大限须特别警觉血光、官非、重大变故。',
          translation: 'Dương Đà giáp Kỵ: Kình Dương, Đà La kẹp hai bên cung có Hóa Kỵ, chủ đại hung. Năm ấy, đại hạn ấy phải đặc biệt đề phòng huyết quang, kiện tụng, biến cố lớn.',
        },
        {
          id: 'gsf-8-4',
          idx: 4,
          text: '空劫夹命：地空地劫夹于命宫前后两宫，主一生宜务虚不务实，宜从事文艺、宗教、玄学等"非实"行业，不宜经商投资。',
          translation: 'Không Kiếp giáp Mệnh: Địa Không, Địa Kiếp kẹp hai cung trước sau cung Mệnh, chủ một đời hợp việc thiên về tinh thần hơn vật chất, như văn nghệ, tôn giáo, huyền học; không hợp buôn bán, đầu tư.',
        },
      ],
    },
    {
      title: 'Luận mười hai cung',
      subtitle: 'Ý nghĩa và cát hung của từng cung',
      paragraphs: [
        {
          id: 'gsf-9-1',
          idx: 1,
          text: '命宫为本，三方为用：财帛主财源、官禄主事业、迁移主外缘。三方四正吉星会照，命格方能完整发用。',
          translation: 'Mệnh là gốc, tam phương là dụng: Tài Bạch chủ nguồn tiền, Quan Lộc chủ sự nghiệp, Thiên Di chủ duyên bên ngoài. Tam phương tứ chính có cát tinh hội chiếu thì mệnh cách mới phát huy trọn vẹn.',
        },
        {
          id: 'gsf-9-2',
          idx: 2,
          text: '夫妻宫看配偶气质，子女宫看子女缘分，疾厄宫看身体罩门，迁移宫看外出运势。各宫主星与四化决定该领域之吉凶进退。',
          translation: 'Cung Phu Thê xem khí chất người phối ngẫu, Tử Tức xem duyên con cái, Tật Ách xem điểm yếu của thân thể, Thiên Di xem vận ra ngoài. Chính tinh và Tứ Hóa của mỗi cung quyết định cát hung, tiến lui ở lĩnh vực ấy.',
        },
        {
          id: 'gsf-9-3',
          idx: 3,
          text: '田宅宫为命盘财库，正财能否守住看此宫；福德宫为精神享受，心安与否看此宫；父母宫为长辈关系，亦主文书契约。',
          translation: 'Điền Trạch là kho tiền của lá số, giữ được chính tài hay không xem ở cung này; Phúc Đức là hưởng thụ tinh thần, lòng có an hay không xem ở cung này; Phụ Mẫu là quan hệ với bề trên, cũng chủ văn thư khế ước.',
        },
        {
          id: 'gsf-9-4',
          idx: 4,
          text: '空宫借对宫论事——某宫无主星时，借其对宫主星论该宫之事。如命宫空宫，借迁移宫主星定命格。',
          translation: 'Cung vô chính diệu thì mượn cung đối để luận — khi một cung không có chính tinh, mượn chính tinh của cung đối diện để luận việc của cung đó. Như Mệnh vô chính diệu thì mượn chính tinh cung Thiên Di để định mệnh cách.',
        },
      ],
    },
  ],
};
