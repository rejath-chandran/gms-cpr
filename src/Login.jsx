import React, { useState } from 'react';
import './Login.css';  // Importing the CSS file

const Login = ({ onLoginSuccess }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // Validate credentials
    if (userId === 'admin' && password === 'password123') {
      onLoginSuccess(); // Call the parent function to indicate login success
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>LOGIN PAGE</h1>
        <div className="input-group">
          <label>User Name</label>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
        <div className="submit-btn">
          <button onClick={handleLogin}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
