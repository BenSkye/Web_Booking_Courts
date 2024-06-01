import { useEffect, useState } from "react";
import { getTournamentAPI } from "../../services/tournamentAPI/tournamentAPI";
import { Button, Skeleton } from "antd";

export default function TournamentDetail({ tournamentId }) {
  const currentUser = { id: "1" }; //const { currentUser } = useContext(AuthContext);
  const [tournament, setTournament] = useState();
  console.log("tournamentId", tournamentId);
  useEffect(() => {
    const getTournament = async () => {
      setTournament(null);
      const data = await getTournamentAPI(tournamentId);
      setTournament(data);
      console.log("dâta", data);
    };
    getTournament();
  }, [tournamentId]);
  return (
    <div>
      {tournament ? (
        <div>
          {tournament?.status === "Accepted" && (
            <h5 style={{ color: "blue" }}>
              Giải đấu đã được chấp nhận thanh toán để hoàn tất việc đặt sân !!!
            </h5>
          )}
          <h1>{tournament?.tournamentName}</h1>
          <p>Đơn vị tổ chức: {tournament?.organizer}</p>
          <p>Email: {tournament?.contactEmail}</p>
          <p>Số điện thoại: {tournament?.phone}</p>
          <p>
            Thời gian: Từ ngày <strong>{tournament?.startDate}</strong> tới ngày{" "}
            <strong>{tournament?.endDate}</strong>
          </p>
          <p>
            Trung tâm cầu lông: <strong>{tournament?.venueName}</strong> tại{" "}
            <strong> {tournament?.venueAddress}</strong>
          </p>
          <p>Giải thưởng: </p>
          <p>
            {tournament?.prizeStructure?.split("\n").map((prize, index) => (
              <span key={index}>
                {prize}
                <br />
              </span>
            ))}
          </p>
          <p>Đơn vị tài trợ: {tournament?.sponsor}</p>
          {currentUser.id === tournament.userId &&
            tournament.status !== "Completed" && (
              <>
                <p>
                  Số lượng vận động viên dự kiến: {tournament?.numberOfAthletes}
                </p>
                <p>Số lượng trận đấu dự kiến: {tournament?.numberOfMatches}</p>
                <p>Yêu cầu đặc biệt: {tournament?.specialRequests}</p>
              </>
            )}
          {tournament?.status === "Pending" && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button danger>Hủy giải đấu</Button>
            </div>
          )}
          {tournament?.status === "Accepted" && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button danger>Hủy giải đấu</Button>
              <Button style={{ color: "green" }}>Thanh toán</Button>
            </div>
          )}
        </div>
      ) : (
        <Skeleton.Button
          active={true}
          size={"small"}
          shape={"round"}
          block={true}
        />
      )}
    </div>
  );
}
