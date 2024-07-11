import { Card } from "antd";
import React, { useEffect, useState } from "react";

export default function CustomerInformationConfirm({ customerData }) {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    setCustomer(customerData);
    console.log("customerData:", customerData);
  }, [customerData]);

  return (
    <div>
      {" "}
      {customer?.userEmail && (
        <Card title="Thông tin khách hàng" bordered={false}>
          <p>Email: {customer?.userEmail}</p>
          {customer?.userName && <p>Họ và tên: {customer?.userName}</p>}
          {customer?.userPhone && <p>Số điện thoại: {customer?.userPhone}</p>}
        </Card>
      )}
    </div>
  );
}
