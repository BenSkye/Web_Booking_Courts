// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { Table, Tag, Button, Modal, Divider } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import AuthContext from "../../../services/authAPI/authProvideAPI";
import { getAllCenterAPI } from "../../../services/centersAPI/getCenters";
import changeCenterStatus from "../../../services/admin/manageStatus";
// eslint-disable-next-line react/prop-types

const ManageCenter = () => {
  const { user } = useContext(AuthContext);
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const data = await getAllCenterAPI();
        console.log("Fetched centers:", data);
        setCenters(data);
      } catch (error) {
        console.error("Failed to fetch centers:", error);
      }
    };

    fetchCenters();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleView = (record) => {
    setSelectedCenter(record);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    console.log("Approved");
    setConfirmLoading(true);
    try {
      // Determine the next status based on the current status
      const currentStatus = selectedCenter.status;
      const statusSequence = [
        "pending",
        "accepted",
        "active",
        "expired",
        "rejected",
      ];
      const currentIndex = statusSequence.indexOf(currentStatus);
      const nextStatus = statusSequence[currentIndex + 1];

      // Call API to change 
      console.log('selectedCenter',selectedCenter)
      await changeCenterStatus(selectedCenter._id, nextStatus);

      // Update local state after successful status change
      const updatedCenters = centers.map((center) =>
        center._id === selectedCenter._id
          ? { ...center, status: nextStatus }
          : center
      );
      setCenters(updatedCenters);

      // Close modal
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to approve center:", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Tên sân",
      dataIndex: "centerName",
      key: "centerName",
    },
    {
      title: "Địa chỉ sân",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Giờ mở cửa",
      dataIndex: "openTime",
      key: "openTime",
    },
    {
      title: "Giờ đóng cửa",
      dataIndex: "closeTime",
      key: "closeTime",
    },
    {
      title: "Số sân hiện có",
      dataIndex: "courtCount",
      key: "courtCount",
    },
    {
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <img
          src={Array.isArray(images) ? images[0] : images}
          alt="Center"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Dịch vụ",
      dataIndex: "services",
      key: "services",
      render: (services) => (
        <div>
          {services.map((service, index) => (
            <Tag color="blue" key={index}>
              {service}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        // Ánh xạ từng giá trị status từ tiếng Anh sang tiếng Việt
        const statusMap = {
          pending: "Chưa được duyệt",
          accepted: "Đã chấp nhận",
          active: "Đang hoạt động",
          expired: "Hết hạn",
          rejected: "Đã từ chối",
        };

        // Xác định màu sắc dựa trên giá trị status
        let color = "";
        switch (status) {
          case "pending":
            color = "#fa541c"; // Màu đỏ cam
            break;
          case "accepted":
            color = "#2f54eb"; // Màu xanh dương
            break;
          case "active":
            color = "#52c41a"; // Màu xanh lá cây
            break;
          case "expired":
            color = "#bfbfbf"; // Màu xám nhạt
            break;
          case "rejected":
            color = "#f5222d"; // Màu đỏ
            break;
          default:
            color = "#d9d9d9"; // Màu mặc định
        }

        // Trả về component Tag với màu và nội dung tương ứng
        return <Tag color={color}>{statusMap[status]}</Tag>;
      },
    },

    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Button icon={<EyeOutlined />} onClick={() => handleView(record)}>
          Xem
        </Button>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ flex: "0 1 auto" }}>Quản lý sân</h1>
      <div style={{ flex: "1 1 auto", overflow: "hidden" }}>
        <Table
          dataSource={centers}
          columns={columns}
          style={{ width: "100%", height: "100%" }}
          scroll={{ y: "calc(100vh - 150px)" }} // Adjust based on header height
        />
      </div>
  
      {selectedCenter && (
        <Modal
          title="Chi tiết trung tâm"
          visible={isModalVisible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Hủy
            </Button>,
            <Button
              key="approve"
              type="primary"
              loading={confirmLoading}
              onClick={handleOk}
            >
              Duyệt
            </Button>,
          ]}
        >
          <Table
            columns={[
              { title: "Thuộc tính", dataIndex: "property", key: "property" },
              { title: "Giá trị", dataIndex: "value", key: "value" },
            ]}
            dataSource={[
              { key: "1", property: "Tên sân", value: selectedCenter.centerName },
              { key: "2", property: "Địa chỉ sân", value: selectedCenter.location },
              { key: "3", property: "Giờ mở cửa", value: selectedCenter.openTime },
              { key: "4", property: "Giờ đóng cửa", value: selectedCenter.closeTime },
              { key: "5", property: "Số sân hiện có", value: selectedCenter.courtCount },
              { key: "6", property: "Hình ảnh", value: (
                <img
                  src={
                    Array.isArray(selectedCenter.images)
                      ? selectedCenter.images[0]
                      : selectedCenter.images
                  }
                  alt="Center"
                  style={{ width: "50px", height: "50px" }}
                />
              )},
              { key: "7", property: "Dịch vụ", value: (
                <div>
                  {selectedCenter.services.map((service, index) => (
                    <Tag color="blue" key={index}>
                      {service}
                    </Tag>
                  ))}
                </div>
              )},
              { key: "8", property: "Quy tắc", value: selectedCenter.rule },
              { key: "9", property: "Giá", value: (
                <div>
                  {selectedCenter.price.map((item, index) => (
                    <div key={index}>
                      <p><b>Giá tiền:</b> {item.price}</p>
                      <p><b>Giờ bắt đầu:</b> {item.startTime}</p>
                      <p><b>Giờ kết thúc:</b> {item.endTime}</p>
                      <p><b>Loại giờ:</b> {item.scheduleType}</p>
                    </div>
                  ))}
                </div>
              )},
              { key: "10", property: "Trạng thái", value: (
                (() => {
                  const statusMap = {
                    pending: "Chưa được duyệt",
                    accepted: "Đã chấp nhận",
                    active: "Đang hoạt động",
                    expired: "Hết hạn",
                    rejected: "Đã từ chối",
                  };
                  const status = selectedCenter.status;
                  const colorMap = {
                    pending: "#f  a541c",
                    accepted: "#2f54eb",
                    active: "#52c41a",
                    expired: "#bfbfbf",
                    rejected: "#f5222d",
                  };
                  return (
                    <Tag color={colorMap[status]}>{statusMap[status]}</Tag>
                  );
                })()
              )},
              { key: "11", property: "Ngày tạo", value: new Date(selectedCenter.createdAt).toLocaleDateString() },
            ]}
            pagination={false}
            bordered
            rowKey={(record) => record.key}
          />
        </Modal>
      )}
    </div>
  );
  
  
};

export default ManageCenter;
