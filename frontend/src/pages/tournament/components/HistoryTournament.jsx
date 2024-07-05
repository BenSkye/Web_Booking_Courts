import { Button, Modal, Pagination, Skeleton, Table } from "antd";
import { useEffect, useState } from "react";
import { getAllTournamentAPI } from "../../../services/tournamentAPI/tournamentAPI";
import TournamentDetail from "../../TournamentDetail";
import { Link } from "react-router-dom";

const pageSize = 3;

export default function HistoryTournament() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tournamentId, setTournamentId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [ListTournament, setListTournament] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true);
      try {
        const data = await getAllTournamentAPI();
        console.log("top 4", data);
        setListTournament(data);
      } catch (error) {
        console.error("Failed to fetch tournaments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTournaments();
  }, []);

  const showModal = (tournamentId) => {
    setTournamentId(tournamentId);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "Tên giải đấu",
      dataIndex: "tournamentName",
      key: "tournamentName",
      render: (text, record) => (
        <Button type="link" onClick={() => showModal(record.id)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "timeRange",
      key: "timeRange",
      render: (text, record) => (
        <span>{`${record.startDate} - ${record.endDate}`}</span>
      ),
    },
  ];

  return (
    <div>
      <h1>Các giải đấu đã được tổ chức</h1>
      {loading ? (
        <Skeleton active />
      ) : (
        <Table
          dataSource={ListTournament.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
<<<<<<< HEAD
          )}
          columns={columns}
          pagination={false}
          rowKey="id"
          style={{ marginBottom: "20px" }}
        />
      )}
=======
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
>>>>>>> 0b0b9926af54ae91d0cc9d96784f577a10d0c4c8
      <Pagination
        current={currentPage}
        onChange={handleChange}
        pageSize={pageSize}
        total={ListTournament.length}
        style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}
      />
      <Modal
        title="Chi tiết giải đấu"
        visible={isModalOpen}
        footer={null}
        onCancel={handleOk}
      >
        <TournamentDetail tournamentId={tournamentId} />
      </Modal>
    </div>
  );
}
