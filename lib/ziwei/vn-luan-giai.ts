/**
 * Luận giải tĩnh tiếng Việt: 14 chính tinh × 12 cung + phụ tinh, Tứ Hóa, độ sáng.
 * Khóa là tên Hán của engine; hiển thị tên Việt qua vi().
 * Nội dung soạn theo ý nghĩa phổ thông của Tử Vi, chỉ mang tính tham khảo.
 */
import type { Palace, SiHua, ZiweiChart } from './types';
import { BRANCHES, SI_HUA_TABLE, STEMS, tamPhuongTuChinh } from './constants';
import { vi, viHoa } from './vi';
import { baiLuan } from './metis';

/** Thứ tự cung dùng cho mảng 12 câu của từng sao (tên cung iztro zh-CN) */
export const CUNG = ['命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄', '迁移', '仆役', '官禄', '田宅', '福德', '父母'];

export const CUNG_Y_NGHIA: Record<string, string> = {
  '命宫': 'tính cách, tư chất và hướng đi chung của cả cuộc đời',
  '兄弟': 'anh chị em, bạn thân và người cùng hợp tác',
  '夫妻': 'tình cảm, hôn nhân và người phối ngẫu',
  '子女': 'con cái, học trò và người dưới gần gũi',
  '财帛': 'tiền bạc, cách kiếm tiền và tiêu tiền',
  '疾厄': 'sức khỏe, bệnh tật và tai ách',
  '迁移': 'ra ngoài, đi xa và môi trường xã hội',
  '仆役': 'bạn bè, đồng nghiệp, cấp dưới',
  '官禄': 'công danh, sự nghiệp, nghề nghiệp',
  '田宅': 'nhà cửa, đất đai, tài sản tích lũy',
  '福德': 'đời sống tinh thần, hưởng thụ và phúc đức dòng họ',
  '父母': 'cha mẹ, cấp trên, giấy tờ và học vấn',
};

export const SAO_TINH_CHAT: Record<string, string> = {
  '紫微': 'Đế tinh, hành Thổ — tôn quý, có khả năng lãnh đạo, tự trọng cao; cần cát tinh phò trợ mới phát huy hết.',
  '天机': 'Thiện tinh, hành Mộc — mưu trí, linh hoạt, giỏi tính toán, nhưng hay thay đổi và lo nghĩ.',
  '太阳': 'Quý tinh, hành Hỏa — nhiệt tình, rộng lượng, trọng danh hơn lợi; sáng thì rạng rỡ, hãm thì vất vả.',
  '武曲': 'Tài tinh, hành Kim — cương quyết, thực tế, giỏi tài chính, tính hơi cứng.',
  '天同': 'Phúc tinh, hành Thủy — hiền hòa, lạc quan, biết hưởng thụ, đôi khi thiếu quyết đoán.',
  '廉贞': 'Tù tinh, hành Hỏa (kiêm Mộc) — mạnh mẽ, nguyên tắc, đa tài, cảm xúc mãnh liệt; tốt thì liêm chính, xấu thì dễ vướng thị phi.',
  '天府': 'Lệnh tinh (kho), hành Thổ — ổn trọng, giỏi giữ của, thích an toàn, hơi bảo thủ.',
  '太阴': 'Phú tinh, hành Thủy — dịu dàng, tinh tế, giỏi tích lũy, giàu tình cảm.',
  '贪狼': 'Đào hoa tinh, hành Mộc (kiêm Thủy) — đa tài, giao thiệp rộng, ham muốn và tham vọng lớn.',
  '巨门': 'Ám tinh, hành Thủy — giỏi ăn nói, phân tích sâu, hay hoài nghi, dễ thị phi khẩu thiệt.',
  '天相': 'Ấn tinh, hành Thủy — chính trực, đáng tin, thích giúp người; tốt xấu tùy sao xung quanh.',
  '天梁': 'Ấm tinh, hành Thổ — nhân hậu, che chở, phong thái người thầy, gặp hung hóa cát.',
  '七杀': 'Tướng tinh, hành Kim (kiêm Hỏa) — dũng mãnh, độc lập, dám làm, đời nhiều thăng trầm.',
  '破军': 'Hao tinh, hành Thủy — phá cũ lập mới, thích thay đổi, mạo hiểm, dễ hao tán.',
};

