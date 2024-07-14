import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Space, Card, Row, Col, Typography, Divider } from 'antd';
import moment from 'moment';
import { getFixedPackageScheduleByIdAPI } from '../../../../../../services/fixedPackagesScheduleAPI/getFixedPackageScheuleAPI';
import { formatPrice } from '../../../../../../utils/priceFormatter';
import MomoLogo from '../../../../../../assets/MoMo_Logo.png';

const { Title, Text } = Typography;

export default function PaymentBookingFixed() {
  const location = useLocation();
  const { bookingId } = location.state || {}; // Destructure bookingId from the state
  const [bookings, setBookings] = useState([]); // State to store the bookings
  const [totalPrice, setTotalPrice] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const getFixedPackageSchedule = async (id) => {
      try {
        const response = await getFixedPackageScheduleByIdAPI(id);
        const data = response.data.fixedPackageSchedule;
        console.log('GET fixedPackageSchedule: ', data);
        if (data && Array.isArray(data.bookings)) {
          setStartDate(data.startDate);
          setEndDate(data.endDate);
          setTotalPrice(data.totalPrice);
          setBookings(data.bookings);
        } else {
          console.error('Error: bookings is not an array or is missing');
          setBookings([]); // Reset bookings to an empty array
        }
      } catch (error) {
        console.error('Error fetching fixedPackageSchedule:', error);
        setBookings([]); // Reset bookings to an empty array in case of error
      }
    };
    if (bookingId) {
      getFixedPackageSchedule(bookingId);
    }
  }, [bookingId]);

  return (
    <Row
      justify='center'
      align='middle'
      style={{ minHeight: '100vh', padding: '20px' }}
    >
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card>
          <Title
            level={2}
            style={{ textAlign: 'center', marginBottom: '20px' }}
          >
            Thanh toán đặt sân lịch cố định
          </Title>
          <Divider />
          <Space direction='vertical' size='middle' style={{ width: '100%' }}>
            <Text strong>Id bookingFixedByMonth:</Text>
            <Text>{bookingId}</Text>
            <Text strong>Giá:</Text>
            <Text>{formatPrice(totalPrice)} VND</Text>
            <Text strong>Ngày bắt đầu:</Text>
            <Text>
              {startDate ? moment(startDate).format('DD-MM-YYYY') : ''}
            </Text>
            <Text strong>Ngày kết thúc:</Text>
            <Text>{endDate ? moment(endDate).format('DD-MM-YYYY') : ''}</Text>
          </Space>
          <Divider />
          <Button
            type='primary'
            block
            size='large'
            style={{ marginTop: '20px' }}
            icon={
              <img
                src={MomoLogo}
                style={{ width: 20, height: 20 }}
                alt='Momo Logo'
              />
            }
          >
            Thanh toán bằng momo
          </Button>
        </Card>
      </Col>
    </Row>
  );
}
