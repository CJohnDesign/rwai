'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const fragmentShader = `
uniform float time;
uniform vec2 resolution;
uniform vec3 primaryColor;
uniform vec3 secondaryColor;
uniform vec3 accentColor;

varying vec2 vUv;

#define PI 3.14159265359

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = vUv;
    
    // Create a simple grid pattern
    vec2 grid = fract(uv * 10.0);
    float gridLines = smoothstep(0.1, 0.05, abs(grid.x - 0.5)) + 
                     smoothstep(0.1, 0.05, abs(grid.y - 0.5));
    
    // Add some movement
    float movement = sin(uv.x * 2.0 + time) * cos(uv.y * 2.0 + time * 0.5);
    
    // Combine colors
    vec3 baseColor = mix(primaryColor, secondaryColor, movement * 0.5 + 0.5);
    baseColor = mix(baseColor, accentColor, gridLines * 0.3);
    
    gl_FragColor = vec4(baseColor, 1.0);
}`;

const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}`;

const NetworkFlowMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(1, 1),
    primaryColor: new THREE.Vector3(0.1, 0.0, 0.2),   // Dark purple
    secondaryColor: new THREE.Vector3(0.2, 0.4, 0.8), // Blue
    accentColor: new THREE.Vector3(0.4, 0.0, 0.8)     // Bright purple
  },
  vertexShader,
  fragmentShader
);

extend({ NetworkFlowMaterial });

function NetworkFlow() {
  const materialRef = useRef<any>();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.resolution.set(
        state.size.width,
        state.size.height
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore */}
      <networkFlowMaterial ref={materialRef} />
    </mesh>
  );
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'absolute',
          top: 0, 
          left: 0
        }}
      >
        <NetworkFlow />
      </Canvas>
    </div>
  );
} 