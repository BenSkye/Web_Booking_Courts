import React from "react";

import { Col, Row } from "antd";
import MemberShipChart from "./memberShipChart";
import AccountChart from './accountChart';

export default function AdminDashboard() {
  return (
    <>
      <Row>
       
        <Col span={12}>
          <MemberShipChart />
        </Col>
        <Col span={12}>
          <AccountChart />
        </Col>
      </Row>
      
    </>
  );
}
