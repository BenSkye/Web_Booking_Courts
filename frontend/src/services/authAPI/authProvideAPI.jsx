// import { createContext, useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { postData } from "../fetchAPI";
// import { jwtDecode } from "jwt-decode";
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const tokenStored = Cookies.get("jwtToken");
//     if (tokenStored) {
//       const decodedToken = jwtDecode(tokenStored);
//       setUser(decodedToken);
//     }
//   }, []);

//   const login = async (email, password) => {
//     const response = await postData("http://localhost:5050/api/v1/auth/login", {
//       userEmail: email,
//       password: password,
//     });

//     if (response && response.data) {
//       const token = response.data.data.token;
//       console.log(token);
//       if (token) {
//         Cookies.set("jwtToken", token, { expires: 60 });
//         const decodedToken = jwtDecode(token);
//         setUser(decodedToken);
//       }
//     }
//     return response;
//   };

//   const logout = () => {
//     Cookies.remove("jwtToken");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { patchData, postData } from "../fetchAPI";
import { jwtDecode } from "jwt-decode";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../utils/firebase/firebase";
import { signInSuccess } from "../../../redux/user/userSlice";
import { Spin } from "antd";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenStored = Cookies.get("jwtToken");
    if (tokenStored) {
      const decodedToken = jwtDecode(tokenStored);
      setUser(decodedToken);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await postData("http://localhost:5050/api/v1/auth/login", {
      userEmail: email,
      password: password,
    });

    if (response && response.data) {
      const token = response.data.data.token;
      console.log(token);
      if (token) {
        Cookies.set("jwtToken", token, { expires: 60 });
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        return decodedToken;
      }
      // setUser({ userName: data.userName, avatar: data.avatar });
    }
    return null;
  };

  const changePass = async (oldPassword, newPassword, confirmPassword) => {
    const response = await patchData(
      "http://localhost:5050/api/v1/auth/change-password",
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      }
    );
    if (response.data.status === "fail") {
      return response.data;
    }
    if (response && response.data) {
      const token = response.data.token;
      console.log(token);
      if (token) {
        Cookies.set("jwtToken", token, { expires: 60 });
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        return decodedToken;
      }
    }
    return null;
  };

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken(); // Get the JWT token

      const res = await fetch("http://localhost:5050/api/v1/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the JWT token to the headers
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();

      const serverToken = data.data.token; // Assuming the server response includes the token

      if (serverToken) {
        Cookies.set("jwtToken", serverToken); // Set the token as a cookie
        const decodedToken = jwtDecode(serverToken);
        setUser(decodedToken);
      }
      console.log(data.data.user?._id);
      setUser({
        id: data.data.user?._id,
        role: data.data.user?.role,
        avatar: data.data.user?.avatar,
        name: data.data.user?.userName,
      });
      return data;
    } catch (error) {
      console.log("could not login with google", error);
    }
  };

  const logout = async () => {
    await setIsLoading(true);
    await new Promise((resolve) => {
      setUser(null);
      resolve();
    });
    await new Promise((resolve) => {
      Cookies.remove("jwtToken");
      resolve();
    });
    await setIsLoading(false);
    if (!user) {
      return user;
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <AuthContext.Provider
        value={{ user, login, logout, handleGoogleClick, changePass }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthContext;
