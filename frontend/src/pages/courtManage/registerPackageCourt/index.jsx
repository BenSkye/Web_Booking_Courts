import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Spin, Modal } from "antd";
import { useParams, Navigate } from "react-router-dom";
import "antd/dist/reset.css";
import {
  getAllCenterPackage,
  selectCenterPackage,
} from "../../../services/packageAPI/packageAPI";
import { getFormDataAPI } from "../../../services/partnerAPI/index";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const RegisterPackageCourt = () => {
  const { id } = useParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courtExists, setCourtExists] = useState(true);
  const [courtStatusValid, setCourtStatusValid] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

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
        if (
          court.status !== "accepted" &&
          court.status !== "active" &&
          court.status !== "expired"
        ) {
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

  const handlePurchaseClick = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalVisible(true);
  };

  const handlePurchaseConfirm = async () => {
    const token = Cookies.get("jwtToken");
    setPurchasing(true);
    try {
      await selectCenterPackage(id, selectedPackage._id, token);
      alert("Mua gói thành công!");
      navigate("/courtManage");
    } catch (error) {
      console.error("Error purchasing package:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setPurchasing(false);
      setIsModalVisible(false);
    }
  };

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
            <Button
              type="primary"
              block
              onClick={() => handlePurchaseClick(pkg)}
              loading={purchasing}
            >
              Mua Ngay
            </Button>
          </Card>
        ))}
      </div>
      <Modal
        title="Xác nhận mua gói"
        visible={isModalVisible}
        onOk={handlePurchaseConfirm}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={purchasing}
        okButtonProps={{
          style: {
            backgroundColor: "green",
            borderColor: "green",
            color: "white",
          },
        }}
        cancelButtonProps={{
          style: { backgroundColor: "red", borderColor: "red", color: "white" },
        }}
      >
        <p>Bạn có chắc chắn muốn mua gói {selectedPackage?.name} không?</p>
      </Modal>
    </div>
  );
};

export default RegisterPackageCourt;
