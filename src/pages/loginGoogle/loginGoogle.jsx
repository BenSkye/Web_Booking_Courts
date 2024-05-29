import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function LoginByGoogle() {
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleGoogleLogin = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential)
    console.log({
      FullName: credentialResponseDecoded.given_name,
      Email: credentialResponseDecoded.email,
      Phone: credentialResponseDecoded.phone_number,
      BirthDate: credentialResponseDecoded.birthdate
    });

    setLoginSuccess(true);
  }

  const handleGoogleLoginError = () => {
    console.log('Đăng nhập thất bại');
  }

  return (
    <GoogleOAuthProvider clientId="728123147588-gpn6mh929o91nk9cgqkk31go25r6jko4.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={handleGoogleLoginError}
      />
      {loginSuccess && <p style={{ color: 'green' }}>Đăng nhập thành công!</p>}
    </GoogleOAuthProvider>
  );
}

export default LoginByGoogle;