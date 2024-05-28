import { Form, Input, Button, Select, TimePicker, message } from 'antd';

const { Option } = Select;

const BookingFixedByMonth = ({ id }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Xử lý dữ liệu khi submit form
    console.log('Received values of form: ', values);

    // Giả sử gửi dữ liệu lên server thành công
    message.success('Đặt lịch cố định thành công!');
  };

  return (
    <Form form={form} onFinish={onFinish} layout='vertical'>
      <Form.Item
        name='time'
        label='Chọn giờ'
        rules={[{ required: true, message: 'Vui lòng chọn giờ!' }]}
      >
        <TimePicker format='HH:mm' />
      </Form.Item>

      <Form.Item
        name='dayOfWeek'
        label='Chọn thứ trong tuần'
        rules={[{ required: true, message: 'Vui lòng chọn thứ!' }]}
      >
        <Select placeholder='Chọn thứ'>
          <Option value='Monday'>Thứ Hai</Option>
          <Option value='Tuesday'>Thứ Ba</Option>
          <Option value='Wednesday'>Thứ Tư</Option>
          <Option value='Thursday'>Thứ Năm</Option>
          <Option value='Friday'>Thứ Sáu</Option>
          <Option value='Saturday'>Thứ Bảy</Option>
          <Option value='Sunday'>Chủ Nhật</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name='months'
        label='Số tháng'
        rules={[{ required: true, message: 'Vui lòng nhập số tháng!' }]}
      >
        <Input type='number' min={1} />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Đặt lịch
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BookingFixedByMonth;
