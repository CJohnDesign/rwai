import * as THREE from 'three';

export const createOptimizedRenderer = (container: HTMLElement) => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  
  return renderer;
};

export const createBaseCamera = (container: HTMLElement) => {
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  return camera;
};

export const createBaseScene = () => {
  const scene = new THREE.Scene();
  scene.background = null;
  return scene;
};

export const throttleRAF = (callback: () => void) => {
  let ticking = false;
  return () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
};

export const disposeObject = (obj: THREE.Object3D) => {
  if (obj instanceof THREE.Mesh) {
    if (obj.geometry) {
      obj.geometry.dispose();
    }

    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach(material => material.dispose());
      } else {
        obj.material.dispose();
      }
    }
  }
};

export const disposeScene = (scene: THREE.Scene) => {
  scene.traverse(disposeObject);
};

export type ThreeSceneRef = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  animationFrame?: number;
}; 