/** 12 câu theo thứ tự CUNG */
export const LUAN_GIAI: Record<string, string[]> = {
  '紫微': [
    'Phong thái đường hoàng, tự trọng, có khả năng lãnh đạo và thích được tôn trọng. Gặp nhiều cát tinh phò trợ thì công danh hiển đạt; thiếu trợ lực thì dễ cô độc, tự cao.',
    'Anh chị em có người tài giỏi hoặc có địa vị, nhưng mỗi người một ý, ít chịu nhường nhau. Hợp tác nên phân rõ vai trò.',
    'Người phối ngẫu có cá tính mạnh, có năng lực hoặc địa vị; trong nhà thường người kia nắm quyền. Tôn trọng nhau để tránh tranh vai trò.',
    'Con cái thông minh, có chí nhưng tự lập và khó bảo; con đầu thường xuất sắc. Nên dạy con bằng sự tôn trọng hơn là áp đặt.',
    'Tiền bạc khá vững, có cơ hội từ địa vị hoặc quan hệ cấp cao; tiêu tiền rộng rãi, thích dùng đồ tốt. Hợp quản lý tài chính lớn hơn buôn bán nhỏ lẻ.',
    'Thể chất khá, nhưng cần để ý tỳ vị, tiêu hóa và áp lực tinh thần do ôm việc. Nên ăn uống điều độ, giữ tinh thần thư thái.',
    'Ra ngoài được người nể trọng, dễ gặp quý nhân có địa vị; làm việc ở nơi khác thường thuận lợi hơn ở quê.',
    'Bạn bè, cấp dưới có người giỏi nhưng cá tính mạnh, khó sai khiến. Cần dùng uy tín và sự công bằng để quy tụ người.',
    'Sự nghiệp có tiềm năng lớn, hợp vai trò quản lý, lãnh đạo, làm trong tổ chức lớn hoặc nhà nước. Gặp cát tinh dễ thăng tiến cao.',
    'Có phúc về nhà cửa đất đai, dễ sở hữu nhà đẹp, ở nơi khang trang; gia đình có nề nếp.',
    'Đời sống tinh thần đầy đủ, lý tưởng cao, nhưng hay suy nghĩ nhiều và tự tạo áp lực. Dòng họ có phúc ấm.',
    'Cha mẹ có địa vị hoặc nghiêm khắc, kỳ vọng nhiều; được cấp trên coi trọng. Quan hệ với cha mẹ cần mềm mỏng.',
  ],
  '天机': [
    'Thông minh, nhanh nhạy, giỏi suy tính và lên kế hoạch; tâm tính hay thay đổi, ít chịu ngồi yên. Hợp vai trò tham mưu, kỹ thuật, nghiên cứu hơn là trực tiếp chỉ huy.',
    'Anh em ít hoặc mỗi người mỗi nơi, quan hệ lúc gần lúc xa. Bạn bè có người khéo léo, mưu trí.',
    'Người phối ngẫu thông minh, nhanh nhẹn, trẻ trung; tình cảm dễ biến động lúc đầu. Kết hôn muộn một chút thường bền hơn.',
    'Con cái lanh lợi, học nhanh nhưng hiếu động, dễ đổi sở thích; số con không nhiều.',
    'Kiếm tiền bằng trí óc, kỹ năng, tư vấn; tiền vào ra linh hoạt, không đều. Hợp nghề chuyên môn hơn đầu cơ.',
    'Cần chú ý gan, mật, hệ thần kinh, tay chân; dễ mất ngủ, căng thẳng vì suy nghĩ nhiều.',
    'Hay di chuyển, đổi chỗ làm, chỗ ở; ra ngoài nhờ đầu óc linh hoạt mà xoay xở tốt.',
    'Bạn bè nhiều kiểu, quen nhanh nhưng cũng dễ xa; nên chọn bạn mà chơi.',
    'Hợp công việc kế hoạch, kỹ thuật, công nghệ, giáo dục, tư vấn, thiết kế; sự nghiệp hay đổi hướng.',
    'Nhà cửa hay thay đổi, dễ chuyển chỗ ở; nhà đất tăng giảm theo từng giai đoạn.',
    'Đầu óc luôn hoạt động, thích tìm hiểu, ít khi thật sự nghỉ ngơi; dễ lo nghĩ.',
    'Cha mẹ tinh tế, hiểu biết; có thể sớm xa nhà hoặc ít gần gũi. Với cấp trên cần khéo léo.',
  ],
  '太阳': [
    'Nhiệt tình, rộng lượng, thẳng thắn, thích giúp người, trọng danh dự hơn tiền bạc. Thái Dương sáng thì danh tiếng rạng rỡ; hãm thì vất vả, làm nhiều mà ít được ghi nhận.',
    'Anh em, nhất là anh em trai, có người giỏi giang; bản thân thường là người lo toan cho anh em.',
    'Người phối ngẫu cởi mở, năng động, bận rộn công việc. Nữ mệnh thường có chồng có sự nghiệp; Thái Dương hãm thì tình cảm dễ trắc trở, nên kết hôn muộn.',
    'Con cái hoạt bát, có chí, con trai thường nổi trội; quan hệ với con cởi mở.',
    'Kiếm tiền nhờ danh tiếng và quan hệ, tiền đến từ hoạt động công khai; dễ hào phóng tiêu cho người khác.',
    'Cần chú ý mắt, tim mạch, huyết áp, đầu; tránh làm việc quá sức.',
    'Ra ngoài được nhiều người biết đến, hợp môi trường rộng, đi xa, làm việc với nước ngoài.',
    'Giao thiệp rộng, bạn bè nhiều, nhưng thường mình giúp người nhiều hơn người giúp mình.',
    'Hợp công việc có tính xã hội: nhà nước, chính trị, giáo dục, truyền thông, ngoại giao, năng lượng. Sáng thì danh vọng lớn.',
    'Nhà cửa sáng sủa, có thể được hưởng nhà đất từ cha ông; Thái Dương hãm thì nhà đất dễ hao tán.',
    'Tinh thần lạc quan, thích hoạt động, nhưng hay bận rộn vì việc của người khác.',
    'Cha có ảnh hưởng lớn; sáng thì cha khỏe mạnh, có địa vị; hãm thì nên quan tâm sức khỏe của cha.',
  ],
  '武曲': [
    'Cương nghị, thẳng thắn, thực tế, quyết đoán, có năng khiếu tài chính. Tính hơi cứng, ít nói lời ngọt; nữ mệnh là người đảm đang, tự lập.',
    'Anh em ít hòa hợp, dễ bất đồng về tiền bạc; hợp tác nên rạch ròi sổ sách.',
    'Người phối ngẫu cứng rắn, giỏi kiếm tiền nhưng ít lãng mạn; dễ va chạm, nên kết hôn muộn.',
    'Con cái có cá tính mạnh, tự lập sớm; số con ít.',
    'Tài tinh ở đúng chỗ: kiếm tiền và quản lý tiền giỏi, hợp ngân hàng, tài chính, kinh doanh. Gặp Hóa Kỵ hay sát tinh thì đề phòng mất tiền vì đầu tư mạo hiểm.',
    'Cần chú ý phổi, hô hấp, răng xương; dễ có thương tích nhỏ do kim khí, phẫu thuật.',
    'Ra ngoài vất vả nhưng có tiền, hợp làm ăn xa, buôn bán.',
    'Bạn bè thực tế, quan hệ thiên về công việc; cẩn trọng khi cho vay mượn.',
    'Hợp tài chính, kế toán, ngân hàng, kinh doanh, cơ khí, quân đội; chăm chỉ, có thành tựu thực tế.',
    'Tự mua được nhà đất bằng sức mình, tài sản tích lũy dần.',
    'Lao tâm vì công việc và tiền bạc, ít thời gian hưởng thụ; nên học cách nghỉ ngơi.',
    'Cha mẹ nghiêm, kỳ vọng cao; quan hệ có thể hơi xa cách.',
  ],
  '天同': [
    'Hiền hòa, dễ gần, lạc quan, biết hưởng thụ, trọng tình cảm. Tuổi trẻ thường vất vả, càng về sau càng an nhàn; nhược điểm là thiếu quyết đoán, dễ an phận.',
    'Anh em hòa thuận, giúp đỡ nhau; số anh em khá đông.',
    'Vợ chồng hòa thuận, người phối ngẫu hiền lành, tình cảm. Cả hai dễ dĩ hòa vi quý, việc lớn cần chủ động hơn.',
    'Con cái ngoan, hiền, gần gũi cha mẹ; về già được nhờ con.',
    'Tiền bạc đủ dùng, lập nghiệp từ tay trắng, đầu vất vả sau ổn; không hợp đầu cơ mạo hiểm.',
    'Cần chú ý thận, bàng quang, hệ bài tiết; dễ tăng cân vì thích ăn uống.',
    'Ra ngoài được người quý mến, dễ hòa nhập nơi mới.',
    'Bạn bè hòa nhã, đông vui, ít tranh chấp; lúc khó có người giúp.',
    'Hợp dịch vụ, chăm sóc, nghệ thuật, ẩm thực, giáo dục; lúc đầu hay đổi việc, về sau ổn định.',
    'Nhà cửa ấm cúng; ban đầu ít tài sản, về sau tự mua sắm dần.',
    'Có phúc hưởng thụ, tâm tính thoải mái, biết tận hưởng cuộc sống.',
    'Cha mẹ hiền, gia đình êm ấm.',
  ],
  '廉贞': [
    'Mạnh mẽ, có nguyên tắc, đa tài, cảm xúc sâu và mãnh liệt; tốt thì liêm chính, có tài quản lý, xấu thì nóng nảy, dễ vướng thị phi. Cần kiềm chế cảm xúc.',
    'Anh em ít hòa hợp, dễ bất đồng; ai cũng có cá tính.',
    'Tình cảm mãnh liệt nhưng dễ sóng gió, hay ghen hoặc tranh cãi; nên kết hôn muộn và học cách nhường nhịn.',
    'Con cái có cá tính, thông minh nhưng khó dạy; số con ít.',
    'Tiền kiếm bằng năng lực và công sức, có lúc thăng trầm; tránh xa tiền bạc mờ ám.',
    'Cần chú ý tim mạch, máu, hệ sinh dục, viêm nhiễm; nữ mệnh chú ý bệnh phụ khoa.',
    'Ra ngoài năng động, nhiều cơ hội nhưng cũng dễ gặp thị phi; cần giữ chữ tín.',
    'Bạn bè phức tạp, có tốt có xấu; dễ bị liên lụy vì bạn.',
    'Hợp quản lý, pháp luật, quân đội, công an, điện tử, chính trị; có năng lực nhưng nên làm việc minh bạch.',
    'Nhà cửa có lúc biến động; mua bán nhà đất cần chặt chẽ giấy tờ pháp lý.',
    'Tâm tư nhiều, khó yên, hay giữ cảm xúc trong lòng; nên tìm cách giải tỏa lành mạnh.',
    'Cha mẹ nghiêm khắc hoặc ít hợp ý; cẩn thận giấy tờ, hợp đồng.',
  ],
  '天府': [
    'Ổn trọng, chín chắn, rộng lượng, giỏi quản lý và giữ của; thích an toàn, đôi khi bảo thủ. Đời sống thường đầy đủ, ít khi túng thiếu.',
    'Anh em đông, hòa thuận, giúp đỡ nhau về vật chất.',
    'Người phối ngẫu chín chắn, biết lo toan, có điều kiện; hôn nhân ổn định.',
    'Con cái ngoan, có hiếu, sự nghiệp ổn định.',
    'Giỏi tích lũy, tiền vào nhiều hơn ra; hợp quản lý tài sản, ngân hàng, bất động sản.',
    'Sức khỏe khá tốt; cần chú ý dạ dày, tỳ vị, tránh ăn uống quá độ.',
    'Ra ngoài được tín nhiệm, có người giúp; đi xa mang lại lợi ích vật chất.',
    'Bạn bè và cấp dưới đáng tin, giúp đỡ thực chất.',
    'Hợp quản lý, hành chính, tài chính, kế toán, doanh nghiệp lớn; sự nghiệp vững, tiến chậm mà chắc.',
    'Có phúc về nhà đất, dễ tích lũy bất động sản.',
    'Biết hưởng thụ, tinh thần an ổn, sống thực tế.',
    'Cha mẹ có điều kiện, được gia đình hỗ trợ.',
  ],
  '太阴': [
    'Dịu dàng, tinh tế, sống nội tâm, giàu tình cảm và óc thẩm mỹ, giỏi tích lũy. Thái Âm sáng thì giàu có, thanh nhã; hãm thì hay ưu tư, đa sầu.',
    'Có duyên với chị em gái; anh em hòa nhã, tình cảm.',
    'Người phối ngẫu dịu dàng, chu đáo; nam mệnh thường có vợ đẹp, đảm. Thái Âm hãm thì tình cảm dễ buồn phiền.',
    'Con cái hiền, tình cảm, con gái thường tốt; con gần gũi mẹ.',
    'Giỏi tích cóp, tiền tích lũy chậm mà chắc; hợp bất động sản, tiết kiệm, ngành hàng cho phụ nữ, nghệ thuật.',
    'Cần chú ý thận, nội tiết, mắt; nữ mệnh chú ý kinh nguyệt, phụ khoa.',
    'Ra ngoài được người quý mến, nhất là được phụ nữ giúp đỡ; hợp đi xa.',
    'Bạn bè tình cảm, có nhiều bạn nữ; hay vì tình mà bị ảnh hưởng.',
    'Hợp công việc tỉ mỉ, nhẹ nhàng: tài chính, bất động sản, thiết kế, nghệ thuật, văn phòng, giáo dục.',
    'Rất tốt cho nhà đất, dễ tích lũy bất động sản; nhà cửa đẹp, yên tĩnh.',
    'Nội tâm phong phú, thích yên tĩnh, thơ ca, nghệ thuật; đôi khi buồn vô cớ.',
    'Mẹ có ảnh hưởng lớn; sáng thì mẹ khỏe, hiền; hãm thì nên quan tâm sức khỏe của mẹ.',
  ],
  '贪狼': [
    'Đa tài đa nghệ, giao thiệp giỏi, có duyên, ham học hỏi và ham hưởng thụ. Tham vọng lớn, dễ thành công trong môi trường giao tế; cần tiết chế ham muốn, tránh rượu chè cờ bạc.',
    'Anh em ít gắn bó, mỗi người lo việc riêng, ít giúp được nhau.',
    'Tình duyên nhiều màu sắc, có sức hút với người khác giới, dễ biến động tình cảm. Nên chung thủy và kết hôn muộn.',
    'Con cái thông minh, đa tài nhưng ham chơi; cần định hướng sớm.',
    'Kiếm tiền nhờ giao thiệp, kinh doanh, giải trí; tiền đến nhanh đi cũng nhanh. Gặp Hỏa Tinh, Linh Tinh dễ có tiền bất ngờ.',
    'Cần chú ý gan, thận, hệ sinh dục; tránh rượu bia và sinh hoạt quá độ.',
    'Ra ngoài giao du rộng, nhiều cơ hội; hợp kinh doanh, ngoại giao, đi xa.',
    'Bạn bè đông, nhiều bạn ăn chơi; dễ vì bạn mà hao tổn.',
    'Hợp kinh doanh, giải trí, nghệ thuật, nhà hàng, quảng cáo, ngoại giao, thời trang.',
    'Nhà đất lúc tăng lúc giảm; về sau tự gây dựng được.',
    'Thích hưởng thụ, vui chơi, nhiều ham muốn; nên có thú vui lành mạnh để cân bằng.',
    'Quan hệ với cha mẹ không quá gắn bó; cha mẹ hoặc cấp trên có tính hướng ngoại.',
  ],
  '巨门': [
    'Ăn nói giỏi, óc phân tích sắc, hay nghi ngờ và thích đào sâu; dễ gây hiểu lầm vì nói thẳng. Hợp nghề dùng lời nói; cần thận trọng khẩu thiệt thị phi.',
    'Anh em dễ bất đồng, cãi vã; tránh hợp tác tiền bạc với người thân.',
    'Vợ chồng dễ khắc khẩu, hiểu lầm; cần lắng nghe và nói chuyện nhẹ nhàng. Kết hôn muộn tốt hơn.',
    'Con cái thông minh, hay hỏi nhưng khó bảo; cần kiên nhẫn trò chuyện với con.',
    'Kiếm tiền bằng lời nói và chuyên môn: luật, giảng dạy, tư vấn, bán hàng; tránh tranh chấp tiền bạc.',
    'Cần chú ý tiêu hóa, dạ dày, miệng, họng, hô hấp.',
    'Ra ngoài dễ gặp thị phi, cạnh tranh; nhưng cũng có cơ hội nhờ tài ăn nói.',
    'Bạn bè dễ sinh hiềm khích, nói sau lưng; nên giữ lời, kín đáo.',
    'Hợp luật sư, giáo viên, truyền thông, MC, tư vấn, bán hàng, nghiên cứu, y dược.',
    'Ban đầu ít nhà đất, dễ có tranh chấp nhà đất; cần giấy tờ rõ ràng.',
    'Hay suy nghĩ, lo âu, khó thoải mái; nên học cách buông bỏ.',
    'Dễ bất đồng quan điểm với cha mẹ; cẩn thận giấy tờ, kiện tụng.',
  ],
  '天相': [
    'Chính trực, đáng tin, có trách nhiệm, thích giúp đỡ và giữ hòa khí; ăn mặc chỉnh tề. Chịu ảnh hưởng mạnh từ các sao xung quanh, tốt xấu tùy cục diện chung.',
    'Anh em hòa thuận, hỗ trợ lẫn nhau.',
    'Người phối ngẫu đứng đắn, biết chăm lo; hôn nhân khá ổn định.',
    'Con cái ngoan, biết điều, có hiếu.',
    'Tiền bạc ổn định, đủ dùng; kiếm tiền nhờ uy tín, hợp làm công ăn lương hoặc dịch vụ.',
    'Cần chú ý da, thận, bàng quang; nhìn chung sức khỏe ổn.',
    'Ra ngoài được người tin cậy, gặp quý nhân giúp đỡ.',
    'Bạn bè tốt, đáng tin; cấp dưới tận tụy.',
    'Hợp hành chính, thư ký, trợ lý, nhân sự, ngoại giao, dịch vụ; là cánh tay phải đắc lực.',
    'Nhà cửa ổn định, có thể thừa hưởng tài sản gia đình.',
    'Tinh thần an ổn, biết đủ, thích sự chỉn chu.',
    'Cha mẹ hiền, gia đình tốt; được cấp trên tin tưởng.',
  ],
  '天梁': [
    'Nhân hậu, chín chắn, thích che chở người khác, có phong thái người thầy; gặp hung thường hóa cát. Đôi khi hơi cô độc, thích lý luận, giáo huấn.',
    'Anh em hòa thuận, bản thân thường đóng vai người lo toan.',
    'Người phối ngẫu chín chắn, có thể lớn tuổi hơn, biết chăm sóc; nên tránh tính gia trưởng.',
    'Con cái ngoan, chững chạc; có thể muộn con.',
    'Tiền bạc đủ dùng, không màng tiền lớn; hợp kiếm tiền từ chuyên môn, y tế, bảo hiểm, phục vụ.',
    'Sức khỏe khá tốt, ốm đau dễ gặp thầy giỏi; chú ý dạ dày, gan.',
    'Ra ngoài được người lớn tuổi, quý nhân giúp đỡ; đi xa bình an.',
    'Bạn bè tốt, thường là người lớn tuổi hoặc có học thức.',
    'Hợp y tế, giáo dục, pháp luật, bảo hiểm, công tác xã hội, nghiên cứu; sự nghiệp ổn định, có uy tín.',
    'Được hưởng phúc ấm, có thể thừa hưởng nhà đất của gia đình.',
    'Tâm thanh tịnh, thích tìm hiểu triết lý, tôn giáo; có phúc thọ.',
    'Cha mẹ thọ, được cha mẹ che chở.',
  ],
  '七杀': [
    'Dũng cảm, quyết đoán, độc lập, dám nghĩ dám làm, không chịu khuất phục; đời nhiều thăng trầm, phải tự lực vươn lên. Cần bớt nóng vội, cố chấp.',
    'Anh em ít, ai cũng tự lập; dễ bất đồng.',
    'Tình cảm dễ va chạm vì cả hai đều mạnh; nên kết hôn muộn và tôn trọng không gian riêng.',
    'Con cái cá tính mạnh, độc lập sớm; số con ít.',
    'Kiếm tiền bằng sức lực và sự dám liều, tiền lúc nhiều lúc ít; tránh đầu tư nóng vội.',
    'Cần chú ý phổi, đường ruột, thương tích; thời nhỏ dễ ốm vặt.',
    'Ra ngoài vất vả nhưng có thành tựu, hợp lập nghiệp xa quê.',
    'Bạn bè ít hợp, dễ va chạm với cấp dưới; nên dùng ân hơn dùng uy.',
    'Hợp quân đội, công an, kỹ thuật, khởi nghiệp, kinh doanh mạo hiểm, thể thao; sự nghiệp có bước ngoặt lớn.',
    'Lúc đầu ít nhà đất, phải tự gây dựng; có thể hay đổi chỗ ở.',
    'Tâm tính không yên, hay lo việc lớn, lao tâm khổ tứ.',
    'Quan hệ với cha mẹ có thể xa cách hoặc ít hợp; tự lập sớm.',
  ],
  '破军': [
    'Thích đổi mới, phá cách, dám mạo hiểm, không theo lối mòn; đời nhiều biến động, phá rồi lập. Cần kiên nhẫn và tiết chế chi tiêu.',
    'Anh em ít gắn bó, dễ hao tốn vì anh em.',
    'Tình cảm nhiều biến động, dễ hợp tan; nên kết hôn muộn và chọn người hiểu mình.',
    'Con cái hiếu động, cá tính; có thể muộn con hoặc con đầu khó nuôi.',
    'Tiền vào ra mạnh, dễ hao tán; hợp làm ăn đổi mới nhưng phải quản lý chi tiêu chặt.',
    'Cần chú ý thận, hệ bài tiết, sinh dục; dễ có tai nạn, thương tích nhỏ.',
    'Ra ngoài nhiều biến động, hợp đi xa lập nghiệp, đổi môi trường.',
    'Bạn bè hay thay đổi, dễ bị bạn làm hao tốn.',
    'Hợp công việc đổi mới, khởi nghiệp, quân đội, kỹ thuật, vận tải, xây dựng; hay đổi nghề.',
    'Nhà cửa hay thay đổi, tài sản tổ tiên khó giữ; tự lập mua nhà mới.',
    'Tâm không yên, thích thay đổi, khó hài lòng; nên tìm thú vui ổn định.',
    'Sớm tự lập, có khoảng cách với cha mẹ; cẩn thận giấy tờ.',
  ],
};

