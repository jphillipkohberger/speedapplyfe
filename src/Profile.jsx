import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

export default function Profile() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/Login", { replace: true });
  }

  return (
    <div className="form-container">
      <h1>SpeedApply User Profile</h1>
      <p>Welcome{user?.Email ? `, ${user.Email}` : ""}!</p>
      <form noValidate>
        <p>
          <button onClick={handleLogout} className="submit-btn">Log out</button>
        </p>
      </form>
    </div>
  );
}