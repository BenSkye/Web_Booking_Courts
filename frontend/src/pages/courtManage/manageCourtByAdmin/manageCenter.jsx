// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { Table, Tag, Button, Modal, Input } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import AuthContext from "../../../services/authAPI/authProvideAPI";
import { getAllCenterAPI } from "../../../services/centersAPI/getCenters";
import changeCenterStatus from "../../../services/admin/manageStatus";
import moment from "moment"; // Import thư viện moment

const ManageCenter = () => {
  const { user } = useContext(AuthContext);
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const data = await getAllCenterAPI();
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
    setRejectionReason(record.rejectionReason || ""); // Load the rejection reason if it exists
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    console.log("Approved");
    setConfirmLoading(true);
    try {
      const currentStatus = selectedCenter.status;
      let nextStatus;

      if (currentStatus === "rejected") {
        nextStatus = "accepted";
      } else {
        const statusSequence = [
          "pending",
          "accepted",
          "active",
          "expired",
          "rejected",
        ];
        const currentIndex = statusSequence.indexOf(currentStatus);
        nextStatus = statusSequence[currentIndex + 1];
      }

      // When approving, ensure to preserve rejection reason if transitioning from rejected
      const updatedRejectionReason =
        nextStatus === "rejected" ? rejectionReason : "";

      await changeCenterStatus(
        selectedCenter._id,
        nextStatus,
        updatedRejectionReason
      );

      const updatedCenters = centers.map((center) =>
        center._id === selectedCenter._id
          ? {
              ...center,
              status: nextStatus,
              rejectionReason: updatedRejectionReason,
            }
          : center
      );
      setCenters(updatedCenters);

      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to approve center:", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleReject = async () => {
    console.log("Rejected");
    setConfirmLoading(true);
    try {
      const nextStatus = "rejected";
      await changeCenterStatus(
        selectedCenter._id,
        nextStatus,
        rejectionReason
      );

      const updatedCenters = centers.map((center) =>
        center._id === selectedCenter._id
          ? { ...center, status: nextStatus, rejectionReason }
          : center
      );
      setCenters(updatedCenters);

      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to reject center:", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setIsModalVisible(false);
  };

  const scheduleTypeMap = {
    GP: "Golden Price",
    NP: "Normal Price",
    MP: "Month Price",
    PP: "Package Price",
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
        <div>
          {Array.isArray(images) &&
            images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Center"
                style={{ width: "50px", height: "50px", marginRight: "5px" }}
              />
            ))}
        </div>
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
        const statusMap = {
          pending: "Chưa được duyệt",
          accepted: "Đã chấp nhận",
          active: "Đang hoạt động",
          expired: "Hết hạn",
          rejected: "Đã từ chối",
        };

        let color = "";
        switch (status) {
          case "pending":
            color = "#fa541c";
            break;
          case "accepted":
            color = "#2f54eb";
            break;
          case "active":
            color = "#52c41a";
            break;
          case "expired":
            color = "#bfbfbf";
            break;
          case "rejected":
            color = "#f5222d";
            break;
          default:
            color = "#d9d9d9";
        }

        return <Tag color={color}>{statusMap[status]}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"), // Format ngày tạo
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div>
          <Button icon={<EyeOutlined />} onClick={() => handleView(record)}>
            Xem
          </Button>
        </div>
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
          scroll={{ y: "calc(100vh - 150px)" }}
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
            <Button
              key="cancel"
              onClick={handleCancel}
              style={{ float: "left" }}
            >
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
            <Button
              key="reject"
              type="danger"
              loading={confirmLoading}
              onClick={handleReject}
            >
              Từ chối
            </Button>,
          ]}
        >
          <Table
            columns={[
              { title: "Thuộc tính", dataIndex: "property", key: "property" },
              { title: "Giá trị", dataIndex: "value", key: "value" },
            ]}
            dataSource={[
              {
                key: "1",
                property: "Tên sân",
                value: selectedCenter.centerName,
              },
              {
                key: "2",
                property: "Địa chỉ sân",
                value: selectedCenter.location,
              },
              {
                key: "3",
                property: "Giờ mở cửa",
                value: selectedCenter.openTime,
              },
              {
                key: "4",
                property: "Giờ đóng cửa",
                value: selectedCenter.closeTime,
              },
              {
                key: "5",
                property: "Số sân hiện có",
                value: selectedCenter.courtCount,
              },
              {
                key: "6",
                property: "Hình ảnh",
                value: (
                  <div>
                    {Array.isArray(selectedCenter.images) &&
                      selectedCenter.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt="Center"
                          style={{
                            width: "50px",
                            height: "50px",
                            marginRight: "5px",
                          }}
                        />
                      ))}
                  </div>
                ),
              },
              {
                key: "7",
                property: "Gói đăng ký",
                value: (
                  <div>
                    {selectedCenter.subscriptions.map((subscription, index) => (
                      <div key={index}>
                        <p><b>Thời gian:</b> {subscription.packageId.durationMonths} tháng</p>
                        <p><b>Giá tiền:</b> {subscription.packageId.price} VNĐ</p>
                        <p><b>Ngày kích hoạt:</b> {new Date(subscription.activationDate).toLocaleDateString()}</p>
                        <p><b>Ngày kết thúc:</b> {new Date(subscription.expiryDate).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                key: "8",
                property: "Giá",
                value: (
                  <div>
                    {selectedCenter.price.map((item, index) => (
                      <div key={index}>
                        <p><b>Giá tiền:</b> {item.price}</p>
                        <p><b>Giờ bắt đầu:</b> {item.startTime}</p>
                        <p><b>Giờ kết thúc:</b> {item.endTime}</p>
                        <p><b>Loại giờ:</b> {scheduleTypeMap[item.scheduleType]}</p>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                key: "9",
                property: "Dịch vụ",
                value: (
                  <div>
                    {selectedCenter.services.map((service, index) => (
                      <Tag color="blue" key={index}>
                        {service}
                      </Tag>
                    ))}
                  </div>
                ),
              },
              {
                key: "10",
                property: "Trạng thái",
                value: selectedCenter.status,
              },
              {
                key: "11",
                property: "Lý do từ chối",
                value: (
                  <Input
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    disabled={selectedCenter.status === "rejected"}
                  />
                ),
              },
            ]}
            pagination={false}
          />
        </Modal>
      )}
    </div>
  );
};

export default ManageCenter;
