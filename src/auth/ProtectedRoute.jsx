import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";

export default function ProtectedRoute() {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const { pathname } = location;

  if (!isLoggedIn) {
    const redirectUrl = `/login?message=You must log in first.&redirectTo=${pathname}`;
    return <Navigate to={redirectUrl} />;
  }

  return <Outlet />;
}
