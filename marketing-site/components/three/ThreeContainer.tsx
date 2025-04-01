'use client';

import { useEffect, useRef } from 'react';
import { ThreeSceneRef } from './utils';

interface ThreeContainerProps {
  className?: string;
  children?: React.ReactNode;
  onContainerReady?: (container: HTMLDivElement) => void;
  onCleanup?: () => void;
}

export function ThreeContainer({
  className,
  children,
  onContainerReady,
  onCleanup
}: ThreeContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<ThreeSceneRef>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene only when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && containerRef.current) {
            onContainerReady?.(containerRef.current);
          } else {
            onCleanup?.();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;
      const { renderer, camera } = sceneRef.current;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      onCleanup?.();
    };
  }, [onContainerReady, onCleanup]);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0" ref={containerRef} />
      {children}
    </div>
  );
} 