import { useState } from 'react'
import './App.css'
import CreateUser from './CreateUser';
import Login from './Login';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

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
        <Route path="/Login" exact element={<Login />}/>
        <Route path="/CreateUser" exact element={<CreateUser />}/>
      </Routes>
    </>
  )
}

export default App
