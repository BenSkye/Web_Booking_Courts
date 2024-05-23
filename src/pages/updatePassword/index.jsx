import React from "react";
import { Button, Form, Input } from "antd";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const UpdatePassword = () => {
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
        marginLeft: "450px",
        marginTop: "130px",
        height: "100vh",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div
        style={{
          maxWidth: 600,
          marginLeft: "200px",
          marginBottom: '20px',
          fontWeight: '700',
          fontSize: '16px',
          color: '#16056b'
        }}
      >
        Cập nhật mật khẩu
      </div>
      <Form.Item label="Mật khẩu mới" name="Mật khẩu mới">
        <Input.Password />
      </Form.Item>

      <Form.Item label="Xác nhận mật khẩu mới" name="Xác nhận mật khẩu mới">
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Cập nhật mật khẩu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default  UpdatePassword;
