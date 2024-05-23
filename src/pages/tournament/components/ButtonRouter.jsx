import { Button, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function ButtonRouter() {
  return (
    <div
      style={{
        width: "80%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button
        style={{
          flex: 1,
          marginBottom: "10px",
          background:
            "linear-gradient(90deg, rgba(252,148,69,1) 0%, rgba(131,58,180,1) 100%)",
          color: "black",
        }}
      >
        Xem các Giải đấu mà bạn đã tạo
      </Button>
      <Link
        to="/tournament/create"
        style={{
          flex: 1,
        }}
      >
        <Button
          style={{
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(69,252,136,1) 100%)",
            color: "black",
          }}
        >
          Tiến hành đăng ký tạo giải đấu
        </Button>
      </Link>
    </div>
  );
}
