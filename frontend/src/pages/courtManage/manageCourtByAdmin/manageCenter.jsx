// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { Table, Tag, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import AuthContext from "../../../services/authAPI/authProvideAPI";
import {getAllCenterAPI} from '../../../services/centersAPI/getCenters';

const ManageCenter = () => {
  const { user } = useContext(AuthContext);
  const [centers, setCenter] = useState([]);

  useEffect(() => {
    const fetchCenter = async () => {
      try {
        const data = await getAllCenterAPI();
        console.log('Fetched center:', data); // Log dữ liệu từ API
        setCenter(data);
      } catch (error) {
        console.error('Failed to fetch center:', error);
      }
    };

    fetchCenter();
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
      title: 'Tên sân',
      dataIndex: 'centerName',
      key: 'centerName',
    },
    {
      title: 'Địa chỉ sân',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Giờ mở cửa',
      dataIndex: 'openTime',
      key: 'openTime',
    },
    {
      title: 'Giờ đóng cửa',
      dataIndex: 'closeTime',
      key: 'closeTime',
    },
    {
      title: 'Số sân hiện có',
      dataIndex: 'courtCount',
      key: 'courtCount',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      render: images => <img src={images} alt={images} style={{ width: '50px', height: '50px' }} />,
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'services',
      key: 'services',
      render: services => (
        <div>
          {services.map((service, index) => (
            <Tag color="blue" key={index}>
              {service}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        let color = '';
        if (status === 'pending') {
          color = 'volcano';
        } else if (status === 'accepted') {
          color = 'geekblue';
        } else if (status === 'active') {
          color = 'green';
        } else if (status === 'expired') {
          color = 'gray';
        } else if (status === 'rejected') {
          color = 'red';
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'create',
      key: 'create',
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
      <h1 style={{ flex: '0 1 auto' }}>Quản lý sân</h1>
      <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
        <Table
          dataSource={centers}
          columns={columns}
          style={{ width: '100%', height: '100%' }}
          scroll={{ y: 'calc(100vh - 150px)' }} // Adjust based on header height
        />
      </div>
    </div>
  );
};

export default ManageCenter;
