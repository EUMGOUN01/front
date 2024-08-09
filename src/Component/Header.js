import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Header.css';  // CSS 파일을 임포트

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="top-nav">
        <span className="top-nav-item" onClick={() => navigate('/login')}>로그인</span>
        <span className="top-nav-item" onClick={() => navigate('/logout')}>로그아웃</span>
      </div>
      <hr className="divider" />
      <h1 onClick={() => navigate('/')}>Greenery</h1>
      <hr className="divider" />
      <nav>
        <NavItem href="/info">식물백과</NavItem>
        <NavItem href="/plant-sharing">식물나눔</NavItem>
        <NavItem href="/board">커뮤니티</NavItem>
        <NavItem href="/community-garden">공용텃밭</NavItem>
      </nav>
    </header>
  );
};

const NavItem = ({ href, children }) => {
  const navigate = useNavigate();

  return (
    <div className="nav-item" onClick={() => navigate(href)}>
      {children}
    </div>
  );
};

export default Header;