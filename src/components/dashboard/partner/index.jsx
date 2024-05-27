import React, { useState } from "react";
import {
  Form,
  Input,
  Checkbox,
  Button,
  Upload,
  message,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { TimePicker } from "antd";
const { TextArea } = Input;
import { useNavigate } from "react-router-dom";
import { submitForm } from "../../../services/partnerAPI/index.js";

function Partner() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Form values: ", values);
    console.log("Uploaded files: ", fileList);
    // Call API to submit form data
    submitForm(values)
      .then((response) => {
        message.success("Form submitted successfully!");
        navigate("/courtManage");
      })
      .catch((error) => {
        message.error("There was an error submitting the form");
        console.error(error);
      });
  };
  const handleUploadChange = ({ fileList }) => {
    form.setFieldsValue({ images: fileList }); // update form value
  };
  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage ? true : Upload.LIST_IGNORE; // return Upload.LIST_IGNORE if not image
  };

  const { RangePicker } = TimePicker;
  const validateRange = (_, value) => {
    if (!value || value.length !== 2) {
      return Promise.reject(new Error("Giờ hoạt động là bắt buộc"));
    }
    const [start, end] = value;
    if (end.diff(start, "hours") < 8) {
      return Promise.reject(
        new Error("Giờ kết thúc phải cách giờ khởi đầu ít nhất 8 tiếng")
      );
    }
    return Promise.resolve();
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
            name="fullName"
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
          {/* <Form.Item
            name="contactAddress"
            label="Địa chỉ liên lạc"
            rules={[
              { required: true, message: "Địa chỉ liên lạc là bắt buộc" },
            ]}
          >
            <Input placeholder="Địa chỉ liên lạc của bạn" />
          </Form.Item> */}
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
              {
                type: "number",
                min: 1,
                message: "Số lượng sân phải lớn hơn 0",
              },
            ]}
          >
            <InputNumber placeholder="Số lượng sân (nhập số)" />
          </Form.Item>

          {/* <Form.Item
            name="courtType"
            label="Loại sân"
            rules={[{ required: true, message: "Loại sân là bắt buộc" }]}
          >
            <Checkbox.Group>
              <Checkbox value="indoor">Sân trong nhà</Checkbox>
              <Checkbox value="outdoor">Sân ngoài trời</Checkbox>
            </Checkbox.Group>
          </Form.Item> */}
        </Form.Item>

        {/* Section 3: Hình ảnh khu sân cầu lông */}

        <Form.Item
          name="images"
          valuePropName="fileList"
          label="3. Hình ảnh khu sân cầu lông"
          extra="Hãy tải lên hình ảnh về khu sân cầu lông của bạn"
          rules={[
            {
              validator: (_, value) =>
                value && value.length > 0
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Hình ảnh sân của bạn là bắt buộc")
                    ),
            },
          ]}
        >
          <Upload
            listType="picture"
            onChange={handleUploadChange}
            beforeUpload={handleBeforeUpload} // use handleBeforeUpload
            multiple // allow multiple files
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
          <Form.Item name="otherService" label="Các dịch vụ khác">
            <Input placeholder="Các dịch vụ khác" />
          </Form.Item>
          <Form.Item
            name="openingHours"
            label="Giờ hoạt động của sân (ít nhất phải 8 giờ)"
            rules={[{ validator: validateRange }]}
          >
            <RangePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="rentalPrice"
            label="Bảng giá thuê sân (đồng/giờ)"
            rules={[
              { required: true, message: "Bảng giá thuê sân là bắt buộc" },
              {
                type: "number",
                min: 1,
                message: "Giá tiền phải lớn hơn 0",
              },
            ]}
          >
            <InputNumber placeholder="VD: 10000" />
          </Form.Item>
        </Form.Item>

        {/* Section 5: Chính Sách và Quy Định */}
        <Form.Item label="5. Chính Sách và Quy Định">
          {/* <Form.Item
            name="cancellationPolicy"
            label="Chính sách hủy đặt sân"
            rules={[
              { required: true, message: "Chính sách hủy đặt sân là bắt buộc" },
            ]}
          >
            <TextArea placeholder="Chính sách hủy đặt sân, Ví dụ: không được hoàn tiền nếu huỷ đặt sân" />
          </Form.Item> */}
          <Form.Item
            name="usagePolicy"
            label="Quy định sử dụng sân"
            rules={[
              { required: true, message: "Quy định sử dụng sân là bắt buộc" },
            ]}
          >
            <TextArea placeholder="Quy định sử dụng sân, Ví dụ: phải có giày thể thao thì mới được vào sân" />
          </Form.Item>

          {/* <Form.Item
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
          </Form.Item> */}
        </Form.Item>

        {/* Section 6: Thông Tin Bổ Sung Khác */}
        <Form.Item label="6. Thông Tin Bổ Sung Khác">
          <Form.Item
            name="courtIntro"
            label="Giới thiệu ngắn về khu sân cầu lông"
          >
            <TextArea placeholder="nhập giới thiệu" rows={4} />
          </Form.Item>
          {/* <Form.Item
            name="promotions"
            label="Chương trình khuyến mãi hoặc ưu đãi"
          >
            <TextArea placeholder="nhập chương trình khuyến mãi" rows={4} />
          </Form.Item> */}
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