export const PHU_TINH: Record<string, string> = {
  '左辅': 'có người trợ giúp, quý nhân ngang hàng',
  '右弼': 'có người trợ giúp, quý nhân ngang hàng',
  '文昌': 'học vấn, thi cử, văn chương',
  '文曲': 'khéo ăn nói, năng khiếu nghệ thuật',
  '天魁': 'quý nhân nâng đỡ, cơ hội từ người trên',
  '天钺': 'quý nhân nâng đỡ, cơ hội từ người trên',
  '禄存': 'tài lộc, giữ của, hơi bảo thủ',
  '天马': 'di chuyển, thay đổi, năng động',
  '擎羊': 'cạnh tranh, va chạm, dễ thương tích nhỏ',
  '陀罗': 'trì trệ, dây dưa, việc kéo dài khó dứt',
  '火星': 'nóng vội, biến cố bất ngờ',
  '铃星': 'nóng vội, biến cố bất ngờ',
  '地空': 'hao tán, ý tưởng khác người',
  '地劫': 'hao tán, khó giữ tiền',
  '红鸾': 'hỷ sự, duyên tình',
  '天喜': 'hỷ sự, niềm vui',
  '旬空': 'giảm lực các sao trong cung: tốt giảm tốt, xấu giảm xấu',
  '副旬': 'giảm lực các sao trong cung: tốt giảm tốt, xấu giảm xấu',
  '截空': 'cản trở, giảm lực các sao trong cung',
  '副截': 'cản trở, giảm lực các sao trong cung',
};

