/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
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
import AuthContext from "../../../services/authAPI/authProvideAPI";
import getAllUsersAPI from '../../../services/admin/manageUser';

const YearOptions = [
  { label: "2023", value: 2023 },
  { label: "2024", value: 2024 },
];

const MonthOptions = [
  { label: "Tất cả tháng", value: null },
  { label: "Tháng 1", value: 1 },
  { label: "Tháng 2", value: 2 },
  { label: "Tháng 3", value: 3 },
  { label: "Tháng 4", value: 4 },
  { label: "Tháng 5", value: 5 },
  { label: "Tháng 6", value: 6 },
  { label: "Tháng 7", value: 7 },
  { label: "Tháng 8", value: 8 },
  { label: "Tháng 9", value: 9 },
  { label: "Tháng 10", value: 10 },
  { label: "Tháng 11", value: 11 },
  { label: "Tháng 12", value: 12 },
];

function formatMonth(value) {
  return value ? `Tháng ${value}` : "Tất cả tháng";
}

function formatDay(value) {
  return `Ngày ${value}`;
}

const AccountChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(null);
  const [data, setData] = useState([]);
  const [dataKey, setDataKey] = useState(null);
  const { user } = useContext(AuthContext); // Get user context

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{dataKey === "day" ? `Ngày ${label} : ${payload[0].value} người đăng ký` : `Tháng ${label} : ${payload[0].value} người đăng ký`}</p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsersAPI();
        console.log("Fetched users:", users); // Kiểm tra dữ liệu người dùng

        // Format data based on user registration dates
        const formattedData = users.map(user => {
          const date = new Date(user.create); // Đảm bảo rằng bạn đang sử dụng đúng thuộc tính
          return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            accounts: 1
          };
        });

        console.log("Formatted data:", formattedData); // Kiểm tra dữ liệu đã định dạng

        let filteredData = [];

        if (year) {
          filteredData = formattedData.filter(d => d.year === year);

          if (month === null) {
            // Nếu không chọn tháng, nhóm theo tháng và tính tổng số lượng đăng ký
            filteredData = Array.from(
              filteredData.reduce((acc, curr) => {
                const key = curr.month;
                if (!acc.has(key)) {
                  acc.set(key, { month: key, accounts: 0 });
                }
                acc.get(key).accounts += curr.accounts;
                return acc;
              }, new Map()).values()
            );
            setDataKey("month");
          } else {
            // Nếu chọn tháng, nhóm theo ngày và tính tổng số lượng đăng ký
            filteredData = filteredData.filter(d => d.month === month);
            filteredData = Array.from(
              filteredData.reduce((acc, curr) => {
                const key = curr.day;
                if (!acc.has(key)) {
                  acc.set(key, { day: key, accounts: 0 });
                }
                acc.get(key).accounts += curr.accounts;
                return acc;
              }, new Map()).values()
            );
            setDataKey("day");
          }
        }

        console.log("Filtered data:", filteredData); // Kiểm tra dữ liệu đã lọc

        // Ensure no invalid days or months
        if (dataKey === "month") {
          filteredData = filteredData.filter(d => d.month >= 1 && d.month <= 12);
        } else if (dataKey === "day") {
          filteredData = filteredData.filter(d => d.day >= 1 && d.day <= 31);
        }
        filteredData.forEach(d => d.accounts = Math.floor(d.accounts)); // Đảm bảo số lượng đăng ký là số nguyên

        setData(filteredData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [year, month]);

  useEffect(() => {
    // Reset month to null and set dataKey to month when year changes
    setMonth(null);
    setDataKey("month");
  }, [year]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Select
        placeholder="Chọn năm"
        style={{ width: 120, marginRight: 16 }}
        value={year}
        onChange={setYear}
        options={YearOptions}
      />
      <Select
        placeholder="Chọn tháng"
        value={month}
        style={{ width: 120 }}
        onChange={setMonth}
        options={MonthOptions}
      />
      <BarChart
        width={600} // Kích thước điều chỉnh cho phù hợp với card
        height={300} // Kích thước điều chỉnh cho phù hợp với card
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey} tickFormatter={dataKey === "month" ? formatMonth : formatDay} />
        <YAxis />
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Bar dataKey="accounts" name="Số lượng người đăng ký" fill="#ff69b4" /> {/* Màu hồng */}
      </BarChart>
    </div>
  );
};

export default AccountChart;
