'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeJSHeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubesRef = useRef<THREE.Mesh[]>([]);

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

    // Create grid of cubes
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x6600ff,
      specular: 0x666666,
      emissive: 0x0,
      shininess: 10,
      transparent: true,
      opacity: 0.9,
    });

    // Create grid of cubes
    for (let i = -3; i <= 3; i++) {
      for (let j = -3; j <= 3; j++) {
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial.clone());
        cube.position.set(i * 2, j * 2, 0);
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        scene.add(cube);
        cubesRef.current.push(cube);
      }
    }

    // Add a large plane behind the cubes
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: 0x000414,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.z = -5;
    scene.add(plane);

    // Camera
    camera.position.z = 15;

    // Renderer
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Animation
    let animationFrameId: number;
    const animate = () => {
      cubesRef.current.forEach((cube, index) => {
        const row = Math.floor(index / 7);
        const col = index % 7;
        cube.rotation.x += 0.01 * (row + 1) * 0.2;
        cube.rotation.y += 0.01 * (col + 1) * 0.2;
        cube.position.z = Math.sin(Date.now() * 0.001 + index) * 2;
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
      cubeGeometry.dispose();
      cubeMaterial.dispose();
      planeGeometry.dispose();
      planeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }} />
  );
} 