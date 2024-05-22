import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row, Avatar, Button } from "antd";
import SearchBar from "@/pages/home/components/searchBar";
import CardLoader from "@/utils/loader/skeletonLoader/loaderCard";
import { getAllCourtsAPI } from "@/services/courtAPI/getCourtsAPI";
import NoImg from "@/assets/noImg.jpg";

const { Meta } = Card;

export default function Home() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourts = async () => {
      setLoading(true);
      const data = await getAllCourtsAPI();
      setCourts(data);
      setLoading(false);
    };
    getCourts();
  }, []);

  const handleImageError = (e) => {
    e.target.src = NoImg;
  };

  return (
    <Row
      gutter={[16, 16]}
      style={{
        margin: "0 auto",
      }}
    >
      <Col span={24}>
        <SearchBar />
      </Col>

      {loading
        ? [1, 2, 3, 4, 5, 6].map((key) => (
            <Col key={key} xs={24} sm={12} lg={8}>
              <CardLoader />
            </Col>
          ))
        : courts.map((court) => (
            <Col key={court.id} xs={24} sm={12} lg={8}>
              <Card
                hoverable
                style={{ width: "100%" }}
                cover={
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img
                      alt={court.nameCenter}
                      src={court.imgCourt}
                      onError={handleImageError}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                }
              >
                <Meta
                  avatar={
                    <Avatar src="https://sieuthicaulong.vn/images/badminton-yard/1693408873_gallery_2022-04-07.jpg" />
                  }
                  title={court.nameCourt}
                  description={court.locationCourt}
                />
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <Link to={`/detail/${court.id}`}>
                    <Button
                      style={{
                        height: "50px",
                        width: "150px",
                        fontSize: "18px",
                      }}
                    >
                      Xem chi tiết
                    </Button>
                  </Link>
                  <Link to={`/bookingdetail/${court.id}`}>
                    <Button
                      style={{
                        height: "50px",
                        width: "150px",
                        fontSize: "18px",
                      }}
                      type="primary"
                    >
                      Đặt sân ngay
                    </Button>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
    </Row>
  );
}
