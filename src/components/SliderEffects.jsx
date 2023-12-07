import React, { useState } from 'react';
import { Box, Slider, Stack } from '@mui/material';
import './SliderEffects.css';

const SliderEffects = () => {
    const [height, setHeight] = useState(100);
    const [width, setWidth] = useState(100);
    const [rotationX, setRotationX] = useState(0);
    const [rotationY, setRotationY] = useState(0);
    const [rotationZ, setRotationZ] = useState(0);
    const [transparency, setTransparency] = useState(100);
    const [roundness, setRoundness] = useState(0);

    const handleHeightChange = (event, newValue) => setHeight(newValue);
    const handleWidthChange = (event, newValue) => setWidth(newValue);
    const handleRotationXChange = (event, newValue) => setRotationX(newValue);
    const handleRotationYChange = (event, newValue) => setRotationY(newValue);
    const handleRotationZChange = (event, newValue) => setRotationZ(newValue);
    const handleTransparencyChange = (event, newValue) => setTransparency(newValue);
    const handleRoundnessChange = (event, newValue) => setRoundness(newValue);

    const shapeStyle = {
        height: `${height}px`,
        width: `${width}px`,
        transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
        opacity: transparency / 100,
        borderRadius: `${roundness}%`
    };

    return (
        <Box>
            <Box sx={{ width: 300 }}>
                <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
                    <Slider aria-label="Height" value={height} onChange={handleHeightChange} min={10} max={300} />
                    <Slider aria-label="Width" value={width} onChange={handleWidthChange} min={10} max={300} />
                    <Slider aria-label="Rotation X" value={rotationX} onChange={handleRotationXChange} min={0} max={360} />
                    <Slider aria-label="Rotation Y" value={rotationY} onChange={handleRotationYChange} min={0} max={360} />
                    <Slider aria-label="Rotation Z" value={rotationZ} onChange={handleRotationZChange} min={0} max={360} />
                    <Slider aria-label="Transparency" value={transparency} onChange={handleTransparencyChange} min={0} max={100} />
                    <Slider aria-label="Roundness" value={roundness} onChange={handleRoundnessChange} min={0} max={100} />
                </Stack>
            </Box>

            <Box display={'flex'} justifyContent={'center'}>
                {/* <div className="shape square" style={shapeStyle}></div> */}
                {/* <div className="wave-shape"></div> */}
                <div className="rolling-wave"></div>


            </Box>
        </Box>
    );
};

export default SliderEffects;
