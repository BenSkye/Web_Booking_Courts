import { useState } from "react";
import { Form, Input, Button } from "antd";
import { createBookingbyDayAPI } from "../../../../../../../services/bookingAPI/getBooking";
import { useNavigate } from "react-router-dom";
const VNPayPaymentForm = ({ listBooking, totalPrice, setCurrentStep }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Gửi thông tin thanh toán đến VNPay API ở đây
      console.log("Received values:", values);
      const result = await createBookingbyDayAPI({ listBooking, totalPrice });
      console.log("Result:", result);
      if (result.statusCode === 401) {
        navigate("/login");
      }
      // Giả sử thanh toán thành công
      setLoading(false);

      // Chuyển sang bước hoàn thành
      setCurrentStep(2);
    } catch (error) {
      // Xử lý lỗi khi thanh toán thất bại
      console.error("Payment failed:", error);
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        amount: 0,
      }}
    >
      <Form.Item
        name="fullName"
        label="Họ và tên"
        rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Vui lòng nhập email!" }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Số điện thoại"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
      >
        <Input type="tel" />
      </Form.Item>
      <Form.Item
        style={{ margin: "10px", display: "flex", justifyContent: "end" }}
      >
        <h2>
          Tổng tiền:
          <span style={{ color: "red" }}> {formatPrice(totalPrice)}đ</span>
        </h2>
      </Form.Item>
      <Form.Item
        style={{ margin: "10px", display: "flex", justifyContent: "end" }}
      >
        <Button size="large" type="primary" htmlType="submit" loading={loading}>
          Thanh toán
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VNPayPaymentForm;
