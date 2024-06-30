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
  message,
} from "antd";
import {
  cancelBookingAPI,
  getPersonalBookingAPI,
} from "../../../services/bookingAPI/bookingAPI";
import UpdateBooking from "./components/updateBooking";
import CartBooking from "./components/cartBooking";

const { Paragraph } = Typography;

const STATUS_MAPPING = {
  pending: { color: "orange", text: "Chưa thanh toán" },
  confirmed: { color: "green", text: "Đã thanh toán" },
  cancelled: { color: "red", text: "Đã hủy" },
  expired: { color: "#A9A9A9", text: "Hết hạn" },
};

const BookingCourt = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [selectedBookingForUpdate, setSelectedBookingForUpdate] =
    useState(null);
  const [selectedBookingForCancel, setSelectedBookingForCancel] =
    useState(null);
  const [selectedDateBookings, setSelectedDateBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState(null);

  const cancelBooking = async (bookingId) => {
    const response = await cancelBookingAPI(bookingId);
    console.log("data:", response);
    if (response.status === "success") {
      message.success("Hủy đặt sân thành công");
      setIsCancelModalVisible(false);
      setIsModalVisible(false);
      setSelectedBookingForCancel(null);
      getPersonalBooking();
    } else {
      message.error("Hủy đặt sân thất bại");
    }
  };

  const getPersonalBooking = async () => {
    const data = await getPersonalBookingAPI();
    console.log("data:", data);
    setBookings(data.bookings);

    setIsLoading(false);
  };
  useEffect(() => {
    getPersonalBooking();
  }, []);
  useEffect(() => {
    console.log("selectedDateBookings", selectedDateBookings);
  }, [selectedDateBookings]);

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
    setNewBooking(null);
  };

  const handleEditClick = (booking) => {
    console.log("booking", booking);
    setSelectedBookingForUpdate(booking);
    setIsUpdateModalVisible(true);
  };

  const handleCancelClick = (booking) => {
    setSelectedBookingForCancel(booking);
    setIsCancelModalVisible(true);
  };

  const handleConfirmCancel = async () => {
    console.log("selectedBookingForCancel", selectedBookingForCancel);
    await cancelBooking(selectedBookingForCancel._id);
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
  const handleUpdateBooking = (newBooking) => {
    setNewBooking(newBooking);
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
                      description={`${booking.centerAddress} `}
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
                          color: STATUS_MAPPING[booking.status]
                            ? STATUS_MAPPING[booking.status].color
                            : "black",
                        }}
                      >
                        {STATUS_MAPPING[booking.status]
                          ? STATUS_MAPPING[booking.status].text
                          : "Không xác định"}
                      </span>
                    </Paragraph>
                    {booking.status === "confirmed" && (
                      <>
                        <Row
                          gutter={16}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Col>
                            <Button
                              type="primary"
                              onClick={() => handleEditClick(booking)}
                            >
                              Sửa giờ chơi
                            </Button>
                          </Col>
                          {booking.date > new Date().toISOString() ? (
                            <Col>
                              <Button
                                type="primary"
                                danger
                                onClick={() => handleCancelClick(booking)}
                              >
                                Hủy đặt sân
                              </Button>
                            </Col>
                          ) : null}
                        </Row>
                      </>
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
          width={700}
        >
          <Row>
            <Col xs={24} md={15}>
              <UpdateBooking
                oldBooking={selectedBookingForUpdate}
                newBooking={handleUpdateBooking}
              />
            </Col>
            <Col xs={24} md={9}>
              <CartBooking
                oldBooking={selectedBookingForUpdate}
                newBooking={newBooking}
              />
            </Col>
          </Row>
        </Modal>
      )}
      {selectedBookingForCancel && (
        <Modal
          title="Xác nhận hủy đặt sân"
          visible={isCancelModalVisible}
          onOk={handleConfirmCancel}
          onCancel={() => setIsCancelModalVisible(false)}
        >
          <p>Bạn có chắc chắn muốn hủy đặt sân này không?</p>
        </Modal>
      )}
    </div>
  );
};

export default BookingCourt;
