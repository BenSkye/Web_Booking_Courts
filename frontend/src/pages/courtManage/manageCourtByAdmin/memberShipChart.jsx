// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import getAllMemberShip from '../../../services/admin/manageDashBoard'
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MemberShipChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMemberShip = async () => {
      try {
        const percentages = await getAllMemberShip();
        const chartData = [
          { name: '3 Months', value: percentages['3'] },
          { name: '6 Months', value: percentages['6'] },
          { name: '12 Months', value: percentages['12'] },
          { name: 'Other', value: percentages.other || 0 }, // Ensure percentages.other is defined
        ];
        setData(chartData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchMemberShip();
  }, []);
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={({ name, value }) => `${name}: ${(value * 100).toFixed(0)}%`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default MemberShipChart;
