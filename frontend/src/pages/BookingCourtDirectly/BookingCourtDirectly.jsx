import { Card, Col, message, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import CustomerInformation from "./components/customerInformation";
import Bookingbydate from "./components/Bookingbydate";
import TabPane from "antd/es/tabs/TabPane";
import { getPersonalActiveCenter } from "../../services/partnerAPI";
import CustomerInformationConfirm from "./components/customerInforrmationConfirm";
import { bookingDirectlyAPI } from "../../services/bookingAPI/bookingAPI";

function BookingCourtDirectly() {
  const [listCenter, setListCenter] = useState([]);
  const [customerData, setCustomerData] = useState(null);
  const [listBooking, setListBooking] = useState([]);

  const handleCustomerInfoSubmit = (values) => {
    console.log("Customer data:", values);
    setCustomerData(values);
  };
  const handleBookingSubmit = (values) => {
    console.log("Booking data:", values);
    if (
      customerData === null ||
      customerData.userName === null ||
      customerData.userEmail === null ||
      customerData.userPhone === null
    ) {
      message.error("Vui lòng điền thông tin khách hàng trước khi đặt sân");
    } else {
      setListBooking(values);
    }
  };

  const handleBookingDirectly = async () => {
    console.log("List booking:", listBooking);
    console.log("Customer data:", customerData);
    const result = await bookingDirectlyAPI({ listBooking, customerData });
    console.log("result", result);

    if (result.status === "success") {
      console.log("result", result);
      message.success("Đặt sân cho khách hàng thành công");
    }
  };

  useEffect(() => {
    if (listBooking.length > 0 && customerData !== null) {
      handleBookingDirectly();
    }
  }, [listBooking]);

  const getListActiveCenter = async () => {
    const data = await getPersonalActiveCenter();
    console.log("Data:", data);
    setListCenter(data.center);
  };
  useEffect(() => {
    getListActiveCenter();
  }, []);
  return (
    <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p>Thông tin khách hàng</p>
          </div>
          <CustomerInformation onSubmit={handleCustomerInfoSubmit} />
        </Col>

        <Col className="gutter-row" span={12}>
          <CustomerInformationConfirm customerData={customerData} />
        </Col>

        <Col className="gutter-row" span={24}>
          <Tabs tabPosition="left">
            {listCenter.map((center, index) => (
              <TabPane tab={center.centerName} key={index}>
                <Bookingbydate
                  idCenter={center._id}
                  onSubmit={handleBookingSubmit}
                />
              </TabPane>
            ))}
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default BookingCourtDirectly;
