import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Layout, Menu, theme, Avatar, Dropdown, Space } from "antd";
import { MdArrowDropDown } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GiTennisCourt } from "react-icons/gi";
import { GrLogout } from "react-icons/gr";
import logo from "@/assets/logonew.png";
import bgFooter from "@/assets/backgroundfooter.jpg";
import FooterLayout from "@/components/layouts/components/footer";

const { Header, Content, Footer } = Layout;

const items = [
  //Items for the dropdown Profile
  {
    label: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Link to="/user">
          <div>
            <CgProfile size="20px" />
            <>Thông tin cá nhân</>
          </div>
        </Link>
      </div>
    ),
    key: "0",
  },

  {
    label: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <GiTennisCourt size="20px" />
        <>Sân đã đặt</>
      </div>
    ),
    key: "1",
  },
  {
    label: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <GrLogout size="20px" />
        <>Đăng xuất</>
      </div>
    ),
    key: "2",
  },
];

const menuItems = [
  {
    key: "1",
    label: "Tìm sân",
    path: "/",
  },
  { key: "2", label: "Giới thiệu", path: "/aboutUs" },
  { key: "3", label: "Đăng kí đối tác", path: "/partner" },
  { key: "4", label: "Đăng kí giải", path: "/tournament" },
];

const LayoutMain = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState("");
  const location = useLocation();
  useEffect(() => {
    // Lấy đường dẫn hiện tại từ useLocation và tìm kiếm nó trong menuItems
    const selectedItem = menuItems.find(
      (item) => item.path === location.pathname
    );
    if (selectedItem) {
      setSelectedKey(selectedItem.key); // Nếu tìm thấy, đặt selectedKey tương ứng
    }
  }, [location.pathname]);

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: "#141414",
        }}
      >
        <>
          <img
            width={60}
            height={60}
            src={logo}
            className="demo-logo"
            style={{ margin: "4px 4px" }}
          />
          <Menu
            mode="horizontal"
            selectedKeys={[selectedKey]}
            style={{
              flex: 1,
              minWidth: 0,
              fontSize: "24px",
              background: "#141414",
            }}
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.key} style={{ color: "white" }}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </>

        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar
                size="large"
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                style={{ background: "white", height: "50px", width: "50px" }}
              />
              <MdArrowDropDown
                style={{ display: "flex", alignItems: "center" }}
                color="white"
                size="30px"
              />
            </Space>
          </a>
        </Dropdown>
      </Header>
      <Content
        style={{
          padding: "0 30px",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          backgroundImage: `url(${bgFooter})`,
          backgroundSize: "cover", // Đảm bảo hình ảnh nền bao phủ toàn bộ phần tử
          backgroundRepeat: "no-repeat", // Ngăn lặp lại hình ảnh
          color: "white", // Đặt màu chữ trắng để dễ đọc trên nền tối
        }}
      >
        <FooterLayout />
      </Footer>
    </Layout>
  );
};
export default LayoutMain;
