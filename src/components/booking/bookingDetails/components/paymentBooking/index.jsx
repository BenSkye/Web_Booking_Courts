import { useSelector } from 'react-redux';
import { List, Card, Row, Col, Divider } from 'antd';
import VNPayPaymentForm from '@/components/booking/bookingDetails/components/paymentBooking/components/vnpayForm';

export default function PaymentBooking({ setCurrentStep }) {
  const { selectedCourts, center, totalPrice } = useSelector(
    (state) => state.cart
  );
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <Row
      gutter={(16, 16)}
      style={{
        width: '80%',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <Col
        xs={24}
        md={8}
        style={{
          marginBottom: '16px', // Thêm khoảng cách dưới khi xuống hàng
        }}
      >
        <Card
          title='Thông tin thanh toán'
          style={{ boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)' }}
        >
          <div>
            <h3>Trung tâm:</h3> {center.nameCenter}
          </div>
          <Divider />
          <List
            dataSource={selectedCourts}
            renderItem={(court) => (
              <List.Item key={court.id}>
                <strong>{court.name}</strong>: {formatPrice(court.price)}đ
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col xs={24} md={16}>
        <Card style={{ boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)' }}>
          <VNPayPaymentForm
            totalPrice={totalPrice}
            setCurrentStep={setCurrentStep}
          />
        </Card>
      </Col>
    </Row>
  );
}
