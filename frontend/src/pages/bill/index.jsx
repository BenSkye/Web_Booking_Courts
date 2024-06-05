import React, { useState } from "react";
import { Card, Button, Image, Modal } from "antd";

const generateInvoiceCode = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (`0${now.getMonth() + 1}`).slice(-2);
  const day = (`0${now.getDate()}`).slice(-2);
  const hours = (`0${now.getHours()}`).slice(-2);
  const minutes = (`0${now.getMinutes()}`).slice(-2);
  const seconds = (`0${now.getSeconds()}`).slice(-2);
  return `INV-${year}${month}${day}-${hours}${minutes}${seconds}`;
};

const OrderDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const showModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const invoices = [
    {
      name: "Nguyễn Văn A",
      phone: "0123456789",
      image: "https://via.placeholder.com/80",
      title: "Tên sân: Sân bóng ABC",
      description: "123 Đường XYZ, Quận 1, TP.HCM",
      price: "188.000",
      bookingDate: new Date(2024, 5, 3),  // 3/6/2024
      bookingTime: "5h chiều"
    },
    {
      name: "Nguyễn Văn B",
      phone: "0987654321",
      image: "https://via.placeholder.com/80",
      title: "Tên sân: Sân bóng XYZ",
      description: "456 Đường ABC, Quận 2, TP.HCM",
      price: "200.000",
      bookingDates: [
        new Date(2024, 5, 3),  // 3/6/2024
        new Date(2024, 5, 10), // 10/6/2024
        new Date(2024, 5, 17), // 17/6/2024
        new Date(2024, 5, 24)  // 24/6/2024
      ],
      bookingTime: "5h chiều",
    },
    {
      name: "Nguyễn Văn C",
      phone: "0369871234",
      image: "https://via.placeholder.com/80",
      title: "Tên sân: Sân bóng ZXY",
      description: "789 Đường DEF, Quận 3, TP.HCM",
      price: "500.000",
      bookingDate: new Date(2024, 5, 10),  // 10/6/2024
      bookingTime: "Tối thiểu 30 giờ",
    }
  ];

  return (
    <div style={{ maxHeight: '80vh', overflowY: 'auto', padding: '16px' }}>
      {invoices.map((invoice, index) => (
        <Card key={index} style={{ border: '1px solid #e8e8e8', borderRadius: '10px', marginBottom: '16px', padding: '24px', width: '100%', margin: '0 auto', height: 'fit-content', marginTop: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '13px' }}>{invoice.name}</h3>
            <p style={{ fontSize: '13px' }}>Phone: {invoice.phone}</p>
          </div>
          <hr style={{ margin: '16px 0', border: '0', borderTop: '1px solid #e8e8e8' }} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image width={80} src={invoice.image} alt={invoice.title} style={{ width: 80 }} />
            <div style={{ marginLeft: '16px', flex: '1' }}>
              <h3 style={{ fontSize: '13px' }}>{invoice.title}</h3>
              <p style={{ fontSize: '13px' }}>{invoice.description}</p>
            </div>
            <p style={{ fontWeight: 'bold', fontSize: '13px', textAlign: 'right', flex: '2' }}>{invoice.price} ₫</p>
          </div>
          <p style={{ fontWeight: 'bold', textAlign: 'right', fontSize: '16px', float: 'right', marginRight: 20 }}>Tổng tiền: {invoice.price}đ </p>
          <div style={{ marginTop: '40px', height: '50px' }}>
            <Button type="primary" style={{ marginRight: 1, float: 'right' }}>Đặt lại</Button>
            <Button style={{ float: 'right' }} onClick={() => showModal(invoice)}>Xem chi tiết</Button>
          </div>
        </Card>
      ))}
     {selectedInvoice && (
  <Modal title="Chi tiết khách hàng" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={800}>
    <p>Mã hóa đơn: {generateInvoiceCode()}</p>
    <p>Tên: {selectedInvoice.name}</p>
    <p>Số điện thoại: {selectedInvoice.phone}</p>
    <p>Địa chỉ sân: {selectedInvoice.description}</p>
    <p>Giá: {selectedInvoice.price} ₫</p>
    <div>
      <p>Hình thức đặt sân:</p>
      <p>Ngày thanh toán: {selectedInvoice.bookingDate ? selectedInvoice.bookingDate.toLocaleDateString() : 'N/A'}</p>
      <p>Giờ thanh toán: {selectedInvoice.bookingTime}</p>
    </div>
  </Modal>
      )}
    </div>
  );
};

export default OrderDetails;
