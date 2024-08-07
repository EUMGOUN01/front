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
      <div className="homepage-main-content">
        <ImageSlider />
        <div className="homepage-button-container">
          <div
            className="homepage-button yellow"
            onClick={() => handleNavigation('/info')}
          >
            식물정보
          </div>
          <div
            className="homepage-button green"
            onClick={() => handleNavigation('/sharing')}
          >
            식물 나눔
          </div>
          <div
            className="homepage-button blue"
            onClick={() => handleNavigation('/board')}
          >
            커뮤니티
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;