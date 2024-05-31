import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  const login = (email, password) => {
    if (email === "customer@gmail.com" && password === "customer123") {
      const user = { email, role: "customer" };
      Cookies.set("user", JSON.stringify(user), { expires: 60 });
      setUser(user);
      return true;
    }
    if (email === "manager@gmail.com" && password === "manager123") {
      const user = { email, role: "manager" };
      Cookies.set("user", JSON.stringify(user), { expires: 60 });
      setUser(user);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    Cookies.remove("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
