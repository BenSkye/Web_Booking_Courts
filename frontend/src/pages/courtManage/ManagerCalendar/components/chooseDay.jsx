import { DatePicker, Button } from "antd";
import React, { useState } from "react";
import CalendarSlot from "./calendar";
import moment from "moment";
import { FaCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";

export default function ChooseDay({ center }) {
  const currentDay = moment();
  console.log(currentDay);
  const [dayChoose, setDayChoose] = useState(currentDay);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (date) => {
    console.log(date);
    if (date === null) return;
    setDayChoose(date);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <div style={{ width: "300px", margin: "0 auto" }}>
          <DatePicker
            size="large"
            placeholder={dayjs(dayChoose).format("YYYY-MM-DD")}
            onChange={onDateChange}
            allowClear={false}
          />
        </div>
      </div>

      <CalendarSlot selectedDate={dayChoose} center={center} />
    </>
  );
}
