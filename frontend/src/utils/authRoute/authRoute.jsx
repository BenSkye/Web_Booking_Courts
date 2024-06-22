// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";
import AuthContext from "../../services/authAPI/authProvideAPI";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, roles }) => {
  const [thisUser, setThisUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    console.log("thisUser", thisUser);
  }, [thisUser]);
  useEffect(() => {
    console.log("user", user);
    if (user) {
      setThisUser(user);
      setIsLoading(false);
    }
    if (user === null) {
      setThisUser(null);
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    console.log("user28", user);
  }, []);

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

  if (thisUser) {
    // eslint-disable-next-line react/prop-types
    if (roles.includes("guest")) {
      if (thisUser.role === "manager" ) {
        return <Navigate to="/no-access" />;
      }
      if (thisUser.role === "admin" ) {
        return <Navigate to="/admin/Dashboard" />;
      }
      return children;
    }
    // eslint-disable-next-line react/prop-types
  
    // eslint-disable-next-line react/prop-types
  
   
    // eslint-disable-next-line react/prop-types
    if (!roles.includes(thisUser.role)) {
      return <Navigate to="/no-access" />;
    }
    return children;
    
  }
  if (thisUser === null) {
    // eslint-disable-next-line react/prop-types
    if (roles.includes("guest")) {
      return children;
    } else {
      return <Navigate to="/no-access" />;
    }
  }
 
  return children;
};

export default ProtectedRoute;
