import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

// context object
const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: async (_Email, _Password) => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  // Rehydrate
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem("isAuthenticated");
    return saved ? JSON.parse(saved) : false;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const navigate = useNavigate();

  async function login(Email, Password) {
    
    if (!Email || !Password) {
      throw new Error("Email and Password required");
    }

    const UserName = Email;

    const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ UserName, Email, Password })
    };

    console.log('Request Options:', requestOptions);
    console.log(import.meta.env.VITE_API_URL);

    fetch(import.meta.env.VITE_API_URL + '/Api/Users/Login', requestOptions)
      .then(response => {
        if (!response.ok) {
          console.log(`HTTP error! status: ${response.status}`);
          throw new Error(response);
        }
        return response.json();
      })
      .then(user => {
        console.log(user);
        setIsAuthenticated(JSON.stringify(user));
        setUser(JSON.stringify(user));
        localStorage.setItem("isAuthenticated", JSON.stringify(user));
        localStorage.setItem("user", JSON.stringify(user));

        /**
         * must have three fields filled out 
         * in profile address, query, min salary
         */

        console.log("USER LOG");
        console.log(user);

        navigate("/Dashboard", { replace: true });

      })
      .catch(error => {
        console.log(error);
      });
  }

  function logout() {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    fetch(import.meta.env.VITE_API_URL + '/Api/Users/Logout');
  }

  const value = useMemo(
    () => ({ isAuthenticated, user, login, logout }),
    [isAuthenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
