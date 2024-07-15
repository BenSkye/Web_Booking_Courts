import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Image,
  Modal,
  Row,
  Col,
  Spin,
  Empty,
  List,
  Typography,
} from "antd";
import moment from "moment";
import { getPersonalInvoiceAPI } from "../../../services/invoiceAPI/invoiceAPI";
import { getBookingByInvoiceIdAPI } from "../../../services/bookingAPI/bookingAPI";
import { getCenterPackageByInvoiceIdAPI } from "../../../services/centersAPI/getCenters";
import { getTournamentByInvoiceIdAPI } from "../../../services/tournamentAPI/tournamentAPI";
const { Paragraph } = Typography;
const invoiceForMapping = {
  BBD: "Đặt lịch theo ngày",
  UBBD: "Sửa giờ chơi",
  BPP: "Mua gói giờ chơi",
  BT: "Đặt lịch tổ chức giải",
  BCP: "Thanh toán gói hoạt động",
  // Thêm các ánh xạ khác nếu cần
};
const STATUS_MAPPING = {
  pending: { color: "orange", text: "Chưa thanh toán" },
  confirmed: { color: "green", text: "Đã thanh toán" },
  cancelled: { color: "red", text: "Đã hủy" },
  expired: { color: "#A9A9A9", text: "Hết hạn" },
  disable: { color: "#A9A9A9", text: "Đã được đổi" },
};
const INVOICE_STATUS_MAPPING = {
  pending: { text: "Chờ thanh toán", color: "orange" },
  paid: { text: "Đã thanh toán", color: "green" },
  cancelled: { text: "Đã hủy", color: "red" },
};
const OrderDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleTournament, setIsModalVisibleTournament] =
    useState(false);
  const [isModalVisibleCenterPackage, setIsModalVisibleCenterPackage] =
    useState(false);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [listBooking, setListBooking] = useState([]);
  const [tournament, setTournament] = useState();
  const [centerPackage, setCenterPackage] = useState();
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

  const getBookingByInvoiceId = async (invoiceId) => {
    const result = await getBookingByInvoiceIdAPI(invoiceId);
    console.log("bookings:", result.bookings);
    setListBooking(result.bookings);
    setIsModalVisible(true);
  };

  const getTournamentByInvoiceId = async (invoiceId) => {
    const result = await getTournamentByInvoiceIdAPI(invoiceId);
    console.log("tournament:", result.tournament);
    setTournament(result.tournament);
    setIsModalVisibleTournament(true);
  };
  const getCenterPackage = async (invoiceId) => {
    const result = await getCenterPackageByInvoiceIdAPI(invoiceId);
    console.log("result:", result);
    setCenterPackage(result.result);
    setIsModalVisibleCenterPackage(true);
  };

  useEffect(() => {
    if (
      selectedInvoice?.invoiceFor === "BBD" ||
      selectedInvoice?.invoiceFor === "UBBD"
    ) {
      getBookingByInvoiceId(selectedInvoice._id);
    }
    if (selectedInvoice?.invoiceFor === "BT") {
      getTournamentByInvoiceId(selectedInvoice._id);
    }
    if (selectedInvoice?.invoiceFor === "BCP") {
      getCenterPackage(selectedInvoice._id);
    }
  }, [selectedInvoice]);

  const showModal = (invoice) => {
    console.log("invoice:", invoice);
    setSelectedInvoice(invoice);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setListBooking([]);
    setSelectedInvoice(null);
    setTournament(null);
    setIsModalVisibleTournament(false);
    setIsModalVisible(false);
    setCenterPackage(null);
    setIsModalVisibleCenterPackage(false);
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
                  src={invoice.center?.images[0]}
                  alt={invoice.center.centerName}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <h3 style={{ fontSize: "13px" }}>
                  {invoice.center.centerName}
                </h3>
                <p style={{ fontSize: "13px" }}>{invoice.center.location}</p>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={24}
                xl={6}
                style={{ textAlign: "left" }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {invoiceForMapping[invoice.invoiceFor]}
                </p>
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
                lg={24}
                xl={24}
                style={{ textAlign: "left" }}
              >
                <p
                  style={{
                    color:
                      INVOICE_STATUS_MAPPING[invoice.status]?.color || "black",
                  }}
                >
                  {INVOICE_STATUS_MAPPING[invoice.status]?.text ||
                    invoice.status}
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
      {listBooking.length > 0 && (
        <>
          <Modal
            title="Chi tiết hóa đơn"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <List
              itemLayout="vertical"
              dataSource={listBooking}
              renderItem={(booking) => (
                <List.Item key={booking._id}>
                  <Card>
                    <List.Item.Meta
                      title={booking.centerName}
                      description={`${booking.centerAddress} `}
                    />
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={12}>
                        <Paragraph>
                          <strong>Ngày chơi:</strong>{" "}
                          {new Date(booking.date).toLocaleDateString("en-US")}
                        </Paragraph>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Paragraph>
                          <strong>Giờ chơi:</strong> {booking.start} -{" "}
                          {booking.end}
                        </Paragraph>
                      </Col>
                    </Row>
                    <Paragraph>
                      <strong>Sân:</strong> {booking.courtNumber}
                    </Paragraph>
                    <Paragraph>
                      <strong>Giá:</strong>{" "}
                      {Number(booking?.price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Paragraph>
                    <Paragraph>
                      <strong>Trạng thái:</strong>{" "}
                      <span
                        style={{
                          color: STATUS_MAPPING[booking.status]
                            ? STATUS_MAPPING[booking.status].color
                            : "black",
                        }}
                      >
                        {STATUS_MAPPING[booking.status]
                          ? STATUS_MAPPING[booking.status].text
                          : "Không xác định"}
                      </span>
                    </Paragraph>
                  </Card>
                </List.Item>
              )}
            />
            <div>
              <p>Mã hóa đơn: {selectedInvoice.invoiceID}</p>
              <p>
                Giá:{" "}
                {Number(selectedInvoice.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <div>
                <p>
                  Hóa đơn :{" "}
                  {invoiceForMapping[selectedInvoice.invoiceFor] ||
                    selectedInvoice.invoiceFor}
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
            </div>
          </Modal>
        </>
      )}
      {tournament && (
        <Modal
          title="Chi tiết hóa đơn"
          visible={isModalVisibleTournament}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div>
            <h3>Giải đấu: {tournament.tournamentName}</h3>
            <p>
              Ngày bắt đầu:{" "}
              {new Date(tournament.startDate).toLocaleDateString("en-US")}
            </p>
            <p>
              Ngày Kết thúc:{" "}
              {new Date(tournament.endDate).toLocaleDateString("en-US")}
            </p>
            <p>Mã hóa đơn: {selectedInvoice.invoiceID}</p>
            <p>
              Giá:{" "}
              {Number(selectedInvoice.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <div>
              <p>
                Hóa đơn :{" "}
                {invoiceForMapping[selectedInvoice.invoiceFor] ||
                  selectedInvoice.invoiceFor}
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
          </div>
        </Modal>
      )}
      {centerPackage && (
        <Modal
          title="Chi tiết hóa đơn"
          visible={isModalVisibleCenterPackage}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div>
            <h3>Thanh toán gói hoạt động</h3>
            <h4>{centerPackage.centerPackage.name}</h4>
            <p>
              Hết hạn:{" "}
              {new Date(
                centerPackage.selectedSubcription.expiryDate
              ).toLocaleDateString("en-US")}
            </p>
            <p>Mã hóa đơn: {selectedInvoice.invoiceID}</p>
            <p>
              Giá:{" "}
              {Number(selectedInvoice.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <div>
              <p>
                Hóa đơn :{" "}
                {invoiceForMapping[selectedInvoice.invoiceFor] ||
                  selectedInvoice.invoiceFor}
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
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderDetails;
