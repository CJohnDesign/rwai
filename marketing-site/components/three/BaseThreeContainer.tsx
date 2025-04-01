'use client';

import { useEffect, useRef } from 'react';
import { ThreeSceneRef } from './utils';

interface BaseThreeContainerProps {
  className?: string;
  onContainerReady: (container: HTMLDivElement) => void;
  onCleanup?: () => void;
  children?: React.ReactNode;
}

export function BaseThreeContainer({
  className = '',
  onContainerReady,
  onCleanup,
  children
}: BaseThreeContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    console.log('BaseThreeContainer mounted');
    const container = containerRef.current;
    
    if (!container) {
      console.error('Container ref is null');
      return;
    }

    // Force container to fill viewport
    const updateContainerSize = () => {
      if (container) {
        const rect = container.getBoundingClientRect();
        console.log('Container dimensions:', {
          rect,
          width: container.clientWidth,
          height: container.clientHeight,
          windowInnerHeight: window.innerHeight,
          windowInnerWidth: window.innerWidth
        });

        // Remove any existing canvas to prevent duplicates
        const existingCanvas = container.querySelector('canvas');
        if (existingCanvas) {
          container.removeChild(existingCanvas);
        }

        // Ensure container fills the space
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.overflow = 'hidden';
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '0';
      }
    };

    updateContainerSize();

    // Only initialize once
    if (!isInitializedRef.current) {
      console.log('Initializing Three.js container');
      isInitializedRef.current = true;
      onContainerReady(container);
    }

    // Handle window resize
    const handleResize = () => {
      console.log('Window resize detected');
      if (container) {
        updateContainerSize();
        // Re-initialize to handle resize
        isInitializedRef.current = false;
        onContainerReady(container);
      }
    };

    window.addEventListener('resize', handleResize);

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log('Page hidden, cleaning up');
        if (onCleanup) onCleanup();
      } else {
        console.log('Page visible, reinitializing');
        if (container) {
          isInitializedRef.current = false;
          onContainerReady(container);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      console.log('BaseThreeContainer cleanup');
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (onCleanup) {
        onCleanup();
      }
    };
  }, [onContainerReady, onCleanup]);

  return (
    <div 
      ref={containerRef}
      className={`${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0
      }}
    >
      {children}
    </div>
  );
} 