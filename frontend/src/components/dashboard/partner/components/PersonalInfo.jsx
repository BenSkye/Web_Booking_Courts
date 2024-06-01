import React from "react";
import { Form, Input } from "antd";

const PersonalInfo = () => (
  <Form.Item label="1. Thông Tin Cá Nhân và Liên Hệ">
    <Form.Item
      name="fullName"
      label="Họ tên"
      rules={[{ required: true, message: "Họ tên là bắt buộc" }]}
    >
      <Input placeholder="Họ và tên của bạn" />
    </Form.Item>
    <Form.Item
      name="phone"
      label="Số điện thoại"
      rules={[
        { required: true, message: "Số điện thoại là bắt buộc" },
        { min: 10, message: "Số điện thoại phải có ít nhất 10 chữ số" },
        { max: 11, message: "Số điện thoại không được quá 11 chữ số" },
        { pattern: /^[0-9]+$/, message: "Số điện thoại chỉ được chứa số" },
      ]}
    >
      <Input placeholder="Số điện thoại của bạn" />
    </Form.Item>
    <Form.Item
      name="email"
      label="Địa chỉ email"
      rules={[
        { required: true, message: "Email là bắt buộc" },
        { type: "email", message: "Địa chỉ email không hợp lệ" },
      ]}
    >
      <Input type="email" placeholder="Địa chỉ email của bạn" />
    </Form.Item>
  </Form.Item>
);

export default PersonalInfo;
