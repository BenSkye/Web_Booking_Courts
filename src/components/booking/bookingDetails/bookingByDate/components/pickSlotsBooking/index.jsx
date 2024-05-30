import { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  DatePicker,
  Select,
  Steps,
  List,
  Card,
  Row,
  Col,
  Flex,
  Space,
  Divider,
  Carousel,
  Empty,
  Modal,
} from 'antd';
import { FaMapMarkerAlt } from 'react-icons/fa';
import MyLocationMap from '@/utils/map';
import { formatPrice } from '../../../../../../utils/priceFormatter';
import { getCenterByIdAPI } from '@/services/centersAPI/getCenters';
import {
  addToCart,
  removeFromCart,
  updateTotalPrice,
  setCenter,
} from '../../../../../../../redux/actions/cartActions';

const { Step } = Steps;
const { Option } = Select;

// eslint-disable-next-line react/prop-types
export default function PickTimeBooking({ checkOut, idCenter }) {
  const dispatch = useDispatch();
  const { selectedCourts, center, totalPrice } = useSelector(
    (state) => state.cart
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const availableCourts = [
    { id: 1, name: 'Sân 1', price: '200000' },
    { id: 2, name: 'Sân 2', price: '200000' },
    { id: 3, name: 'Sân 3', price: '200000' },
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

  const handleAddToCart = (court) => {
    dispatch(addToCart(court));
  };

  const handleRemoveFromCart = (court) => {
    dispatch(removeFromCart(court));
  };

  useEffect(() => {
    const getCenters = async (id) => {
      const data = await getCenterByIdAPI(id);
      dispatch(setCenter(data));
    };
    getCenters(idCenter);
  }, [idCenter, dispatch]);

  const calculateTotalPrice = () => {
    return selectedCourts.reduce(
      (total, court) => total + Number(court.price),
      0
    );
  };

  useEffect(() => {
    // Dispatch action để cập nhật tổng giá tiền mỗi khi có thay đổi trong giỏ hàng
    dispatch(updateTotalPrice(calculateTotalPrice()));
  }, [selectedCourts]);

  return (
    <div>
      <Row gutter={[16, 16]} justify='center'>
        <Col
          xs={30}
          md={12}
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
                  <DatePicker
                    placeholder='Chọn ngày'
                    onChange={(date) => setSelectedDate(date)}
                    disabledDate={(current) =>
                      current &&
                      (current.isBefore(moment().startOf('day')) ||
                        current.isAfter(moment().add(7, 'days').startOf('day')))
                    }
                    style={{
                      width: '100%',
                      height: '50px',
                      margin: '16px 0',
                    }}
                  />
                </div>
              }
            />
            <Step
              title='Chọn giờ bắt đầu và số giờ chơi'
              description={
                currentStep >= 1 && (
                  <div
                    style={{
                      marginTop: 16,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 10,
                    }}
                  >
                    <Select
                      placeholder='Giờ bắt đầu'
                      style={{
                        width: '100%',
                        height: '50px ',
                        margin: '8px 0',
                      }}
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
                      style={{
                        width: '100%',
                        height: '50px ',
                        margin: '8px 0',
                      }}
                      onChange={(value) => setDuration(value)}
                    >
                      {durationOptions.map((duration) => (
                        <Option key={duration} value={duration}>
                          {duration} giờ
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
                  <div
                    style={{
                      marginTop: 16,
                      borderRadius: '10px',
                      padding: '10px',
                      border: '1px solid rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <div
                      style={{
                        maxHeight: '300px',
                        overflowY: 'scroll',
                        paddingRight: '16px',
                      }}
                    >
                      <List
                        grid={{
                          gutter: 16,
                          column: 1,
                          width: '100%',
                          height: '50px ',
                          margin: '16px 0',
                        }}
                        dataSource={availableCourts}
                        renderItem={(court) => (
                          <List.Item key={court.id}>
                            <Card>
                              <Row align='center' justify='space-between'>
                                <Col align='center' justify='center'>
                                  <Row>
                                    <strong>{court.name}</strong>
                                  </Row>
                                  <Row>Giá: {formatPrice(court.price)}đ</Row>
                                </Col>
                                <Col>
                                  <Button
                                    type='primary'
                                    onClick={() => handleAddToCart(court)}
                                    disabled={selectedCourts.some(
                                      (selectedCourt) =>
                                        selectedCourt.id === court.id
                                    )}
                                  >
                                    Thêm vào giỏ
                                  </Button>
                                </Col>
                              </Row>
                            </Card>
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
            <Row
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '150px',
                width: '100%',
              }}
            >
              <Col span={12}>
                <div style={{ width: '100%' }}>
                  {center.nameCenter && <strong>{center.nameCenter}</strong>}
                </div>
                <a style={{ width: '100%' }} onClick={handleOpenModal}>
                  {center.addressCenter && (
                    <p>
                      {center.addressCenter} <FaMapMarkerAlt />
                    </p>
                  )}
                </a>
              </Col>
              <Col span={12}>
                <Carousel autoplay>
                  {!center.imgCenter || center.imgCenter.length === 0 ? (
                    <Empty />
                  ) : (
                    center.imgCenter.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          alt={center.nameCenter}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                    ))
                  )}
                </Carousel>
              </Col>
            </Row>

            {selectedCourts.length === 0 ? (
              <></>
            ) : (
              <>
                <Divider />
                <List
                  dataSource={selectedCourts}
                  renderItem={(court) => (
                    <List.Item
                      key={court.id}
                      actions={[
                        // eslint-disable-next-line react/jsx-key
                        <Button
                          type='link'
                          onClick={() => handleRemoveFromCart(court.id)}
                        >
                          Xóa
                        </Button>,
                      ]}
                    >
                      {court.name}: <Space /> {formatPrice(court.price)}đ
                    </List.Item>
                  )}
                />
                <Divider />
              </>
            )}
            <div>
              <strong style={{ fontSize: '20px' }}>
                Tổng tiền: {formatPrice(totalPrice)} đ
              </strong>
            </div>
            <Flex
              style={{ marginTop: 16 }}
              align='center'
              justify='space-between'
            >
              <Button
                type='primary'
                onClick={checkOut}
                disabled={selectedCourts.length === 0}
                style={{ marginTop: 16 }}
              >
                Thanh toán
              </Button>
            </Flex>
          </Card>
        </Col>
      </Row>
      <Modal
        visible={showModal}
        title='Vị trí'
        onCancel={handleCloseModal}
        footer={null}
        centered
        style={{ height: '80vh' }} // Thiết lập chiều cao của modal
      >
        <MyLocationMap address={center.addressCenter} />
      </Modal>
    </div>
  );
}