export const HOA_Y_NGHIA: Record<SiHua, string> = {
  '禄': 'thêm tài lộc, cơ hội và thuận lợi',
  '权': 'tăng quyền lực, sự chủ động và tiếng nói',
  '科': 'danh tiếng, học vấn, gặp quý nhân giải nguy',
  '忌': 'dễ vướng trở ngại, thị phi, lo nghĩ — cần thận trọng',
};

/** Danh từ ngắn cho chuyện mỗi cung nói tới, dùng trong câu luận */
export const CUNG_CHU_DE: Record<string, string> = {
  '命宫': 'bản thân bạn', '兄弟': 'chuyện anh chị em', '夫妻': 'đường tình duyên', '子女': 'chuyện con cái',
  '财帛': 'tiền bạc', '疾厄': 'sức khỏe', '迁移': 'việc ra ngoài, đi xa', '仆役': 'bạn bè, cấp dưới',
  '官禄': 'sự nghiệp', '田宅': 'nhà cửa, đất đai', '福德': 'đời sống tinh thần', '父母': 'chuyện cha mẹ, cấp trên',
};

/**
 * 24 cặp chính tinh có thể đứng chung một cung (đã đối chiếu engine: đúng 24 cặp, mỗi cặp chỉ ở 2 ô).
 * Nội dung theo các khẩu quyết phổ biến trong Toàn Thư / Cốt Tủy Phú, diễn lại bằng lời thường.
 */
