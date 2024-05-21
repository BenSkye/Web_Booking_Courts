import { Button, Space } from "antd";
import React from "react";

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
      <Button style={{ flex: 1, backgroundColor: "#57E3CA", color: "black" }}>
        Tiến hành đăng ký tạo giải đấu
      </Button>
    </div>
  );
}
