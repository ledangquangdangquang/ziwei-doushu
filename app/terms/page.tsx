export const metadata = { title: 'Điều khoản sử dụng · Tử Vi Đẩu Số', description: 'Điều khoản sử dụng trang lập lá số Tử Vi.' };

// Mẫu điều khoản; cần rà soát pháp lý và điền thông tin liên hệ trước khi phát hành.
export default function TermsPage() {
  return (
    <main className="page page--read">
      <article className="prose">
      <h1>Điều khoản sử dụng</h1>
      <p className="meta">Cập nhật lần cuối: 25/10/2026</p>

      <h2>1. Tính chất nội dung</h2>
      <p>
        Lá số và luận giải trên trang dựa trên Tử Vi Đẩu Số — một môn học thuật cổ truyền. Nội dung chỉ mang tính
        <strong> tham khảo, chiêm nghiệm văn hóa</strong>, không phải lời tiên đoán chắc chắn và không thay thế tư vấn y tế,
        pháp lý, tài chính hay tâm lý. Bạn tự chịu trách nhiệm về các quyết định của mình.
      </p>

      <h2>2. Cách lập lá số</h2>
      <p>
        Lá số được tính theo âm lịch Việt Nam và giờ sinh quy đổi theo nơi sinh. Các trường phái Tử Vi có khác biệt về cách
        an một số sao và cách luận, nên kết quả có thể khác các trang hoặc sách khác.
      </p>

      <h2>3. Nguồn và bản quyền</h2>
      <p>
        Phần mềm dựa trên dự án mã nguồn mở ziwei-doushu (giấy phép MIT) và thư viện iztro (giấy phép MIT). Các đoạn cổ thư là
        bản tóm lược theo ý kèm bản dịch tiếng Việt; nội dung luận giải do chúng tôi biên soạn.
      </p>

      <h2>4. Giới hạn trách nhiệm</h2>
      <p>
        Trang được cung cấp &quot;nguyên trạng&quot;. Chúng tôi cố gắng tính toán chính xác nhưng không bảo đảm không có sai sót,
        và không chịu trách nhiệm cho thiệt hại phát sinh từ việc sử dụng nội dung trên trang.
      </p>

      <h2>5. Liên hệ</h2>
      <p>Mọi góp ý hoặc báo lỗi, vui lòng gửi về: <strong>[email liên hệ]</strong>.</p>
      </article>
    </main>
  );
}
