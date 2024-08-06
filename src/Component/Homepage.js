import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from './Header'; 
import ImageSlider from './ImageSlider'; 
import Footer from './Footer'; 
import '../CSS/Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="homepage">
      <div className="main-content">
        <ImageSlider />
        <div className="button-container">
          <div
            className="button yellow"
            onClick={() => handleNavigation('/info')}
          >
            정보 제공
          </div>
          <div
            className="button green"
            onClick={() => handleNavigation('/sharing')}
          >
            식물 나눔
          </div>
          <div
            className="button blue"
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

export default Homepage;