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
          backgroundColor: "#D0E357",
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
            backgroundColor: "#57E3CA",
            color: "black",
          }}
        >
          Tiến hành đăng ký tạo giải đấu
        </Button>
      </Link>
    </div>
  );
}
