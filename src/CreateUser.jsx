// src/components/CreateUser.jsx
import { useState } from 'react';

function CreateUser() {
  // State variables to store form input values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Here, you would typically send this data to a backend API
    console.log('User created:', { username, email, password });

    // Clear the form after submission (optional)
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div class="form-container">
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button class="submit-btn" type="submit">Create User</button>
      </form>
    </div>
  );
}

export default CreateUser;