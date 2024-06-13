import React, { useEffect, useState } from "react";
import {
  Descriptions,
  Image,
  List,
  Spin,
  Alert,
  Card,
  Badge,
  Row,
  Col,
} from "antd";
import { useParams } from "react-router-dom";
import { getCenterByIdAPI } from "../../../services/partnerAPI";
import Cookies from "js-cookie";
const CourtManageDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("jwtToken");
      try {
        const result = await getCenterByIdAPI(id, token);
        console.log("API Data: ", result.data.center);
        setData(result.data.center);
      } catch (error) {
        console.error("API Error: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return (
      <Alert message="Error" description="Failed to fetch data." type="error" />
    );
  }

  if (!data) {
    return (
      <Alert
        message="No Data"
        description="No data available for this ID."
        type="warning"
      />
    );
  }

  return (
    // <Card
    //   title="Court Detail"
    //   bordered={false}
    //   style={{ maxWidth: 800, margin: "auto" }}
    // >
    <div>
      <h1>Chi tiết về sân đấu của bạn</h1>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Tên trung tâm">
          {data.centerName}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ trung tâm">
          {data.location}
        </Descriptions.Item>
        <Descriptions.Item label="Số lượng sân dấu">
          {data.courtCount}
        </Descriptions.Item>
        <Descriptions.Item label="Quy định sử dụng sân">{data.rule}</Descriptions.Item>
        <Descriptions.Item label="Giờ mở cửa">{data.openTime}</Descriptions.Item>
        <Descriptions.Item label="Giờ đóng cửa">
          {data.closeTime}
        </Descriptions.Item>
        <Descriptions.Item label="Hình ảnh sân">
          {data.images.map((image, index) => (
            <Image
              key={index}
              width={200}
              height={200}
              src={image}
              style={{ marginRight: 8 }}
            />
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Dịch vụ">
          <List
            dataSource={data.services}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Descriptions.Item>
      </Descriptions>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Card title="Chi tiết về giá" bordered={false}>
            <List
              dataSource={data.price}
              renderItem={(item) => (
                <List.Item>
                  <Descriptions column={1} bordered>
                    <Descriptions.Item label="Giá tiền">
                      {item.price}
                    </Descriptions.Item>
                    <Descriptions.Item label="Giờ bắt đầu">
                      {item.startTime}
                    </Descriptions.Item>
                    <Descriptions.Item label="Giờ kết thúc">
                      {item.endTime}
                    </Descriptions.Item>
                    <Descriptions.Item label="Loại giờ">
                      {item.scheduleType}
                    </Descriptions.Item>
                  </Descriptions>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CourtManageDetail;
