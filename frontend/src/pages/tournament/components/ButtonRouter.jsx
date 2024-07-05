import { Button, Modal } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PersonalTournament from "../components/PersonalTournament";

export default function ButtonRouter() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
<<<<<<< HEAD
    <div style={{ marginTop: 20, textAlign: "center" }}>
      <Button
=======
    <div
      style={{
        width: "80%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link
        to="/tournament/personal"
>>>>>>> 0b0b9926af54ae91d0cc9d96784f577a10d0c4c8
        style={{
          marginBottom: "10px",
<<<<<<< HEAD
          background:
            "linear-gradient(90deg, rgba(252,148,69,1) 0%, rgba(131,58,180,1) 100%)",
          color: "black",
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
=======
>>>>>>> 0b0b9926af54ae91d0cc9d96784f577a10d0c4c8
        }}
      >
<<<<<<< HEAD
        Xem các Giải đấu mà bạn đã tạo
      </Button>
      <Link to="/tournament/create">
=======
        <Button
          style={{
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(90deg, rgba(252,148,69,1) 0%, rgba(131,58,180,1) 100%)",
            color: "black",
          }}
        >
          Xem các Giải đấu mà bạn đã tạo
        </Button>
      </Link>
      <Link
        to="/tournament/create"
        style={{
          flex: 1,
        }}
      >
>>>>>>> 0b0b9926af54ae91d0cc9d96784f577a10d0c4c8
        <Button
          style={{
            marginTop: "10px",
            background:
              "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(69,252,136,1) 100%)",
            color: "black",
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          Tiến hành đăng ký tạo giải đấu
        </Button>
      </Link>

      {/* <Modal
        title="Giải đấu bạn đã tạo"
        visible={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <PersonalTournament />
      </Modal> */}
    </div>
  );
}
