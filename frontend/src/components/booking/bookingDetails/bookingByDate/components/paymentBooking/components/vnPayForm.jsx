import { useContext, useEffect, useState } from "react";
import { Form, Button, message, Modal, Input } from "antd";
import { checkBookingAvailablebyDayAPI } from "../../../../../../../services/bookingAPI/bookingAPI";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../../../../services/authAPI/authProvideAPI";
import {
  checkUserHavePhone,
  updatePhone,
} from "../../../../../../../services/accountAPI/userAPi";

const VNPayPaymentForm = ({ listBooking, totalPrice, setCurrentStep }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const [phoneExist, setPhoneExist] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const checkPhoneExist = async () => {
    const data = await checkUserHavePhone();
    console.log("Data:", data);
    setPhoneExist(data.result);
    if (!data.result) {
      setIsPhoneModalOpen(true);
    }
  };

  useEffect(() => {
    if (user) {
      checkPhoneExist();
    }
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log("Received values:", values);
      const result = await checkBookingAvailablebyDayAPI({
        listBooking,
      });

      if (result && result.status === "fail") {
        if (
          result.message === "Vui lòng đăng nhập để truy cập" ||
          result.message === "Người dùng đã đổi mật khẩu"
        ) {
          message.error(result.message);
          navigate("/login");
        }
        if (
          result.message ===
          "Xin lỗi slot đã được đặt hoặc đang được đặt, kiểm tra lại booking"
        ) {
          message.error(result.message);
        }
      }

      console.log("Result:", result);
      if (result && result?.data?.paymentResult?.payUrl) {
        console.log(
          "Resultresult.data.paymentResult.payUrl",
          result.data.paymentResult.payUrl
        );
        window.location.href = result.data.paymentResult.payUrl;
      }
      setLoading(false);
    } catch (error) {
      console.error("Payment failed:", error);
      setLoading(false);
    }
  };
  const handlePhoneModalCancel = () => {
    navigate(-1);
    setIsPhoneModalOpen(false);
  };

  const handlePhoneModalOk = async () => {
    const data = await updatePhone(phone);
    console.log("Data:", data);
    if (data.status === "success") {
      message.success("Cập nhật số điện thoại thành công!");
      setIsPhoneModalOpen(false);
    } else {
      message.error("Cập nhật số điện thoại thất bại!");
    }
  };
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          amount: 0,
        }}
      >
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
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Thanh toán
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Nhập số điện thoại để tiếp tục"
        open={isPhoneModalOpen}
        footer={
          <Button type="primary" onClick={handlePhoneModalCancel}>
            Quay lại
          </Button>
        }
      >
        <Form onFinish={handlePhoneModalOk}>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Xác nhận{" "}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default VNPayPaymentForm;
