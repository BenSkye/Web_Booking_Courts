import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import dayjs from 'dayjs';
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
  Empty,
  Calendar,
  Badge,
} from 'antd';
import { ImBin } from 'react-icons/im';
import { formatPrice } from '../../../../utils/priceFormatter';
import { getCenterByIdAPI } from '@/services/centersAPI/getCenters';
import { getListCourtsByCenterId_API } from '../../../../services/courtAPI/getCourtsAPI';
import { getAPriceByCenterIdAPIAndScheduleType } from '../../../../services/centersAPI/getCenters';
import { createFixedPackageScheduleAPI } from '../../../../services/fixedPackagesScheduleAPI/createFixedPackageScheduleAPI';
import { getFixedPackageScheduleByIdAPI } from '../../../../services/fixedPackagesScheduleAPI/getFixedPackageScheuleAPI';

const { Option } = Select;
const { Text } = Typography;

const ScheduleTypes = {
  FIXED_MONTH_PACKAGE_PRICE: 'MP',
};

const BookingFixedByMonth = ({ id }) => {
  const [form] = Form.useForm();
  const [selectedDays, setSelectedDays] = useState([]);
  const [courts, setCourts] = useState([]);
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = useState(0);
  const [bookingId, setBookingId] = useState(null); // State to store the new booking ID
  const [bookings, setBookings] = useState([]); // State to store the bookings
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate('/paymentBookingFixed', { state: { bookingId } });
  };

  useEffect(() => {
    const getCenter = async (id) => {
      const data = await getCenterByIdAPI(id);
      console.log('center: ', data.data.center);
    };
    getCenter(id);
  }, [id]);

  useEffect(() => {
    const getListCourts = async (id) => {
      const data = await getListCourtsByCenterId_API(id);
      setCourts(data);
    };
    getListCourts(id);
  }, [id]);

  useEffect(() => {
    const getPrice = async (id, scheduleType) => {
      const data = await getAPriceByCenterIdAPIAndScheduleType(
        id,
        scheduleType
      );
      setPrice(data.price);
    };
    getPrice(id, ScheduleTypes.FIXED_MONTH_PACKAGE_PRICE);
  }, [id]);

  const onFinish = async (values) => {
    const startDate = form.getFieldValue('startDate').format('YYYY-MM-DD');
    const months = form.getFieldValue('months');
    const days = values.days.map((day) => ({
      dayOfWeek: day.dayOfWeek,
      startTime: day.startTime.format('HH:mm'),
      duration: parseFloat(day.duration),
    }));

    const bookingData = {
      centerId: id,
      courtId: values.pickCourt,
      scheduleType: ScheduleTypes.FIXED_MONTH_PACKAGE_PRICE,
      startDate,
      totalMonths: months,
      days,
    };
    console.log('bookingData: ', bookingData);

    // Send the bookingData to the backend
    try {
      const data = await createFixedPackageScheduleAPI(bookingData);
      console.log('API response data:', data); // Log API response data
      if (
        data &&
        data.data &&
        data.data.fixedPackageSchedule &&
        data.data.fixedPackageSchedule._id
      ) {
        setBookingId(data.data.fixedPackageSchedule._id); // Store the new booking ID in state
        console.log('booking ID:', data.data.fixedPackageSchedule._id);
      } else {
        console.error('Error: Response does not contain booking ID');
      }
      console.log('Success MP:', data);
    } catch (error) {
      console.error('Error MP:', error);
    }
  };

  useEffect(() => {
    const getFixedPackageSchedule = async (id) => {
      try {
        const response = await getFixedPackageScheduleByIdAPI(id);
        const data = response.data.fixedPackageSchedule;
        console.log('GET fixedPackageSchedule: ', data);
        if (data && Array.isArray(data.bookings)) {
          setEndDate(data.endDate);
          setTotalPrice(data.totalPrice);
          setBookings(data.bookings);
        } else {
          console.error('Error: bookings is not an array or is missing');
          setBookings([]); // Reset bookings to an empty array
        }
      } catch (error) {
        console.error('Error fetching fixedPackageSchedule:', error);
        setBookings([]); // Reset bookings to an empty array in case of error
      }
    };
    if (bookingId) {
      getFixedPackageSchedule(bookingId);
    }
  }, [bookingId]);

  const cellRender = (value, info) => {
    if (info.type === 'date') {
      const date = value.format('YYYY-MM-DD');
      const bookingsForDate = Array.isArray(bookings)
        ? bookings.filter(
            (booking) => dayjs(booking.date).format('YYYY-MM-DD') === date
          )
        : [];

      return (
        <div className='events' style={{ backgroundColor: 'gray' }}>
          {bookingsForDate.map((booking) => (
            <div key={booking._id}>
              <Badge
                status='success'
                text={`${booking.start} - ${booking.end}`}
              />
            </div>
          ))}
        </div>
      );
    }
    return info.originNode;
  };

  const onAddDay = (add) => {
    add();
  };

  const handleSelectChange = (value, index) => {
    if (!selectedDays.includes(value)) {
      let newSelectedDays = [...selectedDays];
      newSelectedDays[index] = value;
      setSelectedDays(newSelectedDays);
    }
  };

  const removeDay = (day, index) => {
    let newSelectedDays = selectedDays.filter((selectedDay, i) => i !== index);
    setSelectedDays(newSelectedDays);
  };

  const getAvailableDaysOfWeek = () => {
    const daysOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    return daysOfWeek.filter((day) => !selectedDays.includes(day));
  };

  return (
    <Row gutter={[16, 16]} justify='center'>
      <Col span={10}>
        <Card>
          <div style={{ marginBottom: '1.2rem' }}>
            <h2>Đặt lịch cố định theo tháng</h2>
            <Text italic>
              Giá:
              <strong style={{ color: 'red', marginLeft: '0.2rem' }}>
                {formatPrice(price)}đ/giờ
              </strong>
            </Text>
          </div>

          <Space style={{ margin: '10px' }} />
          <Form form={form} onFinish={onFinish} layout='vertical'>
            <Form.Item
              name='pickCourt'
              label='Chọn sân'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn sân',
                },
              ]}
            >
              <Select placeholder='Chọn sân'>
                {courts.map((court) => (
                  <Option key={court._id} value={court._id}>
                    {court.courtNumber}
                  </Option>
                ))}
              </Select>
            </Form.Item>
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
                format='DD-MM-YYYY'
              />
            </Form.Item>

            <Form.Item
              name='months'
              label='Số tháng'
              rules={[{ required: true, message: 'Vui lòng chọn số tháng!' }]}
            >
              <Select placeholder='Số tháng'>
                <Option value={1}>1 tháng</Option>
                <Option value={2}>2 tháng</Option>
                <Option value={3}>3 tháng</Option>
              </Select>
            </Form.Item>

            <Form.Item label='Ngày kết thúc'>
              <Input
                value={endDate ? moment(endDate).format('DD-MM-YYYY') : ''}
                disabled
              />
            </Form.Item>

            <Form.List name='days'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
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
                        style={{ width: '10rem' }}
                      >
                        <Select
                          placeholder='Chọn thứ'
                          onChange={(value) => handleSelectChange(value, index)}
                        >
                          {getAvailableDaysOfWeek().map((day) => (
                            <Option key={day} value={day}>
                              {day}
                            </Option>
                          ))}
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
                        <TimePicker format='HH:mm' />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'duration']}
                        label='Số giờ chơi'
                        rules={[
                          { required: true, message: 'Vui lòng nhập số giờ!' },
                        ]}
                      >
                        <Input type='number' step='0.5' min='0.5' />
                      </Form.Item>
                      <ImBin
                        onClick={() => {
                          remove(name);
                          removeDay(
                            form.getFieldValue(['days', name, 'dayOfWeek'])
                          );
                        }}
                        style={{ cursor: 'pointer', color: 'red' }}
                      />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type='dashed'
                      onClick={() => onAddDay(add)}
                      block
                      icon='+'
                    >
                      Thêm ngày chơi
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Button type='primary' htmlType='submit' block>
                Tính giá
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={14}>
        <Card>
          <h3 style={{ marginTop: '20px' }}>Giá dự kiến</h3>
          {/* <h3 style={{ marginTop: '20px' }}>_ID:{bookingId}</h3> */}

          {bookingId ? (
            <>
              <Text strong>{bookingId}đ</Text>
              <h2>
                Tổng giá tiền:
                {formatPrice(totalPrice)}
              </h2>
              <Calendar cellRender={cellRender} />
              <Form.Item>
                <Button type='primary' onClick={handlePayment} block>
                  Thanh toán
                </Button>
              </Form.Item>
            </>
          ) : (
            <Empty description='Chưa có thông tin giá' />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default BookingFixedByMonth;
