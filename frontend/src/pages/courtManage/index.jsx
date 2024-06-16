import { useState, useEffect } from "react";
import { Card, Col, Row, Button, Spin, Space, Typography } from "antd";
import { getFormDataAPI } from "../../services/partnerAPI/index.js";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import moment from "moment";

const { Meta } = Card;
const { Title, Text } = Typography;

export default function CourtManage() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("jwtToken");
      try {
        const result = await getFormDataAPI(token);
        if (
          result.status === "success" &&
          result.data &&
          Array.isArray(result.data.center)
        ) {
          setFormData(result.data.center);
        } else {
          console.error("Unexpected data format: ", result);
          setFormData([]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setFormData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (formData.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Title level={2}>Bạn chưa tạo sân</Title>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={1} style={{ textAlign: "center", marginBottom: "40px" }}>
        Quản lý sân đấu của bạn
      </Title>
      <Row gutter={[16, 16]}>
        {formData.map((data) => (
          <Col key={data._id} xs={24} sm={12} lg={8}>
            <Card
              hoverable
              cover={
                <img
                  alt={data.courtName}
                  src={data.images}
                  style={{ width: "100%", objectFit: "cover", height: "300px" }}
                />
              }
              style={{ borderRadius: "8px", overflow: "hidden" }}
            >
              <Meta
                title={
                  <Text strong style={{ fontSize: "18px" }}>
                    {data.centerName}
                  </Text>
                }
                description={
                  <Text type="secondary" style={{ fontSize: "14px" }}>
                    {data.location}
                  </Text>
                }
              />
              <div style={{ marginTop: "16px" }}>
                <Text strong style={{ color: data.status === "active" ? "green" : "red" }}>
                  Trạng thái: {data.status}
                </Text>
              </div>
              <div style={{ marginTop: "16px" }}>
                <Link to={`/courtManage/detail/${data._id}`}>
                  <Button type="primary" block style={{ marginBottom: "10px" }}>
                    Xem chi tiết
                  </Button>
                </Link>
                {data.status === "accepted" && (
                  <Link to={`/courtManage/registerPackageCourt`}>
                    <Button type="primary" block style={{ backgroundColor: "orange", borderColor: "orange" }}>
                      Mua gói cho sân
                    </Button>
                  </Link>
                )}
                {data.status === "active" && (
                  <div>
                    <Link to={`/courtManage/registerPackageCourt`}>
                      <Button type="primary" block style={{ backgroundColor: "orange", borderColor: "orange", marginBottom: "10px" }}>
                        Gia hạn gói
                      </Button>
                    </Link>
                    {data.subscriptions.length > 0 && (
                      <Card type="inner" title="Thông tin gói">
                        <Space direction="vertical" style={{ width: "100%" }}>
                          <Text>
                            Ngày kích hoạt: {moment(data.subscriptions[0].activationDate).format('DD/MM/YYYY')}
                          </Text>
                          <Text>
                            Ngày hết hạn: {moment(data.subscriptions[data.subscriptions.length - 1].expiryDate).format('DD/MM/YYYY')}
                          </Text>
                        </Space>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
