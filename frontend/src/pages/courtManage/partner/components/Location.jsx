import { useState, useEffect } from 'react';
import { Space, Select, Input } from 'antd';
import { fetchDistricts, fetchWards } from '@/services/District_ward-API/districtWardAPI';
import { HCM_ID } from '@/utils/constants';

const { Option } = Select;

export default function Location({ onChange }) {
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [streetAddress, setStreetAddress] = useState('');

  useEffect(() => {
    const getDistricts = async () => {
      const data = await fetchDistricts(HCM_ID);
      setDistrictOptions(data);
    };

    getDistricts();
  }, []);

  const handleDistrictChange = async (value) => {
    const selectedDistrict = districtOptions.find(option => option.id === value);
    setSelectedDistrict(selectedDistrict);
    setSelectedWard(null); // reset ward selection when district changes
    const data = await fetchWards(value);
    setWardOptions(data);
    const fullAddress = `${streetAddress}, ${selectedDistrict.full_name}`;
    onChange(fullAddress);
  };

  const handleWardChange = (value) => {
    const selectedWard = wardOptions.find(option => option.id === value);
    setSelectedWard(selectedWard);
    const fullAddress = `${streetAddress}, ${selectedWard.full_name}, ${selectedDistrict.full_name}`;
    onChange(fullAddress);
  };

  const handleStreetChange = (e) => {
    setStreetAddress(e.target.value);
    const fullAddress = `${e.target.value}, ${selectedWard ? selectedWard.full_name : ''}, ${selectedDistrict ? selectedDistrict.full_name : ''}`;
    onChange(fullAddress);
  };

  const renderOptions = (options) =>
    options.map((option) => (
      <Option key={option.id} value={option.id}>
        {option.full_name}
      </Option>
    ));

  return (
    <Space direction="vertical">
      <Input
        placeholder="Số nhà và tên đường"
        value={streetAddress}
        onChange={handleStreetChange}
        style={{ width: '300px' }}
      />
      <Select
        showSearch
        placeholder="Quận/huyện"
        style={{ width: '150px' }}
        optionFilterProp="children"
        onChange={handleDistrictChange}
        value={selectedDistrict ? selectedDistrict.id : null}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {renderOptions(districtOptions)}
      </Select>
      <Select
        showSearch
        placeholder="Phường/xã"
        style={{ width: '150px' }}
        optionFilterProp="children"
        onChange={handleWardChange}
        value={selectedWard ? selectedWard.id : null}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
        disabled={!selectedDistrict} // disable ward select if no district is selected
      >
        {renderOptions(wardOptions)}
      </Select>
    </Space>
  );
}
