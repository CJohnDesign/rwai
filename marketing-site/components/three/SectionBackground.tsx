"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SectionBackgroundProps {
  type: 'particles' | 'waves' | 'grid';
  color?: string;
}

export function SectionBackground({ type, color = '#00ff00' }: SectionBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    // Remove the background color to make it transparent
    scene.background = null;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup with transparency
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setClearColor(0x000000, 0); // Make background transparent
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Different background types
    let animatedObject: THREE.Object3D | THREE.Points;

    if (type === 'particles') {
      // Enhanced particle system
      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 2000; // Increased particle count
      const positions = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 15; // Wider spread
        positions[i + 1] = (Math.random() - 0.5) * 15;
        positions[i + 2] = (Math.random() - 0.5) * 15;
        sizes[i / 3] = Math.random() * 0.1; // Varied particle sizes
      }
      
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      const particleMaterial = new THREE.PointsMaterial({ 
        color: color,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending // Add glow effect
      });
      
      animatedObject = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(animatedObject);
    } 
    else if (type === 'waves') {
      // Enhanced wave plane
      const planeGeometry = new THREE.PlaneGeometry(15, 15, 75, 75); // More detailed grid
      const planeMaterial = new THREE.MeshPhongMaterial({ 
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide // Visible from both sides
      });
      
      animatedObject = new THREE.Mesh(planeGeometry, planeMaterial);
      animatedObject.rotation.x = -Math.PI / 3;
      scene.add(animatedObject);
    }
    else if (type === 'grid') {
      // Enhanced grid setup
      const gridHelper = new THREE.GridHelper(20, 40, color, color);
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.3;
      scene.add(gridHelper);
      
      // Add multiple spheres for more interest
      const sphereGroup = new THREE.Group();
      const sphereCount = 3;
      
      for (let i = 0; i < sphereCount; i++) {
        const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const sphereMaterial = new THREE.MeshPhongMaterial({ 
          color: color,
          transparent: true,
          opacity: 0.9,
          shininess: 90
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        
        // Position spheres in a circle
        const angle = (i / sphereCount) * Math.PI * 2;
        sphere.position.x = Math.cos(angle) * 2;
        sphere.position.z = Math.sin(angle) * 2;
        
        sphereGroup.add(sphere);
      }
      
      animatedObject = sphereGroup;
      scene.add(animatedObject);
    }

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Animation loop with enhanced movements
    let frame = 0;
    function animate() {
      requestAnimationFrame(animate);
      frame += 0.01;

      if (type === 'particles' && animatedObject instanceof THREE.Points) {
        animatedObject.rotation.y += 0.0005;
        animatedObject.rotation.x = Math.sin(frame * 0.2) * 0.1;
      }
      else if (type === 'waves' && animatedObject instanceof THREE.Mesh) {
        const positions = (animatedObject.geometry as THREE.PlaneGeometry).attributes.position;
        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const y = positions.getY(i);
          const z = Math.sin(frame + x) * 0.5 + Math.cos(frame + y) * 0.5;
          positions.setZ(i, z);
        }
        positions.needsUpdate = true;
        animatedObject.rotation.z += 0.001;
      }
      else if (type === 'grid' && animatedObject instanceof THREE.Group) {
        animatedObject.rotation.y += 0.005;
        animatedObject.children.forEach((sphere, i) => {
          const offset = i * (Math.PI * 2 / animatedObject.children.length);
          sphere.position.y = Math.sin(frame + offset) * 0.5;
        });
      }
      
      renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    function handleResize() {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      if (animatedObject instanceof THREE.Mesh) {
        animatedObject.geometry.dispose();
        (animatedObject.material as THREE.Material).dispose();
      }
    };
  }, [type, color]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: 'linear-gradient(to bottom, rgba(0,4,20,0.7), rgba(0,4,20,0.8))'
      }}
    />
  );
} 