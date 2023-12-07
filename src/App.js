import React from 'react';
import ThreeScene from './components/ThreeScene';
import { useState } from 'react';
import './App.css';

const App = () =>{
    const [xMultiplier, setXMultiplier] = useState(10.0);
    const [yMultiplier, setYMultiplier] = useState(10.0);
    const [rippleSpeed, setRippleSpeed] = useState(0.75);
    const [noiseStrength, setNoiseStrength] = useState(2.0);
    

  return (
      <div className="App">
          <ThreeScene 
              xMultiplier={xMultiplier}
              yMultiplier={yMultiplier}
              rippleSpeed={rippleSpeed}
              noiseStrength={noiseStrength}
              setXMultiplier={setXMultiplier}
              setYMultiplier={setYMultiplier}
              setRippleSpeed={setRippleSpeed}
              setNoiseStrength={setNoiseStrength}
          />

          
      </div>
  );
}

export default App;
