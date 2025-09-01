import { useState } from 'react';

function CreateUser() {
  // State variables to store form input values
  const [UserName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!UserName) newErrors.UserName = 'UserName is required';
    if (!Email) newErrors.Email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(Email)) newErrors.Email = 'Email is invalid';
    if (!Password) newErrors.Password = 'Password is required';
    else if (Password.length < 6) newErrors.Password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ UserName, Email, Password })
        };

        console.log(requestOptions);

        fetch('http://localhost:32770/Api/Users/Create', requestOptions)
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

    // Clear the form after submission
    setUserName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div class="form-container">
      <h1>Create SpeedApply User</h1>
      <form onSubmit={handleSubmit} novalidate>
        <div>
          <label htmlFor="UserName">UserName:</label>
          <input
            type="text"
            id="UserName"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <p className="error">{errors.UserName}</p>
        </div>
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
        <button class="submit-btn" type="submit">Create User</button>
      </form>
    </div>
  );
}

export default CreateUser;