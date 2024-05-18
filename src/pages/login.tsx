import React from 'react';
import { Button, Checkbox, Form, Input, Row, Col, Typography } from 'antd';
import type { FormProps } from 'antd';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom

const { Text } = Typography;

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Login: React.FC = () => (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={0} sm={0} md={12} lg={8} xl={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1>CourtArena</h1>
            </div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{ maxWidth: 400, margin: 'auto' }}
            >
                <Form.Item<FieldType>
                    label="Tài khoản"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Mật khẩu "
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ backgroundColor: 'black', borderColor: 'black', color: 'white', width: '100%' }}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <div style={{ textAlign: 'center' }}>
                <Text>
                    Bạn chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
                </Text>
            </div>
        </Col>
    </Row>
);

export default Login;