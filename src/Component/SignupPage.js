import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/SignupPage.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/public/signin', {
        username,
        password,
        alias: username, // alias 필드로 username 사용
        email
      });

      // 성공적으로 전송된 후 페이지 이동
      navigate('/login');
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <div>
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
            <button type="submit" className="Signbutton">회원가입</button>
          </form>
          <div className="Signlink-container">
            <a href="/login" className="Signbutton Signlogin-button">로그인</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;