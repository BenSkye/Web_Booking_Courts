import React from "react";
import { Form, Checkbox, Row, Col, Card } from "antd";
import {
  FaCar,
  FaHome,
  FaWifi,
  FaStore,
  FaRestroom,
  FaCoffee,
  FaTools,
  FaUser,
  FaFirstAid,
  FaShower,
  FaLock,
} from "react-icons/fa";

const services = [
  { value: "parking", label: "Bãi đỗ xe", icon: <FaCar /> },
  { value: "changingRoom", label: "Phòng thay đồ", icon: <FaHome /> },
  { value: "freeWifi", label: "Wifi miễn phí", icon: <FaWifi /> },
  { value: "sportsShop", label: "Quầy bán/thuê đồ thể thao", icon: <FaStore /> },
  { value: "toilet", label: "Nhà vệ sinh", icon: <FaRestroom /> },
  { value: "refreshments", label: "Quầy bán đồ ăn nhẹ và nước uống", icon: <FaCoffee /> },
  { value: "equipmentRental", label: "Dịch vụ cho thuê dụng cụ", icon: <FaTools /> },
  { value: "coaching", label: "Dịch vụ huấn luyện", icon: <FaUser /> },
  { value: "firstAid", label: "Dịch vụ sơ cứu, massage", icon: <FaFirstAid /> },
  { value: "showerFacilities", label: "Phòng tắm", icon: <FaShower /> },
  { value: "lockers", label: "Tủ đựng đồ cá nhân", icon: <FaLock /> },
];

const ServicesAndAmenities = () => (
  <Form.Item label="Dịch Vụ và Tiện Ích">
    <Form.Item name="services" label="Dịch Vụ">
      <Checkbox.Group>
        <Row gutter={[16, 16]}>
          {services.map((service) => (
            <Col span={8} key={service.value}>
              <Card style={{ textAlign: "center" }}>
                <Checkbox value={service.value}>
                  {service.icon} {service.label}
                </Checkbox>
              </Card>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </Form.Item>
  </Form.Item>
);

export default ServicesAndAmenities;
