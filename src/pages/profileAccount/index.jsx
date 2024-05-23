import React, { useState } from "react";
import AccountSettingsForm from "../accountInformation/index";
import UpdatePassword from "../updatePassword/index";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BookOutlined,
  PlayCircleOutlined,
  FileTextOutlined,
  SettingOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1"); // State để lưu trạng thái liên kết được chọn
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleClick = (e) => {
    setSelectedKey(e.key); // Cập nhật trạng thái khi một liên kết được chọn
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ marginTop: "60px" }}
          onClick={handleClick}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "My Account",
            },
            {
              key: "2",
              icon: <LockOutlined />,
              label: "Update Password",
            },
            {
              key: "3",
              icon: <BookOutlined />,
              label: "Bookings",
            },
            {
              key: "4",
              icon: <PlayCircleOutlined />,
              label: "Game",
            },
            {
              key: "5",
              icon: <FileTextOutlined />,
              label: "Invoices",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            border: "2px solid #d9d9d9", // Đặt đường viền màu xám nhạt
          }}
        >
          {selectedKey === "1" && <AccountSettingsForm />}
          {selectedKey === "2" && <UpdatePassword />}
          {selectedKey === "3" && <h1>Bookings Content</h1>}
          {selectedKey === "4" && <h1>Game Content</h1>}
          {selectedKey === "5" && <h1>Invoices Content</h1>}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
