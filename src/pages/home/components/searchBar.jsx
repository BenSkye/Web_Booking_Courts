import { useState, useEffect } from 'react';
import moment from 'moment';
import { Space, Select, DatePicker, Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  fetchDistricts,
  fetchWards,
} from '@/services/District_ward-API/districtWardAPI';
import { HCM_ID } from '@/utils/constants';

const { Option } = Select;

export default function SearchBar() {
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);

  useEffect(() => {
    const getDistricts = async () => {
      const data = await fetchDistricts(HCM_ID);
      setDistrictOptions(data);
    };

    getDistricts();
  }, []);

  const handleDistrictChange = async (value) => {
    const data = await fetchWards(value);
    setWardOptions(data);
  };

  const renderOptions = (options) =>
    options.map((option) => (
      <Option key={option.id} value={option.id}>
        {option.full_name}
      </Option>
    ));

  return (
    <Space.Compact block>
      <Select
        showSearch
        placeholder='Quận/huyện'
        style={{ width: '150px', height: '50px' }}
        optionFilterProp='children'
        onChange={handleDistrictChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {renderOptions(districtOptions)}
      </Select>
      <Select
        showSearch
        placeholder='Phường/xã'
        style={{ width: '150px', height: '50px' }}
        optionFilterProp='children'
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {renderOptions(wardOptions)}
      </Select>
      <Select
        showSearch
        style={{ width: '150px', height: '50px' }}
        placeholder='Tên sân'
      />
      <DatePicker
        placeholder='Ngày'
        disabledDate={(current) =>
          current &&
          (current.isBefore(moment().startOf('day')) ||
            current.isAfter(moment().add(7, 'days').startOf('day')))
        }
      />
      <Select
        defaultValue='Khung giờ'
        style={{ width: '150px', height: '50px' }}
      >
        <Option value='6'>6:00</Option>
        <Option value='7'>7:00</Option>
        <Option value='7'>9:00</Option>
        <Option value='17'>13:00</Option>
        <Option value='17'>15:00</Option>
        <Option value='17'>17:00</Option>
      </Select>
      <Select
        defaultValue='Số giờ chơi'
        style={{ width: '150px', height: '50px' }}
      >
        <Option value='1'>1 giờ</Option>
        <Option value='1.5'>1.5 giờ</Option>
        <Option value='2'>2 giờ</Option>
        <Option value='2.5'>2.5 giờ</Option>
        <Option value='3'>3 giờ</Option>
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
