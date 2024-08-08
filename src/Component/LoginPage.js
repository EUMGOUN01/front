import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/public/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // 로그인 성공 시 토큰 저장 또는 상태 관리 도구 사용
        // localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        throw new Error('로그인 실패');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
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
          {error && <p className="login-error-message">{error}</p>}
          <button type="submit" className="login-submit-button">로그인</button>
          <a href="/signup" className="signup-button">회원가입</a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;