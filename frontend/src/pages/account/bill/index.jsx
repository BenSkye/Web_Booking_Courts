import React, { useEffect, useState } from "react";
import { Card, Button, Image, Modal, Row, Col, Spin, Empty } from "antd";
import moment from "moment";
import { getPersonalInvoiceAPI } from "../../../services/invoiceAPI/invoiceAPI";

const generateInvoiceCode = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `0${now.getMonth() + 1}`.slice(-2);
  const day = `0${now.getDate()}`.slice(-2);
  const hours = `0${now.getHours()}`.slice(-2);
  const minutes = `0${now.getMinutes()}`.slice(-2);
  const seconds = `0${now.getSeconds()}`.slice(-2);
  return `INV-${year}${month}${day}-${hours}${minutes}${seconds}`;
};

const OrderDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInvoices = async () => {
    setLoading(true);
    const data = await getPersonalInvoiceAPI();
    console.log("data:", data);
    setInvoices(data.invoices);
    setLoading(false);
  };

  useEffect(() => {
    getInvoices();
  }, []);

  useEffect(() => {
    console.log("Invoices:", invoices);
  }, [invoices]);

  const showModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ maxHeight: "80vh", overflowY: "auto", padding: "16px" }}>
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : invoices.length === 0 ? (
        <Empty />
      ) : (
        invoices.map((invoice, index) => (
          <Card
            key={index}
            style={{
              border: "1px solid #e8e8e8",
              borderRadius: "10px",
              marginBottom: "16px",
              padding: "24px",
              width: "100%",
              margin: "0 auto",
              height: "fit-content",
              marginTop: "20px",
            }}
          >
            <Row gutter={[16, 16]} style={{ alignItems: "center" }}>
              <Col xs={24} sm={24} md={24} lg={6}>
                <Image
                  width="80%"
                  src={invoice.center.images[0]}
                  alt={invoice.center.centerName}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <h3 style={{ fontSize: "13px" }}>
                  {invoice.center.centerName}
                </h3>
                <p style={{ fontSize: "13px" }}>{invoice.center.location}</p>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={6}
                xl={3}
                style={{ textAlign: "left" }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Tổng tiền:{" "}
                  {Number(invoice.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}{" "}
                </p>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={6}
                xl={3}
                style={{ textAlign: "left" }}
              >
                <p
                  style={{
                    color: invoice.status === "paid" ? "green" : "black",
                  }}
                >
                  {invoice.status === "paid" ? "Đã thanh toán" : invoice.status}
                </p>
              </Col>
            </Row>

            <div style={{ marginTop: "40px", height: "50px" }}>
              <Button
                style={{ float: "right" }}
                onClick={() => showModal(invoice)}
              >
                Xem chi tiết
              </Button>
            </div>
          </Card>
        ))
      )}
      {selectedInvoice && (
        <Modal
          title="Chi tiết hóa đơn"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
        >
          <p>Mã hóa đơn: {selectedInvoice.invoiceID}</p>
          <p>Tên: {selectedInvoice.name}</p>
          <p>Số điện thoại: {selectedInvoice.phone}</p>
          <p>Địa chỉ sân: {selectedInvoice.description}</p>
          <p>
            Giá:{" "}
            {Number(selectedInvoice.price).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <div>
            <p>
              Hình thức đặt sân:{" "}
              {selectedInvoice.invoiceFor === "BBD"
                ? "Đặt lịch theo ngày"
                : selectedInvoice.invoiceFor}
            </p>
            <p>
              Ngày thanh toán:{" "}
              {selectedInvoice.createdAt
                ? new Date(selectedInvoice.createdAt).toLocaleDateString(
                    "vi-VN"
                  )
                : "N/A"}
            </p>
            <p>
              Giờ thanh toán:{" "}
              {moment(selectedInvoice.createdAt).format("HH:mm")}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderDetails;
