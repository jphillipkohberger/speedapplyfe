import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";
import { useLocation } from 'react-router-dom';

// Wrap protected pages with this to block access if not logged in
export default function ProtectedRoute({ children }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return <Navigate to="/Login" replace />;
  }

  // if user is string try to parse it as JSON, 
  // if it fails then it's a regular string and we should log out the user
  if (typeof user === "string") {
    try {
      const parsed = JSON.parse(user);
      // parsed not JSON throw error bail out
      if (!parsed || typeof parsed !== "object") {
        console.log("Parsed user is not an object:", parsed);
        throw new Error("Parsed user is not an object");
      }
      // parsed is JSON and an object, we can use it
      var url = import.meta.env.VITE_API_URL + '/Api/Users/' + parsed.id
    } catch (e) {
      return "Regular string (not JSON)";
    }
  }
  // typeof user is object, we can use it directly
  else if (typeof user === "object") {
    var url = import.meta.env.VITE_API_URL + '/Api/Users/' + user.id
  }

  try {
    
    const requestOptions = {
      method: 'GET'
    };

    // Re-fetch user data to ensure we have the latest info
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          console.log(`HTTP error! status: ${response.status}`);
          throw new Error(response);
        }
        return response.json();
      })
      .then(userData => {
        console.log("Refreshed user data:", userData);
        if(!location.pathname.includes("/Profile") && (!userData.address || !userData.minSal || userData.files.length == 0)) {
          console.log("no user");
          navigate("/Profile", { replace: true });
        }
      });

    console.log("there is a user")
    console.log(user);
  } catch (err) {
    console.log("Error fetching user data:", err);
    // If there's an error fetching user data, we can log out the user or navigate to login
    // navigate("/Login", { replace: true });
  }

  return children;
}
