import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="form-container">
      <h1>SpeedApply User Dashboard</h1>
      <p>Welcome{user?.Email ? `, ${user.Email}` : ""}!</p>
      <form noValidate>
        <p>
          <button onClick={handleLogout} className="subnit--btn">Log out</button>
        </p>
      </form>
    </div>
  );
}