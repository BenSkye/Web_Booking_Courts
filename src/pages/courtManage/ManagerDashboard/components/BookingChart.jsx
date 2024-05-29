import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Select } from "antd";

// Giả sử dữ liệu booking theo tháng như sau:
const allData = [
  { year: 2024, month: 1, day: 1, bookings: 100 },
  { year: 2024, month: 1, day: 2, bookings: 120 },
  // ... thêm dữ liệu cho các ngày khác trong tháng 1
  { year: 2024, month: 2, day: 1, bookings: 80 },
  { year: 2024, month: 2, day: 2, bookings: 95 },
  // ... thêm dữ liệu cho các ngày khác trong tháng 2
  // ... thêm dữ liệu cho các tháng và năm khác
];

const YearOptions = [
  { label: "2023", value: 2023 },
  { label: "2024", value: 2024 },
];
const MonthOptions = [
  { label: "Tất cả tháng", value: null },
  { label: "tháng 1", value: 1 },
  { label: "tháng 2", value: 2 },
  { label: "tháng 3", value: 3 },
  { label: "tháng 4", value: 4 },
  { label: "tháng 5", value: 5 },
  { label: "tháng 6", value: 6 },
  { label: "tháng 7", value: 7 },
  { label: "tháng 8", value: 8 },
  { label: "tháng 9", value: 9 },
  { label: "tháng 10", value: 10 },
  { label: "tháng 11", value: 11 },
  { label: "tháng 12", value: 12 },
];
function formatMonth(value) {
  return `Tháng ${value}`;
}
export default function BookingChart() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(null);
  const [data, setData] = useState([]);
  const [dataKey, setDataKey] = useState(null);

  useEffect(() => {
    let filteredData = allData;
    console.log("filteredData1", filteredData);
    if (year) {
      filteredData = filteredData.filter((d) => d.year === year);

      if (!month) {
        filteredData = filteredData.reduce((acc, curr) => {
          const existingMonth = acc.find((item) => item.month === curr.month);
          if (existingMonth) {
            existingMonth.bookings += curr.bookings;
          } else {
            acc.push({
              year: curr.year,
              month: curr.month,
              bookings: curr.bookings,
            });
          }
          return acc;
        }, []);
        setDataKey("month");
      }
    }

    if (month) {
      filteredData = filteredData.filter((d) => d.month === month);
      setDataKey("day");
    }
    console.log("filteredData2", filteredData);
    setData(filteredData);
  }, [year, month]);

  return (
    <div>
      <Select
        placeholder="Select a year"
        style={{ width: 120 }}
        defaultValue={year}
        onChange={setYear}
        options={YearOptions}
      />
      <Select
        placeholder="Select a month"
        defaultValue={month}
        style={{ width: 120 }}
        onChange={setMonth}
        options={MonthOptions}
      />
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey} tickFormatter={formatMonth} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="bookings" name="Sân đặt" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
