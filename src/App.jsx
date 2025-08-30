import { useState } from 'react'
import './App.css'
import CreateUser from './CreateUser';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/index.html';

  return (
    <>
      <title>SpeedApply</title>
      {isHomePage && (
        <Link class="CreateSpeedApplyUser" to="/CreateUser">Create SpeedApply User</Link>
      )}
      <Routes>
        <Route path="/CreateUser" exact element={<CreateUser />}/>
      </Routes>
    </>
  )
}

export default App
