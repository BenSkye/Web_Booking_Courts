import React, { useState, useEffect } from 'react';
import { Card, Button, InputNumber, message, Modal } from 'antd';
import { useParams } from 'react-router-dom';
import { addPlayPackage } from '@/services/bookingAPI/bookingAPI'; // Adjust the path as necessary
import { getCenterByIdAPI } from '../../../../services/centersAPI/getCenters'; // Adjust the path as necessary

const BookingFlexibleByPackage = () => {
  const [hours, setHours] = useState(10); // Initial state for number of hours, starting with 10 hours
  const [center, setCenter] = useState(null); // State to hold center details
  const [loading, setLoading] = useState(true); // State to manage loading state
  const params = useParams();
  const centerId = params.id;

  useEffect(() => {
    const fetchCenterDetails = async () => {
      try {
        const centerData = await getCenterByIdAPI(centerId);
        setCenter(centerData);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching center details:", error);
        message.error('Đã xảy ra lỗi khi lấy thông tin trung tâm. Vui lòng thử lại sau.');
      }
    };

    fetchCenterDetails();
  }, [centerId]);

  const handleSelectPackage = async () => {
    try {
      const response = await addPlayPackage({ centerId, hour: hours });

      console.log("addPlayPackage Response:", response);
      message.success('Tạo hóa đơn chơi thành công');
      window.location.href = response.data.result.payUrl;

    } catch (error) {
      console.error("Error adding play package:", error);
      message.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  const showConfirm = () => {
    Modal.confirm({
      title: 'Xác nhận chọn gói',
      content: `Bạn có muốn chọn gói này với số giờ chơi là ${hours} không?`,
      onOk: handleSelectPackage,
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // Function to get price amount for 'PP' schedule type
  const getPriceForScheduleType = () => {
    if (center && center.data && center.data.center && center.data.center.price) {
      const priceObject = center.data.center.price.find(price => price.scheduleType === 'PP');
      if (priceObject && priceObject.price !== undefined) {
        return priceObject.price;
      }
    }
    return null; // Return null if price not found or amount is undefined
  };

  // Get price amount for 'PP' schedule type
  const priceAmount = getPriceForScheduleType();

  return (
    <div>
      <h2>Mua gói chơi linh hoạt</h2>
      {loading ? (
        <p>Đang tải thông tin trung tâm...</p>
      ) : center ? (
        <Card style={{ marginBottom: '1rem' }}>
          <p>Tên trung tâm: {center.data.center.centerName}</p>
          <p>Giá mỗi giờ (PP): {priceAmount !== null ? `${priceAmount} VND` : 'Không có thông tin giá'}</p>
          <InputNumber
            min={1}
            defaultValue={10}
            value={hours}
            onChange={value => setHours(value)}
            step={1}
          />

          <Button type='primary' onClick={showConfirm} style={{ marginLeft: '0.5rem' }}>
            Chọn gói
          </Button>
        </Card>
      ) : (
        <p>Không tìm thấy thông tin trung tâm.</p>
      )}
    </div>
  );
};

export default BookingFlexibleByPackage;
