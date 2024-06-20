import React, { useEffect, useState } from "react";
import { Form, Input, Button, Spin, Alert, Upload, Modal } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getCenterByIdAPI } from "../../../services/partnerAPI";
import { updateCenter } from "../../../services/centersAPI/getCenters";
import Cookies from "js-cookie";

const CourtManageUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("jwtToken");
      try {
        const result = await getCenterByIdAPI(id, token);
        form.setFieldsValue(result.data.center);

        // Chuyển đổi hình ảnh thành file list
        if (result.data.center.images) {
          setFileList(
            result.data.center.images.map((url, index) => ({
              uid: index,
              name: `image-${index}`,
              status: 'done',
              url,
            }))
          );
        }
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
    try {
      await updateCenter(id, values, token);
      navigate(`/courtManage/detail/${id}`);
    } catch (error) {
      console.error("Lỗi khi cập nhật trung tâm:", error);
    }
  };

  const showConfirm = (values) => {
    Modal.confirm({
      title: 'Xác nhận cập nhật',
      content: 'Bạn có chắc chắn muốn cập nhật thông tin trung tâm này?',
      okText: 'Cập nhật',
      cancelText: 'Hủy',
      onOk: () => onFinish(values),
    });
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
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
      <Form.Item name="courtCount" label="Số lượng sân đấu">
        <Input type="number" />
      </Form.Item>
      <Form.Item name="rule" label="Quy định sử dụng sân">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item name="openTime" label="Giờ mở cửa">
        <Input />
      </Form.Item>
      <Form.Item name="closeTime" label="Giờ đóng cửa">
        <Input />
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
      <Form.Item name="services" label="Dịch vụ">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="default" onClick={() => navigate(`/courtManage/detail/${id}`)}>
          Quay lại
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CourtManageUpdate;
