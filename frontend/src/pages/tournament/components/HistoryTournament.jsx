import { Button, Card, Modal, Pagination, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { getAllTournamentAPI } from "../../../services/tournamentAPI/tournamentAPI";
import TournamentDetail from "../../TournamentDetail";
import { Link } from "react-router-dom";

const pageSize = 3;
export default function HistoryTournament() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tournamentId, setTournamentId] = useState();
  const showModal = (tournamentId) => {
    setTournamentId(tournamentId);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [ListTournament, setListTournament] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCourts = async () => {
      setLoading(true);
      const data = await getAllTournamentAPI();
      console.log("top 4", data);
      setListTournament(data);
      setLoading(false);
    };
    getCourts();
  }, []);
  const handleChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <h1>Các giải đấu đã được tổ chức</h1>
      {loading
        ? [1, 2, 3].map((key) => (
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
          ))
        : ListTournament.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          ).map((tournament, index) => (
            <Card
              key={index}
              title={tournament.tournamentName}
              extra={
                <Link to={`/tournament/detail/${tournament._id}`}>
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
      <Pagination
        current={currentPage}
        onChange={handleChange}
        pageSize={pageSize}
        total={ListTournament.length}
        style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}
      />
      <Modal
        title="Chi tiết giải đấu"
        open={isModalOpen}
        footer={null}
        onCancel={handleOk}
      >
        <TournamentDetail tournamentId={tournamentId} />
      </Modal>
    </div>
  );
}
