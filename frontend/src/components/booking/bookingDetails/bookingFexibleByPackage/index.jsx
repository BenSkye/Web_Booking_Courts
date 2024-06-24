import { useState } from 'react';
import { Card, Button, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
const BookingFlexibleByPackage = ({ id, onSelectPackage }) => {

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
        <Link to={``}>
          <Button type='primary' onClick={handlePackageSelect}>
            Chọn gói
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default BookingFlexibleByPackage;
