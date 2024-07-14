import { useState, useEffect } from "react";
import { Space, Select, Button, Tooltip, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  fetchDistricts,
  fetchWards,
} from "@/services/District_ward-API/districtWardAPI";
import { HCM_ID } from "@/utils/constants";

const { Option } = Select;

export default function SearchBar({ getQuery }) {
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [District, setDistrict] = useState(null);
  const [Ward, setWard] = useState(null);
  const [centerName, setCenterName] = useState(null);

  useEffect(() => {
    const getDistricts = async () => {
      const data = await fetchDistricts(HCM_ID);
      setDistrictOptions(data);
    };

    getDistricts();
  }, []);

  const handleDistrictChange = async (value, option) => {
    setDistrict({ id: value, name: option.children });
    const data = await fetchWards(value);
    setWardOptions(data);
    setWard(null); // Reset ward selection when district changes
  };

  const handleWardChange = (value, option) => {
    setWard({ id: value, name: option.children });
  };

  const handleCenterNameChange = (event) => {
    console.log("event", event.target.value);
    setCenterName(event.target.value.toString());
  };
  const handleSearch = () => {
    getQuery({
      District: District ? District.name : null,
      Ward: Ward ? Ward.name : null,
      centerName,
    });
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
        placeholder="Quận/huyện"
        style={{ width: "200px", height: "50px" }}
        optionFilterProp="children"
        onChange={handleDistrictChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {renderOptions(districtOptions)}
      </Select>
      <Select
        showSearch
        placeholder="Phường/xã"
        style={{ width: "200px", height: "50px" }}
        optionFilterProp="children"
        onChange={handleWardChange}
        value={Ward ? Ward.id : null}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {renderOptions(wardOptions)}
      </Select>
      <Input
        style={{ width: "200px", height: "50px" }}
        placeholder="Tên sân"
        onChange={handleCenterNameChange}
      />
      <Tooltip title="search">
        <Button
          type="primary"
          shape="circle"
          icon={<SearchOutlined />}
          style={{ width: "50px", height: "50px" }}
          onClick={handleSearch}
        />
      </Tooltip>
    </Space.Compact>
  );
}
