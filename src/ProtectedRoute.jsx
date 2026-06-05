import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";
import { useLocation } from 'react-router-dom';

// Wrap protected pages with this to block access if not logged in
export default function ProtectedRoute({ children }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  if(!location.pathname.includes("/Profile") && (!user.address || !user.minSal || user.files.length == 0)) {
    console.log("no user");
    return <Navigate to="/Profile" replace />;
  }
  console.log("there is a user")
  console.log(user);

  return children;
}
