import { useState } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const CreateUser = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // State variables to store form input values
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordConfirmVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // If already logged in, skip login page
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  const validateForm = () => {
    let newErrors = {};
    if (!Email) newErrors.Email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(Email)) newErrors.Email = 'Email is invalid';
    if (!Password) newErrors.Password = 'Password is  required';
    else if (Password.length < 6) newErrors.Password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {

        const UserName = Email;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ UserName, Email, Password })
        };

        console.log(import.meta.env.VITE_API_URL);

        fetch(import.meta.env.VITE_API_URL + '/Api/Users/Create', requestOptions)
          .then(response => {
            if (!response.ok) {
              console.log(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            try {
              login(Email, Password);
              navigate("/Dashboard", { replace: true });
            } catch (err) {
              errors.Password = 'Login Failed';
              setErrors(errors);
            }
          })
          .catch(error => {
            console.log(error);
          });
    }

    // Clear the form after submission
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="form-container">
      <h1>Create SpeedApply User</h1>
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
        <div style={{ position: 'relative', width: '400px' }}>
          <label htmlFor="Password">Password:</label>         
          <input
            type={showPassword ? "text" : "password"}
            id="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{ width: '100%', paddingRight: '40px' }}
          />
          <span 
            onClick={togglePasswordVisibility} 
            style={{ 
              position: 'absolute', 
              right: '10px', 
              top: '55%', 
              transform: 'translateY(-50%)', 
              cursor: 'pointer' 
            }}
          >
            {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
          </span> 
          <p className="error">{errors.Password}</p>
        </div>
        <div style={{ position: 'relative', width: '400px' }}>
          <label htmlFor="confirmPassword">Confirm Password:</label>         
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter password"
            style={{ width: '100%', paddingRight: '40px' }}
          />
          <span 
            onClick={togglePasswordConfirmVisibility} 
            style={{ 
              position: 'absolute', 
              right: '10px', 
              top: '55%', 
              transform: 'translateY(-50%)', 
              cursor: 'pointer' 
            }}
          >
            {showConfirmPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
          </span> 
          <p className="error">{errors.confirmPassword}</p>
        </div>
        <button className="submit-btn" type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;