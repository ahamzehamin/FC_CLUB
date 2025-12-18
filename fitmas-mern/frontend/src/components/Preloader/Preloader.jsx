import React from 'react';
import './Preloader.css';

const Preloader = () => {
  console.log('Preloader component is rendering');
  return (
    <div className="preloader">
      <div className="preloader-inner">
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default Preloader;
