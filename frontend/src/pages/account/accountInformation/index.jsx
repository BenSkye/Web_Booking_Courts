import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Form, Input, message, Spin, Avatar, Row, Col, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../services/authAPI/authProvideAPI";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../../utils/firebase/firebase";
import { PersonalInformation } from "../../../services/accountAPI/personalInformation";
import Updateuser from "../../../services/accountAPI/update_account-API";

const storage = getStorage(app);

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { changePass } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const fixedAccountData = {
    Password: "",
  };

  useEffect(() => {
    setLoading(false);
    form.setFieldsValue({
      oldPassword: fixedAccountData.Password,
    });
  }, [form]);

  const onFinish = async (values) => {
    const result = await changePass(
      values.oldPassword,
      values.newPassword,
      values.confirmPassword
    );
    if (result && result.status === "fail") {
      message.error(result.message);
      navigate("/login");
    } else if (result) {
      message.success("Cập nhật mật khẩu thành công!");
    } else {
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
    <Form
      form={form}
      name="update-password"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ width: '100%' }}
    >
      <Form.Item
        label="Mật khẩu cũ"
        name="oldPassword"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Mật khẩu mới"
        name="newPassword"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Xác nhận mật khẩu mới"
        name="confirmPassword"
        dependencies={["newPassword"]}
        rules={[
          { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
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
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "100%",
            backgroundColor: "#f0b400",
            borderRadius: "4px",
            border: "none",
            height: "40px",
            fontWeight: "600",
          }}
        >
          Cập nhật mật khẩu
        </Button>
      </Form.Item>
    </Form>
  );
};

const AccountSettingsForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const fileRef = useRef(null);

  const getPersonal = async () => {
    const personal = await PersonalInformation();
    setUser(personal);
  };

  useEffect(() => {
    getPersonal();
  }, []);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        userName: user.userName,
        userEmail: user.userEmail,
        userPhone: user.userPhone,
        avatar: user.avatar,
        userAddress: user.userAddress,
      });
      setLoading(false);
    }
  }, [form, user]);

  const onFinish = async (values) => {
    const userChange = await Updateuser(
      values.userName,
      values.userPhone,
      values.avatar,
      values.userAddress
    );
    if (userChange) {
      message.success("Cập nhật tài khoản thành công!");
    } else {
      message.error("Có lỗi xảy ra khi cập nhật tài khoản.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleUploadAvatar(file);
    }
  };

  const handleUploadAvatar = async (file) => {
    try {
      const storageRef = ref(storage, `avatars/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed:", error);
          message.error("Upload failed");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            form.setFieldsValue({ avatar: downloadURL });
            message.success("Upload successful");
            setUser((prevUser) => ({ ...prevUser, avatar: downloadURL }));
          });
        }
      );
    } catch (error) {
      console.error("Upload failed:", error);
      message.error("Upload failed");
    }
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ width: '100%' }}
    >
      <Row justify="center" style={{ marginBottom: "20px" }}>
        <Avatar
          onClick={() => fileRef.current.click()}
          size={100}
          src={
            user?.avatar
              ? user.avatar
              : "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
          }
          style={{ cursor: "pointer" }}
        />
        <input
          type="file"
          ref={fileRef}
          style={{ display: "none" }}
          onChange={handleAvatarChange}
          hidden
          accept="image/*"
        />
      </Row>
      <Form.Item label="Họ và tên" name="userName">
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="userEmail">
        <Input disabled />
      </Form.Item>
      <Form.Item label="Số điện thoại" name="userPhone">
        <Input />
      </Form.Item>
      <Form.Item label="Địa chỉ" name="userAddress">
        <Input />
      </Form.Item>
      <Form.Item name="avatar" hidden>
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "100%",
            backgroundColor: "#f0b400",
            borderRadius: "4px",
            border: "none",
            height: "40px",
            fontWeight: "600",
          }}
        >
          Cập nhật tài khoản
        </Button>
      </Form.Item>
    </Form>
  );
};

const CustomTabTitle = ({ title }) => {
  return (
    <div style={{ fontWeight: '700', fontSize: '18px', color: '#16056b', textAlign: 'center' }}>
      {title}
    </div>
  );
};

const { TabPane } = Tabs;

const AccountManagement = () => {
  const [activeTab, setActiveTab] = useState("updatePassword");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div style={{ width: "100%", maxWidth: "800px", padding: "20px", marginTop: "-180px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <Button
            type={activeTab === "updatePassword" ? "primary" : "default"}
            onClick={() => handleTabChange("updatePassword")}
          >
            Cập nhật mật khẩu
          </Button>
          <Button
            type={activeTab === "accountSettings" ? "primary" : "default"}
            onClick={() => handleTabChange("accountSettings")}
          >
            Cập nhật tài khoản
          </Button>
        </div>
        <div style={{ border: "1px solid #e5e5e5", borderRadius: "8px", backgroundColor: "#ffffff", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", padding: "20px" }}>
          {activeTab === "updatePassword" ? <UpdatePassword /> : <AccountSettingsForm />}
        </div>
      </div>
    </div>
  );
};


export default AccountManagement;
