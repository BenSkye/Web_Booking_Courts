import React, { useEffect, useState } from 'react';
import { Card, Button, Typography, Spin } from 'antd';
import "antd/dist/reset.css";
import getAllCenterPackage from '../../../services/packageAPI/packageAPI';
import Cookies from "js-cookie";

const { Title, Text } = Typography;

const RegisterPackageCourt = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      const token = Cookies.get("jwtToken");
      try {
        const result = await getAllCenterPackage(token);
        if (result && result.status === "success" && result.data && Array.isArray(result.data.centerPackages)) {
          setPackages(result.data.centerPackages);
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title level={1} style={{ textAlign: 'center' }}>Register Package Court</Title>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
        {packages.map((pkg) => (
          <Card
            key={pkg._id}
            title={pkg.name}
            bordered={false}
            style={{ width: 300 }}
          >
            <Text strong className="price">{pkg.price.toLocaleString()} <span>đ</span></Text>
            <p>Thuê trong {pkg.durationMonths} tháng</p>
            <Button type="primary" block>Mua Ngay</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RegisterPackageCourt;
