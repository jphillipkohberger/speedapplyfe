import { useState } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // State variables to store form input values
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // If already logged in, skip login page
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const validateForm = () => {
    let newErrors = {};
    if (!Email) newErrors.Email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(Email)) newErrors.Email = 'Email is invalid';
    if (!Password) newErrors.Password = 'Password is required';
    else if (Password.length < 6) newErrors.Password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {

      // Send these credentials to API
      console.log('Email:', Email);
      console.log('Password:', Password);

      try {
        login(Email, Password);
        navigate("/Dashboard", { replace: true });
      } catch (err) {
        errors.Password = 'Login Failed';
        setErrors(errors);
      }
    }

    // Clear the form fields after submission
    setEmail('');
    setPassword('');
  };

  return (
    <div className="form-container">
      <h1>Login SpeedApply User</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="Email">Email:</label>
          <input
            type="text"
            id="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="error">{errors.Email}</p>
        </div>
        <div>
          <label htmlFor="Password">Password:</label>
          <input
            type="Password"
            id="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="error">{errors.Password}</p>
        </div>
        <button className="submit-btn" type="submit">Login User</button>
      </form>
    </div>
  );
};

export default Login;