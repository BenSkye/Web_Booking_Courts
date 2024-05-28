import React, { useEffect, useState } from 'react';
import { Descriptions, Image, List, Spin, Alert } from 'antd';
import { useParams } from 'react-router-dom'; // Import useParams
import { getFormDataByIdAPI } from '../../../services/partnerAPI';

const CourtManageDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFormDataByIdAPI(id);
        console.log("API Data: ", result); // Log dữ liệu để kiểm tra
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
    <Descriptions title="Court Detail" bordered>
      <Descriptions.Item label="Full Name">{data.fullName}</Descriptions.Item>
      <Descriptions.Item label="Phone">{data.phone}</Descriptions.Item>
      <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
      <Descriptions.Item label="Court Name">{data.courtName}</Descriptions.Item>
      <Descriptions.Item label="Court Address">{data.courtAddress}</Descriptions.Item>
      <Descriptions.Item label="Court Quantity">{data.courtQuantity}</Descriptions.Item>
      <Descriptions.Item label="Images">
        <Image width={200} src={data.thumbUrl} />
      </Descriptions.Item>
      <Descriptions.Item label="Services">
        <List
          dataSource={data.services}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Other Service">{data.otherService}</Descriptions.Item>
      <Descriptions.Item label="Opening Hours">
        <List
          dataSource={data.openingHours}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Rental Price">{data.rentalPrice}</Descriptions.Item>
      <Descriptions.Item label="Usage Policy">{data.usagePolicy}</Descriptions.Item>
      <Descriptions.Item label="Court Intro">{data.courtIntro}</Descriptions.Item>
      <Descriptions.Item label="Approval Status">{data.approvalStatus}</Descriptions.Item>
      <Descriptions.Item label="Payment Status">{data.paymentStatus}</Descriptions.Item>
    </Descriptions>
  );
};

export default CourtManageDetail;
