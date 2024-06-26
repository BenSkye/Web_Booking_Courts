import React, { useState } from 'react';
import { Card, Button, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import { addPlayPackage } from '../../../../services/bookingAPI/bookingAPI'; // Adjust the path as necessary

const BookingFlexibleByPackage = ({ id, onSelectPackage, pricePerHour }) => {
  const [hours, setHours] = useState(1); // Initial state for number of hours, starting with 1 hour

  const handleSelectPackage = async () => {
    try {
      const response = await addPlayPackage({ userId: 'userId', centerId: 'centerId', hour: hours });
      console.log("addPlayPackage Response:", response);

      if (response.status === 'success') {
        message.success('Tạo gói chơi thành công');

      } else {
        message.error('Tạo gói chơi thất bại. Vui lòng thử lại.');

      }
    } catch (error) {
      console.error("Error adding play package:", error);
      message.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');

    }
  };

  return (
    <div>
      <h2>Mua gói chơi linh hoạt</h2>
      <Card style={{ marginBottom: '1rem' }}>
        <InputNumber
          min={1}
          defaultValue={1}
          value={hours}
          onChange={value => setHours(value)}
          step={1}
        />

        <Button type='primary' onClick={handleSelectPackage} style={{ marginLeft: '0.5rem' }}>
          <Link to=''>Chọn gói</Link>
        </Button>

      </Card>
    </div>
  );
};

export default BookingFlexibleByPackage;
