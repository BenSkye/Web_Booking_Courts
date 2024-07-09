import { useEffect, useState } from "react";
import { getTournamentInCenterAPI } from "../../../../services/tournamentAPI/tournamentAPI";
import { Button, Card, Skeleton } from "antd";
import { Link } from "react-router-dom";

const statusStyles = {
  pending: { message: "Giải đấu đang chờ xử lý.", color: "gray" },
  denied: { message: "Giải đấu đã bị từ chối.", color: "red" },
  approved: { message: "Giải đấu đã được chấp nhận.", color: "green" },
  confirm: { message: "Giải đấu đã được thanh toán.", color: "blue" },
  completed: { message: "Giải đấu đã hoàn thành.", color: "navy" },
  cancelled: { message: "Giải đấu đã bị hủy.", color: "orange" },
};

export default function ListTournamentInCenter({ centerId }) {
  const [listTournament, setListTournament] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getListTournament = async () => {
      const data = await getTournamentInCenterAPI(centerId);
      setListTournament(data.tournaments);
      setLoading(false);
    };
    getListTournament();
  }, [centerId]); // Added centerId as a dependency to refetch when it changes

  if (loading) {
    return (
      <div>
        {[1, 2, 3].map((key) => (
          <Card
            key={key}
            title={
              <Skeleton.Input style={{ width: 200 }} active size="small" />
            }
            bodyStyle={{ padding: "10px" }}
            headStyle={{ backgroundColor: "#f0f0f0", padding: "10px" }}
            style={{
              width: "100%",
              boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              margin: 0,
            }}
          >
            <p style={{ margin: 0, padding: 0 }}>
              <Skeleton.Input style={{ width: 100 }} active size="small" />
            </p>
          </Card>
        ))}
      </div>
    );
  }

  if (listTournament.length === 0) {
    return <div>Không có giải đấu nào.</div>;
  }

  return (
    <div>
      {listTournament.map((tournament, index) => (
        <Card
          key={index}
          title={
            <span>
              {tournament.tournamentName + " "}
              <span
                style={{
                  color:
                    statusStyles[tournament.status.toLowerCase()]?.color ||
                    "black",
                }}
              >
                {statusStyles[tournament.status.toLowerCase()]?.message ||
                  "Trạng thái giải đấu không xác định."}
              </span>
            </span>
          }
          extra={
            <Link to={`/manager-tournament/detail/${tournament._id}`}>
              <Button type="link">Chi tiết</Button>
            </Link>
          }
          bodyStyle={{ padding: "10px" }}
          headStyle={{ backgroundColor: "#f0f0f0", padding: "10px" }}
          style={{
            width: "100%",
            boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            margin: 0,
          }}
        >
          <p style={{ margin: 0, padding: 0 }}>
            {new Date(tournament.startDate).toLocaleDateString()} -{" "}
            {new Date(tournament.endDate).toLocaleDateString()}
          </p>
        </Card>
      ))}
    </div>
  );
}
