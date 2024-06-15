// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Form, Input, message, Spin, Avatar, Row } from "antd";
// import Updateuser from '../../../services/authAPI/authProvideAPI'
import AuthContext from "../../../services/authAPI/authProvideAPI";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../../utils/firebase/firebase";
import { PersonalInformation } from "../../../services/accountAPI/personalInformation";
import Updateuser from "../../../services/accountAPI/update_account-API";

const storage = getStorage(app);

const AccountSettingsForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  // const { user } = useContext(AuthContext);
  const [user, setUser] = useState();
  const fileRef = useRef(null);
  const getPersonal = async()=>{
    const personal = await  PersonalInformation();
    console.log('personal',personal)
    setUser(personal);
  }
  useEffect(() => {
    getPersonal()
  }, []);
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        userName: user.userName,
        userEmail: user.userEmail,
        userPhone: user.userPhone,
        avatar: user.avatar,
      });
      setLoading(false);
    }
  }, [form, user]);

  const onFinish = async (values) => {
    const userChange = await Updateuser(
      values.userName,
      values.userPhone,
      values.avatar
    );
    console.log("userChange", userChange);
    if (userChange) {
      message.success("Cập nhật tài khoản!");
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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed:", error);
          message.error("Upload failed");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            form.setFieldsValue({ avatar: downloadURL });
            message.success("Upload successful");
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
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        marginTop: "50px",
        padding: "0 20px",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          marginBottom: "20px",
          fontWeight: "700",
          fontSize: "16px",
          color: "#16056b",
          textAlign: "center",
        }}
      >
        Cập nhật tài khoản
      </div>
      <Row justify="center" style={{ marginBottom: "20px" }}>
        <Avatar
          onClick={() => fileRef.current.click()}
          size={100}
          src={
            user?.avatar
              ? user.avatar
              : "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
          }
          style={{
            background: "white",
            height: "100px",
            width: "100px",
            cursor: "pointer",
          }}
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
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Cập nhật tài khoản
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccountSettingsForm;
