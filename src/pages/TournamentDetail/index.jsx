import { useEffect, useState } from "react";
import { getTournamentAPI } from "../../services/tournamentAPI/tournamentAPI";
import { Skeleton } from "antd";

export default function TournamentDetail({ tournamentId }) {
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
          <h1>{tournament?.tournamentName}</h1>
          <p>Đơn vị tổ chức: {tournament?.organizer}</p>
          <p>Email: {tournament?.contactEmail}</p>
          <p>Số điện thoại: {tournament?.phoneNumber}</p>
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
