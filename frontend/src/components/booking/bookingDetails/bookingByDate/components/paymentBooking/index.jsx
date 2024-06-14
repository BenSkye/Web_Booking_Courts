import { useSelector } from "react-redux";
import { List, Card, Row, Col, Divider } from "antd";
import { formatPrice } from "../../../../../../utils/priceFormatter";
import VNPayPaymentForm from "@/components/booking/bookingDetails/bookingByDate/components/paymentBooking/components/vnPayForm";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function PaymentBooking({ setCurrentStep }) {
  const { selectedCourts, center, totalPrice } = useSelector(
    (state) => state.cart
  );
  const [listBooking, setListBooking] = useState([]);
  useEffect(() => {
    const bookings = [];
    selectedCourts.map((court) => {
      const datePrefix = "1970-01-01T";
      const startTimeDate = new Date(`${datePrefix}${court.startTime}:00Z`);
      const durationInMilliseconds = court.duration * 60 * 60 * 1000;
      const endTime = new Date(
        startTimeDate.getTime() + durationInMilliseconds
      );
      const endHours = endTime.getUTCHours().toString().padStart(2, "0");
      const endMinutes = endTime.getUTCMinutes().toString().padStart(2, "0");
      const endTimeFormat = `${endHours}:${endMinutes}`;
      bookings.push({
        courtId: court._id,
        price: court.price,
        centerId: court.centerId,
        date: court.selectedDate,
        start: court.startTime,
        end: endTimeFormat,
      });
    });
    setListBooking(bookings);
  }, [selectedCourts]);
  useEffect(() => {
    console.log("listBooking", listBooking);
  }, [listBooking]);
  return (
    <Row
      gutter={(16, 16)}
      style={{
        width: "80%",
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Col
        xs={24}
        md={8}
        style={{
          marginBottom: "16px", // Thêm khoảng cách dưới khi xuống hàng
        }}
      >
        <Card
          title="Thông tin thanh toán"
          style={{ boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)" }}
        >
          <div>
            <h3>Trung tâm:</h3> {center.centerName}
          </div>
          <Divider />
          <List
            dataSource={selectedCourts}
            renderItem={(court) => (
              <List.Item key={court._id}>
                <strong>Sân {court.courtNumber}</strong>:{" "}
                {formatPrice(court.price)}đ
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col xs={24} md={16}>
        <Card style={{ boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)" }}>
          <VNPayPaymentForm
            listBooking={listBooking}
            totalPrice={totalPrice}
            setCurrentStep={setCurrentStep}
          />
        </Card>
      </Col>
    </Row>
  );
}
