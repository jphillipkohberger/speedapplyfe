import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

// Wrap protected pages with this to block access if not logged in
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  return children;
}
