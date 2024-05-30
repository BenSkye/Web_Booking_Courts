import React, { useState } from "react";
import { Table, Popover, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import styled from "styled-components";

const BadmintonInvoiceForm = () => {
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);

  const data = [
    {
      id: "001",
      customerName: "Nguyễn Văn A",
      customerPhone: "0123456789",
      courtName: "Sân cầu lông ABC",
      courtAddress: "123 Đường XYZ, Quận 1, TP.HCM",
      amount: 100000,
      bookingDate: "2023-05-27",
    },
    {
      id: "002",
      customerName: "Nguyễn Văn A",
      customerPhone: "0987654321",
      courtName: "Sân tennis XYZ",
      courtAddress: "456 Đường ABC, Quận 2, TP.HCM",
      amount: 200000,
      bookingDate: "2023-05-28",
    },
    {
      id: "003",
      customerName: "Nguyễn Văn A",
      customerPhone: "0456789123",
      courtName: "Sân bóng rổ PQR",
      courtAddress: "789 Đường DEF, Quận 3, TP.HCM",
      amount: 150000,
      bookingDate: "2023-05-29",
    },
  ];

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên khách hàng", dataIndex: "customerName", key: "customerName" },
    { title: "Số điện thoại", dataIndex: "customerPhone", key: "customerPhone" },
    { title: "Tên sân", dataIndex: "courtName", key: "courtName" },
    { title: "Địa chỉ sân", dataIndex: "courtAddress", key: "courtAddress" },
    { title: "Số tiền thanh toán", dataIndex: "amount", key: "amount" },
    {
      title: "Ngày đặt lịch",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (bookingDate) => (
        <div>
          {bookingDate}
        </div>
      ),
    },
  ];

  const showInvoiceDetails = (bookingDate) => {
    const invoice = data.find((item) => item.bookingDate === bookingDate);
    setCurrentInvoice(invoice);
    setInvoiceVisible(true);
  };

  return (
    <div style={{
      padding: '24px',
      backgroundColor: 'white',
      borderRadius: '4px',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#3f3f3f',
        marginBottom: '24px'
      }}>Cập nhật hóa đơn</h1>
      <div style={{
        width: '100%',
        overflowX: 'auto',
        display: 'flex',
        justifyContent: 'center',
        flexGrow: '1'
      }}>
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          pagination={false}
          style={{ width: '100%' }}
          scroll={{ x: '100%' }}
        />
      </div>
      {currentInvoice && (
        <Popover
          visible={invoiceVisible}
          onVisibleChange={(visible) => setInvoiceVisible(visible)}
          placement="leftTop"
          content={
            <div style={{
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              fontSize: '16px',
              lineHeight: '1.5'
            }}>
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
        >
          <Button type="link" onClick={() => setInvoiceVisible(!invoiceVisible)} />
        </Popover>
      )}
    </div>
  );
};

export default BadmintonInvoiceForm;
