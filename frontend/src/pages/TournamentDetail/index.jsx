import { useContext, useEffect, useState } from "react";
import {
  cancelTournamentAPI,
  confirmTournamentAPI,
  getTournamentAPI,
} from "../../services/tournamentAPI/tournamentAPI";
import { Button, Skeleton, Card, Modal } from "antd";
import { useParams } from "react-router-dom";
import AuthContext from "../../services/authAPI/authProvideAPI";
const statusStyles = {
  pending: { message: "Giải đấu đang chờ xử lý.", color: "gray" },
  denied: { message: "Giải đấu đã bị từ chối.", color: "red" },
  approved: { message: "Giải đấu đã được chấp nhận.", color: "green" },
  confirm: { message: "Giải đấu đã được thanh toán.", color: "blue" },
  completed: { message: "Giải đấu đã hoàn thành.", color: "navy" },
  cancelled: { message: "Giải đấu đã bị hủy.", color: "orange" },
  expired: { message: "Hết hạn thanh toán giải đấu.", color: "purple" },
};
export default function TournamentDetail() {
  const tournamentId = useParams().tournamentID;
  const { user } = useContext(AuthContext);
  const [tournament, setTournament] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

  const cancelTournament = async () => {
    try {
      const data = await cancelTournamentAPI(tournamentId);
      console.log("Data:", data);
      if (data.status === "success") {
        fetchTournament();
      }
    } catch (error) {
      console.error("Error cancelling tournament:", error);
    }
  };
  const confirmTournament = async () => {
    try {
      const result = await confirmTournamentAPI(tournamentId);
      console.log("result:", result);
      window.location.href = result.data.paymentResult.payUrl;
    } catch (error) {
      console.error("Error confirming tournament:", error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalConfirrm = () => {
    setIsModalConfirmOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelConfirrm = () => {
    setIsModalConfirmOpen(false);
  };

  const handelCancelTournament = () => {
    setIsModalOpen(false);
    cancelTournament();
  };
  const handelConfirmTournament = () => {
    setIsModalConfirmOpen(false);
    confirmTournament();
  };

  const fetchTournament = async () => {
    setTournament(null);
    try {
      const data = await getTournamentAPI(tournamentId);
      setTournament(data.tournament);
      console.log("Data:", data);
    } catch (error) {
      console.error("Error fetching tournament data:", error);
    }
  };
  useEffect(() => {
    fetchTournament();
  }, [tournamentId]);

  if (!tournament) {
    return (
      <div style={{ padding: "20px" }}>
        <Skeleton active />
      </div>
    );
  }

  return (
    <>
      <Card>
        <h5
          style={{
            color:
              statusStyles[tournament.status.toLowerCase()]?.color || "black",
          }}
        >
          {statusStyles[tournament.status.toLowerCase()]?.message ||
            "Trạng thái giải đấu không xác định."}
        </h5>
        <h1>{tournament.tournamentName}</h1>
        <p>Đơn vị tổ chức: {tournament.fullname}</p>
        <p>Email: {tournament.email}</p>
        <p>Số điện thoại: {tournament.phone}</p>
        <p>
          Thời gian: Từ ngày{" "}
          <strong>{new Date(tournament.startDate).toLocaleDateString()}</strong>{" "}
          tới ngày{" "}
          <strong>{new Date(tournament.endDate).toLocaleDateString()}</strong>
        </p>
        <p>
          Trung tâm cầu lông: <strong>{tournament.centerId.centerName}</strong>{" "}
          tại <strong>{tournament.centerId.location}</strong>
        </p>
        <p>
          Giải thưởng:{" "}
          {tournament.prizeStructure?.split("\n").map((prize, index) => (
            <span key={index}>
              {prize}
              <br />
            </span>
          ))}
        </p>
        <p>Đơn vị tài trợ: {tournament.sponsor}</p>
        {user.id === tournament.userId && tournament.status !== "Completed" && (
          <>
            <p>Số lượng vận động viên dự kiến: {tournament.numberOfAthletes}</p>
            <p>Số lượng trận đấu dự kiến: {tournament.numberOfMatches}</p>
            <p>Yêu cầu đặc biệt: {tournament.specialRequests}</p>
          </>
        )}
        {tournament.price ? (
          <strong style={{ color: "#DD947B" }}>
            Giá tổ chức giải đấu:{" "}
            {Number(tournament?.price).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </strong>
        ) : null}
        {tournament.status === "pending" && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button danger onClick={showModal}>
              Hủy giải đấu
            </Button>
          </div>
        )}
        {tournament.status === "approved" && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="primary" onClick={showModalConfirrm}>
              Thanh toán
            </Button>
            <Button danger onClick={showModal}>
              Hủy giải đấu
            </Button>
          </div>
        )}
      </Card>
      <Modal
        title="Xác nhận hủy giải đấu"
        open={isModalOpen}
        onOk={handelCancelTournament}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      ></Modal>
      <Modal
        title="Xác nhận thanh toán giải đấu"
        open={isModalConfirmOpen}
        onOk={handelConfirmTournament}
        onCancel={handleCancelConfirrm}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>
          <strong style={{ color: "#DD947B" }}>
            Giá tổ chức giải đấu:{" "}
            {Number(tournament?.price).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </strong>
        </p>
      </Modal>
    </>
  );
}
