import React, { useContext, useEffect, useState } from 'react';
import { Table, Tag, Button, Avatar } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import AuthContext from "../../../services/authAPI/authProvideAPI";
import getAllUsersAPI from '../../../services/admin/manageUser';
import moment from 'moment';

const UserManagement = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsersAPI();
        console.log('Fetched users:', data); // Log dữ liệu từ API
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleEdit = (key) => {
    console.log('Edit user with key:', key);
    // Thêm logic chỉnh sửa ở đây
  };

  const columns = [
    {
      title: 'Hình ảnh người dùng',
      key: 'avatar',
      render: (text, record) => {
        const defaultAvatar = 'https://api.dicebear.com/7.x/miniavs/svg?seed=1'; // Hình đại diện mặc định
        return (
          <Avatar 
            src={record.avatar || defaultAvatar} 
            style={{
              borderRadius: '50%', 
              border: '2px solid #d9d9d9',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Thêm bóng đổ
            }} 
          />
        );
      },
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'userName',
      key: 'userName',
      render: text => <span style={{ color: '#1890ff' }}>{text}</span>, // Thay đổi màu chữ
    },
    {
      title: 'Email',
      dataIndex: 'userEmail',
      key: 'userEmail',
      render: text => <span style={{ color: '#ff69b4' }}>{text}</span>, // Thay đổi màu chữ thành hồng
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'userPhone',
      key: 'userPhone',
      render: text => <span style={{ color: '#1890ff' }}>{text}</span>, // Thay đổi màu chữ
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        let color;
        switch (role) {
          case 'manager':
            color = '#2f54eb'; // geekblue
            break;
          case 'admin':
            color = '#f5222d'; // red
            break;
          default:
            color = '#52c41a'; // green
        }
        return (
          <Tag color={color} style={{ margin: '0', fontWeight: 'bold' }} key={role}>
            {role.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Trạng thái tài khoản',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 'Hoạt động' ? '#52c41a' : '#fa541c'; // green or volcano
        return (
          <Tag color={color} style={{ margin: '0', fontWeight: 'bold' }} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Ngày tạo tài khoản',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => moment(createdAt).format('DD/MM/YYYY'),
    },
    
  ];

  // Filter the users to show only those with the role 'customer'
  const filteredUsers = users.filter(user => user.role === 'customer');

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', padding: '20px', backgroundColor: '#f0f2f5' }}>
      <h1 style={{ flex: '0 1 auto', marginBottom: '20px', color: '#333' }}>Quản lý người dùng</h1>
      <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
        <Table
          dataSource={filteredUsers}
          columns={columns}
          style={{ width: '100%', height: '100%' }}
          scroll={{ y: 'calc(100vh - 150px)' }}
          pagination={{ pageSize: 10 }} // Thêm phân trang
        />
      </div>
    </div>
  );
};

export default UserManagement;
