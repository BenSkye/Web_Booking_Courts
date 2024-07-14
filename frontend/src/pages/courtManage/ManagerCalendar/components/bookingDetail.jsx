import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { completeBookingAPI } from "../../../../services/bookingAPI/bookingAPI";
const STATUS_MAPPING = {
  confirmed: { color: "cyan", text: "Đã thanh toán" },
  completed: { color: "green", text: "Hoàn thành" },
  expired: { color: "lightgray", text: "Hết hạn" },
};

export default function BookingDetail({ Booking, onComplete }) {
  useEffect(() => {
    console.log("Booking:", Booking);
  }, [Booking]);

  const completeBooking = async () => {
    const data = await completeBookingAPI(Booking._id);
    console.log("Data:", data);
    onComplete(data.booking);
  };

  const now = new Date();
  const bookingDate = new Date(Booking.date);
  const start = new Date(bookingDate);
  start.setHours(
    parseInt(Booking.start.split(":")[0]),
    parseInt(Booking.start.split(":")[1]),
    0
  );

  const end = new Date(bookingDate);
  end.setHours(
    parseInt(Booking.end.split(":")[0]),
    parseInt(Booking.end.split(":")[1]),
    0
  );

  const showConfirmButton = now >= start && now < end;
  const showCancelButton = now < start;
  return (
    <>
      <p>Người đặt: {Booking.customerName}</p>
      <p>Email: {Booking.customerEmail}</p>
      <p>SĐT: {Booking.customerPhone}</p>
      <p>
        Giờ: {Booking.start} - {Booking.end}
      </p>
      <p>
        Trạng thái:{" "}
        {STATUS_MAPPING[Booking.status]
          ? STATUS_MAPPING[Booking.status].text
          : "Không xác định"}{" "}
      </p>
      {Booking.status === "confirmed" && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {showConfirmButton && (
            <Button type="primary" ghost onClick={completeBooking}>
              Xác nhận
            </Button>
          )}
          {/* {showCancelButton && (
            <Button type="primary" danger ghost>
              Hủy
            </Button>
          )} */}
        </div>
      )}
    </>
  );
}
