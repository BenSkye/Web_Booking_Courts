import { useState, useEffect } from 'react';
import moment from 'moment';
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
  Empty} from 'antd';
import { ImBin } from 'react-icons/im';
import { formatPrice } from '../../../../utils/priceFormatter';
import { getCenterByIdAPI } from '@/services/centersAPI/getCenters';
import { getListCourtsByCenterId_API } from '../../../../services/courtAPI/getCourtsAPI';
import { getAPriceByCenterIdAPIAndScheduleType } from '../../../../services/centersAPI/getCenters';

const { Option } = Select;
const { Text } = Typography;

const ScheduleTypes = {
  NORMAL_PRICE: 'normalPrice',
};

const BookingFixedByMonth = ({ id }) => {
  const [form] = Form.useForm();
  const [selectedDays, setSelectedDays] = useState([]);
  const [center, setCenter] = useState({});
  const [courts, setCourts] = useState([]);
  const [endDate, setEndDate] = useState(null);
  const [totalPriceAll, setTotalPriceAll] = useState(0);
  const [price, setPrice] = useState(0);



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
    const getCenter = async (id) => {
      const data = await getCenterByIdAPI(id);
      console.log('center: ', data.data.center);
      setCenter(data.data.center);
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
    getPrice(id, ScheduleTypes.NORMAL_PRICE);
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

  // const onFinish = (values) => {
  //   const { days } = values;
  //   let totalDuration = 0;
  //   const startDate = form.getFieldValue('startDate');
  //   const endDate = moment(startDate)
  //     .add(form.getFieldValue('months'), 'months')
  //     .subtract(1, 'days')
  //     .endOf('day');

  //   if (days) {
  //     days.forEach((day) => {
  //       const validDays = getDaysOfWeekBetweenDates(
  //         startDate,
  //         endDate,
  //         day.dayOfWeek
  //       );
  //       totalDuration += validDays.length * parseFloat(day.duration);
  //     });
  //   }

  //   const totalPrice = totalDuration * center.pricePerHour;

  //   navigate({
  //     pathname: '/paymentBookingFixed',
  //     state: { bookingData: values, totalPrice: totalPrice },
  //   });
  // };

  const onFinish = (values) => {
    const startDate = form.getFieldValue('startDate').format('YYYY-MM-DD');
    const months = form.getFieldValue('months');
    const days = values.days.map((day) => ({
      dayOfWeek: day.dayOfWeek,
      startTime: day.startTime.format('HH:mm'),
      duration: parseFloat(day.duration),
    }));
  
    const bookingData = { startDate, totalMonths: months, days, centerId: id, scheduleType: 'normalPrice', courtId: values.pickCourt};
    console.log('bookingData: ', bookingData);
  
    // Send the bookingData to the backend
    fetch('/api/v1/booking/calculateBookingDates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data (e.g., navigate to the payment page)
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return daysOfWeek.filter(day => !selectedDays.includes(day));
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
                  {fields.map(({ key, name, ...restField },index) => (
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
                          { required: true, message: 'Vui lòng chọn giờ bắt đầu!' },
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
                      <ImBin onClick={() => {
                        remove(name);
                        removeDay(form.getFieldValue(['days', name, 'dayOfWeek']));
                      }} style={{ cursor: 'pointer', color: 'red' }} />
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
              <Button
                type='primary'
                htmlType='submit'
                onClick={estimatePrice}
                block
              >
                Tính giá và thanh toán
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <h3 style={{ marginTop: '20px' }}>Giá dự kiến</h3>
          {totalPriceAll > 0 ? (
            <Text strong>{formatPrice(totalPriceAll)}đ</Text>
          ) : (
            <Empty description='Chưa có thông tin giá' />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default BookingFixedByMonth;
