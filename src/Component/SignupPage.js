import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/SignupPage.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await fetch('http://localhost:8080/public/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, alias: nickname, email }),
      });
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err);
      setError('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="Signpage">
      <div className="Signform-container">
        <h2 className="Signtitle">회원가입</h2>
        <form onSubmit={handleSignup} className="Signform">
          <div className="Signinput-group">
            <label htmlFor="username" className="Signlabel">아이디:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="Signinput"
              required
            />
          </div>
          <div className="Signinput-group">
            <label htmlFor="password" className="Signlabel">비밀번호:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="Signinput"
              required
            />
          </div>
          <div className="Signinput-group">
            <label htmlFor="nickname" className="Signlabel">닉네임:</label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="Signinput"
              required
            />
          </div>
          <div className="Signinput-group">
            <label htmlFor="email" className="Signlabel">이메일:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="Signinput"
              required
            />
          </div>
          {error && <p className="Signerror-message">{error}</p>}
          <button type="submit" className="Signbutton">회원가입</button>
          <div className="Signlink-container">
            <a href="/login" className="Signbutton Signlogin-button">로그인</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;