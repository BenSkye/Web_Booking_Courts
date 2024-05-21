import React from 'react';
import { Layout, Image, Typography, Space, Row, Col } from 'antd';
import {
    EnvironmentOutlined,
    PhoneOutlined,
    DollarCircleOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const images = [
    'https://img.courtsite.my/insecure/rs:auto:640:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2tzcGhtYXkxMDAwMDA3YzlqZTR3dTN3YyUyRkdwRFE1QUZaQ3pQRDV3TjFzdm5RU3BReEpUUDItNTk4NTIwNzQtOGJkZC00ZjJjLWEyNjktMjQwODQxY2NiYmM5LmpwZz9hbHQ9bWVkaWEmdG9rZW49N2IzYzE0NDYtZDJjNS00ZTgxLWExZGUtZjM0NzIyNTgxYTNj.webp',
    'https://img.courtsite.my/insecure/rs:auto:640:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2tzcGhtYXkxMDAwMDA3YzlqZTR3dTN3YyUyRkdwRFE1QUZaQ3pQRDV3TjFzdm5RU3BReEpUUDItNTk4NTIwNzQtOGJkZC00ZjJjLWEyNjktMjQwODQxY2NiYmM5LmpwZz9hbHQ9bWVkaWEmdG9rZW49N2IzYzE0NDYtZDJjNS00ZTgxLWExZGUtZjM0NzIyNTgxYTNj.webp',
    'https://img.courtsite.my/insecure/rs:auto:640:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2tzcGhtYXkxMDAwMDA3YzlqZTR3dTN3YyUyRkdwRFE1QUZaQ3pQRDV3TjFzdm5RU3BReEpUUDItNTk4NTIwNzQtOGJkZC00ZjJjLWEyNjktMjQwODQxY2NiYmM5LmpwZz9hbHQ9bWVkaWEmdG9rZW49N2IzYzE0NDYtZDJjNS00ZTgxLWExZGUtZjM0NzIyNTgxYTNj.webp',
    'https://img.courtsite.my/insecure/rs:auto:640:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2tzcGhtYXkxMDAwMDA3YzlqZTR3dTN3YyUyRkdwRFE1QUZaQ3pQRDV3TjFzdm5RU3BReEpUUDItNTk4NTIwNzQtOGJkZC00ZjJjLWEyNjktMjQwODQxY2NiYmM5LmpwZz9hbHQ9bWVkaWEmdG9rZW49N2IzYzE0NDYtZDJjNS00ZTgxLWExZGUtZjM0NzIyNTgxYTNj.webp'
];

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, zIndex: 1 }} onClick={onClick}>
            <LeftOutlined style={{ fontSize: '24px', color: '#000' }} />
        </div>
    );
};

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, zIndex: 1 }} onClick={onClick}>
            <RightOutlined style={{ fontSize: '24px', color: '#000' }} />
        </div>
    );
};

const carouselSettings = {
    autoplay: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    dots: true
};

const Detail = () => (
    <Content style={{ padding: '24px', marginTop: 16, backgroundColor: '#fff' }}>
        <Row>
            <Col span={6}>
                <div style={{ textAlign: 'center' }}>
                    <Image src="https://img.courtsite.my/insecure/rs:auto:640:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2tzcGhtYXkxMDAwMDA3YzlqZTR3dTN3YyUyRkdwRFE1QUZaQ3pQRDV3TjFzdm5RU3BReEpUUDItNTk4NTIwNzQtOGJkZC00ZjJjLWEyNjktMjQwODQxY2NiYmM5LmpwZz9hbHQ9bWVkaWEmdG9rZW49N2IzYzE0NDYtZDJjNS00ZTgxLWExZGUtZjM0NzIyNTgxYTNj.webp" style={{ width: 80, height: 80, borderRadius: '50%' }} />
                    <Text style={{ display: 'block' }}>Tên người đăng</Text>
                </div>
            </Col>
            <Col span={18} style={{ maxWidth: '55%', marginLeft: '200px' }}>
                <div style={{ textAlign: 'center' }}>
                    <Slider {...carouselSettings}>
                        {images.map((image, index) => (
                            <div key={index}>
                                <Image src={image} />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div style={{ marginTop: 24, textAlign: 'center' }}>
                    <Title level={3}>Sân cầu lông</Title>
                </div>
            </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            <Col span={8} style={{ textAlign: 'center' }}>
                <Space direction="vertical">
                    <EnvironmentOutlined style={{ fontSize: '24px' }} />
                    <Title level={5}>Address</Title>
                    <Text>Thành phố Thủ Đức, Thành Phố Hồ Chí Minh</Text>
                </Space>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
                <Space direction="vertical">
                    <PhoneOutlined style={{ fontSize: '24px' }} />
                    <Title level={5}>Điện Thoại</Title>
                    <Text>+60123533716</Text>
                </Space>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
                <Space direction="vertical">
                    <DollarCircleOutlined style={{ fontSize: '24px' }} />
                    <Title level={5}>Price</Title>
                    <Text>200,000vnđ</Text>
                </Space>
            </Col>
        </Row>
        <div style={{ textAlign: 'left', marginTop: 24 }}>
            <Title level={4}>Mô tả</Title>
            <Text>
                Ardence Arena là một sân cầu lông hiện đại nằm ở Eco Ardence, Shah Alam. Sân được trang bị đầy đủ tiện nghi và có môi trường tập luyện tốt. Đây là nơi lý tưởng để bạn và bạn bè đến rèn luyện và thư giãn.
            </Text>
        </div>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Button type="primary" size="large">Đặt sân</Button>
        </div>
    </Content>
);



export default Detail;
