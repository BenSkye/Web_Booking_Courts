import { useState } from 'react';
import { Card, Button, InputNumber } from 'antd';

const BookingFlexibleByPackage = ({ id, onSelectPackage }) => {
  const [hours, setHours] = useState(10); // Số giờ mặc định
  const pricePerHour = 10; // Giá tiền mỗi giờ

  const handleHoursChange = (value) => {
    setHours(value);
  };

  const handlePackageSelect = () => {
    onSelectPackage(hours); // Gọi callback và truyền số giờ đã chọn
  };

  return (
    <div>
      <h2>Mua gói chơi linh hoạt</h2>
      <Card style={{ marginBottom: '1rem' }}>
        <p>Số giờ chơi: {hours} giờ</p>
        <p>Giá tiền: {hours * pricePerHour} đồng</p>
        <InputNumber
          min={10} // Số giờ tối thiểu
          defaultValue={hours}
          onChange={handleHoursChange}
        />
        <Button type='primary' onClick={handlePackageSelect}>
          Chọn gói
        </Button>
      </Card>
    </div>
  );
};

export default BookingFlexibleByPackage;
