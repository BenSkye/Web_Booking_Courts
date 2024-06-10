import { Col, Row } from "antd";
import React from "react";
import CustomerInformation from "./components/customerInformation";
import Bookingbydate from "./components/Bookingbydate";

const idCenter = "6660315a89ae1ca696ddff5f";

function BookingCourtDirectly() {
  return (
    <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p>Thông tin khách hàng</p>
          </div>
          <CustomerInformation />
        </Col>

        <Col className="gutter-row" span={18}>
          <Bookingbydate idCenter={idCenter} />
        </Col>
      </Row>
    </div>
  );
}

export default BookingCourtDirectly;
