import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import '../CSS/SignupPage.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div>
      <div className="page">
        <div className="form-container">
          <h2 className="title">회원가입</h2>
          <form onSubmit={handleSignup} className="form">
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
            <div className="input-group">
              <label htmlFor="nickname" className="label">닉네임:</label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email" className="label">이메일:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>
            <button type="submit" className="button">회원가입</button>
          </form>
          <div className="link-container">
            <a href="/login" className="button login-button">로그인</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;