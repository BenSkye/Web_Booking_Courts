import { Select, Space, DatePicker, Input, Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;
const onChange = (date, dateString) => {
  console.log(date, dateString);
};

export default function SearchBar() {
  return (
    <Space.Compact block>
      <Select defaultValue='Vị trí' style={{ width: '150px', height: '50px' }}>
        <Option value='Option1-1'>Option1-1</Option>
        <Option value='Option1-2'>Option1-2</Option>
      </Select>
      <Input
        style={{
          width: '150px',
        }}
        placeholder='Nhập vị trí'
      />
      <DatePicker onChange={onChange} placeholder='Chọn ngày' />
      <Select
        defaultValue='Chọn khung giờ'
        style={{ width: '150px', height: '50px' }}
      >
        <Option value='6'>6:00</Option>
        <Option value='7'>7:00</Option>
        <Option value='17'>17:00</Option>
      </Select>
      <Select
        defaultValue='Chọn số giờ chơi'
        style={{ width: '150px', height: '50px' }}
      >
        <Option value='1'>1 giờ</Option>
        <Option value='2'>2 giờ</Option>
      </Select>
      <Tooltip title='search'>
        <Button
          type='primary'
          shape='circle'
          icon={<SearchOutlined />}
          style={{ width: '50px', height: '50px' }}
        />
      </Tooltip>
    </Space.Compact>
  );
}
