
import React, { useState } from "react";
import AccountSettingsForm from "../accountInformation/index";
import UpdatePassword from "../updatePassword/index";
import { Link } from "react-router-dom";
import BadmintonInvoiceForm from "../bill/index";
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
    <Layout style={{ minHeight: "100vh" , maxWidth: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ marginTop: "60px" }}
          onClick={handleClick}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/user/my-account"></Link>
          Tài khoản của tôi
         
          </Menu.Item>
          <Menu.Item key="2" icon={<LockOutlined />}>
          <Link to="/user/update-password"></Link>
            Cập nhật mật khẩu
          </Menu.Item>
          <Menu.Item key="3" icon={<BookOutlined />}>
            Đặt sân
          </Menu.Item>
          <Menu.Item key="4" icon={<PlayCircleOutlined />}>
            Số sân đã chơi
          </Menu.Item>
          <Menu.Item key="5" icon={<FileTextOutlined />}>
            Hóa đơn
          </Menu.Item>
        </Menu>
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
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {selectedKey === "1" && (
            
              <AccountSettingsForm />
            
          )}
          {selectedKey === "2" && <UpdatePassword />}
          {selectedKey === "3" && <h1>Bookings Content</h1>}
          {selectedKey === "4" && <h1>Game Content</h1>}
          {selectedKey === "5" && <h1><BadmintonInvoiceForm/></h1>}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
