import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../services/authAPI/authProvideAPI";

const PrivateRoute = ({ element: Component, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If there is no user, consider them a guest
    if (allowedRoles.includes("guest")) {
      return <Component />;
    } else {
      return <Navigate to="/login" />;
    }
  }

  if (allowedRoles.includes(user.role)) {
    return <Component />;
  }

  // If the user does not have the required role, redirect them
  return <Navigate to="/" />;
};

export default PrivateRoute;
