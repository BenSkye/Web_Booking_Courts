import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row, Avatar, Button, Carousel } from "antd";
import SearchBar from "@/pages/home/components/searchBar";
import CardLoader from "@/utils/loader/skeletonLoader/loaderCard";
import NoImg from "@/assets/noImg.jpg";
import { getAllCenterAPI } from "@/services/centersAPI/getCenters";
import GetAllLocationCenter from "../../utils/getAllCenterMap";

const { Meta } = Card;

export default function Home() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define the formatPrice function
  const formatPrice = (price) => {
    if (!price) return "N/A";
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND/h`;
  };

  useEffect(() => {
    const getCenters = async () => {
      try {
        setLoading(true);
        let data = await getAllCenterAPI();
        data = data.map((center) => ({
          ...center,
          pricePerHour: center.price.find(
            (price) => price.scheduleType === "NP"
          )?.price,
        }));
        setCenters(data);
        console.log("datas", data);
      } catch (error) {
        console.error("Failed to fetch centers:", error);
      } finally {
        setLoading(false);
      }
    };
    getCenters();
  }, []);

  const handleImageError = (e) => {
    e.target.src = NoImg;
  };

  return (
    <Row gutter={[16, 16]} style={{ margin: "0 auto" }}>
      <Col span={24}>
        <GetAllLocationCenter locations={centers} />
      </Col>
      <Col span={24}>
        <SearchBar />
      </Col>

      {loading
        ? [1, 2, 3, 4, 5, 6].map((key) => (
            <Col key={key} xs={24} sm={12} lg={8}>
              <CardLoader />
            </Col>
          ))
        : centers.map((center) => (
            <Col key={center.id} xs={24} sm={12} lg={8}>
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
                    {center.images.map((img, index) => (
                      <div
                        key={index}
                        style={{
                          height: "100%",
                          width: "100%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          alt={center.centerName}
                          src={img}
                          onError={handleImageError}
                          style={{
                            width: "100%",
                            height: "250px",
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
                  title={center.centerName}
                  description={center.location}
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
                  <Link
                    to={`/detail/${center._id}`}
                    state={{
                      pricingData: center.price.map((price) => ({
                        ...price,
                        price: formatPrice(price.price),
                      })),
                    }}
                  >
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
                  <Link to={`/bookingdetail/${center._id}`}>
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
