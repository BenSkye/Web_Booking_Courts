import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Calendar,
  Card,
  Col,
  List,
  Modal,
  Row,
  Spin,
  Typography,
} from "antd";
import moment from "moment";
import { getPersonalBookingAPI } from "../../../services/bookingAPI/bookingAPI";
import UpdateBooking from "./components/updateBooking";

const { Paragraph } = Typography;
const BookingCourt = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedBookingForUpdate, setSelectedBookingForUpdate] =
    useState(null);
  const [selectedDateBookings, setSelectedDateBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Bookings, setBookings] = useState([]);
  const getPersonalBooking = async () => {
    const data = await getPersonalBookingAPI();
    console.log("data:", data);
    setBookings(data.bookings);
    setIsLoading(false);
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
  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
    setSelectedBookingForUpdate(null);
  };

  const handleEditClick = (booking) => {
    setSelectedBookingForUpdate(booking);
    setIsUpdateModalVisible(true);
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
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Calendar dateCellRender={dateCellRender} />
      )}
      {selectedDateBookings.length > 0 && (
        <>
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
                    <Paragraph>
                      <strong>Sân:</strong> {booking.courtNumber}
                    </Paragraph>
                    <Paragraph>
                      <strong>Trạng thái:</strong>{" "}
                      <span
                        style={{
                          color:
                            booking.status === "pending"
                              ? "orange"
                              : booking.status === "confirmed"
                              ? "green"
                              : booking.status === "cancelled"
                              ? "red"
                              : "black",
                        }}
                      >
                        {booking.status === "pending"
                          ? "Chưa thanh toán"
                          : booking.status === "confirmed"
                          ? "Đã thanh toán"
                          : booking.status === "cancelled"
                          ? "Đã hủy"
                          : "Không xác định"}
                      </span>
                    </Paragraph>
                    {booking.status === "confirmed" && (
                      <Button
                        type="primary"
                        onClick={() => handleEditClick(booking)}
                      >
                        Sửa giờ chơi
                      </Button>
                    )}
                  </Card>
                </List.Item>
              )}
            />
          </Modal>
        </>
      )}
      {selectedBookingForUpdate && (
        <Modal
          title="Sửa giờ chơi"
          visible={isUpdateModalVisible}
          onCancel={handleUpdateCancel}
          footer={null}
        >
          <UpdateBooking oldBooking={selectedBookingForUpdate} />
        </Modal>
      )}
    </div>
  );
};

export default BookingCourt;
