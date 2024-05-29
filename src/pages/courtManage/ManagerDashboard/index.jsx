import React from "react";
import BookingChart from "./components/BookingChart";
import { Col, Row } from "antd";
import RevenueChart from "./components/RevenueChart";
import BookingTypeChart from "./components/BookingTypeChart";

export default function ManagerDashboar() {
  return (
    <>
      <Row>
        <Col span={12}>
          {" "}
          <BookingChart />
        </Col>
        <Col span={12}>
          <RevenueChart />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <BookingTypeChart />
        </Col>
      </Row>
    </>
  );
}
