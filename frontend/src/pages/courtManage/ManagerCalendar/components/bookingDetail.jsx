import React, { useEffect, useState } from "react";

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
    </>
  );
}
