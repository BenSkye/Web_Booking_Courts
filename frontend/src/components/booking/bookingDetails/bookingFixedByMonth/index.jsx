import { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Select,
  TimePicker,
  Space,
  DatePicker,
  Card,
  Typography,
  Row,
  Col,
  Carousel,
  Empty,
  Modal,
} from 'antd';
import { ImBin } from 'react-icons/im';
import { FaMapMarkerAlt } from 'react-icons/fa';
import MyLocationMap from '@/utils/map';
import { formatPrice } from '../../../../utils/priceFormatter';
import { getCenterByIdAPI } from '@/services/centersAPI/getCenters';

const { Option } = Select;
const { Text } = Typography;

const BookingFixedByMonth = ({ id }) => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [selectedDays, setSelectedDays] = useState([]);
  const [center, setCenter] = useState({});
  const [endDate, setEndDate] = useState(null);
  const [totalPriceAll, setTotalPriceAll] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const calculateEndDate = () => {
    const startDate = form.getFieldValue('startDate');
    const months = form.getFieldValue('months');
    if (startDate && months) {
      const daysInMonth = moment(startDate)
        .add(months, 'months')
        .subtract(1, 'days')
        .endOf('day');
      const remainingDays = daysInMonth.diff(startDate, 'days') + 1;
      const numMonths = Math.floor(remainingDays / 30);
      const endDate = moment(startDate)
        .add(numMonths, 'months')
        .subtract(1, 'days')
        .endOf('day');
      setEndDate(endDate);
    }
  };

  useEffect(() => {
    const getCenters = async (id) => {
      const data = await getCenterByIdAPI(id);
      setCenter(data);
    };
    getCenters(id);
  }, [id]);

  const getDaysOfWeekBetweenDates = (start, end, dayOfWeek) => {
    const daysOfWeek = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 0,
    };
    const day = daysOfWeek[dayOfWeek];
    let current = moment(start).day(day);
    if (current.isBefore(start)) {
      current.add(7, 'days');
    }
    const dates = [];
    while (current.isSameOrBefore(end)) {
      dates.push(current.clone());
      current.add(7, 'days');
    }
    return dates;
  };

  const estimatePrice = () => {
    const values = form.getFieldsValue();
    const { days } = values;
    let totalDuration = 0;
    const startDate = form.getFieldValue('startDate');
    const endDate = moment(startDate)
      .add(form.getFieldValue('months'), 'months')
      .subtract(1, 'days')
      .endOf('day');

    if (days) {
      days.forEach((day) => {
        const validDays = getDaysOfWeekBetweenDates(
          startDate,
          endDate,
          day.dayOfWeek
        );
        totalDuration += validDays.length * parseFloat(day.duration);
      });
    }

    const totalPrice = totalDuration * center.pricePerHour;

    setTotalPriceAll(totalPrice);
  };

  const onFinish = (values) => {
    const { days } = values;
    let totalDuration = 0;
    const startDate = form.getFieldValue('startDate');
    const endDate = moment(startDate)
      .add(form.getFieldValue('months'), 'months')
      .subtract(1, 'days')
      .endOf('day');

    if (days) {
      days.forEach((day) => {
        const validDays = getDaysOfWeekBetweenDates(
          startDate,
          endDate,
          day.dayOfWeek
        );
        totalDuration += validDays.length * parseFloat(day.duration);
      });
    }

    const totalPrice = totalDuration * center.pricePerHour;

    navigate({
      pathname: '/paymentBookingFixed',
      state: { bookingData: values, totalPrice: totalPrice },
    });
  };

  const onAddDay = (add) => {
    add();
  };

  const handleSelectChange = (value) => {
    if (!selectedDays.includes(value)) {
      setSelectedDays([...selectedDays, value]);
    }
  };

  const isDaySelected = (day) => {
    return selectedDays.includes(day);
  };

  return (
    <Row gutter={[16, 16]} justify='center'>
      <Col span={12}>
        <Card>
          <div style={{ marginBottom: '1.2rem' }}>
            <h2>Đặt lịch cố định theo tháng</h2>
            <Text italic>
              Giá:
              <strong style={{ color: 'red', marginLeft: '0.2rem' }}>
                {formatPrice(center.pricePerHour)}đ/giờ
              </strong>
            </Text>
          </div>

          <Space style={{ margin: '10px' }} />
          <Form form={form} onFinish={onFinish} layout='vertical'>
            <Form.Item
              name='startDate'
              label='Ngày bắt đầu'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn ngày bắt đầu!',
                },
              ]}
            >
              <DatePicker
                placeholder='Ngày bắt đầu'
                disabledDate={(current) =>
                  current &&
                  (current.isBefore(moment().add(8, 'days').startOf('day')) ||
                    current.isAfter(
                      moment()
                        .add(8, 'days')
                        .startOf('day')
                        .clone()
                        .add(30, 'days')
                        .endOf('day')
                    ))
                }
                onChange={() => calculateEndDate()}
                format='DD-MM-YYYY'
              />
            </Form.Item>

            <Form.Item
              name='months'
              label='Số tháng'
              rules={[{ required: true, message: 'Vui lòng chọn số tháng!' }]}
            >
              <Select
                placeholder='Số tháng'
                onChange={() => calculateEndDate()}
              >
                <Option value={1}>1 tháng</Option>
                <Option value={2}>2 tháng</Option>
                <Option value={3}>3 tháng</Option>
              </Select>
            </Form.Item>

            <Form.Item label='Ngày kết thúc'>
              <Input
                value={endDate ? endDate.format('DD-MM-YYYY') : ''}
                disabled
              />
            </Form.Item>

            <Form.List name='days'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align='baseline'
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'dayOfWeek']}
                        label='Chọn thứ trong tuần'
                        rules={[
                          { required: true, message: 'Vui lòng chọn thứ!' },
                        ]}
                      >
                        <Select
                          placeholder='Chọn thứ'
                          onChange={handleSelectChange}
                        >
                          <Option
                            value='Monday'
                            disabled={isDaySelected('Monday')}
                          >
                            Thứ Hai
                          </Option>
                          <Option
                            value='Tuesday'
                            disabled={isDaySelected('Tuesday')}
                          >
                            Thứ Ba
                          </Option>
                          <Option
                            value='Wednesday'
                            disabled={isDaySelected('Wednesday')}
                          >
                            Thứ Tư
                          </Option>
                          <Option
                            value='Thursday'
                            disabled={isDaySelected('Thursday')}
                          >
                            Thứ Năm
                          </Option>
                          <Option
                            value='Friday'
                            disabled={isDaySelected('Friday')}
                          >
                            Thứ Sáu
                          </Option>
                          <Option
                            value='Saturday'
                            disabled={isDaySelected('Saturday')}
                          >
                            Thứ Bảy
                          </Option>
                          <Option
                            value='Sunday'
                            disabled={isDaySelected('Sunday')}
                          >
                            Chủ Nhật
                          </Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'startTime']}
                        label='Giờ bắt đầu'
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng chọn giờ bắt đầu!',
                          },
                        ]}
                      >
                        <TimePicker format='HH:mm' minuteStep={30} />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'duration']}
                        label='Thời lượng (giờ)'
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng chọn thời lượng!',
                          },
                        ]}
                      >
                        <Input type='number' min={1} step={0.5} />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          style={{
                            color: '#ff3200',
                            padding: 0,
                          }}
                          type='danger'
                          onClick={() => remove(name)}
                          icon={<ImBin style={{ fontSize: '1.2rem' }} />}
                        />
                      </Form.Item>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type='dashed'
                      onClick={() => onAddDay(add, fields)}
                      block
                      icon='+'
                    >
                      Thêm ngày
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Text code style={{ fontSize: '1.2rem' }}>
                Tổng tiền:
                <strong> {formatPrice(totalPriceAll)}đ</strong>
              </Text>
              <Button
                type='default'
                onClick={estimatePrice}
                style={{
                  marginLeft: '10px',
                  background: '#727374',
                  color: 'white',
                }}
              >
                Tính tổng tiền
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Đặt lịch
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          title='Thông tin sân'
          style={{ boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)' }}
        >
          <Text>
            {center.nameCenter && <strong>{center.nameCenter}</strong>}
            <a onClick={handleOpenModal}>
              {center.addressCenter && (
                <p>
                  {center.addressCenter} <FaMapMarkerAlt />
                </p>
              )}
            </a>
          </Text>
          <Carousel autoplay style={{ height: '10rem', width: '10rem' }}>
            {!center.imgCenter || center.imgCenter.length === 0 ? (
              <Empty />
            ) : (
              center.imgCenter.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    style={{ width: '100%' }}
                    alt={center.nameCenter}
                  />
                </div>
              ))
            )}
          </Carousel>
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
        </Card>
      </Col>
    </Row>
  );
};

export default BookingFixedByMonth;
