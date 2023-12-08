import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './Shader';
import ColorButton from './ColorButton';
import Sliders from './Sliders';
import {Switch, Typography, FormControlLabel, Box, Grid , Stack, Divider, useMediaQuery} from '@mui/material';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

const ThreeScene = ({ xMultiplier, setXMultiplier, yMultiplier, setYMultiplier, rippleSpeed, setRippleSpeed, noiseStrength, setNoiseStrength,}) => {
    const mountRef = useRef(null);
    const bendableSquareRef = useRef(); // Ref for the bendable square mesh
    const [wireFrame, setWireFrame] = useState(false); // State for the mesh [not used

    const [color1Red, setColor1Red] = useState(0.5); // State for color 1 red
    const [color1Green, setColor1Green] = useState(0.0); // State for color 1 green
    const [color1Blue, setColor1Blue] = useState(0.5); // State for color 1 blue

    const [color2Red, setColor2Red] = useState(1.0); // State for color 2 red
    const [color2Green, setColor2Green] = useState(0.1); // State for color 2 green
    const [color2Blue, setColor2Blue] = useState(0.3); // State for color 2 blue

    const color1 = new THREE.Color(color1Red, color1Green, color1Blue);
    const color2 = new THREE.Color(color2Red, color2Green, color2Blue);

    const isMobile = useMediaQuery('(max-width:600px)');

    const [expanded, setExpanded] = useState(true); 

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };


     // Handler for color1 changes
    const handleColor1Change = (color) => {
        setColor1Red(color.rgb.r / 255);
        setColor1Green(color.rgb.g / 255);
        setColor1Blue(color.rgb.b / 255);
    };

    // Handler for color2 changes
    const handleColor2Change = (color) => {
        setColor2Red(color.rgb.r / 255);
        setColor2Green(color.rgb.g / 255);
        setColor2Blue(color.rgb.b / 255);
    };

    const handleMeshChange = () => {
        setWireFrame(!wireFrame);
    };


    function createBendableSquare() {
        const geometry = new THREE.PlaneGeometry(2, 2, 10, 10);
        const material = new THREE.ShaderMaterial({
            wireframe: wireFrame,
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0.0 },
                uXMultiplier: { value: xMultiplier },
                uYMultiplier: { value: yMultiplier },
                uSpeedMultiplier: { value: rippleSpeed },
                uNoiseStrength: { value: noiseStrength },

                // Color 1
                uColor1Red:     {value: color1Red },
                uColor1Green:   {value: color1Green },
                uColor1Blue:    {value: color1Blue },

                // Color 2
                uColor2Red:     {value: color2Red },
                uColor2Green:   {value: color2Green },
                uColor2Blue:    {value: color2Blue },
            },
        });

        const square = new THREE.Mesh(geometry, material);
        square.position.set(0, 0, 0);
        return square;
    }

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        bendableSquareRef.current = createBendableSquare();
        scene.add(bendableSquareRef.current);

        const animate = () => {
            requestAnimationFrame(animate);
            // bendableSquareRef.current.material.uniforms.uTime.value += 0.5;
             if (bendableSquareRef.current) {
                bendableSquareRef.current.material.uniforms.uTime.value += 0.01;
            }
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
            // Only remove the child if mountRef.current is not null
            mountRef.current.removeChild(renderer.domElement);
        }
        };
    }, []);

    useEffect(() => {
        // Update the shader uniforms when slider values change
        if (bendableSquareRef.current) {
            const mesh = bendableSquareRef.current;
            mesh.material.uniforms.uXMultiplier.value = xMultiplier;
            mesh.material.uniforms.uYMultiplier.value = yMultiplier;
            mesh.material.uniforms.uSpeedMultiplier.value = rippleSpeed;
            mesh.material.uniforms.uNoiseStrength.value = noiseStrength;

            
            // Color 1
            mesh.material.uniforms.uColor1Red.value =   color1Red;
            mesh.material.uniforms.uColor1Green.value = color1Green;
            mesh.material.uniforms.uColor1Blue.value =  color1Blue;

            // // Color 2
            mesh.material.uniforms.uColor2Red.value =   color2Red;
            mesh.material.uniforms.uColor2Green.value = color2Green;
            mesh.material.uniforms.uColor2Blue.value =  color2Blue;

            mesh.material.wireframe = wireFrame;

            mesh.material.needsUpdate = true;


        }
    }, [xMultiplier, yMultiplier, rippleSpeed, noiseStrength, color1Red, color1Green, color1Blue, color2Red, color2Green, color2Blue, wireFrame ]);


   
    return (
        <div>
       <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
            <div ref={mountRef} style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
           <Box sx={{
                position: 'absolute', 
                top: '5%', 
                left: '1%', 
                zIndex: 2, 
                width: expanded ? isMobile ? '96%' : '20%' : '43px',  // Expanded or icon size
                height: expanded ? '90%' : '43px',   // Expanded or icon size
                display: 'flex',
                flexDirection: 'column',
                border: '2px solid rgba(100, 100, 200, 0.4)',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                transition: 'width 0.5s, height 0.5s',  // Smooth transition for width and height
                overflow: isMobile ? 'scroll' : 'hidden',
                }}
            >
                <TuneOutlinedIcon 
                        sx={{ marginLeft: '5%',  marginTop: '5%',  fontSize: '40px', color: 'white' }}
                        onClick={handleToggleExpand}
                    />
                { expanded ?
                <Sliders 
                    xMultiplier={xMultiplier}
                    setXMultiplier={setXMultiplier}
                    yMultiplier={yMultiplier}
                    setYMultiplier={setYMultiplier}
                    rippleSpeed={rippleSpeed}
                    setRippleSpeed={setRippleSpeed}
                    noiseStrength={noiseStrength}
                    setNoiseStrength={setNoiseStrength}
                />
                : null }
                <Divider sx={{ 
                    width: '80%', 
                    marginLeft: 'auto', 
                    marginRight: 'auto',
                    marginTop: '10%',
                    backgroundColor: 'rgba(100, 100, 255, 0.5)', // Adjust the RGBA values as needed
                    height: '1px' 
                }} />
                { expanded ?
                <Box width='100%' paddingTop='10%'>
                    <Stack direction='column' alignItems='center'>
                        <Grid container spacing={3} alignItems='center' style={{ width: '80%' }}> {/* Increased spacing */}
                            
                            <Grid item xs={12} sm={12} md={6}>
                                <Typography variant='BUTTON TEXT'>Colour 1</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <ColorButton color={color1} onChange={handleColor1Change}/>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6}>
                                <Typography variant='BUTTON TEXT'>Colour 2</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <ColorButton color={color2} onChange={handleColor2Change}/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                 <FormControlLabel
                                    control={
                                        <Switch onChange={handleMeshChange} 
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
                            </Grid>
                        </Grid>
                    </Stack>
                </Box>
             : null }
           </Box>
        </div> 
        </div>
    );
};

export default ThreeScene;


