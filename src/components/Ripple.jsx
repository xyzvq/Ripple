import React from 'react';
import './Ripple.css';

const Ripple = () => {
  return (
    <div style={{display: 'flex', height: '800px', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
      <div className="ripple-container">
        

        <div className="shape square top-left rim1 tl1"></div>
        <div className="shape square top-left rim2 tl2"></div>
        <div className="shape square top-left rim3 tl3"></div>

        <div className="shape circle top-right rim1 tr1"></div>
        <div className="shape circle top-right rim2 tr2"></div>
        <div className="shape circle top-right rim3 tr3"></div>

        <div className="shape circle bottom-left rim1 bl1"></div>
        <div className="shape circle bottom-left rim2 bl2"></div>
        <div className="shape circle bottom-left rim3 bl3"></div>

        <div className="shape square bottom-right rim1 br1"></div>
        <div className="shape square bottom-right rim2 br2"></div>
        <div className="shape square bottom-right rim3 br3"></div>
      </div>
    </div>
  );
};

export default Ripple;
