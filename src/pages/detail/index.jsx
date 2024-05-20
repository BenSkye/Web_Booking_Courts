import React from 'react';
import { Layout, Image, Typography, Space, Row, Col } from 'antd';
import {
    EnvironmentOutlined,
    PhoneOutlined,
    DollarCircleOutlined, // Thêm icon giá tiền
} from '@ant-design/icons';
import { Button } from 'antd';

const { Content } = Layout;
const { Title, Text } = Typography;

const Detail = () => (

    <Content style={{ padding: '24px', marginTop: 16, backgroundColor: '#fff' }}>
        <div style={{ textAlign: 'center' }}>
            <Image
                width="50%"
                src="https://img.courtsite.my/insecure/rs:auto:640:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2tzcGhtYXkxMDAwMDA3YzlqZTR3dTN3YyUyRkdwRFE1QUZaQ3pQRDV3TjFzdm5RU3BReEpUUDItNTk4NTIwNzQtOGJkZC00ZjJjLWEyNjktMjQwODQxY2NiYmM5LmpwZz9hbHQ9bWVkaWEmdG9rZW49N2IzYzE0NDYtZDJjNS00ZTgxLWExZGUtZjM0NzIyNTgxYTNj.webp"
            />
        </div>
        <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Title level={3}>Ardence Arena, Eco Ardence</Title>
            <Text>Shah Alam, Selangor</Text>
        </div>
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
                    <DollarCircleOutlined style={{ fontSize: '24px' }} /> {/* Icon giá tiền */}
                    <Title level={5}>Price</Title>
                    <Text>200,000vnđ</Text> {/* Thay đổi giá trị này theo yêu cầu của bạn */}
                </Space>
            </Col>
        </Row>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Button type="primary" size="large">Đặt sân</Button>
        </div>
    </Content>

);

export default Detail;