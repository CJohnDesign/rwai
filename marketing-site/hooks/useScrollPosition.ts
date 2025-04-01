"use client";

import { useState, useEffect } from 'react';

interface ScrollPosition {
  y: number;
  velocity: number;
  progress: number;
}

export function useScrollPosition(): ScrollPosition {
  const [scrollData, setScrollData] = useState<ScrollPosition>({
    y: 0,
    velocity: 0,
    progress: 0
  });
  
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let ticking = false;

    const updateScrollData = () => {
      const currentTime = performance.now();
      const currentScrollY = window.scrollY;
      const deltaTime = currentTime - lastTime;
      const velocity = deltaTime > 0 ? (currentScrollY - lastScrollY) / deltaTime : 0;
      
      // Calculate scroll progress (0 to 1)
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      ) - window.innerHeight;
      
      const progress = docHeight > 0 ? currentScrollY / docHeight : 0;

      setScrollData({
        y: currentScrollY,
        velocity: velocity,
        progress: progress
      });

      lastScrollY = currentScrollY;
      lastTime = currentTime;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollData);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollData;
} 