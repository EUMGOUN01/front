import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/public/login', {
        username,
        passwoard: password, // DB 필드명에 맞게 수정
      });

      if (response.status === 200) {
        navigate('/');
      } else {
        // 서버에서 반환된 오류 메시지를 처리합니다.
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
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
          <button type="submit" className="login-submit-button">로그인</button>
          <a href="/signup" className="signup-button">회원가입</a>
        </form>
        <div className="login-link-container">
         
        </div>
      </div>
    </div>
  );
};

export default LoginPage;