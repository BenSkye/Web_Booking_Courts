import React, { useState } from "react";
import { Form, Input, Checkbox, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import 'antd/dist/antd.css';
import { TimePicker } from "antd";
const { TextArea } = Input;
import { useNavigate } from "react-router-dom";
import { number } from "prop-types";

function Partner() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const handleUploadChange = ({ fileList }) => setFileList(fileList);

  const onFinish = (values) => {
    console.log("Form values: ", values);
    console.log("Uploaded files: ", fileList);
    message.success("Form submitted successfully!");
    navigate("/registerPackageCourt");
  };

  return (
    <div className="App">
      <h1>Đăng ký trở thành cộng tác viên</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          services: [],
          courtType: [],
          paymentMethods: [],
        }}
      >
        {/* Section 1: Thông Tin Cá Nhân và Liên Hệ */}
        <Form.Item label="1. Thông Tin Cá Nhân và Liên Hệ">
          <Form.Item
            name="fullname"
            label="Họ tên"
            rules={[{ required: true, message: "Họ tên là bắt buộc" }]}
          >
            <Input placeholder="Họ và tên của bạn" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Số điện thoại là bắt buộc" },
              { min: 10, message: "Số điện thoại phải có ít nhất 10 chữ số" },
              { max: 11, message: "Số điện thoại không được quá 11 chữ số" },
              {
                pattern: /^[0-9]+$/,
                message: "Số điện thoại chỉ được chứa số",
              },
            ]}
          >
            <Input placeholder="Số điện thoại của bạn" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Địa chỉ email"
            rules={[
              { required: true, message: "Email là bắt buộc" },
              { type: "email", message: "Địa chỉ email không hợp lệ" },
            ]}
          >
            <Input type="email" placeholder="Địa chỉ email của bạn" />
          </Form.Item>
          <Form.Item
            name="contactAddress"
            label="Địa chỉ liên lạc"
            rules={[
              { required: true, message: "Địa chỉ liên lạc là bắt buộc" },
            ]}
          >
            <Input placeholder="Địa chỉ liên lạc của bạn" />
          </Form.Item>
        </Form.Item>

        {/* Section 2: Thông Tin Về Sân Cầu Lông */}
        <Form.Item label="2. Thông Tin Về Sân Cầu Lông">
          <Form.Item
            name="courtName"
            label="Tên khu sân cầu lông"
            rules={[
              { required: true, message: "Tên khu sân cầu lông là bắt buộc" },
            ]}
          >
            <Input placeholder="Tên khu sân cầu lông" />
          </Form.Item>
          <Form.Item
            name="courtAddress"
            label="Địa chỉ cụ thể"
            rules={[{ required: true, message: "Địa chỉ cụ thể là bắt buộc" }]}
          >
            <Input placeholder="Địa chỉ cụ thể của sân" />
          </Form.Item>
          <Form.Item
            name="courtQuantity"
            label="Số lượng sân cầu lông"
            rules={[
              { required: true, message: "Số lượng sân là bắt buộc" },
              { type: number, message: "Số lượng sân phải là số" },
            ]}
          >
            <Input type="number" placeholder="Số lượng sân (nhập số)" />
          </Form.Item>
          <Form.Item
            name="courtType"
            label="Loại sân"
            rules={[{ required: true, message: "Loại sân là bắt buộc" }]}
          >
            <Checkbox.Group>
              <Checkbox value="indoor">Sân trong nhà</Checkbox>
              <Checkbox value="outdoor">Sân ngoài trời</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Form.Item>

        {/* Section 3: Hình ảnh khu sân cầu lông */}
        <Form.Item
          label="3. Hình ảnh khu sân cầu lông"
          extra="Hãy tải lên hình ảnh về khu sân cầu lông của bạn"
        >
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        {/* Section 4: Dịch Vụ và Tiện Ích */}
        <Form.Item label="4. Dịch Vụ và Tiện Ích">
          <Form.Item name="services" label="Dịch Vụ">
            <Checkbox.Group>
              <Checkbox value="parking">Bãi đỗ xe</Checkbox>
              <Checkbox value="changingRoom">Phòng thay đồ</Checkbox>
              <Checkbox value="freeWifi">Wifi miễn phí</Checkbox>
              <Checkbox value="sportsShop">Quầy bán/thuê đồ thể thao</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item name="otherService" label="Khác">
            <Input placeholder="Khác" />
          </Form.Item>
          <Form.Item
            name="openingHours"
            label="Giờ hoạt động của sân"
            rules={[{ required: true, message: "Giờ hoạt động là bắt buộc" }]}
          >
            <TimePicker.RangePicker />
          </Form.Item>
          <Form.Item
            name="rentalPrice"
            label="Bảng giá thuê sân (ngàn/giờ)"
            rules={[
              { required: true, message: "Bảng giá thuê sân là bắt buộc" },
            ]}
          >
            <Input placeholder="Bảng giá thuê sân (ngàn/giờ)" />
          </Form.Item>
        </Form.Item>

        {/* Section 5: Chính Sách và Quy Định */}
        <Form.Item label="5. Chính Sách và Quy Định">
          <Form.Item
            name="cancellationPolicy"
            label="Chính sách hủy đặt sân"
            rules={[
              { required: true, message: "Chính sách hủy đặt sân là bắt buộc" },
            ]}
          >
            <Input placeholder="Chính sách hủy đặt sân" />
          </Form.Item>
          <Form.Item
            name="usagePolicy"
            label="Quy định sử dụng sân"
            rules={[
              { required: true, message: "Quy định sử dụng sân là bắt buộc" },
            ]}
          >
            <Input placeholder="Quy định sử dụng sân" />
          </Form.Item>
          <Form.Item
            name="paymentMethods"
            label="Thông tin thanh toán"
            rules={[
              { required: true, message: "Thông tin thanh toán là bắt buộc" },
            ]}
          >
            <Checkbox.Group>
              <Checkbox value="bankTransfer">Chuyển khoản ngân hàng</Checkbox>
              <Checkbox value="eWallet">Ví điện tử</Checkbox>
              <Input placeholder="các thanh toán khác" />
            </Checkbox.Group>
          </Form.Item>
        </Form.Item>

        {/* Section 6: Thông Tin Bổ Sung Khác */}
        <Form.Item label="6. Thông Tin Bổ Sung Khác">
          <Form.Item
            name="courtIntro"
            label="Giới thiệu ngắn về khu sân cầu lông"
          >
            <TextArea placeholder="nhập giới thiệu" rows={4} />
          </Form.Item>
          <Form.Item
            name="promotions"
            label="Chương trình khuyến mãi hoặc ưu đãi"
          >
            <TextArea placeholder="nhập chương trình khuyến mãi" rows={4} />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Hoàn thành (tạo sân cầu lông đầu tiên của bạn)
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Partner;
