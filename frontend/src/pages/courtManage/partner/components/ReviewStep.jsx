import React from "react";
import { Card, Col, Row, List, Descriptions, Image } from "antd";

const ReviewStep = ({ formValues }) => {
  const { center, price } = formValues;

  return (
    <div style={{ padding: "20px" }}>
      <h3>Review your details</h3>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Center Details" bordered={false}>
            <Descriptions column={1}>
              <Descriptions.Item label="Center Name">
                {center.centerName}
              </Descriptions.Item>
              <Descriptions.Item label="Location">
                {center.location}
              </Descriptions.Item>
              <Descriptions.Item label="Open Time">
                {center.openTime}
              </Descriptions.Item>
              <Descriptions.Item label="Close Time">
                {center.closeTime}
              </Descriptions.Item>
              <Descriptions.Item label="Court Count">
                {center.courtCount}
              </Descriptions.Item>
              <Descriptions.Item label="Rule">{center.rule}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Services" bordered={false}>
            <List
              dataSource={center.services}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card title="Images" bordered={false}>
            <Image.PreviewGroup>
              {center.images.map((image, index) => (
                <Image key={index} width={100} height={100} src={image} />
              ))}
            </Image.PreviewGroup>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Images License" bordered={false}>
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
          <Card title="Pricing Details" bordered={false}>
            <List
              dataSource={price}
              renderItem={(item) => (
                <List.Item>
                  <Descriptions column={1} bordered>
                    <Descriptions.Item label="Price">
                      {item.price}
                    </Descriptions.Item>
                    <Descriptions.Item label="Start Time">
                      {item.startTime}
                    </Descriptions.Item>
                    <Descriptions.Item label="End Time">
                      {item.endTime}
                    </Descriptions.Item>
                    <Descriptions.Item label="Schedule Type">
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
