import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, DatePicker, message, Spin } from "antd";
import moment from "moment";
import { updateAccountInformation } from "@/services/accountAPI/update_account-API"; // Adjust import as per your API structure
import { useParams } from 'react-router-dom';

const { Option } = Select;

const AccountSettingsForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated hardcoded data
    const hardcodedData = {
      Name: "John Doe",
      Email: "john@example.com",
      Phone: "123456789",
      Gender: "male",
      Birth: moment().subtract(30, 'years').unix(), // Simulated birth date 30 years ago
    };

    // Set hardcoded data to form
    const birthDate = moment.unix(hardcodedData.Birth).format('YYYY-MM-DD');
    form.setFieldsValue({
      'Họ và tên': hardcodedData.Name,
      'Email': hardcodedData.Email,
      'Số điện thoại': hardcodedData.Phone,
      'Giới tính': hardcodedData.Gender,
      'Ngày,tháng,năm sinh': moment(birthDate, 'YYYY-MM-DD'),
    });

    setLoading(false);
  }, [form]);

  const onFinish = async (values) => {
    try {
      await updateAccountInformation(id, values); // Update account information using API
      message.success('Cập nhật tài khoản thành công!');
    } catch (error) {
      console.error("Failed to update account information:", error);
      message.error('Có lỗi xảy ra khi cập nhật tài khoản.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const disabledDate = (current) => {
    // Disable dates after today
    return current && current > moment().endOf('day');
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <Form
      form={form}
      name="account-settings"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: "100%", margin: "0 auto", marginTop: "50px", padding: "0 20px" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          marginBottom: '20px',
          fontWeight: '700',
          fontSize: '16px',
          color: '#16056b',
          textAlign: 'center',
        }}
      >
        Cập nhật tài khoản
      </div>
      <Form.Item label="Họ và tên" name="Họ và tên" >
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
        rules={[{ required: true }]}
      >
        <Select>
          <Option value="male">Nam</Option>
          <Option value="female">Nữ</Option>
          <Option value="other">Khác</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Ngày,tháng,năm sinh"
        name="Ngày,tháng,năm sinh"
      >
        <DatePicker format="DD-MM-YYYY" disabledDate={disabledDate} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Cập nhật tài khoản
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccountSettingsForm;
