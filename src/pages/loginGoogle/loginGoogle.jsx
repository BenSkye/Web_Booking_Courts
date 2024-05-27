import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { logDOM } from '@testing-library/react';
import emailjs from '@emailjs/browser';
import { jwtDecode } from "jwt-decode";
function LoginByGoogle() {
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleGoogleLogin = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential)
    console.log(credentialResponseDecoded);

    // Gửi thông báo email
    sendLoginSuccessEmail(credentialResponseDecoded.email);
    setLoginSuccess(true);
  }

  const handleGoogleLoginError = () => {
    console.log('Đăng nhập thất bại');
  }

  const sendLoginSuccessEmail = (email) => {
    emailjs.send('service_zq4c2ye', 'template_9rkjofd', {
      to_email: 'phamtanty789@gmail.com',
      message: 'Đăng nhập thành công!'
    }, 'FXGr-HGXuH54-IC6w')
    .then((result) => {
      console.log('Email đã được gửi thành công!');
    }, (error) => {
      console.log('Lỗi khi gửi email:', error);
    });
  }

  return (
    <GoogleOAuthProvider clientId="728123147588-gpn6mh929o91nk9cgqkk31go25r6jko4.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={handleGoogleLoginError}
      />
      {loginSuccess && <p>Đăng nhập thành công! Vui lòng kiểm tra email của bạn để xác nhận.</p>}
    </GoogleOAuthProvider>
  );
}

export default LoginByGoogle;