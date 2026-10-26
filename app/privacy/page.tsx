export const metadata = { title: 'Quyền riêng tư · Tử Vi Đẩu Số', description: 'Chính sách quyền riêng tư của trang lập lá số Tử Vi.' };

// Mẫu chính sách mô tả đúng hành vi hiện tại của app; cần rà soát pháp lý và điền thông tin liên hệ trước khi phát hành.
export default function PrivacyPage() {
  return (
    <main className="page page--read">
      <article className="prose">
      <h1>Quyền riêng tư</h1>
      <p className="meta">Cập nhật lần cuối: 25/10/2026</p>

      <h2>1. Thông tin bạn nhập</h2>
      <p>
        Để lập lá số, bạn nhập họ tên (không bắt buộc), ngày giờ sinh, nơi sinh và giới tính. Việc tính toán diễn ra ngay
        trong trình duyệt của bạn; các thông tin này <strong>không được gửi về máy chủ</strong>.
      </p>

      <h2>2. Dữ liệu lưu trên thiết bị</h2>
      <p>Trang lưu hai thứ trong bộ nhớ trình duyệt (localStorage), chỉ trên máy của bạn: lựa chọn giao diện sáng hoặc tối, và danh sách tối đa 20 lá số bạn đã lập (tên nếu có, ngày giờ, nơi sinh, giới tính) để mở lại nhanh. Bạn có thể xóa từng lá số ở mục “Lá số đã xem” trên trang Lá số, hoặc xóa tất cả bằng cách xóa dữ liệu trang web trong trình duyệt.</p>

      <h2>3. Thống kê truy cập</h2>
      <p>
        Trang dùng Vercel Web Analytics và Speed Insights để đếm lượt xem và đo tốc độ tải trang. Các công cụ này thu thập
        dữ liệu tổng hợp, ẩn danh (đường dẫn trang, loại thiết bị, quốc gia), không dùng cookie và không gắn với danh tính của bạn.
        Nhà cung cấp hạ tầng có thể ghi nhật ký kỹ thuật (như địa chỉ IP) theo chính sách của họ.
      </p>

      <h2>4. Không có tài khoản, không thanh toán</h2>
      <p>Trang không yêu cầu đăng ký, không thu thập số điện thoại, email hay thông tin thanh toán.</p>

      <h2>5. Quyền của bạn</h2>
      <p>
        Vì chúng tôi không lưu thông tin cá nhân bạn nhập, không có dữ liệu nào để truy xuất hay xóa trên máy chủ. Nếu có câu hỏi
        về quyền riêng tư, vui lòng liên hệ: <strong>[email liên hệ]</strong>.
      </p>

      <h2>6. Thay đổi chính sách</h2>
      <p>Khi có thay đổi (ví dụ thêm tính năng lưu lá số), chúng tôi sẽ cập nhật trang này và ngày cập nhật ở trên.</p>
      </article>
    </main>
  );
}
