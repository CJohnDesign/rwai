'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const fragmentShader = `
uniform float time;
uniform vec2 resolution;
uniform vec3 computeColor;
uniform vec3 energyColor;
uniform vec3 dataColor;

varying vec2 vUv;

#define PI 3.14159265359

void main() {
    vec2 uv = vUv;
    
    // Create diagonal grid
    vec2 grid = fract(uv * 8.0 + vec2(time * 0.2));
    float lines = smoothstep(0.1, 0.05, abs(grid.x - grid.y));
    
    // Create pulsing circles
    float t = time * 0.5;
    vec2 center = vec2(
        cos(t) * 0.3,
        sin(t * 0.7) * 0.3
    );
    float circle = length(uv - center);
    float pulse = sin(circle * 8.0 - time * 2.0) * 0.5 + 0.5;
    
    // Combine effects
    vec3 color = mix(computeColor, energyColor, lines);
    color = mix(color, dataColor, pulse * smoothstep(0.8, 0.0, circle));
    
    gl_FragColor = vec4(color, 1.0);
}`;

const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}`;

const ComputeVizMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(1, 1),
    computeColor: new THREE.Vector3(0.1, 0.2, 0.3),  // Dark blue
    energyColor: new THREE.Vector3(0.3, 0.0, 0.6),   // Purple
    dataColor: new THREE.Vector3(0.0, 0.4, 0.8)      // Bright blue
  },
  vertexShader,
  fragmentShader
);

extend({ ComputeVizMaterial });

function ComputeViz() {
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
      <computeVizMaterial ref={materialRef} />
    </mesh>
  );
}

export function CTABackground() {
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
        <ComputeViz />
      </Canvas>
    </div>
  );
} 