import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Avatar, Dropdown, Space } from 'antd';
import { MdArrowDropDown } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { GiTennisCourt } from 'react-icons/gi';
import { GrLogout } from 'react-icons/gr';
import logo from '@/assets/logonew.png';

const items = [
  //Items for the dropdown Profile
  {
    label: (
      <Link to='/login'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <CgProfile size='20px' />
          <>Đăng nhập</>
        </div></Link>
    ),
    key: '0',
  },

  {
    label: (
      <Link to='/signup'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <GiTennisCourt size='20px' />
          <>Đăng ký</>
        </div></Link>
    ),
    key: '1',
  },
  {
    label: (
      <Link to='/user'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <GiTennisCourt size='20px' />
          <>Thông tin cá nhân</>
        </div></Link>
    ),
    key: '2',
  },
  // {
  //   label: (

  //     <div
  //       style={{
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'start',
  //       }}
  //     >
  //       <GrLogout size='20px' />
  //       <>Đăng xuất</>
  //     </div>
  //   ),
  //   key: '2',
  // },
];

const menuItems = [
  {
    key: '1',
    label: 'Tìm sân',
    path: '/',
  },
  { key: '2', label: 'Giới thiệu', path: '/aboutUs' },
  { key: '3', label: 'Đăng kí đối tác', path: '/partner' },
  { key: '4', label: 'Đăng kí giải', path: '/tournament' },
];

export default function HeaderLayout() {
  const [selectedKey, setSelectedKey] = useState('');
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
    <>
      <>
        <img
          width={60}
          height={60}
          src={logo}
          className='demo-logo'
          style={{ margin: '4px 4px' }}
        />
        <Menu
          mode='horizontal'
          selectedKeys={[selectedKey]}
          style={{
            flex: 1,
            minWidth: 0,
            fontSize: '24px',
            background: '#141414',
          }}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} style={{ color: 'white' }}>
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
              size='large'
              src='https://api.dicebear.com/7.x/miniavs/svg?seed=1'
              style={{ background: 'white', height: '50px', width: '50px' }}
            />
            <MdArrowDropDown
              style={{ display: 'flex', alignItems: 'center' }}
              color='white'
              size='30px'
            />
          </Space>
        </a>
      </Dropdown>
    </>
  );
}