const CAP: [string, string, string][] = [
  ['紫微', '天府', 'Tử Phủ đồng cung (ô Dần, Thân): sao vua gặp sao giữ kho, chủ tôn quý, đời sống đầy đủ, có tài quản lý và giữ của. Điểm yếu là tự tin quá thành cố chấp, ít nghe người khác; cần Tả Phù, Hữu Bật phò trợ mới phát hết.'],
  ['紫微', '贪狼', 'Tử Tham (ô Mão, Dậu), sách xưa gọi là "đào hoa phạm chủ": đa tài, khéo giao thiệp, có sức hút, nhưng ham vui, dễ sa vào tình cảm và hưởng thụ. Biết tiết chế thì thành người giỏi quan hệ, quản lý.'],
  ['紫微', '天相', 'Tử Tướng (ô Thìn, Tuất): đứng đắn, có trách nhiệm, giỏi quản lý, giữ nề nếp. Thìn, Tuất là đất "Thiên La, Địa Võng" nên hay bị ràng buộc, việc thành chậm; cung đối diện luôn là Phá Quân nên cũng có lúc muốn phá khuôn, làm mới.'],
  ['紫微', '七杀', 'Tử Sát (ô Tỵ, Hợi), sách xưa nói Tử Vi gặp Thất Sát thì "hóa sát thành quyền": có uy, quyết đoán, dám gánh việc lớn, hợp lãnh đạo, quản lý. Tính nóng vội, ít nhân nhượng.'],
  ['紫微', '破军', 'Tử Phá (ô Sửu, Mùi): tham vọng lớn, thích đổi mới, không chịu theo khuôn phép, dám làm lại từ đầu. Đời nhiều thay đổi, dễ va chạm với người trên; hợp tự lập, khởi nghiệp hơn làm dưới quyền người khác.'],
  ['天机', '太阴', 'Cơ Âm (ô Dần, Thân): thông minh, tinh tế, giàu tình cảm, giỏi lên kế hoạch; hay di chuyển, đổi chỗ ở, chỗ làm. Tình cảm phong phú nên dễ biến động; hợp nghề cần đầu óc và sự tỉ mỉ.'],
  ['天机', '巨门', 'Cự Cơ (ô Mão, Dậu): thông minh, ăn nói sắc sảo, giỏi phân tích, nghiên cứu. Sách xưa khen Cự Cơ ở Mão là cách dễ có địa vị cao; ở Dậu kém hơn. Nhược điểm là hay nghi ngờ, dễ vướng thị phi vì lời nói.'],
  ['天机', '天梁', 'Cơ Lương (ô Thìn, Tuất), sách xưa nói "Cơ Lương gặp nhau thì giỏi bàn việc binh": giỏi lý luận, mưu lược, hay bàn chuyện lớn; hợp tư vấn, giảng dạy, nghiên cứu. Cần tránh nói nhiều làm ít.'],
  ['太阳', '太阴', 'Nhật Nguyệt đồng cung (ô Sửu, Mùi): tính cách hai mặt, lúc sôi nổi lúc trầm lặng, dễ dao động. Ở Sửu thì Thái Âm sáng hơn, ở Mùi thì Thái Dương sáng hơn. Có duyên với người khác giới, nhưng tâm tính hay đổi, cần giữ một hướng đi.'],
  ['太阳', '巨门', 'Cự Nhật (ô Dần, Thân), sách xưa nói "Cự Nhật đồng cung, quan phong tam đại": ăn nói có sức thuyết phục, có danh tiếng, hợp ngoại giao, truyền thông, luật, giảng dạy. Ở Dần (mặt trời mọc) tốt hơn ở Thân (mặt trời lặn).'],
  ['太阳', '天梁', 'Nhật Lương (ô Mão, Dậu): nhân hậu, thích giúp người, có phong thái người thầy; hợp giáo dục, y tế, công chức, thi cử. Gặp thêm Văn Xương và Lộc Tồn gọi là cách "Dương Lương Xương Lộc", thi cử đỗ đạt. Ở Mão (mặt trời mọc) tốt hơn ở Dậu.'],
  ['武曲', '天府', 'Vũ Phủ (ô Tý, Ngọ): sao tiền gặp sao giữ kho, chủ giỏi kiếm tiền và giữ tiền, đời sống vững vàng; tính thực tế, cẩn trọng, hơi bảo thủ. Hợp tài chính, ngân hàng, kinh doanh.'],
  ['武曲', '贪狼', 'Vũ Tham (ô Sửu, Mùi), sách xưa nói "Tham Vũ không phát lúc tuổi trẻ": tuổi trẻ vất vả, khoảng sau 30 tuổi mới khá lên. Giỏi kinh doanh, kiếm tiền, nhưng ham muốn nhiều, cần tiết chế.'],
  ['武曲', '天相', 'Vũ Tướng (ô Dần, Thân): cương nghị nhưng biết lo cho người khác, đáng tin cậy; tiền bạc khá ổn. Hợp quản lý tài chính, hành chính, ngân hàng.'],
  ['武曲', '七杀', 'Vũ Sát (ô Mão, Dậu): tính cứng rắn, quyết liệt, dám làm; kiếm tiền vất vả, dễ tranh chấp vì tiền. Hai sao đều hành Kim nên đề phòng tai nạn do kim khí, phẫu thuật.'],
  ['武曲', '破军', 'Vũ Phá (ô Tỵ, Hợi): dám mạo hiểm, thích đổi mới, tiền vào ra mạnh, khó giữ; thường rời quê lập nghiệp. Hợp kỹ thuật, nghề chuyên môn; cần kỷ luật chi tiêu.'],
  ['天同', '太阴', 'Đồng Âm (ô Tý, Ngọ): hiền hòa, tình cảm, tinh tế, có khiếu nghệ thuật, được nhiều người mến. Ở Tý rất tốt (sách xưa gọi là cách "Thủy trừng quế ngạc", nước trong hoa quế nở); ở Ngọ hai sao đều yếu, dễ đa sầu, vất vả.'],
  ['天同', '巨门', 'Đồng Cự (ô Sửu, Mùi): ở đây cả hai sao đều yếu. Hay lo nghĩ, nhạy cảm, dễ bất mãn; lời nói dễ làm mích lòng, tình cảm nhiều trắc trở. Phải bền bỉ mới có thành tựu; hợp nghề dùng lời nói, chuyên môn.'],
  ['天同', '天梁', 'Đồng Lương (ô Dần, Thân): nhân hậu, thích giúp người, sống an nhàn, được người trên che chở; hợp y tế, dịch vụ, công chức, công tác xã hội. Hay đi đây đi đó; nhược điểm là thiếu động lực, dễ an phận.'],
  ['廉贞', '天府', 'Liêm Phủ (ô Thìn, Tuất): Thiên Phủ kiềm bớt tính nóng của Liêm Trinh, nên người cẩn trọng, có nguyên tắc, giỏi quản lý tiền và việc; đời sống khá đầy đủ, ít khi mạo hiểm.'],
  ['廉贞', '天相', 'Liêm Tướng (ô Tý, Ngọ): liêm chính, có trách nhiệm, được tiếng thanh liêm. Kỵ gặp Kình Dương cùng cung, sách xưa gọi là "hình tù giáp ấn": dễ dính kiện tụng, rắc rối pháp lý.'],
  ['廉贞', '七杀', 'Liêm Sát (ô Sửu, Mùi): cương quyết, dám làm, chịu khó, đời nhiều vất vả. Sách xưa nói Liêm Trinh, Thất Sát ở đất tốt thì "lại là người tích được giàu có": nhờ bền bỉ mà gây dựng tài sản. Gặp thêm sát tinh thì đề phòng tai nạn, thương tích.'],
  ['廉贞', '破军', 'Liêm Phá (ô Mão, Dậu): biến động mạnh, dám phá cách, không chịu yên; đời thăng trầm, dễ vướng thị phi. Phá Quân hãm ở đây nên cần thận trọng với tai nạn, kiện tụng; hợp kỹ thuật, quân đội, nghề chuyên môn.'],
  ['廉贞', '贪狼', 'Liêm Tham (ô Tỵ, Hợi): cả hai sao đều hãm. Đa tài, giao thiệp giỏi nhưng ham vui, dễ sa vào hưởng thụ, tình cảm phức tạp. Biết giữ mình, tu dưỡng thì thành công nhờ tài giao tế.'],
];

