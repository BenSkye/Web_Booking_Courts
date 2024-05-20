import { Card, Col, Row, Avatar, Button, Rate } from 'antd';
import SearchBar from '@/pages/home/components/searchBar';
import { Link } from 'react-router-dom';

const { Meta } = Card;

export default function Home() {
  const courts = [
    {
      title: 'Sân cầu lông Thanh Đa',
      address: 'Thanh Đa, Bình Thạnh, TP.HCM',
      imageUrl: 'https://img.courtsite.my/insecure/rs:auto:640:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2tzcGhtYXkxMDAwMDA3YzlqZTR3dTN3YyUyRkdwRFE1QUZaQ3pQRDV3TjFzdm5RU3BReEpUUDItNTk4NTIwNzQtOGJkZC00ZjJjLWEyNjktMjQwODQxY2NiYmM5LmpwZz9hbHQ9bWVkaWEmdG9rZW49N2IzYzE0NDYtZDJjNS00ZTgxLWExZGUtZjM0NzIyNTgxYTNj.webp',
      avatarUrl: 'https://sieuthicaulong.vn/images/badminton-yard/1693408873_gallery_2022-04-07.jpg',
      rating: 4.5,
      reviews: 'Đánh giá: 4.5/5 từ 20 người dùng',
    },
    {
      title: 'Sân cầu lông Thanh Đa',
      address: 'Thanh Đa, Bình Thạnh, TP.HCM',
      imageUrl: 'https://img.courtsite.my/insecure/rs:auto:640:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2tzcGhtYXkxMDAwMDA3YzlqZTR3dTN3YyUyRkdwRFE1QUZaQ3pQRDV3TjFzdm5RU3BReEpUUDItNTk4NTIwNzQtOGJkZC00ZjJjLWEyNjktMjQwODQxY2NiYmM5LmpwZz9hbHQ9bWVkaWEmdG9rZW49N2IzYzE0NDYtZDJjNS00ZTgxLWExZGUtZjM0NzIyNTgxYTNj.webp',
      avatarUrl: 'https://sieuthicaulong.vn/images/badminton-yard/1693408873_gallery_2022-04-07.jpg',
      rating: 4.5,
      reviews: 'Đánh giá: 4.5/5 từ 20 người dùng',
    },
    {
      title: 'Sân cầu lông Thanh Đa',
      address: 'Thanh Đa, Bình Thạnh, TP.HCM',
      imageUrl: 'https://img.courtsite.my/insecure/rs:auto:640:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2tzcGhtYXkxMDAwMDA3YzlqZTR3dTN3YyUyRkdwRFE1QUZaQ3pQRDV3TjFzdm5RU3BReEpUUDItNTk4NTIwNzQtOGJkZC00ZjJjLWEyNjktMjQwODQxY2NiYmM5LmpwZz9hbHQ9bWVkaWEmdG9rZW49N2IzYzE0NDYtZDJjNS00ZTgxLWExZGUtZjM0NzIyNTgxYTNj.webp',
      avatarUrl: 'https://sieuthicaulong.vn/images/badminton-yard/1693408873_gallery_2022-04-07.jpg',
      rating: 4.5,
      reviews: 'Đánh giá: 4.5/5 từ 20 người dùng',
    },
    {
      title: 'Sân cầu lông Thanh Đa',
      address: 'Thanh Đa, Bình Thạnh, TP.HCM',
      imageUrl: 'https://img.courtsite.my/insecure/rs:auto:640:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2tzcGhtYXkxMDAwMDA3YzlqZTR3dTN3YyUyRkdwRFE1QUZaQ3pQRDV3TjFzdm5RU3BReEpUUDItNTk4NTIwNzQtOGJkZC00ZjJjLWEyNjktMjQwODQxY2NiYmM5LmpwZz9hbHQ9bWVkaWEmdG9rZW49N2IzYzE0NDYtZDJjNS00ZTgxLWExZGUtZjM0NzIyNTgxYTNj.webp',
      avatarUrl: 'https://sieuthicaulong.vn/images/badminton-yard/1693408873_gallery_2022-04-07.jpg',
      rating: 4.5,
      reviews: 'Đánh giá: 4.5/5 từ 20 người dùng',
    },
    {
      title: 'Sân cầu lông Thanh Đa',
      address: 'Thanh Đa, Bình Thạnh, TP.HCM',
      imageUrl: 'https://img.courtsite.my/insecure/rs:auto:640:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2tzcGhtYXkxMDAwMDA3YzlqZTR3dTN3YyUyRkdwRFE1QUZaQ3pQRDV3TjFzdm5RU3BReEpUUDItNTk4NTIwNzQtOGJkZC00ZjJjLWEyNjktMjQwODQxY2NiYmM5LmpwZz9hbHQ9bWVkaWEmdG9rZW49N2IzYzE0NDYtZDJjNS00ZTgxLWExZGUtZjM0NzIyNTgxYTNj.webp',
      avatarUrl: 'https://sieuthicaulong.vn/images/badminton-yard/1693408873_gallery_2022-04-07.jpg',
      rating: 4.5,
      reviews: 'Đánh giá: 4.5/5 từ 20 người dùng',
    },
    {
      title: 'Sân cầu lông Thanh Đa',
      address: 'Thanh Đa, Bình Thạnh, TP.HCM',
      imageUrl: 'https://img.courtsite.my/insecure/rs:auto:640:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2tzcGhtYXkxMDAwMDA3YzlqZTR3dTN3YyUyRkdwRFE1QUZaQ3pQRDV3TjFzdm5RU3BReEpUUDItNTk4NTIwNzQtOGJkZC00ZjJjLWEyNjktMjQwODQxY2NiYmM5LmpwZz9hbHQ9bWVkaWEmdG9rZW49N2IzYzE0NDYtZDJjNS00ZTgxLWExZGUtZjM0NzIyNTgxYTNj.webp',
      avatarUrl: 'https://sieuthicaulong.vn/images/badminton-yard/1693408873_gallery_2022-04-07.jpg',
      rating: 4.5,
      reviews: 'Đánh giá: 4.5/5 từ 20 người dùng',
    },

  ];

  return (
    <Row
      gutter={[16, 16]}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <SearchBar />
      {courts.map((court, index) => (
        <Col key={index}>
          <Card
            hoverable
            style={{
              width: 440,
            }}
            cover={
              <img
                alt='example'
                src={court.imageUrl}
              />
            }
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
              <Link to={`detail`}>
                <Button
                  style={{ height: '40px', width: '150px', fontSize: '18px' }}
                >
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