import React from "react";
import { Button, Checkbox, Form, Input, Row, Col, Typography } from "antd";
import logo from "@/assets/logo.png"; // Chỉnh lại đường dẫn cho phù hợp với cấu trúc thư mục của bạn
import { Link, useNavigate } from "react-router-dom"; // Import the Link component from react-router-dom
import Register from "../../services/authAPI/RegisteApi"; // Import the Register function from the RegisterApi file
const { Text } = Typography;

// ...

// const onFinish = (values) => {
//     console.log('Success:', values);
// };

export default function SignUp() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const newUser = {
      userName: values.username,
      userEmail: values.email,
      password: values.password,
      userPhone: values.phoneNumber,
      passwordConfirm: values.confirmPassword,
      // Add any other fields you need here
    };
    const response = await Register(newUser);
    if (response?.status === 201) {
      alert("Đăng ký thành công");
      navigate("/login");
    } else {
      alert("Email đã tồn tại hoặc có lỗi xảy ra!");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col
        xs={0}
        sm={0}
        md={12}
        lg={8}
        xl={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={6}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1>Đăng ký trở thành thành viên của Racket Rise</h1>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ maxWidth: 400, margin: "auto" }}
        >
          <Form.Item
            label="Họ và tên"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please input your email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^(\+84|0)(3|5|7|8|9|1[2|6|8|9])+([0-9]{8})\b/,
                message: "Invalid phone number, must be a Vietnamese number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="agree"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
            rules={[
              {
                required: true,
                message: "Please agree to terms and conditions!",
              },
            ]}
          >
            <Checkbox>
              Tôi đã đọc và đồng ý với <a href="/terms">các điều khoản</a>
            </Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "black",
                borderColor: "black",
                color: "white",
                width: "100%",
              }}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          <Text>
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </Text>
          <br />
          <Text>
            Bạn muốn làm cộng tác viên ?{" "}
            <Link to="/signupPartner">Đăng ký làm cộng tác viên</Link>
          </Text>
        </div>
      </Col>
    </Row>
  );
}
