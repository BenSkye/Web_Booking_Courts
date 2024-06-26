// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Descriptions, Spin, Alert } from 'antd';
import  getCenterPackageById  from '../../../services/admin/manageCenter'; // Import API function

// eslint-disable-next-line react/prop-types
const PackageDetails = ({ packageId }) => {
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await getCenterPackageById(packageId);
        setPackageDetails(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch package details');
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="Tên gói">{packageDetails.name}</Descriptions.Item>
      <Descriptions.Item label="Thời gian (tháng)">{packageDetails.durationMonths}</Descriptions.Item>
      <Descriptions.Item label="Giá tiền">{packageDetails.price}</Descriptions.Item>
    </Descriptions>
  );
};

export default PackageDetails;
