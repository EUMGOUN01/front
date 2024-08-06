import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header style={headerStyle}>
      <h1
        style={logoStyle}
        onClick={() => navigate('/')}
      >
        Greenery
      </h1>
      <div style={topNavStyle}>
        <span style={topNavItemStyle} onClick={() => navigate('/login')}>
          로그인
        </span>
        <span style={topNavItemStyle} onClick={() => navigate('/logout')}>
          로그아웃
        </span>
      </div>
      <nav style={navStyle}>
        <NavItem href="/info">정보제공</NavItem>
        <NavItem href="/plant-sharing">식물 나눔</NavItem>
        <NavItem href="/board">자유게시판</NavItem>
        <NavItem href="/community-garden">공용 텃밭</NavItem>
        <FiMenu style={menuIconStyle} />
      </nav>
    </header>
  );
};

const NavItem = ({ href, children }) => {
  const navigate = useNavigate();

  return (
    <div
      style={navItemStyle}
      onClick={() => navigate(href)}
    >
      {children}
    </div>
  );
};

const headerStyle = {
  background: '#e0f2f1',
  padding: '20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  // 헤더를 페이지 스크롤과 함께 움직이도록 설정 (기본값)
  position: 'static',
};

const logoStyle = {
  fontSize: '36px',
  color: '#004d40',
  cursor: 'pointer',
  margin: '0',
  fontFamily: "'Arial', sans-serif",
};

const topNavStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  display: 'flex',
  gap: '10px',
};

const topNavItemStyle = {
  fontSize: '14px',
  color: '#2c6b6f',
  cursor: 'pointer',
};

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '20px 0',
  position: 'relative',
};

const navItemStyle = {
  margin: '0 15px',
  fontSize: '14px',
  color: '#2c6b6f',
  cursor: 'pointer',
};

const menuIconStyle = {
  fontSize: '24px',
  color: '#004d40',
  cursor: 'pointer',
  position: 'absolute',
  right: '10px',
};

export default Header;