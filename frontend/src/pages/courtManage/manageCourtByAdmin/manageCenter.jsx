// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { Table, Tag, Button, Modal, Descriptions, Divider } from "antd";
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
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Tên sân">
              {selectedCenter.centerName}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ sân">
              {selectedCenter.location}
            </Descriptions.Item>
            <Descriptions.Item label="Giờ mở cửa">
              {selectedCenter.openTime}
            </Descriptions.Item>
            <Descriptions.Item label="Giờ đóng cửa">
              {selectedCenter.closeTime}
            </Descriptions.Item>
            <Descriptions.Item label="Số sân hiện có">
              {selectedCenter.courtCount}
            </Descriptions.Item>
            <Descriptions.Item label="Hình ảnh">
              <img
                src={
                  Array.isArray(selectedCenter.images)
                    ? selectedCenter.images[0]
                    : selectedCenter.images
                }
                alt="Center"
                style={{ width: "50px", height: "50px" }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Dịch vụ">
              {selectedCenter.services.map((service, index) => (
                <Tag color="blue" key={index}>
                  {service}
                </Tag>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Quy tắc">
              {selectedCenter.rule}
            </Descriptions.Item>
            <Descriptions.Item label="Giá">
              {selectedCenter.price.map((item, index) => (
                <div key={index}>
                  <Divider />
                  <p>
                    <b>Giá tiền:</b> {item.price}
                  </p>
                  <p>
                    <b>Giờ bắt đầu:</b> {item.startTime}
                  </p>
                  <p>
                    <b>Giờ kết thúc:</b> {item.endTime}
                  </p>
                  <p>
                    <b>Loại giờ:</b> {item.scheduleType}
                  </p>
                </div>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {(() => {
                // Ánh xạ từng giá trị status từ tiếng Anh sang tiếng Việt và màu sắc tương ứng
                const statusMap = {
                  pending: { label: "Chưa được duyệt", color: "#fa541c" }, // Màu đỏ cam
                  accepted: { label: "Đã chấp nhận", color: "#2f54eb" }, // Màu xanh dương
                  active: { label: "Đang hoạt động", color: "#52c41a" }, // Màu xanh lá cây
                  expired: { label: "Hết hạn", color: "#bfbfbf" }, // Màu xám nhạt
                  rejected: { label: "Đã từ chối", color: "#f5222d" }, // Màu đỏ
                };

                // Lấy giá trị status từ selectedCenter
                const status = selectedCenter.status;

                // Trả về component Tag với màu và nội dung trạng thái tương ứng
                const { label, color } = statusMap[status] || {
                  label: status,
                  color: "#d9d9d9",
                }; // Màu mặc định

                return <Tag color={color}>{label}</Tag>;
              })()}
            </Descriptions.Item>

            <Descriptions.Item
              label="Gói đăng ký"
              style={{
                display: selectedCenter.status === "pending" ? "none" : "block",
              }}
            >
              {selectedCenter.subscriptions.map((item, index) => (
                <div key={index}>
                  <Divider />
                  <p>
                    <b>Ngày kích hoạt:</b>{" "}
                    {new Date(item.activationDate).toLocaleDateString()}
                  </p>
                  <p>
                    <b>Ngày hết hạn:</b>{" "}
                    {new Date(item.expiryDate).toLocaleDateString()}
                  </p>
                  <p>
                    <b>Gói: </b> {item.packageId.name}
                  </p>
                  <p>
                    <b>Giá tiền:</b> {item.packageId.price}
                  </p>
                </div>
              ))}
            </Descriptions.Item>

            <Descriptions.Item label="Ngày tạo">
              {new Date(selectedCenter.createdAt).toLocaleDateString()}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      )}
    </div>
  );
};

export default ManageCenter;
