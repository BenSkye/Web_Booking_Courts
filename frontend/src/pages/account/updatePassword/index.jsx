import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import { useParams } from "react-router-dom";

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  
  // Giả sử dữ liệu tài khoản cứng
  const fixedAccountData = {
    Password: "password_from_fixed_data"
  };

  useEffect(() => {
    // Giả sử việc tải dữ liệu không cần thời gian, không cần gọi API
    setLoading(false);
    form.setFieldsValue({
      oldPassword: fixedAccountData.Password,
    });
  }, [form]);

  const onFinish = async (values) => {
    try {
      const { password } = values;
      // Thực hiện cập nhật mật khẩu ở đây
      // Giả sử việc này không cần gọi API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Giả sử việc cập nhật mật khẩu thành công sau 1 giây
      message.success("Cập nhật mật khẩu thành công!");
    } catch (error) {
      console.error("Failed to update password:", error);
      message.error("Có lỗi xảy ra khi cập nhật mật khẩu.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form
        form={form}
        name="update-password"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: '100%', maxWidth: '600px', padding: '20px', boxSizing: 'border-box' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '700', fontSize: '14px', color: '#16056b', marginLeft: "150px" }}>
          Cập nhật mật khẩu
        </div>
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu cũ!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" style={{ width: '50%', marginLeft: '230px' }}>
            Cập nhật mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdatePassword;
