import { useState } from 'react';

const Dashboard = () => {
  // State variables to store form input values
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

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
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
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

export default Dashboard;