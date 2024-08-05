import React from 'react';
import Header from './Header'; 
import ImageSlider from './ImageSlider'; 
import Footer from './Footer'; 

const MainPage = () => {
  return (
    <div style={mainPageStyle}>
      <div style={mainContentStyle}>
        <ImageSlider />
        
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

export default MainPage;