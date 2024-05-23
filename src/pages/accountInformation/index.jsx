import React from "react";
import { Button, Form, Input, Select, DatePicker } from "antd";
import moment from "moment";

const { Option } = Select;

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const AccountSettingsForm = () => {
  const initialValues = {
    'Họ và tên': 'Nguyễn Văn A',
    'Email': 'nguyenvana@example.com',
    'Số điện thoại': '0123456789',
    'Giới tính': 'male',
    'Ngày,tháng,năm sinh': moment('1990-01-01', 'YYYY-MM-DD')
  };

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
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div
        style={{
          maxWidth: 600,
          marginLeft: "180px",
          marginBottom: '20px',
          fontWeight: '700',
          fontSize: '16px',
          color: '#16056b',
          display: 'flex',
          justifyContent: 'center', 
          paddingRight: 70,
        }}
      >
        Cập nhật tài khoản
      </div>
      <Form.Item label="Họ và tên" name="Họ và tên">
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="Email">
        <Input />
      </Form.Item>

      <Form.Item label="Số điện thoại" name="Số điện thoại">
        <Input />
      </Form.Item>
    

      <Form.Item
        name="Giới tính"
        label="Giới tính"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Ngày,tháng,năm sinh"
        name="Ngày,tháng,năm sinh"
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Cập nhật tài khoản
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccountSettingsForm;
