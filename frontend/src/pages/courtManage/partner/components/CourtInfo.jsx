import React from "react";
import { Form, Input, InputNumber } from "antd";

const CourtInfo = () => (
  <Form.Item label="2. Thông Tin Về Sân Cầu Lông">
    <Form.Item
      name="centerName"
      label="Tên trung tâm sân cầu lông"
      rules={[{ required: true, message: "Tên trung tâm sân cầu lông là bắt buộc" }]}
    >
      <Input placeholder="Tên trung tâm sân cầu lông" />
    </Form.Item>
    <Form.Item
      name="location"
      label="Địa chỉ cụ thể"
      rules={[{ required: true, message: "Địa chỉ cụ thể là bắt buộc" }]}
    >
      <Input placeholder="Địa chỉ cụ thể của sân" />
    </Form.Item>
    <Form.Item
      name="courtCount"
      label="Số lượng sân cầu lông"
      rules={[{ required: true, message: "Số lượng sân là bắt buộc" }, { type: "number", min: 1, message: "Số lượng sân phải lớn hơn 0" }]}
    >
      <InputNumber placeholder="Số lượng sân (nhập số)" />
    </Form.Item>
  </Form.Item>
);

export default CourtInfo;
