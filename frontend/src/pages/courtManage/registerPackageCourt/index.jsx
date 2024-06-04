import React from 'react';
import { Card, Button, Typography } from 'antd';
import "antd/dist/reset.css";

const { Title, Text } = Typography;

const RegisterPackageCourt = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Title level={1} style={{ textAlign: 'center' }}>Register Package Court</Title>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <Card title="Gói 6 tháng" bordered={false} style={{ width: 300 }}>
          <Text strong className="price">1.377.924 <span>đ</span></Text>
          <p>Thuê trong 6 tháng</p>
          <p>Discount 10%</p>
          <Button type="primary" block>Mua Ngay</Button>
        </Card>
        <Card title="Gói 1 năm" bordered={false} style={{ width: 300 }}>
          <Text strong className="price">2.756.124 <span>đ</span></Text>
          <p>Thuê trong 1 năm</p>
          <p>Discount 20%</p>
          <Button type="primary" block>Mua Ngay</Button>
        </Card>
        <Card title="Gói 2 năm" bordered={false} style={{ width: 300 }}>
          <Text strong className="price">5.512.523 <span>đ</span></Text>
          <p>Thuê trong 2 năm</p>
          <p>Discount 30%</p>
          <Button type="primary" block>Mua Ngay</Button>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPackageCourt;