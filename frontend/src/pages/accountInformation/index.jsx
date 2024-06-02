import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, DatePicker, message, Spin } from "antd";
import moment from "moment";
import { AccountInformation, updateAccountInformation } from "@/services/accountAPI/update_account-API";
import { useParams } from 'react-router-dom';

const { Option } = Select;

const AccountSettingsForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AccountInformation(id);
        const birthDate = moment.unix(data.Birth).format('YYYY-MM-DD');
        form.setFieldsValue({
          'Họ và tên': data.Name,
          'Email': data.Email,
          'Số điện thoại': data.Phone,
          'Giới tính': data.Gender,
          'Ngày,tháng,năm sinh': moment(birthDate, 'YYYY-MM-DD'),
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching initial values:", error);
        message.error('Có lỗi xảy ra khi tải thông tin tài khoản.');
        setLoading(false);
      }
    };

    fetchData();
  }, [form, id]);

  const onFinish = async (values) => {
    try {
      await updateAccountInformation(id, values);
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
