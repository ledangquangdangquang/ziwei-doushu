import { redirect } from 'next/navigation';

// App tiếng Việt vào thẳng trang lập lá số (trang giới thiệu tiếng Trung cũ còn trong lịch sử git).
export default function HomePage() {
  redirect('/chart');
}
