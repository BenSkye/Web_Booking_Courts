import React, { useState } from "react";
import {
  Form,
  Input,
  Checkbox,
  Button,
  Upload,
  message,
  InputNumber,
  TimePicker,
  Card,
  Row,
  Col,
} from "antd";

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
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { submitForm } from "../../../services/partnerAPI/index.js";

const { TextArea } = Input;
const { RangePicker } = TimePicker;

function Partner() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [isFixedScheduleChecked, setIsFixedScheduleChecked] = useState(false);
  const [isBuyHourChecked, setIsBuyHourChecked] = useState(false);
  const [isGoldenHourChecked, setIsGoldenHourChecked] = useState(false);

  const onFinish = async (values) => {
    setSubmitting(true);
    console.log("Form values: ", values);
    console.log("Uploaded files: ", fileList);

    // Convert file objects to Base64 strings or prepare FormData
    const images = await Promise.all(
      fileList.map((file) => getBase64(file.originFileObj))
    );

    // Add default values for approvalStatus and paymentStatus
    const updatedValues = {
      ...values,
      approvalStatus: "Chờ đợi phê duyệt",
      paymentStatus: "Chờ thanh toán",
    };

    // Call API to submit form data
    submitForm(updatedValues)
      .then((response) => {
        message.success("Form submitted successfully!");
        navigate("/courtManage");
      })
      .catch((error) => {
        message.error("There was an error submitting the form");
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false); // Enable the button again
      });
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    form.setFieldsValue({ images: fileList });
  };

  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage ? true : Upload.LIST_IGNORE;
  };

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

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const services = [
    { value: "parking", label: "Bãi đỗ xe", icon: <FaCar /> },
    { value: "changingRoom", label: "Phòng thay đồ", icon: <FaHome /> },
    { value: "freeWifi", label: "Wifi miễn phí", icon: <FaWifi /> },
    {
      value: "sportsShop",
      label: "Quầy bán/thuê đồ thể thao",
      icon: <FaStore />,
    },
    { value: "toilet", label: "Nhà vệ sinh", icon: <FaRestroom /> },
    {
      value: "refreshments",
      label: "Quầy bán đồ ăn nhẹ và nước uống",
      icon: <FaCoffee />,
    },
    {
      value: "equipmentRental",
      label: "Dịch vụ cho thuê dụng cụ",
      icon: <FaTools />,
    },
    { value: "coaching", label: "Dịch vụ huấn luyện", icon: <FaUser /> },
    {
      value: "firstAid",
      label: "Dịch vụ sơ cứu, massage",
      icon: <FaFirstAid />,
    },
    { value: "showerFacilities", label: "Phòng tắm", icon: <FaShower /> },
    { value: "lockers", label: "Tủ đựng đồ cá nhân", icon: <FaLock /> },
  ];

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
        </Form.Item>

        {/* Section 2: Thông Tin Về Sân Cầu Lông */}
        <Form.Item label="2. Thông Tin Về Sân Cầu Lông">
          <Form.Item
            name="courtName"
            label="Tên trung tâm sân cầu lông"
            rules={[
              {
                required: true,
                message: "Tên trung tâm sân cầu lông là bắt buộc",
              },
            ]}
          >
            <Input placeholder="Tên trung tâm sân cầu lông" />
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
        </Form.Item>

        {/* Section 3: Hình ảnh trung tâm sân cầu lông */}
        <Form.Item
          name="images"
          valuePropName="fileList"
          label="3. Hình ảnh trung tâm sân cầu lông"
          extra="Hãy tải lên hình ảnh về trung tâm sân cầu lông của bạn"
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
            beforeUpload={handleBeforeUpload}
            multiple
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        {/* Section 4: Dịch Vụ và Tiện Ích */}
        <Form.Item label="4. Dịch Vụ và Tiện Ích">
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

        {/* Section 5: Chính Sách và Quy Định */}
        <Form.Item label="5. Giờ hoạt động và giá tiền">
          <Form.Item>
            <h3>Giờ hoạt động</h3>
            <Form.Item
              name="nomalHours"
              label="Giờ hoạt động bình thường của sân (ít nhất phải 8 giờ)"
              rules={[{ validator: validateRange }]}
            >
              <RangePicker format="HH:mm" />
            </Form.Item>

            <Form.Item
              name="nomalPrice"
              label="Bảng giá thuê sân vào giờ bình thường (đồng/giờ)"
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

          {/* khung giờ vàng */}
          <Form.Item>
            <h3>Khung giờ vàng</h3>
            <Checkbox
              onChange={(e) => setIsGoldenHourChecked(e.target.checked)}
            >
              Đặt khung giờ vàng
            </Checkbox>
            {isGoldenHourChecked && (
              <Form.Item>
                <Form.Item
                  name="goldenHours"
                  label="Khung giờ vàng của sân (phải nằm trong giờ hoạt động bình thường)"
                  rules={[
                    {
                      validator: validateRange,
                    },
                  ]}
                >
                  <RangePicker format="HH:mm" />
                </Form.Item>

                <Form.Item
                  name="goldenPrice"
                  label="Bảng giá thuê sân vào khung giờ vàng (đồng/giờ)"
                  rules={[
                    {
                      required: true,
                      message: "Bảng giá thuê sân là bắt buộc",
                    },
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
            )}
          </Form.Item>

          {/* Đặt lịch cố định */}
          <Form.Item>
            <h3>Đặt lịch cố định trong tháng</h3>
            <Checkbox
              onChange={(e) => setIsFixedScheduleChecked(e.target.checked)}
            >
              Đặt lịch cố định
            </Checkbox>
            {isFixedScheduleChecked && (
              <Form.Item
                name="monthPrice"
                label="Bảng giá đặt sân lịch cố định (đồng/giờ vd 80000/h), người chơi đặt lịch trong tháng cố định sẽ chỉ trả 60k dù có đánh giờ vàng hay giờ thường"
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
            )}
          </Form.Item>

          <Form.Item>
            <h3>Mua giờ chơi</h3>
            <Checkbox onChange={(e) => setIsBuyHourChecked(e.target.checked)}>
              Mua giờ chơi
            </Checkbox>
            {isBuyHourChecked && (
              <Form.Item
                name="buyHourPrice"
                label="Bảng giá mua giờ chơi (đồng/giờ vd 80000/h), người chơi nếu mua giờ chơi sẽ có thể đặt bất kì giờ nào còn trống, nghĩa là nếu họ đặt trong giờ vàng thì họ sẽ chỉ mất số tiền của 1h chơi"
                rules={[
                  { required: true, message: "Bảng giá thuê sân là bắt buộc" },
                  {
                    type: "number",
                    min: 1,
                    message: "Giá tiền phải lớn hơn 0 và phải là số",
                  },
                ]}
              >
                <InputNumber placeholder="VD: 10000" />
              </Form.Item>
            )}
          </Form.Item>
        </Form.Item>
        {/* Section 6: Thông Tin Bổ Sung Khác */}
        <Form.Item label="6. Quy định và giới thiệu">
          <Form.Item
            name="usagePolicy"
            label="Quy định sử dụng sân"
            rules={[
              { required: true, message: "Quy định sử dụng sân là bắt buộc" },
            ]}
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="submit-btn"
            disabled={submitting}
          >
            Hoàn thành (tạo sân cầu lông đầu tiên của bạn)
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Partner;