const capKey = (a: string, b: string) => [a, b].sort().join('+');
const CAP_SAO: Record<string, string> = Object.fromEntries(CAP.map(([a, b, t]) => [capKey(a, b), t]));
export const capSao = (a: string, b: string): string | undefined => CAP_SAO[capKey(a, b)];
/** 24 cặp chính tinh có thể cùng cung, theo thứ tự ở trên */
export const CAP_DS: [string, string][] = CAP.map(([a, b]) => [a, b]);

const LUC_CAT = ['左辅', '右弼', '文昌', '文曲', '天魁', '天钺'];
const LUC_SAT = ['擎羊', '陀罗', '火星', '铃星', '地空', '地劫'];

const cungTai = (chart: ZiweiChart, branch: number) => chart.palaces.find(p => p.branch === branch)!;

export interface LuanGiai {
  /** "Cung Phu Thê — tình cảm, hôn nhân…" */
  tieuDe: string;
  doan: string[];
}

/** Lời cặp sao tả con người; ở cung khác Mệnh thì nhắc đọc theo chuyện của cung đó (Phu Thê → người phối ngẫu, tình duyên…) */
const ungVao = (palace: Palace) =>
  palace.name === '命宫' ? '' : ` Ở cung ${vi(palace.name)}, hiểu các nét này theo ${CUNG_CHU_DE[palace.name]}.`;

