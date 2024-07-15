import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Avatar,
  Button,
  Carousel,
  Pagination,
  Input,
} from "antd";
import SearchBar from "@/pages/home/components/searchBar";
import CardLoader from "@/utils/loader/skeletonLoader/loaderCard";
import NoImg from "@/assets/noImg.jpg";

import GetAllLocationCenter from "../../utils/getAllCenterMap";
import { getAllCenterActiveApi } from "../../services/centersAPI/getCenters";

const { Meta } = Card;

// const introImages = [
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA17C5nrpu1r9ylXj4d8YUdDZt_oH0Psz0xQ&s',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA17C5nrpu1r9ylXj4d8YUdDZt_oH0Psz0xQ&s',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA17C5nrpu1r9ylXj4d8YUdDZt_oH0Psz0xQ&s',
//   // Add more images as needed
// ];

export default function Home() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState({});
  const [pageSize] = useState(6);

  const formatPrice = (price) => {
    if (!price) return "N/A";
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND/h`;
  };

  const getQuery = (query) => {
    console.log("Received query:", query);
    setQuery(query);
    // Sử dụng query để thực hiện các thao tác tìm kiếm cần thiết
    // Ví dụ: gọi API tìm kiếm với các tham số District, Ward, centerName từ query
  };

  useEffect(() => {
    const getCenters = async () => {
      try {
        setLoading(true);
        let data = await getAllCenterActiveApi(query);
        data = data.map((center) => ({
          ...center,
          pricePerHour: center.price.find(
            (price) => price.scheduleType === "NP"
          )?.price,
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
  }, [query]);

  const handleImageError = (e) => {
    e.target.src = NoImg;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentCenters = centers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div style={{ margin: "0 auto", padding: "20px" }}>
      <Row gutter={[32, 32]} style={{ background: "#fff" }}>
        {/* <Col span={24}>
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
        </Col> */}

        <Col span={24}>
          <GetAllLocationCenter locations={centers} />
        </Col>

        <Col span={24} style={{ marginTop: "20px" }}>
          <Input.Group compact style={{ marginBottom: "10px" }}>
            <div style={{ width: "100%", textAlign: "left" }}>
              <span
                style={{
                  marginRight: "10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Tìm kiếm sân:
              </span>
              <SearchBar getQuery={getQuery} />
            </div>
          </Input.Group>
        </Col>

        {loading
          ? [1, 2, 3, 4, 5, 6].map((key) => (
              <Col key={key} xs={24} sm={12} lg={8}>
                <CardLoader />
              </Col>
            ))
          : currentCenters.map((center) => (
              <Col
                key={center.id}
                xs={24}
                sm={12}
                lg={8}
                style={{ marginBottom: "20px" }}
              >
                <Card
                  hoverable
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                  cover={
                    <Carousel
                      autoplay
                      dotPosition="bottom"
                      style={{
                        width: "100%",
                        height: "300px",
                        borderRadius: "8px 8px 0 0",
                        overflow: "hidden",
                      }}
                    >
                      {center.images.map((img, index) => (
                        <div key={index}>
                          <img
                            src={img}
                            alt={center.centerName}
                            onError={handleImageError}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "8px 8px 0 0",
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
                      marginTop: "16px",
                      display: "flex",
                      justifyContent: "space-between",
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
                          width: "100%",
                          fontSize: "16px",
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </Link>
                    <Link to={`/bookingdetail/${center._id}`}>
                      <Button
                        style={{
                          height: "50px",
                          width: "100%",
                          fontSize: "16px",
                          color: "#fff",
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

        <Col span={24} style={{ marginTop: "20px", textAlign: "center" }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={centers.length}
            onChange={handlePageChange}
            style={{ color: "#1890ff" }}
          />
        </Col>
      </Row>
    </div>
  );
}
