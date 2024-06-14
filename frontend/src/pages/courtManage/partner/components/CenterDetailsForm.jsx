import React, { useState } from "react";
import {
  Form,
  Input,
  TimePicker,
  InputNumber,
  Upload,
  Button,
  Progress,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ServicesAndAmenities from "./ServicesAndAmenities";
import MyLocationMap2 from "../../../../utils/map/MapForAddCourt";
import Location from "./Location";

const CenterDetailsForm = ({
  form,
  handleUploadCourt,
  handleUploadLicense,
  fileListCourt,
  fileListLicense,
  setFileListCourt,
  setFileListLicense,
  uploadProgressCourt,
  uploadProgressLicense,
}) => {
  const [openTime, setOpenTime] = useState(null);
  const [address, setAddress] = useState(form.getFieldValue("location") || "");
  const disabledHours = () => {
    if (!openTime) return [];
    const hours = [];
    for (let i = 0; i <= 24; i++) {
      if (i <= openTime.hour() || i < openTime.hour() + 8) {
        hours.push(i);
      }
    }
    return hours;
  };

  const handleLocationChange = (value) => {
    setAddress(value);
    form.setFieldsValue({ location: value });
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Tên trung tâm"
        name="centerName"
        rules={[{ required: true, message: "Hãy nhập tên trung tâm" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Địa chỉ"
        name="location"
        rules={[{ required: true, message: "Hãy nhập địa chỉ" }]}
      >
        <Location onChange={handleLocationChange} />
      </Form.Item>
      <Form.Item>
        <MyLocationMap2 address={address} />
      </Form.Item>
      <Form.Item
        label="Giờ mở cửa"
        name="openTime"
        rules={[{ required: true, message: "Hãy nhập giờ mở cửa" }]}
      >
        <TimePicker
          format={"HH:mm"}
          onChange={(time) => setOpenTime(time)}
          disabledMinutes={() => [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37,
            38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
            55, 56, 57, 58, 59,
          ]}
          disabledHours={() => [0, 1, 2, 3, 4]}
        />
      </Form.Item>
      <Form.Item
        label="Giờ đóng cửa"
        name="closeTime"
        rules={[{ required: true, message: "Hãy chọn giờ đóng cửa" }]}
      >
        <TimePicker
          format={"HH:mm"}
          disabledHours={disabledHours}
          disabledMinutes={() => [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37,
            38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
            55, 56, 57, 58, 59,
          ]}
        />
      </Form.Item>
      <Form.Item
        label="Số lượng sân của trung tâm"
        name="courtCount"
        rules={[
          {
            required: true,
            message: "Hãy nhập số lượng sân, số lượng sân phải lớn hơn 0",
          },
        ]}
      >
        <InputNumber min={1} />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Hình ảnh của sân"
            name="images"
            rules={[
              {
                required: true,
                message: "Bạn chưa đăng hình ảnh của sân",
              },
              () => ({
                validator(_, value) {
                  if (fileListCourt.length < 5) {
                    return Promise.reject(
                      new Error("Bạn phải đăng ít nhất 5 hình ảnh")
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Upload
              customRequest={handleUploadCourt}
              fileList={fileListCourt}
              onRemove={(file) => {
                setFileListCourt((prevList) =>
                  prevList.filter((item) => item.uid !== file.uid)
                );
              }}
              accept="image/*"
              multiple
              listType="picture-card"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            
            {uploadProgressCourt > 0 && (
              <Progress percent={uploadProgressCourt} />
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Giấy phép kinh doanh hoặc giấy phép hoạt động"
            name="imagesLicense"
            rules={[
              {
                required: true,
                message:
                  "Bạn chưa đăng hình ảnh giấy phép kinh doanh hoặc giấy phép hoạt động",
              },
              () => ({
                validator(_, value) {
                  if (fileListLicense.length < 1) {
                    return Promise.reject(
                      new Error("Bạn phải đăng ít nhất 1 hình ảnh")
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Upload
              customRequest={handleUploadLicense}
              fileList={fileListLicense}
              onRemove={(file) => {
                setFileListLicense((prevList) =>
                  prevList.filter((item) => item.uid !== file.uid)
                );
              }}
              accept="image/*"
              multiple
              listType="picture-card"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            {uploadProgressLicense > 0 && (
              <Progress percent={uploadProgressLicense} />
            )}
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Dịch vụ và tiện ích"
        name="services"
        rules={[{ required: true, message: "Hãy chọn các dịch vụ của bạn" }]}
      >
        <ServicesAndAmenities />
      </Form.Item>
      <Form.Item
        label="Quy định sử dụng sân"
        name="rule"
        rules={[{ required: true, message: "Hãy nhập quy định sử dụng sân" }]}
      >
        <Input.TextArea placeholder="Ví dụ: Phải có giày thể thao thì mới được chơi" />
      </Form.Item>
    </Form>
  );
};

export default CenterDetailsForm;
