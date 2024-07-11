/* eslint-disable react/prop-types */
import { Form, Input, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { checkEmailExistence } from "../../../services/accountAPI/userAPi";

export default function CustomerInformation({ onSubmit }) {
  const [form] = Form.useForm();
  const [emailExists, setEmailExists] = useState(null);
  const [emailHasPhone, setEmailHasPhone] = useState(null);
  const [user, setUser] = useState({});

  const handleEmailValidation = async () => {
    const email = form.getFieldValue("email");
    try {
      const result = await checkEmailExistence(email);
      console.log("Email tồn tại:", result);
      if (result.data.user) {
        setEmailExists(true);
        console.log("User phone:", result.data.user.userPhone);
        setUser(result.data.user);
        if (result.data.user.userPhone !== null) {
          setEmailHasPhone(true);
          onSubmit({
            userName: result.data.user.userName,
            userEmail: result.data.user.userEmail,
            userPhone: result.data.user.userPhone,
          });
          message.success(
            "Email đã tồn tại trong hệ thống bạn có thể tiếp tục đặt sân cho khách hàng"
          );
        } else {
          setEmailHasPhone(false);
          message.success(
            "Email đã tồn tại trong hệ thống, vui lòng cập nhật số điện thoại để tiếp tục"
          );
        }
      } else {
        setEmailExists(false);
        message.warning(
          "Email không tồn tại trong hệ thống, vui lòng điền thông tin khách hàng"
        );
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra email tồn tại:", error);
    }
  };

  useEffect(() => {
    console.log("Email tồn tại:", emailExists);
    console.log("Email có số điện thoại:", emailHasPhone);
  }, [emailHasPhone, emailExists]);

  const handleFinish = async (values) => {
    await handleEmailValidation();
    if (emailExists === true) {
      if (emailHasPhone === false) {
        console.log("values", values);
        await onSubmit({
          userName: user.userName,
          userEmail: user.userEmail,
          userPhone: values.phoneNumber,
        });
      } else {
        await onSubmit({
          userName: user.userName,
          userEmail: user.userEmail,
          userPhone: user.userPhone,
        });
      }
    }
    if (emailExists === false) {
      await onSubmit({
        userName: values.userName,
        userEmail: values.email,
        userPhone: values.phoneNumber,
      });
    }
  };

  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        style={{ maxWidth: 700, margin: "auto" }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: "email", message: "Địa chỉ email không hợp lệ!" },
            { required: true, message: "Vui lòng nhập email!" },
          ]}
        >
          <Input />
        </Form.Item>

        {emailExists === false && (
          <>
            <Form.Item
              label="Họ và tên"
              name="userName"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input />
            </Form.Item>
          </>
        )}

        {emailExists === true && emailHasPhone === false && (
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Xác Nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
