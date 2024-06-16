import React, { useEffect, useState } from "react";
import {
  Avatar,
  Calendar,
  Card,
  Col,
  List,
  Modal,
  Row,
  Typography,
} from "antd";
import moment from "moment";
import { getPersonalBookingAPI } from "../../../services/bookingAPI/bookingAPI";

const { Paragraph } = Typography;

// const Bookings = [
//   {
//     id: 1,
//     name: "Sân bóng ABC",
//     address: "123 Đường XYZ, Quận 1, TP.HCM",
//     fieldNumber: "Sân 1",
//     date: new Date(2024, 5, 3), // 3/6/2024
//     time: "17h - 19h ",
//   },
//   {
//     id: 2,
//     name: "Sân bóng XYZ",
//     address: "456 Đường ABC, Quận 2, TP.HCM",
//     fieldNumber: "Sân 2",
//     date: new Date(2024, 5, 10), // 10/6/2024
//     time: "16h - 17h",
//   },
//   {
//     id: 3,
//     name: "Sân bóng ABC",
//     address: "123 Đường XYZ, Quận 1, TP.HCM",
//     fieldNumber: "Sân 1",
//     date: new Date(2024, 5, 3), // 3/6/2024
//     time: "6h - 12h ",
//   },
//   // Thêm các invoice khác nếu cần
// ];

const BookingCourt = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDateBookings, setSelectedDateBookings] = useState([]);

  const [Bookings, setBookings] = useState([]);
  const getPersonalBooking = async () => {
    const data = await getPersonalBookingAPI();
    console.log("data:", data);
    setBookings(data.bookings);
  };
  useEffect(() => {
    getPersonalBooking();
  }, []);

  const onSelect = (value) => {
    const selectedDate = value.toDate();
    const bookingOnDate = Bookings.filter((inv) => {
      const invDate = new Date(inv.date).toLocaleDateString("en-US");
      const dayInMonth = selectedDate.toLocaleDateString("en-US");
      return invDate === dayInMonth;
    });
    setSelectedDateBookings(bookingOnDate);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dateCellRender = (value) => {
    const date = value.toDate();
    const bookingsOnDate = Bookings.filter((inv) => {
      const invDate = new Date(inv.date).toLocaleDateString("en-US");
      const dayInMonth = date.toLocaleDateString("en-US");
      return invDate === dayInMonth;
    });
    return bookingsOnDate.length > 0 ? (
      <div
        style={{
          backgroundColor: "#e6f7ff",
          padding: "5px",
          cursor: "pointer",
        }}
        onClick={() => onSelect(value)}
      >
        <Paragraph strong style={{ margin: 0, textAlign: "center" }}>
          {bookingsOnDate.length} Đặt sân
        </Paragraph>
      </div>
    ) : null;
  };

  return (
    <div>
      <Calendar dateCellRender={dateCellRender} />
      {selectedDateBookings.length > 0 && (
        <Modal
          title="Chi tiết đặt sân"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <List
            itemLayout="vertical"
            dataSource={selectedDateBookings}
            renderItem={(booking) => (
              <List.Item key={booking._id}>
                <Card>
                  <List.Item.Meta
                    title={booking.centerName}
                    description={`${booking.centerAddress} - Sân: ${booking.courtNumber}`}
                  />
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <Paragraph>
                        <strong>Ngày chơi:</strong>{" "}
                        {new Date(booking.date).toLocaleDateString("en-US")}
                      </Paragraph>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Paragraph>
                        <strong>Giờ chơi:</strong> {booking.start} -{" "}
                        {booking.end}
                      </Paragraph>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            )}
          />
        </Modal>
      )}
    </div>
  );
};

export default BookingCourt;
