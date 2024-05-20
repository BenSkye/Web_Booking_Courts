import { useEffect, useState } from 'react';
import { Card, Col, Row, Avatar, Button, Rate } from 'antd';
import SearchBar from '@/pages/home/components/searchBar';
import { Link } from 'react-router-dom';

const { Meta } = Card;

export default function Home() {
  const [courts, setCourts] = useState([]);

  // Mock data
  useEffect(() => {
    // Mock data
    const data = [
      {
        id: 1,
        title: 'Sân cầu lông Thanh Đa',
        address: 'Thanh Đa, Bình Thạnh, TP.HCM',
        imageUrl: '...',
        avatarUrl: '...',
        rating: 4.5,
        reviews: 'Đánh giá: 4.5/5 từ 20 người dùng',
      },
      {
        id: 2,
        title: 'Sân cầu lông Thanh Đa',
        address: 'Thanh Đa, Bình Thạnh, TP.HCM',
        imageUrl: '...',
        avatarUrl: '...',
        rating: 4.5,
        reviews: 'Đánh giá: 4.5/5 từ 20 người dùng',
      },
    ];
    setCourts(data);
  }, []);

  return (
    <Row gutter={[16, 16]} style={{ margin: '0 auto', padding: '20px' }}>
      <Col span={24}>
        <SearchBar />
      </Col>

      {courts.map((court, index) => (
        <Col key={index} xs={24} sm={12} lg={8}>
          <Card
            hoverable
            style={{ width: '100%' }}
            cover={<img alt={court.title} src={court.imageUrl} />}
          >
            <Meta
              avatar={<Avatar src={court.avatarUrl} />}
              title={court.title}
              description={
                <div>
                  <p>{court.address}</p>
                  <Rate disabled defaultValue={court.rating} />
                  <p>{court.reviews}</p>
                </div>
              }
            />
            <div
              style={{
                marginTop: 16,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {/* Pass the court ID to the detail page */}
              <Link to={`/detail/${court.id}`}>
                <Button style={{ height: '40px', width: '150px', fontSize: '18px' }}>
                  Xem chi tiết
                </Button>
              </Link>
              <Button
                style={{ height: '40px', width: '150px', fontSize: '18px' }}
                type='primary'
              >
                Đặt sân ngay
              </Button>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}