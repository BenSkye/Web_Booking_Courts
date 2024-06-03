import React from "react";
import { Button, Checkbox, Form, Input, Row, Col, Typography } from "antd";
import logo from "@/assets/logo.png"; // Chỉnh lại đường dẫn cho phù hợp với cấu trúc thư mục của bạn
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import Register from "../../services/authAPI/RegisteApi"; // Import the Register function from the RegisterApi file
const { Text } = Typography;

const onFinish = async (values) => {
  const newUser = {
    userName: values.userName,
    userEmail: values.email,
    password: values.password,
    userPhone: values.phoneNumber,
    // Add any other fields you need here
  };
  const response = await Register(newUser);
  console.log(response);
};

// ...

// const onFinish = (values) => {
//     console.log('Success:', values);
// };

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const SignUp = () => (
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
      <img src={logo} alt="Logo" style={{ maxWidth: "100%", height: "auto" }} />
    </Col>
    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>CourtArena</h1>
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
          label="Tên đăng nhập"
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
                  new Error("The two passwords that you entered do not match!")
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
            Register
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center" }}>
        <Text>
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </Text>
      </div>
    </Col>
  </Row>
);

export default SignUp;
