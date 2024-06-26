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
} from "antd";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getCenterByIdAPI } from "../../../services/partnerAPI";
import { updateCenter } from "../../../services/centersAPI/getCenters";
import Cookies from "js-cookie";
import ServicesAndAmenities from "../partner/components/ServicesAndAmenities";

const CourtManageUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [initialCourtCount, setInitialCourtCount] = useState(null);
  const [priceData, setPriceData] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("jwtToken");
      try {
        const result = await getCenterByIdAPI(id, token);
        form.setFieldsValue({
          ...result.data.center,
          openTime: moment(result.data.center.openTime, "HH:mm"),
          closeTime: moment(result.data.center.closeTime, "HH:mm"),
        });

        // Lưu giá trị cũ của courtCount
        setInitialCourtCount(result.data.center.courtCount);

        // Chuyển đổi hình ảnh thành file list
        if (result.data.center.images) {
          setFileList(
            result.data.center.images.map((url, index) => ({
              uid: index,
              name: `image-${index}`,
              status: "done",
              url,
            }))
          );
        }

        // Lưu dữ liệu giá
        setPriceData(result.data.center.price);

        // Lưu dữ liệu dịch vụ
        setSelectedServices(result.data.center.services);
      } catch (error) {
        console.error("API Error: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, form]);

  const onFinish = async (values) => {
    const token = Cookies.get("jwtToken");
    const formattedValues = {
      ...values,
      openTime: values.openTime ? values.openTime.format("HH:mm") : null,
      closeTime: values.closeTime ? values.closeTime.format("HH:mm") : null,
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

  const validateCourtCount = (_, value) => {
    if (value < initialCourtCount) {
      return Promise.reject(
        new Error("Số lượng sân đấu không được giảm so với dữ liệu cũ.")
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
      <Form.Item name="location" label="Địa chỉ trung tâm">
        <Input />
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
      <Form.Item name="openTime" label="Giờ mở cửa">
        <TimePicker
          format="HH:mm"
          disabledMinutes={() => [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37,
            38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
            55, 56, 57, 58, 59,
          ]}
          disabledHours={() => [0, 1, 2, 3, 4]}
        />
      </Form.Item>
      <Form.Item name="closeTime" label="Giờ đóng cửa">
        <TimePicker format="HH:mm" />
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
      <ServicesAndAmenities selectedServices={selectedServices} />{" "}
      {/* Thay thế thành phần dịch vụ */}
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
                  <Row gutter={16} style={{ width: "100%" }}>
                    <Col span={6}>
                      <Form.Item
                        name={[index, "price"]}
                        initialValue={item.price}
                      >
                        <Input addonBefore="Giá tiền:" suffix="VND" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        name={[index, "startTime"]}
                        initialValue={item.startTime}
                      >
                        <Input addonBefore="Giờ bắt đầu:" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        name={[index, "endTime"]}
                        initialValue={item.endTime}
                      >
                        <Input addonBefore="Giờ kết thúc:" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        name={[index, "scheduleType"]}
                        initialValue={item.scheduleType}
                      >
                        <Input addonBefore="Loại giờ:" />
                      </Form.Item>
                    </Col>
                  </Row>
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
