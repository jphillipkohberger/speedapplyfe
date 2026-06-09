import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";
import { useState, useRef, useEffect } from "react";

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [Query, setQuery] = useState('');
  const [errors, setErrors] = useState({});

  function handleLogout() {
    logout();
    navigate("/Login", { replace: true });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(validateForm()) {

      fetch(import.meta.env.VITE_API_URL + '/Api/RootUrls/RunQuery' + '?query=' + encodeURIComponent(Query))
        .then(response => {
          if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Server Response: Success: data:');
          console.log(data);
          try {

          } catch (err) {
            setErrors(errors);
          }
        });

      return;
    }

  };

  const validateForm = () => {
    let newErrors = {};
    if (!Query) newErrors.Query = 'Query is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="form-container">
      <h1>SpeedApply User Dashboard</h1>
      <p>Welcome{user?.Email ? `, ${user.Email}` : ""}!</p>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="Query">Job Search:</label>
          <input
            type="text"
            id="Query"
            value={Query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <p className="error">{errors.Query}</p>
          </div>
        <p>
          <button onClick={handleSubmit} className="submit-btn">Search</button>
        </p>
      </form>
      <form noValidate>
        <p>
          <button onClick={handleLogout} className="submit-btn">Log out</button>
        </p>
      </form>
    </div>
  );
}