import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { updateAccountInformation, AccountInformation } from "@/services/accountAPI/update_account-API";
import { useParams } from 'react-router-dom';
import moment from 'moment';

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AccountInformation(id);
        setLoading(false);
        // Set the old password field value
        form.setFieldsValue({
          oldPassword: data.Password,
        });
      } catch (error) {
        console.error("Error fetching initial values:", error);
        message.error('Có lỗi xảy ra khi tải thông tin tài khoản.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      const { password } = values; // Only take the new password
      await updateAccountInformation(id, { password }); // Call the API with only the new password
      message.success('Cập nhật mật khẩu thành công!');
    } catch (error) {
      console.error("Failed to update password:", error);
      message.error('Có lỗi xảy ra khi cập nhật mật khẩu.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Form
      form={form}
      name="update-password"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
        marginLeft: "450px",
        marginTop: "100px",
        height: "100vh",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div
        style={{
          maxWidth: 600,
          marginLeft: "150px",
          marginBottom: "20px",
          fontWeight: "700",
          fontSize: "16px",
          color: "#16056b",
        }}
      >
        Cập nhật mật khẩu
      </div>
      <Form.Item
        label="Mật khẩu cũ"
        name="oldPassword"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu cũ!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Mật khẩu mới"
        name="password"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu mới!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Xác nhận mật khẩu mới"
        name="confirmPassword"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Vui lòng xác nhận mật khẩu mới!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
            },
          }),
        ]}
      >
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

export default UpdatePassword;
