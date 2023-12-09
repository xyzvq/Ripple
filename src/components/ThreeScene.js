import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './Shader';
import ColorButton from './ColorButton';
import Sliders from './Sliders';
import {Switch, Typography, FormControlLabel, Box, Grid , Stack, Divider, useMediaQuery, Tabs, Tab,} from '@mui/material';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

import ControlPanel from './ControlPanel';

const ThreeScene = () => {
    const mountRef = useRef(null);
     const isMobile = useMediaQuery('(max-width:600px)');
    const bendableSquareRef = useRef(); // Ref for the bendable square mesh

    //STATES
    const [xMultiplier, setXMultiplier] = useState(10.0);
    const [yMultiplier, setYMultiplier] = useState(10.0);
    const [rippleSpeed, setRippleSpeed] = useState(0.75);
    const [noiseStrength, setNoiseStrength] = useState(2.0);
    const [wireFrame, setWireFrame] = useState(false); 
    const [rotationX, setRotationX] = useState(0.0); // State for rotation x
    const [rotationY, setRotationY] = useState(0.0); // State for rotation y
    const [rotationZ, setRotationZ] = useState(0.0); // State for rotation z

    const [xDensity, setXDensity] = useState(10); 
    const [yDensity, setYDensity] = useState(10);

    const [color1Red, setColor1Red] = useState(0.5); // State for color 1 red
    const [color1Green, setColor1Green] = useState(0.0); // State for color 1 green
    const [color1Blue, setColor1Blue] = useState(0.5); // State for color 1 blue

    const [color2Red, setColor2Red] = useState(1.0); // State for color 2 red
    const [color2Green, setColor2Green] = useState(0.1); // State for color 2 green
    const [color2Blue, setColor2Blue] = useState(0.3); // State for color 2 blue

    // const color1 = new THREE.Color(color1Red, color1Green, color1Blue);
    // const color2 = new THREE.Color(color2Red, color2Green, color2Blue);

    const [gradientBled, setGradientBled] = useState(2.0);

    const [expanded, setExpanded] = useState(true); 

    const [currentTab, setCurrentTab] = useState('shape');

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

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
        const geometry = new THREE.PlaneGeometry(2, 2, xDensity, yDensity);
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

                uGradientBlend: {value: gradientBled },
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

            mesh.rotation.x = rotationX;
            mesh.rotation.y = rotationY;
            mesh.rotation.z = rotationZ;

            // Color 1
            mesh.material.uniforms.uColor1Red.value =   color1Red;
            mesh.material.uniforms.uColor1Green.value = color1Green;
            mesh.material.uniforms.uColor1Blue.value =  color1Blue;

            // // Color 2
            mesh.material.uniforms.uColor2Red.value =   color2Red;
            mesh.material.uniforms.uColor2Green.value = color2Green;
            mesh.material.uniforms.uColor2Blue.value =  color2Blue;

            mesh.material.uniforms.uGradientBlend.value = gradientBled;

            mesh.geometry.dispose();

            // Create new geometry with updated xDensity and yDensity
            const newGeometry = new THREE.PlaneGeometry(2, 2, xDensity, yDensity);
            mesh.geometry = newGeometry;

            mesh.material.wireframe = wireFrame;
            mesh.material.needsUpdate = true;
        }
    }, [xMultiplier, yMultiplier, rippleSpeed, noiseStrength, color1Red, color1Green, color1Blue, color2Red, color2Green, color2Blue, wireFrame, xDensity, yDensity, rotationX, rotationY, rotationZ, gradientBled ]);

    return (
        <div>
            <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
                <div ref={mountRef} style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
                <ControlPanel
                    expanded={expanded} setExpanded={setExpanded}
                    currentTab={currentTab} setCurrentTab={setCurrentTab}
                    isMobile={isMobile}
                    xMultiplier={xMultiplier} setXMultiplier={setXMultiplier}
                    yMultiplier={yMultiplier} setYMultiplier={setYMultiplier}
                    rippleSpeed={rippleSpeed} setRippleSpeed={setRippleSpeed}
                    noiseStrength={noiseStrength} setNoiseStrength={setNoiseStrength}
                    wireFrame={wireFrame} setWireFrame={setWireFrame}
                    xDensity={xDensity} setXDensity={setXDensity}
                    yDensity={yDensity} setYDensity={setYDensity}
                    color1Red={color1Red} setColor1Red={setColor1Red}
                    color1Green={color1Green} setColor1Green={setColor1Green}
                    color1Blue={color1Blue} setColor1Blue={setColor1Blue}
                    color2Red={color2Red} setColor2Red={setColor2Red}
                    color2Green={color2Green} setColor2Green={setColor2Green}
                    color2Blue={color2Blue} setColor2Blue={setColor2Blue}
                    rotationX={rotationX} setRotationX={setRotationX}
                    rotationY={rotationY} setRotationY={setRotationY}
                    rotationZ={rotationZ} setRotationZ={setRotationZ}
                    gradientBled={gradientBled} setGradientBled={setGradientBled}
                />
            </div> 
        </div>
    );
};

export default ThreeScene;


