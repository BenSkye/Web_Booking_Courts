import React from "react";
import { Button, Form, Input, Select,DatePicker } from 'antd';
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const AccountSettingsForm = () => {
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
        marginTop: "50px",
        height: "100vh"
      }}
      
      
    >
      <Form.Item
        label="Họ và tên"
        name="Họ và tên"
        
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="Email"
        
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Số điện thoại"
        name="Số điện thoại"
        
      >
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
        <Select
         
         
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>

      <Form.Item
      label="Ngày,tháng,năm sinh"
      name="Ngày,tháng,năm sinh"
      // rules={[
      //   {
      //     required: true,
      //     message: 'Please input!',
      //   },
      // ]}
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
