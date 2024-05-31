import React from "react";
import { Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CourtImages = ({ handleUploadChange, handleBeforeUpload }) => (
  <Form.Item
    name="images"
    valuePropName="fileList"
    label="3. Hình ảnh trung tâm sân cầu lông"
    extra="Hãy tải lên hình ảnh về trung tâm sân cầu lông của bạn"
    rules={[
      {
        validator: (_, value) =>
          value && value.length > 0 ? Promise.resolve() : Promise.reject(new Error("Hình ảnh sân của bạn là bắt buộc")),
      },
    ]}
  >
    <Upload
      listType="picture"
      onChange={handleUploadChange}
      beforeUpload={handleBeforeUpload}
      multiple
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  </Form.Item>
);

export default CourtImages;
