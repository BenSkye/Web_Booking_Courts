import React from "react";

import { Col, Row,Card } from "antd";
import MemberShipChart from "./memberShipChart";
import AccountChart from './accountChart';

export default function AdminDashboard() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>Bảng điều khiển quản trị</h1>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Biểu đồ Thành viên"
            bordered={false}
            style={{ marginBottom: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          >
            <MemberShipChart />
          </Card>
        </Col>
        <Col span={12}>
        <Card
      title="Biểu đồ Tài khoản"
      bordered={false}
      style={{ 
        marginBottom: '20px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        padding: '20px', // Thêm padding để đảm bảo nội dung không bị cắt
      }}
    >
      <div style={{ width: '100%', height: '400px' }}> {/* Đảm bảo container của biểu đồ có kích thước hợp lý */}
        <AccountChart />
      </div>
    </Card>
        </Col>
      </Row>
    </div>
  );
}