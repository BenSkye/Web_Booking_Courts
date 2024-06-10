import React, { useState } from "react";
import { Form, Input, TimePicker, InputNumber, Upload, Button, Progress } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ServicesAndAmenities from "./ServicesAndAmenities"; // Đảm bảo đường dẫn đến ServicesAndAmenities đúng
import MyLocationMap from "../../../../utils/map/index";

const CenterDetailsForm = ({
  form,
  handleUploadCourt,
  handleUploadLicense,
  fileListCourt,
  fileListLicense,
  setFileListCourt,
  setFileListLicense,
  uploadProgressCourt, // Add this prop
  uploadProgressLicense // Add this prop
}) => {
  const [address, setAddress] = useState(form.getFieldValue("location") || "");

  const handleAddressChange = (e) => {
    const newAddress = e.target.value;
    form.setFieldsValue({ location: newAddress });
    setAddress(newAddress);
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
        <Input onChange={handleAddressChange} />
      </Form.Item>
      <Form.Item>
        <MyLocationMap address={address} />
      </Form.Item>
      <Form.Item
        label="Giờ mở cửa"
        name="openTime"
        rules={[{ required: true, message: "Hãy nhập giờ mở cửa" }]}
      >
        <TimePicker
          format={"HH:mm"}
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
        label="Số lượng sân của trung tâm"
        name="courtCount"
        rules={[{ required: true, message: "Hãy nhập số lượng sân, số lượng sân phải lớn hơn 0" }]}
      >
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item
        label="Hình ảnh của sân"
        name="images"
        rules={[
          {
            required: true,
            message: "Bạn chưa đăng hình ảnh của sân( từ 3 ảnh trở lên)",
          },
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
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        {uploadProgressCourt > 0 && (
          <Progress percent={uploadProgressCourt} />
        )}
        {fileListCourt.map((file) => (
          <div key={file.uid}>{file.name}</div>
        ))}
      </Form.Item>
      
      <Form.Item
        label="Giấy phép kinh doanh hoặc giấy phép hoạt động"
        name="imagesLicense"
        rules={[
          {
            required: true,
            message:
              "Bạn chưa đăng hình ảnh giấy phép kinh doanh hoặc giấy phép hoạt động",
          },
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
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        {uploadProgressLicense > 0 && (
          <Progress percent={uploadProgressLicense} />
        )}
      </Form.Item>
      <Form.Item
        label="Dịch vụ và tiện ích"
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
