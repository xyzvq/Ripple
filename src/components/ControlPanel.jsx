import React from 'react';
import { Box, Slider, Stack, Typography, Grid, useMediaQuery, Switch, FormControlLabel, Tabs, Tab, Divider, Button, IconButton  } from '@mui/material';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { GiMeshBall } from "react-icons/gi";
import { GiCube } from "react-icons/gi";
import TextureIcon from '@mui/icons-material/Texture';
import { PiCubeTransparent } from "react-icons/pi";
import { PiCubeTransparentFill } from "react-icons/pi";
import { GiHolosphere } from "react-icons/gi";
import { GiDividedSquare } from "react-icons/gi";


import Sliders from './Sliders';
import "./ControlPanel.css";


const ControlPanel = ({
    expanded, setExpanded, currentTab, setCurrentTab, isMobile,
    xMultiplier, setXMultiplier, yMultiplier, setYMultiplier,
    rippleSpeed, setRippleSpeed, noiseStrength, setNoiseStrength,
    wireFrame, setWireFrame, xDensity, setXDensity, yDensity, setYDensity,
    color1Red, setColor1Red, color1Green, setColor1Green, color1Blue, setColor1Blue,
    color2Red, setColor2Red, color2Green, setColor2Green, color2Blue, setColor2Blue,
    rotationX, setRotationX, rotationY, setRotationY, rotationZ, setRotationZ,
    gradientBlend, setGradientBlend, shape, setShape,
}) => {

    const buttonColor = 'rgba(85,221,224,1.0)';
    const handleToggleExpand = () => {
        setExpanded(!expanded);
    }

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    }

    const handleShapeChange = (event, newValue) => {
        setShape(newValue);
    }



    return (
        <Box>
            <Box sx={{
                display: 'flex',
                position: 'absolute',  
                top: '5%',  
                left: '1%',  
                zIndex: 2,  
                width: expanded ? isMobile ? '90%' : '22%' : '42px', 
                height: expanded ? '90%' : '42px',
                flexDirection: 'column', 
                border: '2px solid rgba(100, 100, 200, 0.4)', 
                borderRadius: '12px', 
                backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                transition: 'width 0.5s, height 0.5s',  
                overflow: isMobile ? 'scroll' : 'hidden',
                }}>


                <Box display={'flex'} marginTop={'4%'} flexDirection={'column'}>
                    <TuneOutlinedIcon 
                        sx={{ marginLeft: '5%',   fontSize: '40px', color: 'rgba(249,249,249, 1)' }}
                        onClick={handleToggleExpand}
                    />

                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        centered
                        sx={{ 
                            display: 'flex',
                            width: '100%',
                            marginTop: '1.5%',
                            marginLeft: '-3%',
                            borderBottom: 2, 
                            '& .MuiTabs-indicator': {
                                // maxWidth: '17%', // Set the maximum width of the indicator
                                // marginLeft: '8%'
                            },
                            '& .MuiTabs-flexContainer': {
                                justifyContent: 'center',
                            },
                            '& .MuiTab-root': {
                                flex: 1, // This makes each tab flexible
                                minWidth: '33%', // Minimum width of a tab
                                fontSize: '14px', // Default font size
                                // border: '1px solid rgba(255, 255, 255, 0.5)',
                                fontWeight: 'bold',
                                '@media (max-width: 1100px)': { fontSize: '15px' },
                                '@media (max-width: 900px)': { fontSize: '12px' },
                                '@media (max-width: 800px)': { fontSize: '10px' },
                                '@media (max-width: 600px)': { fontSize: '14px' },
                            },
                        }}
                    >
                        <Tab label="Shape" value="shape" sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                        <Tab label="Motion" value="motion" sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                        <Tab label="Surface" value="surface" sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                    </Tabs>
                </Box>

                { currentTab === 'shape' &&(
                    <Box>
                        <Sliders spacing={1}
                        sliders={[
                            { label: 'X', value: xMultiplier, setter: setXMultiplier, min: 0.0, max: 20.0, step: 0.1 },
                            { label: 'Res X', value: xDensity, setter: setXDensity, min: 1.0, max: 80.0, step: 1.0},
                            { label: 'Y', value: yMultiplier, setter: setYMultiplier, min: 0.0, max: 20.0, step: 0.1 },
                            { label: 'Res Y', value: yDensity, setter: setYDensity, min: 1.0, max: 80.0, step: 1.0},
                            { label: 'Strength', value: noiseStrength, setter: setNoiseStrength, min: 0.1, max: 4.0, step: 0.1 },
                            ]}
                        />
                        <Divider sx={{ 
                            width: '90%', 
                            marginLeft: 'auto', 
                            marginRight: 'auto',
                            marginTop: '-5%',
                            backgroundColor: 'rgba(100, 100, 255, 0.5)', // Adjust the RGBA values as needed
                            height: '0.5px' 
                        }} />
                        
                        <Box display={'flex'} justifyContent={'space-evenly'} marginTop={'5%'}>
                            
                            <IconButton aria-label="square" onClick={(e) => handleShapeChange(e, 'square')}  color="primary" >
                                <GiDividedSquare  className="shapeButton"/>
                            </IconButton>
                            <IconButton area-label="sphere" onClick={(e) => handleShapeChange(e, 'sphere')}  color="primary" >
                                <GiHolosphere className="shapeButton"/>
                            </IconButton>
                            <IconButton area-label="cube" color="primary" >
                                <PiCubeTransparent className="shapeButton"/>
                            </IconButton>

                        </Box>

                    </Box>
                )}

                { currentTab === 'motion' &&
                (<Sliders spacing={1}
                   sliders={[
                        { label: 'X°', value: rotationX, setter: setRotationX, min: -Math.PI, max: Math.PI, step: 0.01 },
                        { label: 'Y°', value: rotationY, setter: setRotationY, min: -Math.PI, max: Math.PI, step: 0.01 },
                        { label: 'Z°', value: rotationZ, setter: setRotationZ, min: -Math.PI, max: Math.PI, step: 0.01 },
                         { label: 'Speed', value: rippleSpeed, setter: setRippleSpeed, min: 0.1, max: 1.5, step: 0.05 },
                    
                    ]}
                />)}


                { currentTab === 'surface' &&
                    <Box display={'flex'} flexDirection={'column'}>
                        <Box marginLeft='6%'>
                            <FormControlLabel
                                control={
                                    <Switch onChange={(e) => setWireFrame(e.target.checked)} checked={wireFrame}
                                        sx={{
                                            '& .MuiSwitch-track': {
                                                backgroundColor: 'white', 
                                                opacity: 0.4,
                                            },
                                        }}
                                    />
                                }
                                    label="Wireframe"
                            />
                        </Box>
                         <Box width={'90%'}>
                            <Sliders
                            sliders={[
                                { label: 'Blend', value: gradientBlend, setter: setGradientBlend, min: 1.0, max: 7.0, step: 0.01}
                            ]}
                        />
                        </Box>
                        <Box display={'flex'} width={'90%'} marginLeft='3%'>
                            <Sliders small={true} spacing={0}
                                sliders={[
                                    { label: 'r', value: color1Red, setter: setColor1Red, min: 0.0, max: 1.0, step: 0.00392 },
                                    { label: 'g', value: color1Green, setter: setColor1Green, min: 0.0, max: 1.0, step: 0.00392 },
                                    { label: 'b', value: color1Blue, setter: setColor1Blue, min: 0.0, max: 1.0, step: 0.00392 },
                                    ]}
                            />
                            <Sliders small={true} spacing={0}
                                sliders={[
                                    { label: 'r', value: color2Red, setter: setColor2Red, min: 0.0, max: 1.0, step: 0.00392 },
                                    { label: 'g', value: color2Green, setter: setColor2Green, min: 0.0, max: 1.0, step: 0.00392 },
                                    { label: 'b', value: color2Blue, setter: setColor2Blue, min: 0.0, max: 1.0, step: 0.00392 },
                                    // {label: 'Bled', value: gradientBled, setter: setGradientBled, min: 1.0, max: 5.0, step: 0.001}
                                    
                                ]}
                            />
                        </Box>

                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-around'} marginTop={'6.9%'}>
                            <Box sx={{border: '1px solid rgba(69, 69, 255 , 0.69)', width: '25%', height: '30px', borderRadius: '12px', backgroundColor: `rgba(${color1Red * 255}, ${color1Green * 255}, ${color1Blue * 255}, 1)`}}></Box>
                            <Box sx={{border: '1px solid rgba(69, 69, 255 , 0.69)', width: '25%', height: '30px', borderRadius: '12px', backgroundColor: `rgba(${color2Red * 255}, ${color2Green * 255}, ${color2Blue * 255}, 1)`}}></Box>

                        </Box>
                    </Box>
                }
           </Box>

        </Box>
    )
};

export default ControlPanel;