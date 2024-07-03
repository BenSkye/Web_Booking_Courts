import { useEffect, useState } from "react";
import { getTournamentAPI } from "../../services/tournamentAPI/tournamentAPI";
import { Button, Skeleton, Card } from "antd";
import { useParams } from "react-router-dom";
const statusStyles = {
  pending: { message: "Giải đấu đang chờ xử lý.", color: "gray" },
  denied: { message: "Giải đấu đã bị từ chối.", color: "red" },
  approved: { message: "Giải đấu đã được chấp nhận.", color: "green" },
  confirm: { message: "Giải đấu đã được thanh toán.", color: "blue" },
  completed: { message: "Giải đấu đã hoàn thành.", color: "navy" },
  cancelled: { message: "Giải đấu đã bị hủy.", color: "orange" },
};
export default function TournamentDetail() {
  const tournamentId = useParams().tournamentID;
  const currentUser = { id: "1" }; //const { currentUser } = useContext(AuthContext);
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
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
      {currentUser.id === tournament.userId &&
        tournament.status !== "Completed" && (
          <>
            <p>Số lượng vận động viên dự kiến: {tournament.numberOfAthletes}</p>
            <p>Số lượng trận đấu dự kiến: {tournament.numberOfMatches}</p>
            <p>Yêu cầu đặc biệt: {tournament.specialRequests}</p>
          </>
        )}
      {tournament.status === "pending" && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button danger>Hủy giải đấu</Button>
        </div>
      )}
      {tournament.status === "approved" && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button danger>Hủy giải đấu</Button>
          <Button type="primary">Thanh toán</Button>
        </div>
      )}
    </Card>
  );
}
