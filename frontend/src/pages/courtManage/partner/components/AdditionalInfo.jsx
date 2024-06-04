import React from "react";
import { Form, Input } from "antd";
const { TextArea } = Input;

const AdditionalInfo = () => (
  <Form.Item label="6. Quy định và giới thiệu">
    <Form.Item
      name="usagePolicy"
      label="Quy định sử dụng sân"
      rules={[{ required: true, message: "Quy định sử dụng sân là bắt buộc" }]}
    >
      <TextArea placeholder="Quy định sử dụng sân, Ví dụ: phải có giày thể thao thì mới được vào sân" />
    </Form.Item>
    <Form.Item
      name="courtIntro"
      label="Giới thiệu ngắn về trung tâm sân cầu lông"
    >
      <TextArea placeholder="nhập giới thiệu" rows={4} />
    </Form.Item>
  </Form.Item>
);

export default AdditionalInfo;
