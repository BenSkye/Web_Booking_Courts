import React, { useContext, useEffect, useState } from "react";
import { Table, Tag, Button, Modal, Input, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import AuthContext from "../../../services/authAPI/authProvideAPI";
import { getAllCenterAPI } from "../../../services/centersAPI/getCenters";
import changeCenterStatus from "../../../services/admin/manageStatus";
import moment from "moment";

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
    setRejectionReason(record.rejectionReason || ""); 
    setIsModalVisible(true);
  };

  const handleOk = async () => {
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
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {Array.isArray(images) &&
            images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Center"
                style={{
                  width: '60px',
                  height: '60px',
                  marginRight: '8px',
                  borderRadius: '6px',
                  objectFit: 'cover',
                }}
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
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {services.map((service, index) => (
            <Tooltip title={service} key={index}>
              <Tag color="blue" style={{ margin: '4px', zIndex: 1 }}>
                {service}
              </Tag>
            </Tooltip>
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

        const colorMap = {
          pending: "#fa541c",
          accepted: "#2f54eb",
          active: "#52c41a",
          expired: "#bfbfbf",
          rejected: "#f5222d",
        };

        return (
          <Tag
            color={colorMap[status] || "#d9d9d9"}
            style={{ position: 'relative', zIndex: 2 }}
          >
            {statusMap[status]}
          </Tag>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => handleView(record)}
          style={{ margin: 0, borderRadius: '4px' }}
        >
          Xem
        </Button>
      ),
    },
  ];

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', padding: '20px', boxSizing: 'border-box', backgroundColor: '#f0f2f5' }}>
      <h1 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Quản lý sân</h1>
      <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
        <Table
          dataSource={centers}
          columns={columns}
          style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
          scroll={{ y: 'calc(100vh - 220px)' }}
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
              style={{ backgroundColor: '#f5222d', color: '#fff', borderRadius: '4px' }}
            >
              Hủy
            </Button>,
            <Button
              key="approve"
              type="primary"
              loading={confirmLoading}
              onClick={handleOk}
              style={{ backgroundColor: '#1890ff', color: '#fff', borderRadius: '4px' }}
            >
              Duyệt
            </Button>,
            <Button
              key="reject"
              type="danger"
              loading={confirmLoading}
              onClick={handleReject}
              style={{ backgroundColor: '#ff4d4f', color: '#fff', borderRadius: '4px' }}
            >
              Từ chối
            </Button>,
          ]}
        >
          <Table
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
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {Array.isArray(selectedCenter.images) &&
                      selectedCenter.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt="Center"
                          style={{
                            width: '60px',
                            height: '60px',
                            marginRight: '8px',
                            borderRadius: '6px',
                            objectFit: 'cover',
                            zIndex: 1,
                            position: 'relative',
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
                  <div style={{ marginBottom: '10px' }}>
                    {Object.values(selectedCenter.subscriptions.reduce((acc, subscription) => {
                      const key = subscription.packageId._id;
                      if (!acc[key]) {
                        acc[key] = {
                          ...subscription.packageId,
                          durationMonths: 0,
                          price: 0,
                        };
                      }
                      acc[key].durationMonths += subscription.packageId.durationMonths;
                      acc[key].price += subscription.packageId.price;
                      return acc;
                    }, {})).map((item, index) => (
                      <div key={index} style={{ marginBottom: '10px' }}>
                        <p><b>Thời gian:</b> {item.durationMonths} tháng</p>
                        <p><b>Giá tiền:</b> {item.price.toLocaleString('vi-VN')} VNĐ</p>
                        <p><b>Ngày kích hoạt:</b> {new Date(selectedCenter.subscriptions.find(sub => sub.packageId._id === item._id)?.activationDate).toLocaleDateString()}</p>
                        <p><b>Ngày kết thúc:</b> {new Date(selectedCenter.subscriptions.find(sub => sub.packageId._id === item._id)?.expiryDate).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                key: "8",
                property: "Giá",
                value: (
                  <div style={{ marginBottom: '10px' }}>
                    {selectedCenter.price.map((item, index) => (
                      <div key={index} style={{ marginBottom: '10px' }}>
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
                  <div style={{ display: 'flex', flexWrap: 'wrap', zIndex: 1 }}>
                    {selectedCenter.services.map((service, index) => (
                      <Tooltip title={service} key={index}>
                        <Tag color="blue" style={{ margin: '4px', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', zIndex: 1 }}>
                          {service}
                        </Tag>
                      </Tooltip>
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
                    style={{ marginTop: '10px', zIndex: 1 }}
                  />
                ),
              },
            ]}
            pagination={false}
            style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
          />
        </Modal>
      )}
    </div>
  );
};

export default ManageCenter;
