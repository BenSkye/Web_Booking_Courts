import React, { useState } from 'react';
import { Calendar, Modal, Typography } from 'antd';
import moment from 'moment';

const { Paragraph } = Typography;

const invoices = [
  {
    id: 1,
    name: "Sân bóng ABC",
    address: "123 Đường XYZ, Quận 1, TP.HCM",
    fieldNumber: "Sân 1",
    date: new Date(2024, 5, 3), // 3/6/2024
    time: "17h - 19h "
  },
  {
    id: 2,
    name: "Sân bóng XYZ",
    address: "456 Đường ABC, Quận 2, TP.HCM",
    fieldNumber: "Sân 2",
    date: new Date(2024, 5, 10), // 10/6/2024
    time: "16h - 17h"
  },
  // Thêm các invoice khác nếu cần
];

const BookingCourt = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const onSelect = (value) => {
    const selectedDate = value.toDate();
    const invoice = invoices.find(inv => inv.date.toDateString() === selectedDate.toDateString());
    if (invoice) {
      setSelectedInvoice(invoice);
      setIsModalVisible(true);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dateCellRender = (value) => {
    const date = value.toDate();
    const invoice = invoices.find(inv => inv.date.toDateString() === date.toDateString());
    return invoice ? (
      <div>
        <Paragraph strong>{invoice.name}</Paragraph>
        <Paragraph>{invoice.time}</Paragraph>
      </div>
    ) : null;
  };

  return (
    <div>
      <Calendar 
        dateCellRender={dateCellRender} 
        onSelect={onSelect} 
      />
      {selectedInvoice && (
        <Modal 
          title="Chi tiết đặt sân" 
          visible={isModalVisible} 
          onOk={handleOk} 
          onCancel={handleCancel}
        >
          <Paragraph><strong>Tên sân:</strong> {selectedInvoice.name}</Paragraph>
          <Paragraph><strong>Địa chỉ:</strong> {selectedInvoice.address}</Paragraph>
          <Paragraph><strong>Số sân:</strong> {selectedInvoice.fieldNumber}</Paragraph>
          <Paragraph><strong>Ngày chơi:</strong> {selectedInvoice.date.toLocaleDateString()}</Paragraph>
          <Paragraph><strong>Giờ chơi:</strong> {selectedInvoice.time}</Paragraph>
        </Modal>
      )}
    </div>
  );
};

export default BookingCourt;