/**
 * Chính tinh (hoặc chính tinh mượn cung đối) của một cung: độ sáng, lời luận, Tứ Hóa.
 * Ưu tiên bài dịch từ bộ dữ liệu Metis (lib/ziwei/metis); chưa dịch thì dùng câu soạn sẵn ở trên.
 * chiTiet = thêm luận điểm cốt lõi (dùng trong popup).
 */
function chinhTinhDoan(palace: Palace, chiTiet = false): string[] {
  const idx = CUNG.indexOf(palace.name);
  const doan: string[] = [];
  const chinhTinh = palace.stars.filter(s => s.type === 'major');
  const muon = chinhTinh.length ? [] : palace.borrowedStars ?? [];

  if (chinhTinh.length === 0) {
    doan.push(`Cung vô chính diệu (không có chính tinh)${muon.length ? `, mượn ${muon.map(vi).join(', ')} từ cung ${vi(palace.borrowedFromName ?? '')} đối diện để luận, ảnh hưởng nhẹ hơn` : ''}. Nên xem thêm các phụ tinh trong cung.`);
  }

  const bl = baiLuan(palace.name, chinhTinh.length ? chinhTinh.map(s => s.name) : muon);
  if (bl) {
    const nhan = chinhTinh.length
      ? chinhTinh.map(s => `${vi(s.name)}${s.brightnessRaw ? ` (${vi(s.brightnessRaw)})` : ''}`).join(' và ')
      : `${muon.map(vi).join(' và ')} (mượn)`;
    doan.push(`${nhan}: ${bl.dinhDieu}`);
    if (chiTiet) doan.push(...(bl.cotLoi ?? []));
    for (const s of chinhTinh) {
      if (s.brightness === 'bright') doan.push(...(bl.sang ?? []));
      if (s.brightness === 'dim') doan.push(...(bl.ham ?? []));
      if (s.siHua) doan.push(...(bl.hoa?.[s.siHua] ?? [`${vi(s.name)} ${viHoa(s.siHua)}: ${HOA_Y_NGHIA[s.siHua]}.`]));
    }
    return doan;
  }

  for (const s of muon) if (LUAN_GIAI[s] && idx >= 0) doan.push(`${vi(s)} (mượn): ${LUAN_GIAI[s][idx]}`);
  if (muon.length === 2 && capSao(muon[0], muon[1])) doan.push(`Hai sao mượn là cặp ${capSao(muon[0], muon[1])}${ungVao(palace)}`);
  for (const s of chinhTinh) {
    const text = idx >= 0 ? LUAN_GIAI[s.name]?.[idx] : undefined;
    if (!text) continue;
    const doSang = s.brightnessRaw ? ` (${vi(s.brightnessRaw)})` : '';
    let p = `${vi(s.name)}${doSang}: ${text}`;
    if (s.brightness === 'bright') p += ' Sao sáng (Miếu/Vượng) nên mặt tốt phát huy mạnh.';
    if (s.brightness === 'dim') p += ' Sao ở thế yếu (Bất/Hãm) nên mặt tốt giảm, cần đề phòng mặt xấu.';
    if (s.siHua) p += ` ${viHoa(s.siHua)}: ${HOA_Y_NGHIA[s.siHua]}.`;
    doan.push(p);
  }
  if (chinhTinh.length === 2) {
    const cap = capSao(chinhTinh[0].name, chinhTinh[1].name);
    if (cap) doan.push(`Hai sao đứng chung: ${cap}${ungVao(palace)}`);
  }
  return doan;
}

/** Cân lục cát / lục sát trong tam phương tứ chính của một cung → một câu kết luận. */
function catSatDoan(chart: ZiweiChart, palace: Palace, chuDe: string): string {
  const stars = tamPhuongTuChinh(palace.branch).flatMap(b => cungTai(chart, b).stars);
  const ten = (ds: string[]) => stars.filter(s => ds.includes(s.name)).map(s => vi(s.name));
  const cat = ten(LUC_CAT);
  const sat = ten(LUC_SAT);
  const ds = `${cat.length ? `sao tốt: ${cat.join(', ')}` : 'không có sao tốt lớn'}; ${sat.length ? `sao xấu: ${sat.join(', ')}` : 'không có sao xấu lớn'}`;
  if (cat.length > sat.length) return `Tam phương tứ chính nghiêng về tốt (${ds}): ${chuDe} có người giúp, dễ thuận lợi.`;
  if (sat.length > cat.length) return `Tam phương tứ chính nghiêng về xấu (${ds}): ${chuDe} hay gặp va vấp, phải tự lực và cẩn trọng.`;
  if (cat.length) return `Tam phương tứ chính tốt xấu ngang nhau (${ds}): ${chuDe} có thuận có nghịch.`;
  return `Tam phương tứ chính không có sao tốt hay xấu lớn nào: ${chuDe} chủ yếu theo tính chất của chính tinh.`;
}

/** Tứ Hóa năm sinh chiếu về từ ba cung kia của tam phương tứ chính (Tứ Hóa trong chính cung đã nói ở phần sao). */
function hoaChieuDoan(chart: ZiweiChart, palace: Palace): string[] {
  return tamPhuongTuChinh(palace.branch).slice(1).flatMap(b => {
    const p = cungTai(chart, b);
    return p.stars.filter(s => s.siHua).map(s => `${vi(s.name)} ${viHoa(s.siHua!)} chiếu về từ cung ${vi(p.name)}: ${HOA_Y_NGHIA[s.siHua!]}.`);
  });
}

