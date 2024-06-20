import React, { useEffect, useState } from "react";
import AccountSettingsForm from "../accountInformation/index";
import UpdatePassword from "../updatePassword/index";
import { Link } from "react-router-dom";
import OrderDetails from "../bill/index";
import BookingCourt from "../bookingCourt/index";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LockOutlined,
  BookOutlined,
  PlayCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useLocation } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const ProfileAccount = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  console.log("path", path);
  let defaultKey;
  switch (path) {
    case "/user/my-account":
      defaultKey = "1";
      break;
    case "/user/update-password":
      defaultKey = "2";
      break;
    case "/user/booking-court":
      defaultKey = "3";
      break;
    // Add more cases as needed
    default:
      defaultKey = "1";
  }
  const [selectedKey, setSelectedKey] = useState(defaultKey);
  useEffect(() => {
    switch (path) {
      case "/user/my-account":
        setSelectedKey("1");
        break;
      case "/user/update-password":
        setSelectedKey("2");
        break;
      case "/user/booking-court":
        setSelectedKey("3");
        break;
      case "/user/bill":
        setSelectedKey("5");
        break;
      // Add more cases as needed
      default:
        setSelectedKey("1");
    }
  }, [path]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleClick = (e) => {
    setSelectedKey(e.key); // Cập nhật trạng thái khi một liên kết được chọn
  };

  return (
    <Layout style={{ minHeight: "100vh", maxWidth: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ marginTop: "60px" }}
          onClick={handleClick}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "#fff",
            }}
          />
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/user/my-account"></Link>
            Tài khoản của tôi
          </Menu.Item>
          <Menu.Item key="2" icon={<LockOutlined />}>
            <Link to="/user/update-password"></Link>
            Cập nhật mật khẩu
          </Menu.Item>
          <Menu.Item key="3" icon={<BookOutlined />}>
            <Link to="/user/booking-court"></Link>
            Đặt sân
          </Menu.Item>
          <Menu.Item key="4" icon={<PlayCircleOutlined />}>
            Số giờ chơi
          </Menu.Item>
          <Menu.Item key="5" icon={<FileTextOutlined />}>
            <Link to="/user/bill"></Link>
            Hóa đơn
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
        
        </Header> */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            border: "2px solid #d9d9d9", // Đặt đường viền màu xám nhạt
            // display: "flex",
            // justifyContent: "flex-start",
          }}
        >
          {selectedKey === "1" && <AccountSettingsForm />}
          {selectedKey === "2" && <UpdatePassword />}
          {selectedKey === "3" && <BookingCourt />}
          {selectedKey === "4" && <h1>Game Content</h1>}
          {selectedKey === "5" && (
            <h1>
              <OrderDetails />
            </h1>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfileAccount;
