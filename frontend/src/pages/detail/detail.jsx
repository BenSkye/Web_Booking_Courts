import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Space,
  Row,
  Col,
  Card,
  Button,
  Divider,
  Modal,
  Carousel,
  Empty,
  Spin,
} from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import MyLocationMap from "@/utils/map";
import { getCenterByIdAPI } from "@/services/centersAPI/getCenters";
import { FaMapMarkerAlt } from "react-icons/fa";

const { Content } = Layout;
const { Title, Text } = Typography;

// Define the formatPrice function
const formatPrice = (price) => {
  if (!price) return "N/A";
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND/h`;
};

function Detail() {
  const { id } = useParams();
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCenterData = async () => {
      try {
        const data = await getCenterByIdAPI(id);
        console.log("datafe", data);

        // Find and format the normalPrice
        const normalPrice = formatPrice(
          data.data.center.price.find((price) => price.scheduleType === "NP")
            ?.price
        );
        setCenter({ ...data.data.center, normalPrice });
      } catch (error) {
        console.error("Error fetching center data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCenterData();
  }, [id]);

  const handleRevealPhone = (phoneNumber) => {
    const hiddenPhoneNumber = document.getElementById("hidden-phone-number");
    hiddenPhoneNumber.innerText = phoneNumber;
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/800x500"; // Placeholder image URL
  };

  if (loading) {
    return (
      <Spin tip="Loading..." style={{ display: "block", margin: "auto" }} />
    );
  }

  if (!center) {
    return <Empty description="Không có dữ liệu" />;
  }

  return (
    <Content
      style={{ padding: "24px", marginTop: 16, backgroundColor: "#fff" }}
    >
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            {center.images && center.images.length > 0 ? (
              <Carousel autoplay>
                {center.images && center.images.length > 0 ? (
                  center.images.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        width: "100%",
                        height: "500px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={image}
                        alt={`Image ${index}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => handleImageError(e)} // Enhanced error handling
                      />
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "500px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src="https://via.placeholder.com/800x500"
                      alt="No Image"
                      style={{
                        borderRadius: "10px",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </Carousel>
            ) : (
              <img
                src="https://via.placeholder.com/800x500"
                alt="No Image"
                style={{
                  borderRadius: "10px",
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        </Col>
        <Col span={12}>
          <Card style={{ maxWidth: 700 }}>
            <Title level={4}>Thông Tin Chủ Sân</Title>
            <Divider />
            <Space direction="vertical" size="middle">
              <Space direction="vertical">
                <Text strong>Chủ sân:</Text>
                <Text>{center.managerId.userName || "N/A"}</Text>
              </Space>
              <Space direction="vertical">
                <Text strong>Số điện thoại:</Text>
                <Button
                  type="primary"
                  onClick={() => handleRevealPhone(center.managerId.userPhone)}
                >
                  <PhoneOutlined /> Bấm để hiện số
                </Button>
                <Text id="hidden-phone-number">Ẩn số</Text>
              </Space>
              <Space direction="vertical">
                <Text strong>Email:</Text>
                <Text>{center.managerId.userEmail || "N/A"}</Text>
              </Space>
              {/* <Space direction="vertical">
                <Text strong>Địa chỉ:</Text>
                <Text>{center.location || "Loading..."}</Text>
              </Space> */}
            </Space>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Title level={4}>Bảng Giá</Title>
          <Row gutter={[16, 16]}>
            {center.normalPrice ? (
              <Col span={24}>
                <Card>
                  <Row justify="space-between">
                    <Col>
                      <Text>Normal Price</Text>
                    </Col>
                    <Col>
                      <Text>{center.normalPrice}</Text>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ) : (
              <Empty description="Không có dữ liệu giá" />
            )}
          </Row>
        </Col>
        <Col span={12}>
          <Card
            title="Thông tin sân"
            style={{ boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)" }}
          >
            <Text>
              {center.centerName && <strong>{center.centerName}</strong>}
              <a onClick={handleOpenModal}>
                {center.location && (
                  <p>
                    {center.location} <FaMapMarkerAlt />
                  </p>
                )}
              </a>
            </Text>
            <Carousel autoplay style={{ height: "10rem", width: "10rem" }}>
              {!center.images || center.images.length === 0 ? (
                <Empty />
              ) : (
                center.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      style={{ width: "100%" }}
                      alt={center.centerName}
                      onError={handleImageError}
                    />
                  </div>
                ))
              )}
            </Carousel>
            <Modal
              open={showModal}
              title="Vị trí"
              onCancel={handleCloseModal}
              footer={null}
              centered
              style={{ height: "80vh" }}
            >
              <MyLocationMap address={center.location} />
            </Modal>
          </Card>
        </Col>
      </Row>
      <Divider />

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Link to={`/bookingdetail/${id}`}>
          <Button type="primary" size="large">
            Đặt sân
          </Button>
        </Link>
      </div>
    </Content>
  );
}

export default Detail;
