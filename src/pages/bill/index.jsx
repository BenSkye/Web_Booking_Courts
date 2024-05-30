import React, { useState } from "react";
import { Card, Button, Image } from "antd";
import styled from "styled-components";

const InvoiceCard = styled(Card)`
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const InvoiceDetails = styled.div`
  display: flex;
  align-items: center;
`;

const InvoiceInfo = styled.div`
  margin-left: 16px;
`;

const InvoiceActions = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.hr`
  margin: 16px 0;
  border: 0;
  border-top: 1px solid #e8e8e8;
`;

const Header = styled.div`
  margin-bottom: 16px;
`;

const InvoiceItem = ({ invoice }) => (
  <InvoiceCard>
    <Header>
      <h3>{invoice.name}</h3>
      <p>Phone: {invoice.phone}</p>
    </Header>
    <Divider />
    <InvoiceDetails>
      <Image
        width={80}
        src={invoice.image}
        alt={invoice.title}
      />
      <InvoiceInfo>
        <h3>{invoice.title}</h3>
        <p>{invoice.description}</p>
        <p style={{ fontWeight: "bold" }}>{invoice.price} ₫</p>
      </InvoiceInfo>
    </InvoiceDetails>
    <InvoiceActions>
      <p style={{ fontWeight: "bold" }}>Tổng tiền: {invoice.price} ₫</p>
      <div>
        <Button type="primary" style={{ marginRight: 8 }}>Mua lại</Button>
        <Button>Xem chi tiết</Button>
      </div>
    </InvoiceActions>
  </InvoiceCard>
);

const App = () => {
  const invoice = {
    name: "Nguyễn Văn A",
    phone: "0123456789",
    image: "https://via.placeholder.com/80",
    title: "Tên sân: Sân bóng ABC",
    description: "Địa chỉ sân: 123 Đường XYZ, Quận 1, TP.HCM",
    price: "188.000",
  };

  return (
    <div style={{ padding: 24, width: "100%", margin: "0 auto" }}>
      <InvoiceItem invoice={invoice} />
    </div>
  );
};

export default App;
