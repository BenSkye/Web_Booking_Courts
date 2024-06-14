import React, { useContext, useEffect, useState } from 'react';
import { Table, Tag, Button, Avatar } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import AuthContext from "../../../services/authAPI/authProvideAPI";
import getAllUsersAPI from '../../../services/admin/manageUser';

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
      render: (avatar) => {
        const defaultAvatar = 'https://api.dicebear.com/7.x/miniavs/svg?seed=1';
        return <Avatar src={avatar || defaultAvatar} />;
      },
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Email',
      dataIndex: 'userEmail',
      key: 'userEmail',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'userPhone',
      key: 'userPhone',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        let color;
        switch (role) {
          case 'manager':
            color = 'geekblue';
            break;
          case 'admin':
            color = 'red';
            break;
          default:
            color = 'green';
        }
        return (
          <Tag color={color} key={role}>
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
        let color = status === 'Hoạt động' ? 'green' : 'volcano';
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Ngày tạo tài khoản',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record.key)}>Chỉnh sửa</Button>
      ),
    },
  ];

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ flex: '0 1 auto' }}>Quản lý người dùng</h1>
      <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
        <Table
          dataSource={users}
          columns={columns}
          style={{ width: '100%', height: '100%' }}
          scroll={{ y: 'calc(100vh - 150px)' }}
        />
      </div>
    </div>
  );
};

export default UserManagement;
