import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTournamentAPI } from "../../services/tournamentAPI/tournamentAPI";

export default function TournamentDetail() {
  const tournamentID = useParams().tournamentID;
  const [tournament, setTournament] = useState();
  useEffect(() => {
    const getTournament = async () => {
      const data = await getTournamentAPI(tournamentID);
      setTournament(data);
      console.log("dâta", data);
    };
    getTournament();
  }, []);
  return (
    <div>
      {tournament ? (
        <div>
          <h1>{tournament.tournamentName}</h1>
          <p>Đơn vị tổ chức: {tournament.organizer}</p>
          <p>Email: {tournament.contactEmail}</p>
          <p>Số điện thoại: {tournament.phoneNumber}</p>
          <p>
            Thời gian: Từ ngày <strong>{tournament.startDate}</strong> tới ngày{" "}
            <strong>{tournament.endDate}</strong>
          </p>
          <p>
            Trung tâm cầu lông: <strong>{tournament.venueName}</strong> tại{" "}
            <strong> {tournament.venueAddress}</strong>
          </p>
          <p>Giải thưởng: </p>
          <p>
            {tournament.prizeStructure.split("\n").map((prize, index) => (
              <span key={index}>
                {prize}
                <br />
              </span>
            ))}
          </p>
          <p>Đơn vị tài trợ: {tournament.sponsor}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
