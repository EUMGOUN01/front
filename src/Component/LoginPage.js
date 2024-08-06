import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'; 
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
    <div>
      <div className="page">
        <div className="form-container">
          <h2 className="title">로그인</h2>
          <form onSubmit={handleLogin} className="form">
            <div className="input-group">
              <label htmlFor="username" className="label">아이디:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="label">비밀번호:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
            </div>
            <button type="submit" className="button">로그인</button>
          </form>
          <div className="link-container">
            <a href="/signup" className="link">회원가입</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;