import React, { useEffect, useState } from "react";
const STATUS_MAPPING = {
  confirmed: { color: "cyan", text: "Đã thanh toán" },
  completed: { color: "green", text: "Hoàn thành" },
  expired: { color: "lightgray", text: "Hết hạn" },
};

export default function BookingDetail({ Booking }) {
  useEffect(() => {
    console.log("Booking:", Booking);
  }, [Booking]);
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
    </>
  );
}
