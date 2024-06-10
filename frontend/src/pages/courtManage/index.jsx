import { useState, useEffect } from "react";
import { Card, Col, Row, Button } from "antd";
import { getFormDataAPI } from "../../services/partnerAPI/index.js";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const { Meta } = Card;

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
        // console.log(result);
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
    return <p>Loading...</p>;
  }

  if (formData.length === 0) {
    return <h1>Bạn chưa tạo sân</h1>;
  }

  return (
    <div>
      <h1>Quản lý sân đấu của bạn</h1>
      <Row gutter={[16, 16]} style={{ margin: "0 auto" }}>
        {formData.map((data) => {
          return (
            <Col key={data._id} xs={24} sm={12} lg={8}>
              <Card
                key={data._id}
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img
                    alt={data.courtName}
                    src={data.images}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "300px",
                    }}
                  />
                }
              >
                <div style={{ marginBottom: "16px" }}>
                  <p
                    style={{
                      margin: "8px 0",
                      color: "#3f6600",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Trạng thái duyệt bài: {data.status}
                  </p>
                  {/* <p style={{
                    margin: "8px 0",
                    color: "#d4380d",
                    fontWeight: "bold",
                    fontSize: "16px"
                  }}>
                  Trạng thái thanh toán: {data.paymentStatus}
                  </p> */}
                </div>
                <Meta title={data.centerName} description={data.location} />
                <Link to={`/courtManage/detail/${data._id}`}>
                  <Button
                    style={{
                      height: "50px",
                      width: "150px",
                      fontSize: "18px",
                      margin: "auto", // Center the button
                      marginTop: "20px", // Add space at the top
                      display: "block", // Ensure the button is displayed as a block to center it
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
