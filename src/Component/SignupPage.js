import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

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
      <div style={pageStyle}>
        <div style={formContainerStyle}>
          <h2 style={titleStyle}>회원가입</h2>
          <form onSubmit={handleSignup} style={formStyle}>
            <div style={inputGroupStyle}>
              <label htmlFor="username" style={labelStyle}>아이디:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
            <div style={inputGroupStyle}>
              <label htmlFor="password" style={labelStyle}>비밀번호:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
            <div style={inputGroupStyle}>
              <label htmlFor="nickname" style={labelStyle}>닉네임:</label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
            <div style={inputGroupStyle}>
              <label htmlFor="email" style={labelStyle}>이메일:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
            <button type="submit" style={buttonStyle}>회원가입</button>
          </form>
          <div style={linkContainerStyle}>
            <a href="/login" style={linkStyle}>로그인</a>
          </div>
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

// 스타일 
const pageStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
};

const formContainerStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
  width: '100%',
};

const titleStyle = {
  marginBottom: '20px',
  fontSize: '24px',
  color: '#333',
  textAlign: 'center',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const inputGroupStyle = {
  marginBottom: '15px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontSize: '14px',
  color: '#666',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '14px',
  border: '1px solid #ddd',
  borderRadius: '4px',
};

const buttonStyle = {
  backgroundColor: '#004d40',
  color: '#ffffff',
  border: 'none',
  padding: '10px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
};

const linkContainerStyle = {
  marginTop: '10px',
  textAlign: 'center',
};

const linkStyle = {
  color: '#004d40',
  textDecoration: 'none',
  fontSize: '14px',
};

export default SignupPage;
