import { useEffect, useState } from "react";
import { Button, Skeleton, Card, Modal, Form, Input } from "antd";
import { useParams } from "react-router-dom";
import {
  approvedTournamentAPI,
  deniedTournamentAPI,
  getTournamentAPI,
} from "../../../../services/tournamentAPI/tournamentAPI";
import { getBookingByDayAPI } from "../../../../services/bookingAPI/bookingAPI";

const statusStyles = {
  pending: { message: "Giải đấu đang chờ xử lý.", color: "gray" },
  denied: { message: "Giải đấu đã bị từ chối.", color: "red" },
  approved: { message: "Giải đấu đã được chấp nhận.", color: "green" },
  confirm: { message: "Giải đấu đã được thanh toán.", color: "blue" },
  completed: { message: "Giải đấu đã hoàn thành.", color: "navy" },
  cancelled: { message: "Giải đấu đã bị hủy.", color: "orange" },
};

export default function ManagerTournamentDetail() {
  const tournamentId = useParams().tournamentID;
  const [isLoading, setIsLoading] = useState(true);
  const [tournament, setTournament] = useState(null);
  const [ListBooking, setListBooking] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeniedModalOpen, setIsDeniedModalOpen] = useState(false);
  const [isApprovedModalOpen, setIsApproveModalOpen] = useState(false);
  const [form] = Form.useForm();

  const approvedTournament = async (pricePerDay) => {
    try {
      setIsLoading(true);
      const data = await approvedTournamentAPI(tournamentId, {
        pricePerDay: pricePerDay,
      });
      console.log("Data:", data);
      fetchTournament();
    } catch (error) {
      console.error("Error fetching personal booking data:", error);
    }
  };

  const deniedTournament = async () => {
    try {
      setIsLoading(true);
      await deniedTournamentAPI(tournamentId);
      fetchTournament();
    } catch (error) {
      console.error("Error fetching personal booking data:", error);
    }
  };

  const getListBooking = async () => {
    try {
      const data = await getBookingByDayAPI(
        tournament.startDate,
        tournament.endDate
      );
      console.log("Data:", data);
      setListBooking(data.bookings);
    } catch (error) {
      console.error("Error fetching personal booking data:", error);
    }
  };

  const fetchTournament = async () => {
    setTournament(null);
    try {
      const data = await getTournamentAPI(tournamentId);
      setTournament(data.tournament);
      console.log("Data:", data);
    } catch (error) {
      console.error("Error fetching tournament data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const showModal = () => {
    getListBooking();
    setIsModalOpen(true);
  };

  const showDeniedModal = () => {
    setIsDeniedModalOpen(true);
  };
  const showAppovedModal = () => {
    setIsApproveModalOpen(true);
  };
  const handleOk = () => {
    setIsApproveModalOpen(false);
    form
      .validateFields()
      .then((values) => {
        // Remove all dots and the currency symbol, then convert to number
        const pricePerDay = Number(
          values.fee.replace(/\./g, "").replace("₫", "").trim()
        );

        console.log("Tournament Fee:", pricePerDay);
        // logic for confirming the tournament approval
        approvedTournament(pricePerDay);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleDeniedOk = () => {
    setIsDeniedModalOpen(false);
    deniedTournament();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDeniedModalOpen(false);
    setIsApproveModalOpen(false);
  };

  const handleFeeChange = (value) => {
    const numericValue = value.replace(/\D/g, "");
    form.setFieldsValue({
      fee: Number(numericValue).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      }),
    });
  };

  useEffect(() => {
    fetchTournament();
  }, [tournamentId]);

  useEffect(() => {
    if (tournament) {
      getListBooking();
    }
  }, [tournament]);

  const totalAmount = ListBooking.reduce(
    (total, booking) => total + booking.price,
    0
  );

  return isLoading ? (
    <div style={{ padding: "20px" }}>
      <Skeleton active />
    </div>
  ) : (
    <>
      <Card>
        <h5
          style={{
            color:
              statusStyles[tournament.status.toLowerCase()]?.color || "black",
            textAlign: "left",
          }}
        >
          {statusStyles[tournament.status.toLowerCase()]?.message ||
            "Trạng thái giải đấu không xác định."}
        </h5>
        <h1 style={{ textAlign: "left" }}>{tournament.tournamentName}</h1>
        <p style={{ textAlign: "left" }}>
          Đơn vị tổ chức: {tournament.fullname}
        </p>
        <p style={{ textAlign: "left" }}>Email: {tournament.email}</p>
        <p style={{ textAlign: "left" }}>Số điện thoại: {tournament.phone}</p>
        <p style={{ textAlign: "left" }}>
          Thời gian: Từ ngày{" "}
          <strong>{new Date(tournament.startDate).toLocaleDateString()}</strong>{" "}
          tới ngày{" "}
          <strong>{new Date(tournament.endDate).toLocaleDateString()}</strong>
        </p>
        <p style={{ textAlign: "left" }}>
          Trung tâm cầu lông: <strong>{tournament.centerId.centerName}</strong>{" "}
          tại <strong>{tournament.centerId.location}</strong>
        </p>
        <p style={{ textAlign: "left" }}>
          Giải thưởng:{" "}
          {tournament.prizeStructure?.split("\n").map((prize, index) => (
            <span key={index}>
              {prize}
              <br />
            </span>
          ))}
        </p>
        <p style={{ textAlign: "left" }}>
          Đơn vị tài trợ: {tournament.sponsor}
        </p>
      </Card>
      {tournament.status.toLowerCase() === "pending" && (
        <>
          {ListBooking && ListBooking.length > 0 ? (
            <>
              <Card>
                <p
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Chưa thể duyệt giải đấu khi còn đặt sân.
                </p>
                {ListBooking.map((booking) => (
                  <Card key={booking._id} style={{ marginBottom: "10px" }}>
                    <p>
                      Ngày:{" "}
                      <strong>
                        {new Date(booking.date).toLocaleDateString()}
                      </strong>
                    </p>
                    <p>
                      Thời gian: <strong>{booking.start}</strong> -{" "}
                      <strong>{booking.end}</strong>
                    </p>
                    <p>
                      Giá:{" "}
                      <strong>
                        {Number(booking?.price).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </strong>
                    </p>
                  </Card>
                ))}
                <p style={{ fontWeight: "bold" }}>
                  Tổng tiền:{" "}
                  <strong>
                    {totalAmount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </strong>
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button type="primary" danger onClick={showModal}>
                    Hủy tất cả đặt sân và duyệt giải đấu
                  </Button>
                  <Button type="primary" onClick={showDeniedModal}>
                    Từ Chối
                  </Button>
                </div>
              </Card>
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: "bold", textAlign: "left" }}>
                Không có đặt sân trong thời gian yêu cầu tổ chức giải đấu.
              </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button type="primary" onClick={showAppovedModal}>
                  Duyệt giải đấu
                </Button>
                <Button type="primary" onClick={showDeniedModal}>
                  Từ Chối
                </Button>
              </div>
            </div>
          )}
        </>
      )}
      <Modal
        title="Xác nhận hủy đặt sân và duyệt giải đấu?"
        open={isModalOpen}
        footer={[]}
        onCancel={handleCancel}
      >
        <p style={{ fontWeight: "bold" }}>
          Tổng tiền phải hoàn cho các đặt sân:{" "}
          <strong>
            {totalAmount.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </strong>
        </p>
        <Form form={form}>
          <Form.Item
            label="Giá tiền cho 1 ngày tổ chức giải đấu"
            name="fee"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá tiền cho 1 ngày tổ chức giải đấu",
              },
            ]}
          >
            <Input onChange={(e) => handleFeeChange(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleOk}>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Xác nhận từ chối giải đấu?"
        open={isDeniedModalOpen}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleDeniedOk}>
            Xác nhận
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn từ chối giải đấu này không?</p>
      </Modal>

      <Modal
        title="Xác nhận duyệt giải đấu?"
        open={isApprovedModalOpen}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            label="Giá tiền cho 1 ngày tổ chức giải đấu"
            name="fee"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá tiền cho 1 ngày tổ chức giải đấu",
              },
            ]}
          >
            <Input onChange={(e) => handleFeeChange(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleOk}>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
