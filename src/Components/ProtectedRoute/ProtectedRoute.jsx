import { Navigate } from "react-router-dom";
import { AuthService } from "../../Services/auth";

export function ProtectedRoute({ children }) {
  function hasJWT() {
    return AuthService.getCookie("token") ? true : false;
  }

  if (!hasJWT()) {
    return <Navigate to="/login" />;
  }

  return children;
}
