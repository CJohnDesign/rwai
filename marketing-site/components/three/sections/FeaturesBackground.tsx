'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const fragmentShader = `
uniform float time;
uniform vec2 resolution;
uniform vec3 tokenColor;
uniform vec3 flowColor;
uniform vec3 gridColor;

varying vec2 vUv;

#define PI 3.14159265359

void main() {
    vec2 uv = vUv;
    
    // Create hexagonal grid
    vec2 r = vec2(1.0, 1.732);
    vec2 h = r * 0.5;
    vec2 a = mod(uv * 8.0, r) - h;
    vec2 b = mod(uv * 8.0 - h, r) - h;
    vec2 gv = dot(a, a) < dot(b, b) ? a : b;
    float grid = length(gv);
    
    // Add movement
    float t = time * 0.5;
    float wave = sin(uv.x * 4.0 + t) * cos(uv.y * 4.0 + t * 0.5) * 0.5 + 0.5;
    
    // Combine colors
    vec3 color = mix(gridColor, flowColor, wave);
    color = mix(color, tokenColor, smoothstep(0.3, 0.2, grid));
    
    gl_FragColor = vec4(color, 1.0);
}`;

const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}`;

const TokenFlowMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(1, 1),
    tokenColor: new THREE.Vector3(0.8, 0.5, 0.1),  // Gold
    flowColor: new THREE.Vector3(0.1, 0.3, 0.6),   // Deep blue
    gridColor: new THREE.Vector3(0.2, 0.2, 0.4)    // Dark purple
  },
  vertexShader,
  fragmentShader
);

extend({ TokenFlowMaterial });

function TokenFlow() {
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
      <tokenFlowMaterial ref={materialRef} />
    </mesh>
  );
}

export function FeaturesBackground() {
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
        <TokenFlow />
      </Canvas>
    </div>
  );
} 