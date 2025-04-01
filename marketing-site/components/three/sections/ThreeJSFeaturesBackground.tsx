'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeJSFeaturesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const objectsRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create torus knots
    const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const materials = [
      new THREE.MeshPhongMaterial({
        color: 0xff33cc,
        specular: 0x666666,
        emissive: 0x330066,
        shininess: 12,
        transparent: true,
        opacity: 0.9,
      }),
      new THREE.MeshPhongMaterial({
        color: 0x6600ff,
        specular: 0x666666,
        emissive: 0x000066,
        shininess: 12,
        transparent: true,
        opacity: 0.9,
      }),
    ];

    // Create multiple torus knots
    for (let i = 0; i < 5; i++) {
      const torusKnot = new THREE.Mesh(torusKnotGeometry, materials[i % 2].clone());
      torusKnot.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );
      torusKnot.rotation.x = Math.random() * Math.PI;
      torusKnot.rotation.y = Math.random() * Math.PI;
      scene.add(torusKnot);
      objectsRef.current.push(torusKnot);
    }

    // Add rings
    const ringGeometry = new THREE.TorusGeometry(2, 0.2, 16, 100);
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(ringGeometry, materials[i % 2].clone());
      ring.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
      objectsRef.current.push(ring);
    }

    // Camera
    camera.position.z = 20;

    // Renderer
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Animation
    let animationFrameId: number;
    const animate = () => {
      objectsRef.current.forEach((obj, index) => {
        obj.rotation.x += 0.005 * (index + 1) * 0.2;
        obj.rotation.y += 0.005 * (index + 1) * 0.3;
        
        // Add floating motion
        obj.position.y += Math.sin(Date.now() * 0.001 + index) * 0.02;
        obj.position.x += Math.cos(Date.now() * 0.001 + index) * 0.02;
      });

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      if (cameraRef.current) {
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
      
      if (rendererRef.current) {
        rendererRef.current.setSize(width, height);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      torusKnotGeometry.dispose();
      ringGeometry.dispose();
      materials.forEach(m => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }} />
  );
} 