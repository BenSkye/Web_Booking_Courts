import { useState, useEffect } from 'react';
import { Button, DatePicker, Select, Steps, List, Card, Row, Col } from 'antd';

const { Step } = Steps;
const { Option } = Select;

// eslint-disable-next-line react/prop-types
export default function PickTimeBooking({ checkOut }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [selectedCourts, setSelectedCourts] = useState([]);

  const availableCourts = [
    { id: 1, name: 'Sân 1' },
    { id: 2, name: 'Sân 2' },
    { id: 3, name: 'Sân 3' },
    // Add more courts as needed
  ];

  const timeOptions = ['08:00', '09:00']; // Add more time options as needed
  const durationOptions = [1, 2]; // Add more duration options as needed

  // Automatically move to next step when conditions are met
  useEffect(() => {
    if (currentStep === 0 && selectedDate) {
      setCurrentStep(1);
    } else if (currentStep === 1 && startTime && duration) {
      setCurrentStep(2);
    }
  }, [selectedDate, startTime, duration]);

  const addToCart = (court) => {
    setSelectedCourts((prev) => [...prev, court]);
  };

  return (
    <div>
      <Row gutter={[16, 16]} justify='center'>
        <Col
          xs={24}
          md={8}
          style={{
            boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
          }}
        >
          <Steps
            direction='vertical'
            current={currentStep}
            style={{ height: '100%', padding: '10px' }}
          >
            <Step
              title='Chọn ngày'
              description={
                <div>
                  <DatePicker onChange={(date) => setSelectedDate(date)} />
                </div>
              }
            />
            <Step
              title='Chọn giờ bắt đầu và số giờ chơi'
              description={
                currentStep >= 1 && (
                  <div style={{ marginTop: 16, display: 'flex',flexWrap:'wrap', gap:10 }}>
                    <Select
                      placeholder='Giờ bắt đầu'
                      style={{ width: 200, marginRight: 16 }}
                      onChange={(value) => setStartTime(value)}
                    >
                      {timeOptions.map((time) => (
                        <Option key={time} value={time}>
                          {time}
                        </Option>
                      ))}
                    </Select>
                    <Select
                      placeholder='Số giờ chơi'
                      style={{ width: 200 }}
                      onChange={(value) => setDuration(value)}
                    >
                      {durationOptions.map((duration) => (
                        <Option key={duration} value={duration}>
                          {duration} giờ {duration > 1 ? 's' : ''}
                        </Option>
                      ))}
                    </Select>
                  </div>
                )
              }
            />
            <Step
              title='Chọn các sân'
              description={
                currentStep >= 2 && (
                  <div style={{ marginTop: 16 }}>
                    <div
                      style={{
                        maxHeight: '300px',
                        overflowY: 'scroll',
                        paddingRight: '16px',
                      }}
                    >
                      <List
                        grid={{ gutter: 16, column: 1 }}
                        dataSource={availableCourts}
                        renderItem={(court) => (
                          <List.Item key={court.id}>
                            <Card
                              title={court.name}
                              actions={[
                                // eslint-disable-next-line react/jsx-key
                                <Button
                                  type='primary'
                                  onClick={() => addToCart(court)}
                                  disabled={selectedCourts.includes(court)}
                                >
                                  Thêm vào giỏ
                                </Button>,
                              ]}
                            ></Card>
                          </List.Item>
                        )}
                      />
                    </div>
                  </div>
                )
              }
            />
          </Steps>
        </Col>
        <Col xs={24} md={8}>
          <Card
            title='Giỏ hàng của bạn'
            style={{ boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)' }}
          >
            <List
              dataSource={selectedCourts}
              renderItem={(court) => (
                <List.Item key={court.id}>{court.name}</List.Item>
              )}
            />
            <Button
              type='primary'
              onClick={checkOut}
              disabled={selectedCourts.length === 0}
              style={{ marginTop: 16 }}
            >
              Thanh toán
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
