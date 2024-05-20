import { Card, Col, Row, Avatar, Button } from 'antd';
import SearchBar from '@/pages/home/components/searchBar';

const { Meta } = Card;

export default function Home() {
  return (
    <Row
      gutter={[16, 16]}
      style={{
        margin: '0 auto', // Căn giữa container
      }}
    >
      <Col span={24}>
        <SearchBar />
      </Col>

      {[1, 2, 3, 4,5].map((index) => (
        <Col key={index} xs={24} sm={12} lg={8}>
          {/* Điều chỉnh các phần tử Col cho phù hợp với các kích thước màn hình khác nhau */}
          <Card
            hoverable
            style={{
              width: '100%', // Đảm bảo các card chiếm hết chiều rộng của Col
            }}
            cover={
              <img
                alt='example'
                src='https://img.courtsite.my/insecure/rs:auto:640:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2tzcGhtYXkxMDAwMDA3YzlqZTR3dTN3YyUyRkdwRFE1QUZaQ3pQRDV3TjFzdm5RU3BReEpUUDItNTk4NTIwNzQtOGJkZC00ZjJjLWEyNjktMjQwODQxY2NiYmM5LmpwZz9hbHQ9bWVkaWEmdG9rZW49N2IzYzE0NDYtZDJjNS00ZTgxLWExZGUtZjM0NzIyNTgxYTNj.webp'
              />
            }
          >
            <Meta
              avatar={
                <Avatar src='https://sieuthicaulong.vn/images/badminton-yard/1693408873_gallery_2022-04-07.jpg' />
              }
              title='Sân cầu lông Thanh Đa'
              description='Thanh Đa, Bình Thạnh, TP.HCM'
            />
            <div
              style={{
                paddingTop: '30px',
                paddingBottom: '0px',
                display: 'flex',
                justifyContent: 'space-between',
                gap: 16, // Thêm khoảng cách giữa các nút
                flexWrap: 'wrap', // Đảm bảo các nút không bị vỡ ra khỏi card
              }}
            >
              <Button
                style={{ height: '50px', width: '150px', fontSize: '18px' }}
              >
                Xem chi tiết
              </Button>
              <Button
                style={{ height: '50px', width: '150px', fontSize: '18px' }}
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
