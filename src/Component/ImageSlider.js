import React, { useState } from 'react';

// 이미지 배열
const images = [
  `${process.env.PUBLIC_URL}/Forest.png`,
  `${process.env.PUBLIC_URL}/Forest.png`,
  `${process.env.PUBLIC_URL}/Forest.png`,
  `${process.env.PUBLIC_URL}/Forest.png`,
  `${process.env.PUBLIC_URL}/Forest.png`,
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState('none');

  const goToSlide = (index) => {
    setTransition('transform 0.5s ease-in-out');
    setCurrentIndex(index);
  };

  return (
    <div style={sliderContainerStyle}>
      <div style={sliderWrapperStyle}>
        <div
          style={{
            ...imageContainerStyle,
            transform: `translateX(-${currentIndex * 100}%)`,
            transition,
          }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              style={imageStyle}
            />
          ))}
        </div>
      </div>
      <div style={indicatorContainerStyle}>
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              ...indicatorStyle,
              backgroundColor: currentIndex === index ? '#000' : '#bbb',
            }}
          />
        ))}
      </div>
    </div>
  );
};

const sliderContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  position: 'relative',
};

const sliderWrapperStyle = {
  overflow: 'hidden',
  width: '100%',
  maxWidth: '1000px',
  position: 'relative',
};

const imageContainerStyle = {
  display: 'flex',
  transition: 'transform 0.5s ease-in-out',
  width: '100%',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
};

const indicatorContainerStyle = {
  position: 'absolute',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '5px',
};

const indicatorStyle = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: '#bbb',
  cursor: 'pointer',
};

export default ImageSlider;