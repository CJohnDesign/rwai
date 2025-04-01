"use client";

import { useCallback, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { BaseThreeContainer } from './BaseThreeContainer';
import {
  ThreeSceneRef,
  createBaseCamera,
  createBaseScene,
  createOptimizedRenderer,
  disposeScene,
  throttleRAF
} from './utils';

interface ParallaxBackgroundProps {
  sectionIndex: number;
}

export function ParallaxBackground({ sectionIndex }: ParallaxBackgroundProps) {
  const sceneRef = useRef<ThreeSceneRef>();
  const objectsRef = useRef<THREE.Object3D[]>([]);

  const initScene = useCallback((container: HTMLDivElement) => {
    console.log('Initializing Three.js scene for section:', sectionIndex);
    console.log('Container dimensions:', container.clientWidth, container.clientHeight);

    // Create base scene elements
    const scene = createBaseScene();
    const camera = createBaseCamera(container);
    camera.position.z = 10; // Move camera back for better depth
    const renderer = createOptimizedRenderer(container);
    
    // Debug renderer setup
    console.log('Renderer pixel ratio:', renderer.getPixelRatio());
    console.log('Renderer size:', renderer.getSize(new THREE.Vector2()));
    
    container.appendChild(renderer.domElement);

    // Create section-specific objects
    const objects: THREE.Object3D[] = [];
    const color = sectionIndex === 0 ? 0xff4d00 : sectionIndex === 1 ? 0x00ff00 : 0x0088ff;

    if (sectionIndex === 0) {
      // Hero section: Optimized floating particles with depth
      const geometry = new THREE.BufferGeometry();
      const count = 1000;
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const size = 20;

      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * size;
        const y = (Math.random() - 0.5) * size;
        const z = (Math.random() - 0.5) * size;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        sizes[i] = Math.random() * 0.5;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        color,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, material);
      objects.push(particles);
      scene.add(particles);
      console.log('Added particles to scene:', particles);

    } else if (sectionIndex === 1) {
      // Features section: Enhanced line grid with depth
      const geometry = new THREE.BufferGeometry();
      const lineCount = 20;
      const size = 20;
      const positions: number[] = [];
      const layers = 3;

      for (let layer = 0; layer < layers; layer++) {
        const z = (layer - 1) * 5;
        for (let i = 0; i < lineCount; i++) {
          const y = (i - lineCount/2) * (size/lineCount);
          positions.push(-size/2, y, z);
          positions.push(size/2, y, z);
        }

        for (let i = 0; i < lineCount; i++) {
          const x = (i - lineCount/2) * (size/lineCount);
          positions.push(x, -size/2, z);
          positions.push(x, size/2, z);
        }
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
      });

      const lines = new THREE.LineSegments(geometry, material);
      lines.rotation.x = -Math.PI / 6;
      objects.push(lines);
      scene.add(lines);
      console.log('Added lines to scene:', lines);

    } else {
      const gridSize = 20;
      const divisions = 20;
      
      const grid = new THREE.GridHelper(gridSize, divisions, color, color);
      grid.material.transparent = true;
      grid.material.opacity = 0.3;
      grid.material.blending = THREE.AdditiveBlending;
      grid.rotation.x = -Math.PI / 6;
      objects.push(grid);
      scene.add(grid);

      const secondaryGrid = new THREE.GridHelper(gridSize * 0.5, divisions / 2, color, color);
      secondaryGrid.material.transparent = true;
      secondaryGrid.material.opacity = 0.15;
      secondaryGrid.material.blending = THREE.AdditiveBlending;
      secondaryGrid.position.z = -5;
      secondaryGrid.rotation.x = -Math.PI / 6;
      objects.push(secondaryGrid);
      scene.add(secondaryGrid);
      console.log('Added grids to scene:', grid, secondaryGrid);
    }

    // Store references
    objectsRef.current = objects;
    sceneRef.current = {
      scene,
      camera,
      renderer
    };

    // Initial render
    renderer.render(scene, camera);
    console.log('Initial render complete');

    // Animation loop
    let frame = 0;
    const animate = () => {
      frame += 0.001;
      
      objectsRef.current.forEach((obj, index) => {
        if (sectionIndex === 0 && obj instanceof THREE.Points) {
          obj.rotation.y = frame * 0.2;
          obj.rotation.x = Math.sin(frame) * 0.1;
          obj.position.y = Math.sin(frame * 0.5) * 0.5;
        } else if (sectionIndex === 1) {
          obj.rotation.z = Math.sin(frame + index) * 0.05;
          obj.position.z = Math.sin(frame * 0.5 + index) * 0.5;
        } else {
          obj.rotation.z = Math.sin(frame) * 0.05;
          obj.position.y = Math.sin(frame * 0.5) * 0.3;
        }
      });

      renderer.render(scene, camera);
      sceneRef.current!.animationFrame = requestAnimationFrame(animate);
    };

    // Start animation with throttling
    const throttledAnimate = throttleRAF(animate);
    throttledAnimate();
  }, [sectionIndex]);

  const cleanup = useCallback(() => {
    console.log('Cleaning up Three.js scene for section:', sectionIndex);
    if (sceneRef.current) {
      const { scene, renderer, animationFrame } = sceneRef.current;
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      disposeScene(scene);
      renderer.dispose();
      sceneRef.current = undefined;
      objectsRef.current = [];
    }
  }, [sectionIndex]);

  // Debug mount/unmount
  useEffect(() => {
    console.log('ParallaxBackground mounted for section:', sectionIndex);
    return () => {
      console.log('ParallaxBackground unmounting for section:', sectionIndex);
    };
  }, [sectionIndex]);

  return (
    <BaseThreeContainer
      className="absolute inset-0 -z-10 pointer-events-none"
      onContainerReady={initScene}
      onCleanup={cleanup}
    />
  );
} 