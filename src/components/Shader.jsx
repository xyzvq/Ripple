import * as THREE from 'three';

// Vertex shader code
export const vertexShader = `
uniform float uTime;
uniform float uXMultiplier;
uniform float uYMultiplier;
uniform float uSpeedMultiplier;
uniform float uNoiseStrength;

varying vec3 vNormal;
varying float vRipple;
void main() {
    vNormal = normal;
    //CREATE SLIDERS FOR X AND Y AND TIME
    // vRipple = sin(position.x * uXMultiplier + position.y * uYMultiplier + uTime) * 1.0;
    vRipple = sin(position.x * uXMultiplier + position.y * uYMultiplier + uTime * uSpeedMultiplier) * uNoiseStrength;
    vec3 newPos = position + normal * vRipple;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
`;


// Fragment shader code
export const fragmentShader = `
varying vec3 vNormal;
varying float vRipple;

uniform float uColor1Red;
uniform float uColor1Green;
uniform float uColor1Blue;

uniform float uColor2Red;
uniform float uColor2Green;
uniform float uColor2Blue;

// uniform float uColor1;
// uniform float uColor2;

// Fragment shader
varying vec2 vUv;

// Function to create pseudo-random noise
float noise(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    //colors
    //SLIDERS FOR COLORS
    vec3 color1 = vec3(uColor1Red, uColor1Green, uColor1Blue); 
    vec3 color2 = vec3(uColor2Red, uColor2Green, uColor2Blue); 

    // For a gradient between two colors:
    vec3 gradientColor = mix(color1, color2, (sin(vRipple) + 0.5) / 2.0);

    vec3 light = vec3(0.0, 0.0, 0.0);
    light = normalize(light);
    float dotNL = max(dot(vNormal, light), 0.0);
    // vec3 ambient = vec3(0.1, 0.1, 0.1);
    vec3 diffuse = dotNL * vec3(0.9, -0.5, 0.1);

    // Combine diffuse and ambient components
    // vec3 finalColor = gradientColor * dotNL + ambient;

    // Apply noise
    float grainIntensity = 0.1; // Adjust for more/less grain
    float n = noise(gl_FragCoord.xy * 0.1); // The 0.1 scale factor can be adjusted
    vec3 grain = vec3(n) * grainIntensity;

    // gl_FragColor = vec4(finalColor, 1.0);
    // gl_FragColor = vec4(gradientColor, 1.0);
    gl_FragColor = vec4(gradientColor+diffuse + grain, 1.0);
}`;




