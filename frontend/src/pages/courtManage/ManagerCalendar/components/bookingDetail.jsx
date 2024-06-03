import React, { useState } from "react";

export default function BookingDetail({ id }) {
  const [booking, setBooking] = useState({});

  return (
    <>
      <p>Người đặt</p>
      <p>Giờ đặt</p>
      <p>Trạng thái</p>
    </>
  );
}
