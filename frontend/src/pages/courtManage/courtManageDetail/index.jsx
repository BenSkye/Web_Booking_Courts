import React, { useEffect, useState } from 'react';
import { Descriptions, Image, List, Spin, Alert, Card, Badge } from 'antd';
import { useParams } from 'react-router-dom';
import { getFormDataByIdAPI } from '../../../services/partnerAPI';

const CourtManageDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFormDataByIdAPI(id);
        console.log("API Data: ", result);
        setData(result);
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
    return <Alert message="Error" description="Failed to fetch data." type="error" />;
  }

  if (!data) {
    return <Alert message="No Data" description="No data available for this ID." type="warning" />;
  }

  return (
    <Card title="Court Detail" bordered={false} style={{ maxWidth: 800, margin: 'auto' }}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Full Name">{data.fullName}</Descriptions.Item>
        <Descriptions.Item label="Phone">{data.phone}</Descriptions.Item>
        <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
        <Descriptions.Item label="Court Name">{data.courtName}</Descriptions.Item>
        <Descriptions.Item label="Court Address">{data.courtAddress}</Descriptions.Item>
        <Descriptions.Item label="Court Quantity">{data.courtQuantity}</Descriptions.Item>
        <Descriptions.Item label="Images">
          {data.images.map((image, index) => (
            <Image key={index} width={200} src={image.thumbUrl} style={{ marginRight: 8 }} />
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Services">
          <List
            dataSource={data.services}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Normal Hours">
          <List
            dataSource={data.nomalHours}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Normal Price">{data.nomalPrice}</Descriptions.Item>
        <Descriptions.Item label="Golden Hours">
          <List
            dataSource={data.goldenHours}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Golden Price">{data.goldenPrice}</Descriptions.Item>
        <Descriptions.Item label="Monthly Price">{data.monthPrice}</Descriptions.Item>
        <Descriptions.Item label="Hourly Purchase Price">{data.buyHourPrice}</Descriptions.Item>
        <Descriptions.Item label="Is Golden Hours">
          <Badge status={data.isGoldenHours ? "success" : "error"} text={data.isGoldenHours ? "Yes" : "No"} />
        </Descriptions.Item>
        <Descriptions.Item label="Is Monthly Price">
          <Badge status={data.isMonthPrice ? "success" : "error"} text={data.isMonthPrice ? "Yes" : "No"} />
        </Descriptions.Item>
        <Descriptions.Item label="Is Hourly Purchase Price">
          <Badge status={data.isBuyHourPrice ? "success" : "error"} text={data.isBuyHourPrice ? "Yes" : "No"} />
        </Descriptions.Item>
        <Descriptions.Item label="Usage Policy">{data.usagePolicy}</Descriptions.Item>
        <Descriptions.Item label="Court Intro">{data.courtIntro}</Descriptions.Item>
        <Descriptions.Item label="Approval Status">{data.approvalStatus}</Descriptions.Item>
        <Descriptions.Item label="Payment Status">{data.paymentStatus}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default CourtManageDetail;
