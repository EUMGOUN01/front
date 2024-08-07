import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import '../CSS/Header.css';  

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <h1 onClick={() => navigate('/')}>Greenery</h1>
      <div className="top-nav">
        <span className="top-nav-item" onClick={() => navigate('/login')}>로그인</span>
        <span className="top-nav-item" onClick={() => navigate('/logout')}>로그아웃</span>
      </div>
      <nav>
        <NavItem href="/info">식물 사전</NavItem>
        <NavItem href="/plant-sharing">식물 나눔</NavItem>
        <NavItem href="/board">커뮤니티</NavItem>
        <NavItem href="/community-garden">공용 텃밭</NavItem>
        <FiMenu className="menu-icon" />
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