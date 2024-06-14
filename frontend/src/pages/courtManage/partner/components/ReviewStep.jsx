import React from "react";
import { Card, Col, Row, List, Descriptions, Image } from "antd";

const ReviewStep = ({ formValues }) => {
  const { center, price } = formValues;

  return (
    <div style={{ padding: "20px" }}>
      <h3>Review your details</h3>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Thông tin bạn đã nhập" bordered={false}>
            <Descriptions column={1}>
              <Descriptions.Item label="Tên trung tâm">
                {center.centerName}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {center.location}
              </Descriptions.Item>
              <Descriptions.Item label="Giờ mở cửa">
                {center.openTime}
              </Descriptions.Item>
              <Descriptions.Item label="Giờ đóng cửa">
                {center.closeTime}
              </Descriptions.Item>
              <Descriptions.Item label="Số lượng sân đấu">
                {center.courtCount}
              </Descriptions.Item>
              <Descriptions.Item label="Quy định sử dụng sân">{center.rule}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Dịch vụ" bordered={false}>
            <List
              dataSource={center.services}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card title="Hình ảnh của sân" bordered={false}>
            <Image.PreviewGroup>
              {center.images.map((image, index) => (
                <Image key={index} width={100} height={100} src={image} />
              ))}
            </Image.PreviewGroup>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Giấy phép kinh doanh" bordered={false}>
            <Image.PreviewGroup>
              {center.imagesLicense.map((image, index) => (
                <Image key={index} width={100} height={100} src={image} />
              ))}
            </Image.PreviewGroup>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Card title="Chi tiết về giá cả" bordered={false}>
            <List
              dataSource={price}
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

export default ReviewStep;
