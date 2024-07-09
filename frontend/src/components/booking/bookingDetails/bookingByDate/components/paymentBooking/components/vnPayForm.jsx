import { useState } from 'react';
import { Form, Button, message } from 'antd';
import { checkBookingAvailablebyDayAPI } from '../../../../../../../services/bookingAPI/bookingAPI';
import { useNavigate } from 'react-router-dom';

const VNPayPaymentForm = ({ listBooking, totalPrice, setCurrentStep }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log('Received values:', values);
      const result = await checkBookingAvailablebyDayAPI({
        listBooking,
      });

      if (result && result.status === 'fail') {
        if (
          result.message === 'Vui lòng đăng nhập để truy cập' ||
          result.message === 'Người dùng đã đổi mật khẩu'
        ) {
          message.error(result.message);
          navigate('/login');
        }
        if (
          result.message ===
          'Xin lỗi slot đã được đặt hoặc đang được đặt, kiểm tra lại booking'
        ) {
          message.error(result.message);
        }
      }

      console.log('Result:', result);
      if (result && result?.data?.paymentResult?.payUrl) {
        console.log(
          'Resultresult.data.paymentResult.payUrl',
          result.data.paymentResult.payUrl
        );
        window.location.href = result.data.paymentResult.payUrl;
      }
      setLoading(false);
    } catch (error) {
      console.error('Payment failed:', error);
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
      initialValues={{
        amount: 0,
      }}
    >
      <Form.Item
        style={{ margin: '10px', display: 'flex', justifyContent: 'end' }}
      >
        <h2>
          Tổng tiền:
          <span style={{ color: 'red' }}> {formatPrice(totalPrice)}đ</span>
        </h2>
      </Form.Item>
      <Form.Item
        style={{ margin: '10px', display: 'flex', justifyContent: 'end' }}
      >
        <Button size='large' type='primary' htmlType='submit' loading={loading}>
          Thanh toán
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VNPayPaymentForm;
