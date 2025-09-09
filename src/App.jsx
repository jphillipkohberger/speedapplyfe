import './App.css'
import CreateUser from './CreateUser';
import Login from './Login';
import Dashboard from './Dashboard';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/index.html';

  return (
    <>
      <title>SpeedApply</title>
      {isHomePage && (
        <>
          <p className="parent-link">
          <Link className="CreateSpeedApplyUser" to="/CreateUser">Create SpeedApply User</Link>
          </p>
          <p className="parent-link">
          <Link className="LoginSpeedApplyUser" to="/Login">Login SpeedApply User</Link>
          </p>
        </>
      )}
      <Routes>
        <Route path="/CreateUser" exact element={<CreateUser />}/>
        <Route path="/Login" exact element={<Login />}/>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
