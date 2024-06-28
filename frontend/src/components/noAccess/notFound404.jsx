import React, { useContext } from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../services/authAPI/authProvideAPI";

const NotFound404 = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleGoBack = () => {
    if (!user) {
      navigate("/");
    }
    if (user.role === "customer") {
      navigate("/");
    }
    if (user.role === "manager") {
      navigate("/courtManage");
    }
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, nội dung bạn vừa tìm không thấy"
      extra={
        <Button type="primary" onClick={handleGoBack}>
          Quay lại
        </Button>
      }
    />
  );
};

export default NotFound404;
