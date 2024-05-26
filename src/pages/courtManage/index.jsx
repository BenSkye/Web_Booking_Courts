import { useState, useEffect } from "react";
import { Card, Col, Row, Button } from "antd";
import { getFormDataAPI } from "../../services/partnerAPI/index.js";
import { Link } from "react-router-dom";
const { Meta } = Card;

export default function CourtManage() {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFormDataAPI(); // replace with your API
      setFormData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Quản lý sân đấu của bạn</h1>
      <Row gutter={[16, 16]} style={{ margin: "0 auto" }}>
        {formData.map((data) => {
          const imageUrl =
            data.images && data.images.length > 0
              ? data.images[0].thumbUrl
              : "";

          return (
            <Col key={data.id} xs={24} sm={12} lg={8}>
              <Card
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img
                    alt={data.courtName}
                    src={imageUrl}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "300px",
                    }}
                  />
                }
              >
                <Meta title={data.courtName} description={data.courtAddress} />
                <Link to={`/courtManage/${data.id}`}>
                  <Button
                    style={{
                      height: "50px",
                      width: "150px",
                      fontSize: "18px",
                      margin: "auto", // Căn giữa button
                      marginTop: "20px", // Tạo khoảng cách ở phía trên
                      display: "block" // Đảm bảo button hiển thị dưới dạng block để margin: auto hoạt động
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
