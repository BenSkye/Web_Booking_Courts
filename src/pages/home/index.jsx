import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row, Avatar, Button, Carousel } from "antd";
import SearchBar from "@/pages/home/components/searchBar";
import CardLoader from "@/utils/loader/skeletonLoader/loaderCard";
import { getAllCenterAPI } from "@/services/courtAPI/getCourtsAPI";
import NoImg from "@/assets/noImg.jpg";

const { Meta } = Card;

export default function Home() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourts = async () => {
      setLoading(true);
      const data = await getAllCenterAPI();
      setCenters(data);
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
        : centers.map((centers) => (
            <Col key={centers.id} xs={24} sm={12} lg={8}>
              <Card
                hoverable
                style={{ width: "100%" }}
                cover={
                  <Carousel
                    autoplay
                    style={{
                      background: "#e1e8e3",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {centers.imgCenter.map((img, index) => (
                      <div
                        key={index}
                        style={{
                          height: "100%",
                          width: "100%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          alt={centers.nameCenter}
                          src={img}
                          onError={handleImageError}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))}
                  </Carousel>
                }
              >
                <Meta
                  avatar={
                    <Avatar src="https://sieuthicaulong.vn/images/badminton-yard/1693408873_gallery_2022-04-07.jpg" />
                  }
                  title={centers.nameCenter}
                  description={centers.locationCenter}
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
                  <Link to={`/detail/${centers.id}`}>
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
                  <Link to={`/bookingdetail/${centers.id}`}>
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
