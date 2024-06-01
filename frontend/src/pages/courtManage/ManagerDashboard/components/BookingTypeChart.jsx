import { Tooltip } from "antd";
import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
const data = [
  { name: "Đặt sân theo ngày", value: 4 },
  { name: "Đặt sân cố định", value: 30 },
  { name: "Đặt sân theo giờ chơi", value: 20 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
export default function BookingTypeChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent, value }) =>
            `${name}: ${(percent * 100).toFixed(0)}%(${value})`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
