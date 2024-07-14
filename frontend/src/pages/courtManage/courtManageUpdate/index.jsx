import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Spin,
  Alert,
  Upload,
  Modal,
  Row,
  Col,
  Card,
  List,
  TimePicker,
  Select,
} from "antd";
import moment from "moment";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { getCenterByIdAPI } from "../../../services/partnerAPI";
import { updateCenter } from "../../../services/centersAPI/getCenters";
import Cookies from "js-cookie";
import ServicesAndAmenities from "../partner/components/ServicesAndAmenities";
import MyLocationMap2 from "../../../utils/map/MapForAddCourt";
import Location from "../partner/components/Location";

const CourtManageUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [imagesLicense, setImagesLicense] = useState([]);
  const [initialCourtCount, setInitialCourtCount] = useState(null);
  const [priceData, setPriceData] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [courtStatusValid, setCourtStatusValid] = useState(true);
  const [openTime, setOpenTime] = useState(null);
  const [closeTime, setCloseTime] = useState(null);
  const [address, setAddress] = useState(form.getFieldValue("location") || "");

  const handleLocationChange = (value) => {
    setAddress(value);
    form.setFieldsValue({ location: value });
  };

  const getScheduleTypeLabel = (scheduleType) => {
    switch (scheduleType) {
      case "MP":
        return "giá giờ chơi theo tháng";
      case "PP":
        return "giá gói giờ chơi";
      case "NP":
        return "giá giờ thường";
      case "GP":
        return "giá giờ vàng";
      default:
        return scheduleType;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("jwtToken");
      try {
        const result = await getCenterByIdAPI(id, token);
        const centerData = result.data.center;
        form.setFieldsValue({
          ...centerData,
          openTime: moment(centerData.openTime, "HH:mm"),
          closeTime: moment(centerData.closeTime, "HH:mm"),
        });

        setInitialCourtCount(centerData.courtCount);
        setOpenTime(moment(centerData.openTime, "HH:mm"));
        setCloseTime(moment(centerData.closeTime, "HH:mm"));
        setAddress(centerData.location);

        if (
          centerData.status !== "accepted" &&
          centerData.status !== "pending" &&
          centerData.status !== "rejected" &&
          centerData.status !== "expired"
        ) {
          setCourtStatusValid(false);
          return;
        }

        if (centerData.images) {
          setFileList(
            centerData.images.map((url, index) => ({
              uid: index,
              name: `image-${index}`,
              status: "done",
              url,
            }))
          );
        }
        if (centerData.imagesLicense) {
          setImagesLicense(
            centerData.imagesLicense.map((url, index) => ({
              uid: index,
              name: `image-${index}`,
              status: "done",
              url,
            }))
          );
        }

        setPriceData(centerData.price);
        setSelectedServices(centerData.services);
      } catch (error) {
        console.error("API Error: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, form]);

  if (!courtStatusValid) {
    return <Navigate to="/no-access" />;
  }

  const onFinish = async (values) => {
    const token = Cookies.get("jwtToken");
    const formattedValues = {
      ...values,
      openTime: openTime ? openTime.format("HH:mm") : null,
      closeTime: closeTime ? closeTime.format("HH:mm") : null,
    };
    try {
      await updateCenter(id, formattedValues, token);
      navigate(`/courtManage/detail/${id}`);
    } catch (error) {
      console.error("Lỗi khi cập nhật trung tâm:", error);
    }
  };

  const showConfirm = (values) => {
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật thông tin trung tâm này?",
      okText: "Cập nhật",
      cancelText: "Hủy",
      onOk: () => onFinish(values),
    });
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const handleUploadImagesLicenseChange = ({ fileList }) => {
    setImagesLicense(fileList);
  };

  const validateCourtCount = (_, value) => {
    if (value < initialCourtCount) {
      return Promise.reject(
        new Error("Số lượng sân đấu không được giảm so với dữ liệu cũ.")
      );
    }
    return Promise.resolve();
  };

  const validateTimeDifference = (_, value) => {
    if (!openTime || !closeTime) {
      return Promise.reject(
        new Error("Cả giờ mở cửa và giờ đóng cửa đều phải được nhập.")
      );
    }
    if (openTime && closeTime) {
      const duration = moment.duration(closeTime.diff(openTime)).asHours();
      if (duration < 8) {
        return Promise.reject(
          new Error(
            "Giờ đóng cửa và mở cửa phải cách nhau ít nhất 8 tiếng và giờ mở cửa không vượt quá giờ đóng cửa."
          )
        );
      }
    }
    return Promise.resolve();
  };

  const validatePrice = (_, value) => {
    if (value && value < 10000) {
      return Promise.reject(
        new Error("Giá tiền phải lớn hơn hoặc bằng 10,000 VND.")
      );
    }
    return Promise.resolve();
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return (
      <Alert message="Error" description="Failed to fetch data." type="error" />
    );
  }

  const shouldRenderTimeFields = (scheduleType) => {
    return !["NP", "PP", "MP"].includes(scheduleType);
  };

  const hours = [];
  for (let i = 5; i < 24; i++) {
    const hour = i < 10 ? `0${i}` : `${i}`;
    hours.push(`${hour}:00`);
    hours.push(`${hour}:30`);
  }
  return (
    <Form
      form={form}
      onFinish={(values) => showConfirm(values)}
      layout="vertical"
    >
      <h1>Cập nhật sân đấu của bạn</h1>
      <Form.Item name="centerName" label="Tên trung tâm">
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
        name="courtCount"
        label="Số lượng sân đấu"
        rules={[{ validator: validateCourtCount }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item name="rule" label="Quy định sử dụng sân">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="openTime"
        label="Giờ mở cửa"
        rules={[{ validator: validateTimeDifference }]}
      >
        <TimePicker
          format="HH:mm"
          disabledHours={() => [0, 1, 2, 3, 4]}
          value={openTime}
          onChange={(time) => setOpenTime(time)}
        />
      </Form.Item>
      <Form.Item
        name="closeTime"
        label="Giờ đóng cửa"
        rules={[{ validator: validateTimeDifference }]}
      >
        <TimePicker
          format="HH:mm"
          disabledHours={() => [0, 1, 2, 3, 4]}
          value={closeTime}
          onChange={(time) => setCloseTime(time)}
        />
      </Form.Item>
      <Form.Item name="images" label="Hình ảnh sân">
        <Upload
          fileList={fileList}
          onChange={handleUploadChange}
          listType="picture"
        >
          <Button>Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item name="imagesLicense" label="Hình ảnh giấy phép kinh doanh">
        <Upload
          fileList={imagesLicense}
          onChange={handleUploadImagesLicenseChange}
          listType="picture"
        >
          <Button>Upload</Button>
        </Upload>
      </Form.Item>
      <ServicesAndAmenities selectedServices={selectedServices} />{" "}
      <Form.List name="price">
        {(fields) => (
          <Card
            title="Chi tiết về giá"
            bordered={false}
            style={{ marginTop: "20px" }}
          >
            <List
              dataSource={priceData}
              renderItem={(item, index) => (
                <List.Item>
                  <Card bordered={true} style={{ width: "100%" }}>
                    <Form layout="vertical">
                      <Row gutter={16}>
                        <Col span={6}>
                          <Form.Item
                            name={[index, "price"]}
                            initialValue={item.price}
                            rules={[{ validator: validatePrice }]}
                            label="Giá tiền"
                          >
                            <Input type="number" min={10000} suffix="VND" />
                          </Form.Item>
                        </Col>
                        {shouldRenderTimeFields(item.scheduleType) && (
                          <>
                            <Col span={6}>
                              <Form.Item
                                name={[index, "startTime"]}
                                initialValue={item.startTime}
                                label="Giờ bắt đầu"
                              >
                                <Select>
                                  {hours.map((hour) => (
                                    <Option key={hour} value={hour}>
                                      {hour}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={6}>
                              <Form.Item
                                name={[index, "endTime"]}
                                initialValue={item.endTime}
                                label="Giờ kết thúc"
                              >
                                <Select>
                                  {hours.map((hour) => (
                                    <Option key={hour} value={hour}>
                                      {hour}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                        <Col span={6}>
                          <Form.Item label="Loại giá">
                            <span>
                              {getScheduleTypeLabel(item.scheduleType)}
                            </span>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          type="default"
          onClick={() => navigate(`/courtManage/detail/${id}`)}
        >
          Quay lại
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CourtManageUpdate;
