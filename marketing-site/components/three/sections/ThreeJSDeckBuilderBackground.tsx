'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeJSDeckBuilderBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cardsRef = useRef<THREE.Mesh[]>([]);

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

    // Create card geometry (thin box)
    const cardGeometry = new THREE.BoxGeometry(3, 4, 0.1);
    
    // Create materials for cards with different colors
    const cardMaterials = [
      new THREE.MeshPhongMaterial({
        color: 0x6600ff,
        specular: 0x666666,
        emissive: 0x330066,
        shininess: 30,
        transparent: true,
        opacity: 0.9,
      }),
      new THREE.MeshPhongMaterial({
        color: 0xff33cc,
        specular: 0x666666,
        emissive: 0x660033,
        shininess: 30,
        transparent: true,
        opacity: 0.9,
      }),
      new THREE.MeshPhongMaterial({
        color: 0x33ccff,
        specular: 0x666666,
        emissive: 0x003366,
        shininess: 30,
        transparent: true,
        opacity: 0.9,
      })
    ];

    // Create floating cards in a circular pattern
    const numCards = 8;
    const radius = 10;
    for (let i = 0; i < numCards; i++) {
      const angle = (i / numCards) * Math.PI * 2;
      const card = new THREE.Mesh(cardGeometry, cardMaterials[i % cardMaterials.length].clone());
      
      // Position in a circle
      card.position.x = Math.cos(angle) * radius;
      card.position.y = Math.sin(angle) * radius;
      card.position.z = -5;
      
      // Rotate cards to face center
      card.rotation.z = -angle + Math.PI / 2;
      card.rotation.y = Math.PI / 8;
      
      scene.add(card);
      cardsRef.current.push(card);
    }

    // Add central glow effect
    const glowGeometry = new THREE.SphereGeometry(2, 32, 32);
    const glowMaterial = new THREE.MeshPhongMaterial({
      color: 0x6600ff,
      emissive: 0x6600ff,
      transparent: true,
      opacity: 0.3,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Camera
    camera.position.z = 20;

    // Renderer
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Animation
    let animationFrameId: number;
    const animate = () => {
      const time = Date.now() * 0.001;

      cardsRef.current.forEach((card, index) => {
        const angle = (index / numCards) * Math.PI * 2 + time * 0.2;
        
        // Circular motion
        card.position.x = Math.cos(angle) * radius;
        card.position.y = Math.sin(angle) * radius;
        
        // Floating effect
        card.position.z = -5 + Math.sin(time + index) * 0.5;
        
        // Keep cards facing center while rotating
        card.rotation.z = -angle + Math.PI / 2;
        
        // Subtle card tilt
        card.rotation.x = Math.sin(time + index) * 0.1;
      });

      // Animate central glow
      if (glow) {
        glow.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
        glow.rotation.y = time * 0.5;
        glow.rotation.z = time * 0.3;
      }

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
      cardGeometry.dispose();
      glowGeometry.dispose();
      cardMaterials.forEach(m => m.dispose());
      glowMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }} />
  );
} 