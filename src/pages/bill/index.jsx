import React, { useState } from 'react';
import { Table, Popover, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const BadmintonInvoiceForm = () => {
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);

  const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
 

  const data = [
    {
      id: '001',
      customerName: 'Nguyễn Văn A',
      customerPhone: '0123456789',
      courtName: 'Sân cầu lông ABC',
      courtAddress: '123 Đường XYZ, Quận 1, TP.HCM',
      amount: 100000,
      bookingDate: '2023-05-27'
    },
    {
      id: '002',
      customerName: 'Trần Thị B',
      customerPhone: '0987654321',
      courtName: 'Sân tennis XYZ',
      courtAddress: '456 Đường ABC, Quận 2, TP.HCM',
      amount: 200000,
      bookingDate: '2023-05-28'
    },
    {
      id: '003',
      customerName: 'Lê Văn C',
      customerPhone: '0456789123',
      courtName: 'Sân bóng rổ PQR',
      courtAddress: '789 Đường DEF, Quận 3, TP.HCM',
      amount: 150000,
      bookingDate: '2023-05-29'
    }
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
      key: 'customerName'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'customerPhone',
      key: 'customerPhone'
    },
    {
      title: 'Tên sân',
      dataIndex: 'courtName',
      key: 'courtName'
    },
    {
      title: 'Địa chỉ sân',
      dataIndex: 'courtAddress',
      key: 'courtAddress'
    },
    {
      title: 'Số tiền thanh toán',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: 'Ngày đặt lịch',
      dataIndex: 'bookingDate',
      key: 'bookingDate',
      render: (bookingDate) => (
        <div>
          {bookingDate}
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => showInvoiceDetails(bookingDate)}
          />
        </div>
      )
    }
  ];

  const showInvoiceDetails = (bookingDate) => {
    const invoice = data.find((item) => item.bookingDate === bookingDate);
    setCurrentInvoice(invoice);
    setInvoiceVisible(true);
  };

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      {currentInvoice && (
        <Popover
           visible={invoiceVisible}
          onVisibleChange={(visible) => setInvoiceVisible(visible)}
          placement="leftTop"
          content={
            <div>
              <p>Mã hóa đơn: {currentInvoice.id}</p>
              <p>Tên khách hàng: {currentInvoice.customerName}</p>
              <p>Số điện thoại: {currentInvoice.customerPhone}</p>
              <p>Tên sân: {currentInvoice.courtName}</p>
              <p>Địa chỉ sân: {currentInvoice.courtAddress}</p>
              <p>Số tiền thanh toán: {currentInvoice.amount}</p>
              <p>Ngày đặt lịch: {currentInvoice.bookingDate}</p>
            </div>
          }
          trigger="click"
        
        />
      )}
    </>
  
  );
};

export default BadmintonInvoiceForm;