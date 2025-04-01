'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Custom shader material for volumetric effects
const VolumeBoxMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(1, 1),
    mouse: new THREE.Vector2(0, 0),
  },
  // vertex shader
  `
    varying vec3 vPosition;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDir;

    void main() {
      vPosition = position;
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      vViewDir = normalize(cameraPosition - worldPosition.xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mouse;
    
    varying vec3 vPosition;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDir;

    const int SLICES = 4;
    const float DENSITY = 3.0;

    mat3 fromEuler(vec3 ang) {
      vec2 a1 = vec2(sin(ang.x),cos(ang.x));
      vec2 a2 = vec2(sin(ang.y),cos(ang.y));
      vec2 a3 = vec2(sin(ang.z),cos(ang.z));
      mat3 m;
      m[0] = vec3(a1.y*a3.y+a1.x*a2.x*a3.x,a1.y*a2.x*a3.x-a3.y*a1.x,-a2.y*a3.x);
      m[1] = vec3(a3.x*a1.x-a1.y*a2.x*a3.y,a1.y*a3.y-a1.x*a2.x*a3.x,a2.y*a3.y);
      m[2] = vec3(a2.y*a1.x,a1.y*a2.y,a2.x);
      return m;
    }

    float integrationFunc(float x, float a) {
      return x * 0.5 - cos(x * a) / (2.0 * a);
    }

    float functionMean(float a, float b, float f) {
      a = -a * 0.5 + 0.5;
      b = -b * 0.5 + 0.5;
      float Fa = integrationFunc(a,f);
      float Fb = integrationFunc(b,f);
      return (Fb - Fa) / (b - a);
    }

    vec3 saturation(vec3 rgb, float adjustment) {
      const vec3 W = vec3(0.2125, 0.7154, 0.0721);
      vec3 intensity = vec3(dot(rgb, W));
      return mix(intensity, rgb, adjustment);
    }

    void main() {
      vec3 baseColor = vec3(0.4, 0.0, 0.8); // Purple
      vec3 accentColor = vec3(1.0, 0.2, 0.8); // Pink
      
      // Setup ray direction based on time
      vec3 ang = vec3(sin(time*0.4)*2.0, 0.0, cos(time*0.35)*3.0);
      mat3 rot = fromEuler(ang);
      
      // Calculate ray intersection points
      vec3 r0 = vPosition;
      vec3 r1 = r0 + vViewDir;
      
      vec3 color = vec3(0.0);
      float fm = 0.6;
      
      // Color modulation similar to original
      color.x = functionMean(r0.x, r1.x, 7.0*fm);
      color.y = functionMean(r0.x, r1.x, 11.0*fm);
      color.z = functionMean(r0.x, r1.x, 13.0*fm);
      color.yz *= functionMean(r0.x, r1.x, 27.0*fm);
      color = 1.0 - color;

      color.z *= functionMean(r0.y, r1.y, 11.0*fm);
      color.y *= functionMean(r0.y, r1.y, 13.0*fm);
      color.x *= functionMean(r0.y, r1.y, 17.0*fm);
      color = 1.0 - color;

      color.z *= functionMean(r0.z, r1.z, 5.0*fm);
      color.y *= functionMean(r0.z, r1.z, 7.0*fm);
      color.x *= functionMean(r0.z, r1.z, 11.0*fm);
      color = 1.0 - color;
      
      // Post-processing
      color = pow(color, vec3(8.0));
      color += 0.02;
      color = log(1.0 + color * 1.5);
      
      // Density modulation
      float d = length(r1 - r0) * functionMean(r0.z+r0.y, r1.z+r1.y, 22.0);
      color = mix(baseColor, color, clamp(log(1.0+d*DENSITY), 0.0, 1.0));
      
      // sRGB correction and saturation
      color = pow(color, vec3(1.0/2.2));
      color = saturation(color, 2.0);
      
      gl_FragColor = vec4(color, 0.8);
    }
  `
);

extend({ VolumeBoxMaterial });

type VolumeBoxMaterialImpl = {
  time: number;
  resolution: THREE.Vector2;
  mouse: THREE.Vector2;
} & THREE.ShaderMaterial;

function GlassBox() {
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<VolumeBoxMaterialImpl>(null!);
  const { gl, size } = useThree();

  useEffect(() => {
    if (!gl.domElement || !materialRef.current) return;

    const handleResize = () => {
      if (materialRef.current) {
        materialRef.current.resolution.set(size.width, size.height);
      }
    };

    gl.domElement.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      gl.domElement.removeEventListener('resize', handleResize);
    };
  }, [gl, size, materialRef]);

  useFrame((state) => {
    if (!outerMeshRef.current || !innerMeshRef.current || !materialRef.current) return;

    const rotation = state.clock.getElapsedTime() * 0.5;
    outerMeshRef.current.rotation.y = rotation;
    innerMeshRef.current.rotation.y = rotation;
    materialRef.current.time = state.clock.getElapsedTime();
  });

  return (
    <group>
      {/* Outer glass box */}
      <mesh ref={outerMeshRef} position={[2, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhysicalMaterial
          thickness={0.2}
          roughness={0.05}
          transmission={0.95}
          ior={2.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
          transparent
          opacity={0.2}
          color="#6600ff"
          attenuationColor="#ff33cc"
          attenuationDistance={0.2}
        />
      </mesh>
      
      {/* Inner volumetric effect */}
      <mesh ref={innerMeshRef} position={[2, 0, 0]} scale={[0.95, 0.95, 0.95]}>
        <boxGeometry args={[2, 2, 2]} />
        {/* @ts-ignore */}
        <volumeBoxMaterial 
          ref={materialRef} 
          transparent 
          depthWrite={false} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export function NeuralVolumeBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 5] }}
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          alpha: true,
        }}
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'absolute',
          top: 0, 
          left: 0,
          background: '#0a0a0a'
        }}
      >
        <Environment preset="city" />
        <ambientLight intensity={0.3} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.15}
          penumbra={1}
          intensity={0.8}
        />
        <directionalLight
          position={[-5, 5, -5]}
          intensity={0.4}
          color="#ff33cc"
        />
        <GlassBox />
      </Canvas>
    </div>
  );
} 