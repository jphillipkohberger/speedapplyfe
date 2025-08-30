import { useState } from 'react';

function CreateUser() {
  // State variables to store form input values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // @TODO Send data to API
    console.log('User created:', { username, email, password });

    // Clear the form after submission
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div class="form-container">
      <h1>Create SpeedApply User</h1>
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