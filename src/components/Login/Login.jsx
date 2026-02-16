import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setShowError(true);
      setShake(true);
      setTimeout(() => {
        setShowError(false);
        setShake(false);
      }, 2000);
      setPassword('');
    }
  };

  return (
    <div className="login-screen">
      <div className="login-background"></div>
      <div className={`login-card ${shake ? 'shake' : ''}`}>
        <div className="login-heart">💌</div>
        <h1 className="login-title">Open When Letters for [Her Name]</h1>
        <p className="login-subtitle">Enter the password to view the letters</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className={`login-input ${showError ? 'error' : ''}`}
            autoFocus
          />
          {showError && (
            <p className="login-error">Incorrect password. Try again!</p>
          )}
          <button type="submit" className="login-button">
            Unlock Letters
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
