import React from 'react';
import { Table, Tag } from 'antd';

const dataSource = [
  {
    key: '1',
    fieldName: 'Sân 1',
    address: 'Địa chỉ 1',
    numberOfFields: 5,
    owner: 'Nguyễn Văn A',
    status: 'chưa duyệt',
  },
  {
    key: '2',
    fieldName: 'Sân 2',
    address: 'Địa chỉ 2',
    numberOfFields: 8,
    owner: 'Trần Thị B',
    status: 'đã duyệt',
  },
  {
    key: '3',
    fieldName: 'Sân 3',
    address: 'Địa chỉ 3',
    numberOfFields: 3,
    owner: 'Lê Văn C',
    status: 'đã trả tiền',
  },
];

const columns = [
  {
    title: 'Tên sân',
    dataIndex: 'fieldName',
    key: 'fieldName',
  },
  {
    title: 'Địa chỉ sân',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Số sân hiện có',
    dataIndex: 'numberOfFields',
    key: 'numberOfFields',
  },
  {
    title: 'Chủ sân',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: status => {
      let color = '';
      if (status === 'chưa duyệt') {
        color = 'volcano';
      } else if (status === 'đã duyệt') {
        color = 'geekblue';
      } else if (status === 'đã trả tiền') {
        color = 'green';
      }
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
];

const ManageCourt = () => {
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ flex: '0 1 auto' }}>Quản lý sân</h1>
      <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
        <Table
          dataSource={dataSource}
          columns={columns}
          style={{ width: '100%', height: '100%' }}
          scroll={{ y: 'calc(100vh - 150px)' }} // Adjust based on header height
        />
      </div>
    </div>
  );
};

export default ManageCourt;
