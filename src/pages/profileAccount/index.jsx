import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "../profileAccount/CenteredForm.css";



export default function ProfileAccount() {
  return (
    <div className="user-profile-outside">
      <div className="user-profile">Hoạt động</div>
      <div>
      <div className="user-profile-booking">Sân đã đặt</div>
      <div className="user-profile-booking">Số game đã chơi</div>
      <div className="user-profile-booking">Hóa đơn</div>
      </div>
      <div className="user-profile-infors">
      <div className="user-profile-infor-settings">Cài đặt tài khoản</div>
      <Link to= "/user/my-account">
      <div className="user-profile-infor">Tài khoản của tôi</div>
      </Link>
      <div className="user-profile-infor">Cập nhật mật khẩu</div>
      </div>
    </div>
  );
}
