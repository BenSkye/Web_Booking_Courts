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
import { postData } from "../fetchAPI";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tokenStored = Cookies.get("jwtToken");
    if (tokenStored) {
      const decodedToken = jwtDecode(tokenStored);
      setUser(decodedToken);
    }
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
        return decodedToken; // Trả về thông tin người dùng đã giải mã
      }
    }
    return null;
  };

  const logout = () => {
    Cookies.remove("jwtToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;