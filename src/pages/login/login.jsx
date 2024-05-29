import React, { useContext, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Typography,
  message,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png"; // Chỉnh lại đường dẫn cho phù hợp với cấu trúc thư mục của bạn
import LoginByGoogle from "../loginGoogle/loginGoogle";
import AuthContext from "@/services/authAPI/authProvideAPI";

const { Text } = Typography;

const Login = () => {
  const [registerClicked, setRegisterClicked] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const onFinish = (values) => {
    const result = login(values.email, values.password);
    if (result) {
      navigate("/");
    } else {
      message.error("Email hoặc mật khẩu không đúng!");
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
          <h1>RacketRise</h1>
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
            label="Email"
            name="email"
            rules={[
              {
                required: registerClicked,
                message: "vui lòng nhập email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: registerClicked,
                message: "vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => setRegisterClicked(true)}
              style={{
                backgroundColor: "black",
                borderColor: "black",
                color: "white",
                width: "100%",
              }}
            >
              Submit
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <LoginByGoogle />
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          <Text>
            Bạn chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
          </Text>
        </div>
      </Col>
    </Row>
  );
};
export default Login;
