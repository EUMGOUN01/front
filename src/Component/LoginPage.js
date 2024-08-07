import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2 className="login-title">로그인</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-input-group">
            <label htmlFor="username" className="login-label">아이디:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div className="login-input-group">
            <label htmlFor="password" className="login-label">비밀번호:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <button type="submit" className="login-submit-button">로그인</button>
          <a href="/signup" className="signup-button">회원가입</a>
        </form>
        <div className="login-link-container">
          <a href="/forgot-password" className="login-link">비밀번호를 잊으셨나요?</a>
        </div>
      </div>
     
    </div>
  );
};

export default LoginPage;