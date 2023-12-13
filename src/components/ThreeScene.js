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
    const shapeRef = useRef(); // Ref for the bendable square mesh

    //STATES
    const [xMultiplier, setXMultiplier] = useState(10.0);
    const [yMultiplier, setYMultiplier] = useState(10.0);
    const [rippleSpeed, setRippleSpeed] = useState(0.75);
    const [noiseStrength, setNoiseStrength] = useState(2.0);
    const [wireFrame, setWireFrame] = useState(false); 

    const [rotationX, setRotationX] = useState(0); // State for rotation x
    const [rotationY, setRotationY] = useState(0); // State for rotation y
    const [rotationZ, setRotationZ] = useState(0); // State for rotation z

    const [xDensity, setXDensity] = useState(10); 
    const [yDensity, setYDensity] = useState(10);

    const [color1Red, setColor1Red] = useState(0.5); // State for color 1 red
    const [color1Green, setColor1Green] = useState(0.0); // State for color 1 green
    const [color1Blue, setColor1Blue] = useState(0.5); // State for color 1 blue

    const [color2Red, setColor2Red] = useState(1.0); // State for color 2 red
    const [color2Green, setColor2Green] = useState(0.1); // State for color 2 green
    const [color2Blue, setColor2Blue] = useState(0.3); // State for color 2 blue
    const [gradientBlend, setGradientBlend] = useState(2.0);
    const [expanded, setExpanded] = useState(true); 
    const [currentTab, setCurrentTab] = useState('shape');
    const [shape, setShape] = useState('square');

    const [rotationXOn, setRotationXOn] = useState(false); // State for rotation speed around X-axis
    const [rotationYOn, setRotationYOn] = useState(false); // State for rotation speed around Y-axis
    const [rotationZOn, setRotationZOn] = useState(false); // State for rotation speed around Z-axis


    function createSphere() {
        // Sphere geometry with adjustable size
        const geometry = new THREE.SphereGeometry(1, 20, 20); 
        // Shader material similar to the square
        const material = new THREE.ShaderMaterial({
            wireframe: wireFrame,
            // vertexShader: sphereVertexShader, // You need to create this shader
            // fragmentShader: sphereFragmentShader, // You need to create this shader
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0.1 },
                uSpeedMultiplier: { value: rippleSpeed },
                uNoiseStrength: { value: noiseStrength },
                uXMultiplier: { value: xMultiplier },
                uYMultiplier: { value: yMultiplier },
                uColor1Red:     {value: color1Red },
                uColor1Green:   {value: color1Green },
                uColor1Blue:    {value: color1Blue },
                uColor2Red:     {value: color2Red },
                uColor2Green:   {value: color2Green },
                uColor2Blue:    {value: color2Blue },
                uGradientBlend: {value: gradientBlend },
            },
        });

        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(0, 0, 0);
        return sphere;
    }

    const scaleFactor = 0.05; // Change this to scale the smiley

    const smileyShape = new THREE.Shape()
        .moveTo(80 * scaleFactor, 40 * scaleFactor)
        .absarc(40 * scaleFactor, 40 * scaleFactor, 40 * scaleFactor, 0, Math.PI * 2, false);

    const smileyEye1Path = new THREE.Path()
        .moveTo(35 * scaleFactor, 20 * scaleFactor)
        .absellipse(25 * scaleFactor, 20 * scaleFactor, 10 * scaleFactor, 10 * scaleFactor, 0, Math.PI * 2, true);

    const smileyEye2Path = new THREE.Path()
        .moveTo(65 * scaleFactor, 20 * scaleFactor)
        .absarc(55 * scaleFactor, 20 * scaleFactor, 10 * scaleFactor, 0, Math.PI * 2, true);

    const smileyMouthPath = new THREE.Path()
        .moveTo(20 * scaleFactor, 40 * scaleFactor)
        .quadraticCurveTo(40 * scaleFactor, 60 * scaleFactor, 60 * scaleFactor, 40 * scaleFactor)
        .bezierCurveTo(70 * scaleFactor, 45 * scaleFactor, 70 * scaleFactor, 50 * scaleFactor, 60 * scaleFactor, 60 * scaleFactor)
        .quadraticCurveTo(40 * scaleFactor, 80 * scaleFactor, 20 * scaleFactor, 60 * scaleFactor)
        .quadraticCurveTo(5 * scaleFactor, 50 * scaleFactor, 20 * scaleFactor, 40 * scaleFactor);

    smileyShape.holes.push(smileyEye1Path);
    smileyShape.holes.push(smileyEye2Path);
    smileyShape.holes.push(smileyMouthPath);


    function createCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.ShaderMaterial({
            wireframe: wireFrame,
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0.1 },
                uSpeedMultiplier: { value: rippleSpeed },
                uNoiseStrength: { value: noiseStrength },
                uXMultiplier: { value: xMultiplier },
                uYMultiplier: { value: yMultiplier },
                uColor1Red:     {value: color1Red },
                uColor1Green:   {value: color1Green },
                uColor1Blue:    {value: color1Blue },
                uColor2Red:     {value: color2Red },
                uColor2Green:   {value: color2Green },
                uColor2Blue:    {value: color2Blue },
                uGradientBlend: {value: gradientBlend },
            },
        });

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 0, 0);
        return cube;
    }

    function createSmile() {
        const geometry = new THREE.ShapeGeometry( smileyShape );
         const material = new THREE.ShaderMaterial({
            wireframe: wireFrame,
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0.1 },
                uSpeedMultiplier: { value: rippleSpeed },
                uNoiseStrength: { value: noiseStrength },
                uXMultiplier: { value: xMultiplier },
                uYMultiplier: { value: yMultiplier },
                uColor1Red:     {value: color1Red },
                uColor1Green:   {value: color1Green },
                uColor1Blue:    {value: color1Blue },
                uColor2Red:     {value: color2Red },
                uColor2Green:   {value: color2Green },
                uColor2Blue:    {value: color2Blue },
                uGradientBlend: {value: gradientBlend },
            },
        });

        const smile = new THREE.Mesh(geometry, material);
        smile.rotation.z = Math.PI;
        smile.position.set(2, 2, -2);
        return smile;
    }


    function createSquare() {
        const geometry = new THREE.PlaneGeometry(2, 2, xDensity, yDensity);
        const material = new THREE.ShaderMaterial({
            wireframe: wireFrame,
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0.1 },
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

                uGradientBlend: {value: gradientBlend },
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
        camera.position.z = 6;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Remove any existing shape from the scene
        if (shapeRef.current) {
            scene.remove(shapeRef.current);
            shapeRef.current.geometry.dispose();
            shapeRef.current.material.dispose();
        }

        // Conditionally create and add the shape to the scene
        if (shape === 'square') {
            shapeRef.current = createSquare();
        } else if (shape === 'sphere') {
            shapeRef.current = createSphere();
        } else if (shape === 'cube') {
            shapeRef.current = createCube();
        }
        else if (shape === 'smile') {
            shapeRef.current = createSmile();
        }

        scene.add(shapeRef.current);


        const animate = () => {
            requestAnimationFrame(animate);
            shapeRef.current.material.uniforms.uTime.value += 0.01;
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
    }, [shape, rotationXOn, rotationYOn, rotationZOn, rotationX, rotationY, rotationZ, ]);

     useEffect(() => {
        // Rotation effect
        const interval = setInterval(() => {
            if (!shapeRef.current) return;

                shapeRef.current.rotation.x += rotationX;


                shapeRef.current.rotation.y += rotationY;


                shapeRef.current.rotation.z += rotationZ;

        }, 20); // Adjust the interval as needed

        return () => clearInterval(interval);
    }, [rotationX, rotationY, rotationZ, rotationXOn, rotationYOn, rotationZOn]); // Depend on rotation values and switch states

    useEffect(() => {
        // Update the shader uniforms when slider values change
        if (shapeRef.current ) {
            const mesh = shapeRef.current;
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

            mesh.material.uniforms.uGradientBlend.value = gradientBlend;
            
            if (shape === 'square') {
                mesh.geometry.dispose();
                const newGeometry = new THREE.PlaneGeometry(2, 2, xDensity, yDensity);
                mesh.geometry = newGeometry;
            } else if (shape === 'sphere') {
                mesh.geometry.dispose();
                const newGeometry = new THREE.SphereGeometry(1, 20, 20); 
                mesh.geometry = newGeometry;
            }
            else if (shape === 'cube') {
                mesh.geometry.dispose();
                const newGeometry = new THREE.BoxGeometry(1, 1, 1);
                mesh.geometry = newGeometry;
            }
            else if (shape === 'smile') {
                mesh.geometry.dispose();
                const newGeometry = new THREE.ShapeGeometry( smileyShape );
                mesh.geometry = newGeometry;
            }

            mesh.material.wireframe = wireFrame;
            mesh.material.needsUpdate = true;
        }
    }, [xMultiplier, yMultiplier, rippleSpeed, noiseStrength, color1Red, color1Green, color1Blue, color2Red, color2Green, color2Blue, wireFrame, xDensity, yDensity, rotationX, rotationY, rotationZ, gradientBlend, shape,  ]);

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
                    gradientBlend={gradientBlend} setGradientBlend={setGradientBlend}
                    shape={shape} setShape={setShape} 
                    rotationXOn={rotationXOn} setRotationXOn={setRotationXOn}
                    rotationYOn={rotationYOn} setRotationYOn={setRotationYOn}
                    rotationZOn={rotationZOn} setRotationZOn={setRotationZOn}
                />
            </div>
        </div>
    );
};

export default ThreeScene;