/** Ghép luận giải cho một cung: chính tinh, cặp sao, phụ tinh, rồi tam phương tứ chính. */
export function luanGiaiCung(palace: Palace, chart: ZiweiChart, chiTiet = false): LuanGiai {
  const tieuDe = `Cung ${vi(palace.name)} — ${CUNG_Y_NGHIA[palace.name] ?? ''}`;
  const doan = chinhTinhDoan(palace, chiTiet);
  const phu = palace.stars.filter(s => s.type !== 'major' && PHU_TINH[s.name]);
  if (phu.length) {
    doan.push('Phụ tinh: ' + phu.map(s => `${vi(s.name)}${s.siHua ? ` ${viHoa(s.siHua)}` : ''} (${PHU_TINH[s.name]})`).join('; ') + '.');
  }
  doan.push(catSatDoan(chart, palace, CUNG_CHU_DE[palace.name] ?? 'cung này'), ...hoaChieuDoan(chart, palace));
  return { tieuDe, doan };
}

const TONG_QUAN: [string, string][] = [['Tính cách', '命宫'], ['Tình duyên', '夫妻'], ['Sự nghiệp', '官禄'], ['Tiền bạc', '财帛']];

/** Tóm tắt 4 chuyện hay hỏi nhất: mỗi mục đọc chính tinh của cung tương ứng và tam phương tứ chính của nó. */
export function tongQuan(chart: ZiweiChart): LuanGiai[] {
  return TONG_QUAN.map(([tieuDe, cung]) => {
    const p = chart.palaces.find(x => x.name === cung)!;
    const doan = [...chinhTinhDoan(p), catSatDoan(chart, p, CUNG_CHU_DE[cung]), ...hoaChieuDoan(chart, p)];
    if (cung === '命宫') {
      const ten = p.stars.filter(s => s.type === 'major').map(s => s.name);
      const tc = baiLuan(cung, ten.length ? ten : p.borrowedStars ?? [], 'personality');
      if (tc && ten.length === 1) doan.splice(1, 0, `Tính cách: ${tc.dinhDieu}`);
      const than = cungTai(chart, chart.shenGongBranch);
      doan.push(than.name === '命宫'
        ? 'Thân cư Mệnh: con người bạn trước sau như một, chủ kiến mạnh, ít đổi khác theo tuổi tác.'
        : `Thân cư ${vi(than.name)}: từ trung niên, bạn đặt nặng chuyện ${CUNG_Y_NGHIA[than.name]}.`);
    }
    return { tieuDe, doan };
  });
}

/** Chính tinh của ô đang cầm vận, kèm độ sáng và tính chất. */
function saoChuDoan(palace: Palace): string {
  const chinh = palace.stars.filter(s => s.type === 'major');
  if (!chinh.length) {
    return `Ô này không có chính tinh, mượn ${(palace.borrowedStars ?? []).map(vi).join(', ') || 'sao cung đối diện'} để xem, nên giai đoạn này phụ thuộc nhiều vào phụ tinh trong ô và cung đối diện.`;
  }
  const ten = chinh.map(s => `${vi(s.name)}${s.brightnessRaw ? ` (${vi(s.brightnessRaw)})` : ''}`).join(' và ');
  const cap = chinh.length === 2 ? capSao(chinh[0].name, chinh[1].name) : undefined;
  return `Sao chủ: ${ten}. ${cap ?? SAO_TINH_CHAT[chinh[0].name]}`;
}

/** Tứ Hóa theo can của vận (can cung đại hạn, can năm) rơi vào cung nào của lá số gốc. */
function hoaVaoDoan(chart: ZiweiChart, stem: number, khi: string): string[] {
  return SI_HUA_TABLE[stem].map((sao, k) => {
    const hoa = (['禄', '权', '科', '忌'] as SiHua[])[k];
    const p = chart.palaces.find(x => x.stars.some(s => s.name === sao));
    return p
      ? `${khi}, ${vi(sao)} ${viHoa(hoa)} rơi vào cung ${vi(p.name)} (${CUNG_CHU_DE[p.name]}): ${HOA_Y_NGHIA[hoa]}.`
      : `${khi}, ${vi(sao)} ${viHoa(hoa)}.`;
  });
}

/** Vận hạn: đại hạn đang đi và năm `nam` (dương lịch). Ô cầm vận được đọc như cung Mệnh của giai đoạn đó. */
export function vanHan(chart: ZiweiChart, nam: number): LuanGiai[] {
  const out: LuanGiai[] = [];
  const dx = chart.daXians[chart.currentDaXianIndex];
  if (dx) {
    const p = cungTai(chart, dx.palaceBranch);
    out.push({
      tieuDe: `Đại hạn ${dx.startAge}–${dx.endAge} tuổi`,
      doan: [
        `10 năm này do ô ${vi(BRANCHES[p.branch])} cầm, vốn là cung ${vi(p.name)} của lá số gốc, nên chuyện ${CUNG_Y_NGHIA[p.name]} thường nổi bật.`,
        saoChuDoan(p),
        catSatDoan(chart, p, '10 năm này'),
        ...hoaVaoDoan(chart, p.stem, 'Trong 10 năm này'),
      ],
    });
  } else if (chart.currentAge < chart.wuxingJu) {
    out.push({ tieuDe: 'Đại hạn', doan: [`Bạn chưa vào đại hạn đầu tiên. Đại hạn đầu bắt đầu từ ${chart.wuxingJu} tuổi, ở cung Mệnh.`] });
  }

  const chi = ((nam - 4) % 12 + 12) % 12;
  const can = ((nam - 4) % 10 + 10) % 10;
  const p = cungTai(chart, chi);
  out.push({
    tieuDe: `Năm ${nam} (${vi(STEMS[can])} ${vi(BRANCHES[chi])}) · ${nam - chart.lunarInfo.lunarYear + 1} tuổi`,
    doan: [
      `Năm ${vi(BRANCHES[chi])} xem ô ${vi(BRANCHES[chi])}, là cung ${vi(p.name)} của lá số: năm nay chuyện ${CUNG_Y_NGHIA[p.name]} nổi bật.`,
      saoChuDoan(p),
      catSatDoan(chart, p, 'năm nay'),
      ...hoaVaoDoan(chart, can, 'Trong năm nay'),
    ],
  });
  return out;
}
