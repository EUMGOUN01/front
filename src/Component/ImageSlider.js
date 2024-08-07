import React, { useState } from 'react';
import '../CSS/ImageSlider.css'; // CSS 파일 import

const images = [
  `${process.env.PUBLIC_URL}/pots.png`,
  `${process.env.PUBLIC_URL}/pots.png`,
  `${process.env.PUBLIC_URL}/pots.png`,
  `${process.env.PUBLIC_URL}/pots.png`,
  `${process.env.PUBLIC_URL}/pots.png`,
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState('none');

  const goToSlide = (index) => {
    setTransition('transform 0.5s ease-in-out');
    setCurrentIndex(index);
  };

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <div
          className="image-container"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition,
          }}
        >
          {images.map((src, index) => (
            <div key={index} className="image-wrapper">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="image-style"
              />
              {index === 0 && (
                <div className="text-overlay show">
                  나의<br/>반려식물을<br/>소개해주세요.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="indicator-container">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className="indicator"
            style={{
              backgroundColor: currentIndex === index ? '#fff' : '#ddd',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;