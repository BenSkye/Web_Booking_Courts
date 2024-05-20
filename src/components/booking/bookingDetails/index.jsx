import { useParams } from 'react-router-dom';

export default function BookingDetail() {
  const { id } = useParams(); // Lấy id từ URL
  return (
    <div>
      <h1>Chi tiết đặt sân</h1>
      <p>ID sân: {id}</p>
    </div>
  );
}
