import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

// Hàm tiện ích để tạo cookie
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

function LoginByGoogle() {
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleGoogleLogin = (credentialResponse) => {
    const decodedToken = jwtDecode(credentialResponse.credential);

    const customerInfo = {
      FullName: decodedToken.given_name,
      Email: decodedToken.email,
      Phone: decodedToken.phone_number || "Không có số điện thoại",
      BirthDate: decodedToken.birthdate || "Không có ngày sinh",
    };

    console.log(customerInfo);

    // Tạo cookie với tên "customer" và giá trị là thông tin khách hàng
    setCookie("customer", JSON.stringify(customerInfo), 7); // Cookie sẽ tồn tại trong 7 ngày
    console.log(document.cookie);
    setLoginSuccess(true);
  };

  const handleGoogleLoginError = () => {
    console.log("Đăng nhập thất bại");
  };

  return (
    <GoogleOAuthProvider clientId="728123147588-gpn6mh929o91nk9cgqkk31go25r6jko4.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={handleGoogleLoginError}
      />
      {loginSuccess && <p style={{ color: "green" }}>Đăng nhập thành công!</p>}
    </GoogleOAuthProvider>
  );
}

export default LoginByGoogle;
