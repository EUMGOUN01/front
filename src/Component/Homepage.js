import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; 
import ImageSlider from './ImageSlider'; 
import Footer from './Footer'; 

const MainPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={mainPageStyle}>
      <div style={mainContentStyle}>
        <ImageSlider />
        <div style={buttonContainerStyle}>
          <div
            style={{ ...buttonStyle, backgroundColor: '#ffeb3b' }}
            onClick={() => handleNavigation('/info')}
          >
            정보 제공
          </div>
          <div
            style={{ ...buttonStyle, backgroundColor: '#8bc34a' }}
            onClick={() => handleNavigation('/sharing')}
          >
            식물 나눔
          </div>
          <div
            style={{ ...buttonStyle, backgroundColor: '#03a9f4' }}
            onClick={() => handleNavigation('/board')}
          >
            자유 게시판
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mainPageStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const mainContentStyle = {
  flex: '1',
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#f5f5f5',
};

const buttonContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: '10px',
  marginTop: '20px',
};

const buttonStyle = {
  flex: '1',
  padding: '20px',
  color: 'white',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '5px',
  fontSize: '18px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

export default MainPage;

