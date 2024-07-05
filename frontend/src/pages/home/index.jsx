import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row, Avatar, Button, Carousel, Pagination, Input } from "antd";
import SearchBar from "@/pages/home/components/searchBar";
import CardLoader from "@/utils/loader/skeletonLoader/loaderCard";
import NoImg from "@/assets/noImg.jpg";
import { getAllCenterAPI } from "@/services/centersAPI/getCenters";
import GetAllLocationCenter from "../../utils/getAllCenterMap";

const { Meta } = Card;

const introImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA17C5nrpu1r9ylXj4d8YUdDZt_oH0Psz0xQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA17C5nrpu1r9ylXj4d8YUdDZt_oH0Psz0xQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA17C5nrpu1r9ylXj4d8YUdDZt_oH0Psz0xQ&s",
  // Add more images as needed
];

export default function Home() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);

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
          pricePerHour: center.price.find((price) => price.scheduleType === "NP")?.price,
        }));
        // Filter centers with status 'active'
        data = data.filter((center) => center.status === "active");
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentCenters = centers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <Row gutter={[32, 32]} style={{ background: "#fff" }}>
        <Col span={24}>
          <Carousel autoplay style={{ width: "100%" }}>
            {introImages.map((img, index) => (
              <div key={index} style={{ width: "100%", height: "200px" }}>
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={handleImageError}
                />
              </div>
            ))}
          </Carousel>
        </Col>

        <Col span={24} style={{ marginTop: "20px" }}>
          <Input.Group compact style={{ marginBottom: "10px" }}>
            <div style={{ width: "100%", textAlign: "left" }}>
              <span style={{ marginRight: "10px", fontSize: "16px", fontWeight: "bold" }}>Tìm kiếm sân:</span>
              <SearchBar />
            </div>
          </Input.Group>
        </Col>

        {loading ? (
          [1, 2, 3, 4, 5, 6].map((key) => (
            <Col key={key} xs={24} sm={12} lg={8}>
              <CardLoader />
            </Col>
          ))
        ) : (
          currentCenters.map((center) => (
            <Col key={center.id} xs={24} sm={12} lg={8} style={{ marginBottom: "20px" }}>
              <Card
                hoverable
                style={{ width: "100%", minHeight: "400px", border: "0.1px solid #e0e0e0" }}
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
                  avatar={<Avatar src="https://sieuthicaulong.vn/images/badminton-yard/1693408873_gallery_2022-04-07.jpg" />}
                  title={center.centerName}
                  description={center.location}
                />
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    justifyContent: "space-between",
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
                        backgroundColor: "#1890ff",
                        color: "white",
                      }}
                      type="primary"
                    >
                      Đặt sân ngay
                    </Button>
                  </Link>
                </div>
              </Card>
            </Col>
          ))
        )}

        <Col span={24} style={{ marginTop: "20px", textAlign: "center" }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={centers.length}
            onChange={handlePageChange}
            style={{ color: "#1890ff" }}
          />
        </Col>

        <Col span={24}>
          <GetAllLocationCenter locations={centers} />
        </Col>
      </Row>
    </div>
  );
}
