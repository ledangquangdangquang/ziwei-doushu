/**
 * Tử Vi Đẩu Số Toàn Tập (紫微斗数全集) — các chương chọn lọc.
 * Chữ Hán ở đây là bản tóm lược theo ý bằng lời văn hiện đại, không phải nguyên văn sách.
 */

import type { Book } from '../types';

export const ziWeiQuanJi: Book = {
  title: 'Tử Vi Đẩu Số Toàn Tập',
  titleHan: '紫微斗数全集',
  slug: 'quanji',
  dynasty: 'Đời Minh',
  author: 'Tương truyền do Trần Đoàn (Hi Di) truyền lại',
  intro: 'Một trong những bộ sách nền tảng của Tử Vi Đẩu Số, tương truyền do Trần Đoàn đời Tống truyền lại. Phần chữ Hán ở đây là bản tóm lược theo ý bằng lời văn hiện đại — không phải nguyên văn sách.',
  wordCount: 80000,
  chapters: [
    {
      title: 'Quyển 1 · Tổng luận',
      subtitle: 'Phép lập cơ bản của Tử Vi Đẩu Số',
      paragraphs: [
        {
          id: 'qj-1-1',
          idx: 1,
          text: '夫紫微斗数者，乃陈抟祖师所传，原以紫微为帝座，统御百星。星曜各有所主，各有庙旺利陷之分，会照吉凶之别。看命者，必先安星，次定命宫身宫，三看十二宫吉凶，四参大限流年之飞化。',
          translation: 'Tử Vi Đẩu Số do Trần Đoàn tổ sư truyền lại, lấy Tử Vi làm ngôi đế thống lĩnh trăm sao. Mỗi sao có chỗ chủ riêng, có phân miếu, vượng, lợi, hãm, và khác nhau về cát hung khi hội chiếu. Người xem số trước hết phải an sao, kế đến định cung Mệnh, cung Thân, thứ ba xem cát hung mười hai cung, thứ tư xét đại hạn, lưu niên và phi hóa.',
        },
        {
          id: 'qj-1-2',
          idx: 2,
          text: '安星之法：先以年干起紫微，紫微所在宫位定，则诸星皆按其法位列十二宫。十四主星各居其位，六吉六煞辅而行之。一盘既定，万象皆现。',
          translation: 'Phép an sao: trước hết lấy can năm để khởi Tử Vi; vị trí Tử Vi định rồi thì các sao khác theo phép mà xếp vào mười hai cung. Mười bốn chính tinh mỗi sao một chỗ, lục cát lục sát đi kèm phụ trợ. Một lá số đã lập, muôn tượng đều hiện. [Ghi chú: thực tế Tử Vi được an theo Cục và ngày sinh âm lịch, không theo can năm.]',
        },
        {
          id: 'qj-1-3',
          idx: 3,
          text: '命宫为本，主一生格局；身宫为辅，主三十后归向。命身分明，方知一人之进退。三方四正会照，方知一人之用武之地。十二宫各有所主，方知人生之全图。',
          translation: 'Cung Mệnh là gốc, chủ cách cục cả đời; cung Thân là phụ, chủ khuynh hướng sau tuổi ba mươi. Mệnh Thân rõ ràng mới biết sự tiến lui của một người. Tam phương tứ chính hội chiếu mới biết đất dụng võ của người ấy. Mười hai cung mỗi cung chủ một việc, mới thấy được toàn cảnh đời người.',
        },
      ],
    },
    {
      title: 'Quyển 2 · Luận sao Tử Vi',
      subtitle: 'Sự tôn quý của ngôi đế',
      paragraphs: [
        {
          id: 'qj-2-1',
          idx: 1,
          text: '紫微为北斗之主，统辖众星。紫微属土，乃尊贵之星。在数为帝座，化气为尊，主忠厚有威仪，独行其道。男命女命皆喜紫微守命，但需有左辅右弼来朝，方为正格。',
          translation: 'Tử Vi là chủ Bắc Đẩu, thống lĩnh các sao. Tử Vi hành Thổ, là sao tôn quý. Trong số là đế tọa, hóa khí là tôn, chủ trung hậu, có uy nghi, tự đi đường mình. Mệnh nam hay nữ đều thích Tử Vi thủ Mệnh, nhưng cần có Tả Phù, Hữu Bật chầu về mới là chính cách.',
        },
        {
          id: 'qj-2-2',
          idx: 2,
          text: '紫微独坐，需有左右昌曲魁钺夹持方能为用——单身无依的紫微，纵贵不久；得三方四正之吉星会照，方为君臣庆会大格。',
          translation: 'Tử Vi ngồi một mình cần có Tả Hữu, Xương Khúc, Khôi Việt giáp phò mới dùng được — Tử Vi đơn độc không chỗ dựa thì dù quý cũng không lâu; được cát tinh ở tam phương tứ chính hội chiếu mới là đại cách "Quân thần khánh hội".',
        },
        {
          id: 'qj-2-3',
          idx: 3,
          text: '紫微入命，兄弟有贵气，独立挺秀，多得长兄之助；紫微在子女，子女有贵气，但管教需平等；紫微在夫妻，配偶端庄，但宜迟婚不宜早。',
          translation: 'Tử Vi vào Mệnh, anh em có quý khí, tự lập vững vàng, được anh cả giúp nhiều; Tử Vi ở Tử Tức, con cái có quý khí nhưng dạy dỗ cần công bằng; Tử Vi ở Phu Thê, người phối ngẫu đoan trang nhưng nên lấy muộn, không nên sớm. [Ghi chú: vế đầu có lẽ ý là Tử Vi ở cung Huynh Đệ.]',
        },
        {
          id: 'qj-2-4',
          idx: 4,
          text: '紫微在田宅，主有祖业又能自置，房产可作为致富之主轴；紫微在福德，精神层面追求格调、自尊感强；紫微在官禄，主大富贵，宜居高位。',
          translation: 'Tử Vi ở Điền Trạch, chủ có tổ nghiệp lại tự tạo thêm, nhà đất có thể là trục chính để làm giàu; Tử Vi ở Phúc Đức, đời sống tinh thần chuộng phong cách, lòng tự trọng cao; Tử Vi ở Quan Lộc, chủ đại phú quý, hợp ở ngôi cao.',
        },
      ],
    },
    {
      title: 'Quyển 3 · Luận sáu sao Nam Đẩu',
      subtitle: 'Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương — cách xếp nhóm này khác sách cổ (Thái Âm thuộc trung thiên; Tham Lang, Cự Môn thuộc Bắc Đẩu)',
      paragraphs: [
        {
          id: 'qj-3-1',
          idx: 1,
          text: '天府属土，南斗令星，乃禄库之主。天府独坐主品行端正、衣食无忧。天府与紫微同宫名"紫府同宫"，主尊贵。天府最喜见禄存，称"双禄朝垣"，主大富。',
          translation: 'Thiên Phủ hành Thổ, là lệnh tinh Nam Đẩu, chủ kho lộc. Thiên Phủ ngồi một mình chủ phẩm hạnh đoan chính, cơm áo không lo. Thiên Phủ đồng cung Tử Vi gọi là "Tử Phủ đồng cung", chủ tôn quý. Thiên Phủ thích nhất gặp Lộc Tồn, gọi là "Song Lộc triều viên", chủ đại phú.',
        },
        {
          id: 'qj-3-2',
          idx: 2,
          text: '太阴为中天主星，属水。太阴庙旺主田宅、富贵，落陷主劳碌、奔波。女命太阴最吉，主貌美贤淑。太阴在亥子主大富，太阴在午未则减力。',
          translation: 'Thái Âm là chủ tinh trung thiên, hành Thủy. Thái Âm miếu vượng chủ nhà đất, phú quý; hãm địa chủ lao lực, bôn ba. Mệnh nữ có Thái Âm là tốt nhất, chủ xinh đẹp hiền thục. Thái Âm ở Hợi, Tý chủ đại phú; ở Ngọ, Mùi thì giảm lực.',
        },
        {
          id: 'qj-3-3',
          idx: 3,
          text: '贪狼为桃花欲望之星，属木属水。贪狼主多才艺、社交广。贪狼逢火星称"火贪格"，逢铃星称"铃贪格"，皆主偏财横发。但贪狼忌空劫，主华而不实。',
          translation: 'Tham Lang là sao đào hoa, dục vọng, hành Mộc kiêm Thủy. Tham Lang chủ đa tài nghệ, giao thiệp rộng. Tham Lang gặp Hỏa Tinh gọi là cách "Hỏa Tham", gặp Linh Tinh gọi là "Linh Tham", đều chủ phát tài bất ngờ. Nhưng Tham Lang kỵ Không Kiếp, chủ hào nhoáng mà không thực.',
        },
        {
          id: 'qj-3-4',
          idx: 4,
          text: '巨门属水，化气为暗，主口舌是非。巨门为口才之星，宜律师、教师、传媒。巨门化禄主"以口生财"，化忌则口舌官非不断。巨门最忌与太阳同宫的丑未两宫，称"日月反背"。',
          translation: 'Cự Môn hành Thủy, hóa khí là ám, chủ khẩu thiệt thị phi. Cự Môn là sao ăn nói, hợp luật sư, giáo viên, truyền thông. Cự Môn hóa Lộc chủ "dùng miệng sinh tài", hóa Kỵ thì khẩu thiệt, kiện tụng không dứt. Cự Môn kỵ nhất cùng Thái Dương ở hai cung Sửu, Mùi, gọi là "Nhật Nguyệt phản bối". [Ghi chú: Cự Môn và Thái Dương chỉ đồng cung ở Dần, Thân; "Nhật Nguyệt phản bối" thường chỉ Thái Dương và Thái Âm cùng hãm địa.]',
        },
        {
          id: 'qj-3-5',
          idx: 5,
          text: '天相属水，化气为印，乃辅佐之星。天相忠厚老实，宜行政秘书法务。天相不喜独坐，最宜与紫微或廉贞同宫，借其威仪而成事。',
          translation: 'Thiên Tướng hành Thủy, hóa khí là ấn, là sao phò tá. Thiên Tướng trung hậu thật thà, hợp hành chính, thư ký, pháp vụ. Thiên Tướng không thích ngồi một mình, hợp nhất đồng cung Tử Vi hoặc Liêm Trinh, mượn uy nghi của họ mà thành việc.',
        },
        {
          id: 'qj-3-6',
          idx: 6,
          text: '天梁属土，化气为荫，乃老人之星。天梁主善良、慈悲、孤克、化解。天梁宜法律、医学、教育、宗教。天梁化科主名声，化禄反而虚浮。',
          translation: 'Thiên Lương hành Thổ, hóa khí là ấm, là sao của người già. Thiên Lương chủ lương thiện, từ bi, cô khắc, hóa giải. Thiên Lương hợp pháp luật, y học, giáo dục, tôn giáo. Thiên Lương hóa Khoa chủ danh tiếng, hóa Lộc lại thành hư phù.',
        },
      ],
    },
    {
      title: 'Quyển 4 · Luận sáu sao Bắc Đẩu',
      subtitle: 'Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc, Liêm Trinh, Phá Quân — cách xếp nhóm này khác sách cổ (Thái Dương thuộc trung thiên, Thiên Cơ thuộc Nam Đẩu)',
      paragraphs: [
        {
          id: 'qj-4-1',
          idx: 1,
          text: '紫微属土，已论于卷二。',
          translation: 'Tử Vi hành Thổ, đã luận ở quyển 2.',
        },
        {
          id: 'qj-4-2',
          idx: 2,
          text: '天机属木，化气为善，乃智慧之星。天机主聪明、机变、好动。天机入命，思维敏捷，宜咨询、策划、文教。天机最忌善变无主，需文昌文曲会照方能成器。',
          translation: 'Thiên Cơ hành Mộc, hóa khí là thiện, là sao trí tuệ. Thiên Cơ chủ thông minh, cơ biến, hiếu động. Thiên Cơ vào Mệnh thì tư duy nhanh nhạy, hợp tư vấn, hoạch định, văn giáo. Thiên Cơ kỵ nhất hay thay đổi không chủ kiến, cần Văn Xương, Văn Khúc hội chiếu mới thành tài.',
        },
        {
          id: 'qj-4-3',
          idx: 3,
          text: '太阳属火，化气为贵，乃男贵之星。太阳主名誉、公务、社交。太阳庙旺主大贵，落陷则劳而无获。太阳最宜在卯辰巳午之地，落于戌亥子丑则减力。',
          translation: 'Thái Dương hành Hỏa, hóa khí là quý, là sao quý của nam giới. Thái Dương chủ danh dự, việc công, giao tế. Thái Dương miếu vượng chủ đại quý, hãm địa thì vất vả mà không được gì. Thái Dương hợp nhất ở Mão, Thìn, Tỵ, Ngọ; rơi vào Tuất, Hợi, Tý, Sửu thì giảm lực.',
        },
        {
          id: 'qj-4-4',
          idx: 4,
          text: '武曲属金，化气为财，乃财星之主。武曲主刚毅果决，善理财经营。武曲化忌主手术血光、金属意外。武曲在丑未与七杀同宫，称"武曲七杀"格，主刚直武贵。',
          translation: 'Vũ Khúc hành Kim, hóa khí là tài, là chủ của tài tinh. Vũ Khúc chủ cương nghị quả quyết, giỏi quản lý tiền bạc, kinh doanh. Vũ Khúc hóa Kỵ chủ phẫu thuật, huyết quang, tai nạn kim khí. Vũ Khúc ở Sửu, Mùi đồng cung Thất Sát gọi là cách "Vũ Khúc Thất Sát", chủ cương trực, quý về nghiệp võ. [Ghi chú: Vũ Khúc và Thất Sát đồng cung ở Mão, Dậu; ở Sửu, Mùi là Vũ Khúc – Tham Lang.]',
        },
        {
          id: 'qj-4-5',
          idx: 5,
          text: '廉贞属火属木，化气为囚，乃次桃花之星。廉贞文武兼备，多才艺。廉贞化忌主血光官非、感情纠纷。廉贞与天相同宫为"廉相格"，主清廉之名。',
          translation: 'Liêm Trinh hành Hỏa kiêm Mộc, hóa khí là tù, là thứ đào hoa. Liêm Trinh văn võ song toàn, đa tài nghệ. Liêm Trinh hóa Kỵ chủ huyết quang, kiện tụng, rắc rối tình cảm. Liêm Trinh đồng cung Thiên Tướng là cách "Liêm Tướng", chủ có tiếng thanh liêm.',
        },
        {
          id: 'qj-4-6',
          idx: 6,
          text: '破军属水，化气为耗，乃破坏创新之星。破军主开创、变动、六亲缘薄。破军宜技术专长走天下。破军化禄称"破而后立"，主先散后聚。',
          translation: 'Phá Quân hành Thủy, hóa khí là hao, là sao phá cũ đổi mới. Phá Quân chủ khai sáng, biến động, duyên lục thân mỏng. Phá Quân hợp đi khắp nơi bằng chuyên môn kỹ thuật. Phá Quân hóa Lộc gọi là "phá rồi mới lập", chủ trước tán sau tụ.',
        },
      ],
    },
    {
      title: 'Quyển 5 · Luận Tứ Hóa và cách cục',
      subtitle: 'Sức của Tứ Hóa và các cách cục quan trọng',
      paragraphs: [
        {
          id: 'qj-5-1',
          idx: 1,
          text: '化禄主财源，主缘分，主能力变现。化禄入命三方，主财源广进；化禄入财帛，主财来财往，正财稳定。',
          translation: 'Hóa Lộc chủ nguồn tiền, chủ duyên, chủ biến năng lực thành của cải. Hóa Lộc vào tam phương của Mệnh, tiền tài dồi dào; vào Tài Bạch, tiền vào ra đều, chính tài ổn định.',
        },
        {
          id: 'qj-5-2',
          idx: 2,
          text: '化权主权力，主决断，主担当。化权入命，主能独当一面；化权入官禄，主事业有掌控力，宜走管理或技术权威路线。',
          translation: 'Hóa Quyền chủ quyền lực, quyết đoán, gánh vác. Hóa Quyền vào Mệnh chủ tự đảm đương một phương; vào Quan Lộc chủ nắm quyền trong sự nghiệp, hợp đường quản lý hoặc chuyên gia kỹ thuật.',
        },
        {
          id: 'qj-5-3',
          idx: 3,
          text: '化科主名声，主文书，主贵人。化科入命，主名声远播；化科入身，主以名取利，宜文教、研究、咨询。',
          translation: 'Hóa Khoa chủ danh tiếng, văn thư, quý nhân. Hóa Khoa vào Mệnh chủ danh tiếng vang xa; vào cung Thân chủ nhờ danh mà được lợi, hợp văn giáo, nghiên cứu, tư vấn.',
        },
        {
          id: 'qj-5-4',
          idx: 4,
          text: '化忌主病，主煞，主深刻功课。化忌入命三方，主一生有"钝点"——这是命格里最深的功课，过得了就是大智慧。三十岁前后是化忌最锋利的时候。',
          translation: 'Hóa Kỵ chủ bệnh, chủ sát, chủ bài học sâu sắc. Hóa Kỵ vào tam phương của Mệnh, chủ một đời có một "điểm vướng" — đó là bài học sâu nhất trong mệnh, vượt qua được là đại trí tuệ. Khoảng ba mươi tuổi là lúc Hóa Kỵ sắc bén nhất.',
        },
        {
          id: 'qj-5-5',
          idx: 5,
          text: '紫府同宫格：紫微天府同入命宫，主品行端正、衣食无忧、有领导才能。需要左右辅弼来配合方为完整大格。',
          translation: 'Cách Tử Phủ đồng cung: Tử Vi, Thiên Phủ cùng vào cung Mệnh, chủ phẩm hạnh đoan chính, cơm áo không lo, có tài lãnh đạo. Cần Tả Phù, Hữu Bật phối hợp mới thành đại cách trọn vẹn.',
        },
        {
          id: 'qj-5-6',
          idx: 6,
          text: '七杀朝斗格：七杀居子午寅申宫坐命，对宫紫微天府相照，主爵禄荣昌——武职大贵，最宜军警政界或企业高管。',
          translation: 'Cách Thất Sát triều Đẩu: Thất Sát thủ Mệnh ở Tý, Ngọ, Dần, Thân, cung đối có Tử Vi, Thiên Phủ chiếu, chủ tước lộc vinh xương — võ chức đại quý, hợp nhất quân đội, công an, chính trường hoặc lãnh đạo doanh nghiệp.',
        },
        {
          id: 'qj-5-7',
          idx: 7,
          text: '双禄朝垣格：化禄、禄存同会命宫三方四正，财源涌动、衣食丰足。古云"双禄朝垣，富比陶朱"，主一生不愁财。',
          translation: 'Cách Song Lộc triều viên: Hóa Lộc, Lộc Tồn cùng hội ở tam phương tứ chính của Mệnh, tiền tài dồi dào, cơm áo sung túc. Người xưa nói "Song Lộc triều viên, giàu như Đào Chu", chủ một đời không lo tiền.',
        },
        {
          id: 'qj-5-8',
          idx: 8,
          text: '机月同梁格：天机、太阴、天同、天梁四星齐入命迁财官，主文质彬彬、聪慧善谋。最适合公职、学术、文艺、医疗、服务等需稳定累积的行业。',
          translation: 'Cách Cơ Nguyệt Đồng Lương: Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương cùng vào Mệnh, Thiên Di, Tài Bạch, Quan Lộc, chủ nho nhã, thông minh, giỏi mưu tính. Hợp nhất việc công, học thuật, văn nghệ, y tế, dịch vụ — những nghề cần tích lũy ổn định.',
        },
        {
          id: 'qj-5-9',
          idx: 9,
          text: '杀破狼格：七杀、破军、贪狼三星会命，主一生变动多、不甘平凡，宜创业、军警、业务、销售。中年后才能稳定守成。',
          translation: 'Cách Sát Phá Tham: Thất Sát, Phá Quân, Tham Lang cùng hội ở Mệnh, chủ một đời nhiều biến động, không cam tầm thường, hợp khởi nghiệp, quân đội, kinh doanh, bán hàng. Trung niên trở đi mới ổn định giữ thành quả.',
        },
        {
          id: 'qj-5-10',
          idx: 10,
          text: '日月同宫格：太阳太阴同入丑宫或未宫，主异性缘佳、事业顺遂、名声远播。丑宫力较平，未宫力略减。',
          translation: 'Cách Nhật Nguyệt đồng cung: Thái Dương, Thái Âm cùng ở cung Sửu hoặc Mùi, chủ duyên với người khác giới tốt, sự nghiệp thuận, danh tiếng vang xa. Ở Sửu lực khá bình, ở Mùi lực hơi giảm.',
        },
      ],
    },
  ],
};
