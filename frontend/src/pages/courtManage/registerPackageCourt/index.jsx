import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Spin } from "antd";
import { useParams } from "react-router-dom";
import "antd/dist/reset.css";
import getAllCenterPackage from "../../../services/packageAPI/packageAPI";
import { getFormDataAPI } from "../../../services/partnerAPI/index";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const { Title, Text } = Typography;

const RegisterPackageCourt = () => {
  const { id } = useParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courtExists, setCourtExists] = useState(true);
  const [courtStatusValid, setCourtStatusValid] = useState(true);

  useEffect(() => {
    const fetchCourtAndPackages = async () => {
      const token = Cookies.get("jwtToken");
      try {
        const courtData = await getFormDataAPI(token);
        const court = courtData.data.center.find((c) => c._id === id);
        if (!court) {
          setCourtExists(false);
          return;
        }
        if (court.status !== "accepted" && court.status !== "active" && court.status !== "expired") {
          setCourtStatusValid(false);
          return;
        }
        const result = await getAllCenterPackage(token);
        if (
          result &&
          result.status === "success" &&
          result.data &&
          Array.isArray(result.data.centerPackages)
        ) {
          setPackages(result.data.centerPackages);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourtAndPackages();
  }, [id]);

  if (!courtExists) {
    return <h1>Sân không tồn tại</h1>;
  }

  if (!courtStatusValid) {
    return <Navigate to="/no-access" />;
  }

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={1} style={{ textAlign: "center" }}>
        Register Package Court
      </Title>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {packages.map((pkg) => (
          <Card
            key={pkg._id}
            title={pkg.name}
            bordered={false}
            style={{ width: 300 }}
          >
            <Text strong className="price">
              {pkg.price.toLocaleString()} <span>đ</span>
            </Text>
            <p>Thuê trong {pkg.durationMonths} tháng</p>
            <Button type="primary" block>
              Mua Ngay
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RegisterPackageCourt;
