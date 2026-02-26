import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!authenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}