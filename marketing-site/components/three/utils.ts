import * as THREE from 'three';

export interface ThreeSceneRef {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  animationFrame?: number;
}

export function createOptimizedRenderer(container: HTMLDivElement): THREE.WebGLRenderer {
  console.log('Creating WebGL renderer');
  
  // Check for WebGL support
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      throw new Error('WebGL is not supported in this browser');
    }
  } catch (e) {
    throw new Error('WebGL is not supported in this browser');
  }

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    precision: 'highp',
    logarithmicDepthBuffer: true
  });

  // Set size to match container
  renderer.setSize(container.clientWidth, container.clientHeight, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Enable shadow mapping
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  console.log('Renderer created with dimensions:', {
    width: container.clientWidth,
    height: container.clientHeight,
    pixelRatio: renderer.getPixelRatio()
  });

  return renderer;
}

export function createBaseCamera(container: HTMLDivElement): THREE.PerspectiveCamera {
  console.log('Creating perspective camera');
  const fov = 75;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 5;
  
  console.log('Camera created with settings:', {
    fov,
    aspect,
    near,
    far,
    position: camera.position.toArray()
  });

  return camera;
}

export function createBaseScene(): THREE.Scene {
  console.log('Creating scene');
  const scene = new THREE.Scene();
  
  // Add fog for depth
  scene.fog = new THREE.Fog(0x000414, 1, 100);
  
  // Add ambient light for better visibility
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  return scene;
}

export function disposeObject(obj: THREE.Object3D): void {
  console.log('Disposing object:', obj.type);
  
  // Dispose geometries
  if (obj instanceof THREE.Mesh) {
    if (obj.geometry) {
      obj.geometry.dispose();
    }

    // Dispose materials
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach(material => {
          Object.keys(material).forEach(prop => {
            if (material[prop] && typeof material[prop].dispose === 'function') {
              material[prop].dispose();
            }
          });
          material.dispose();
        });
      } else {
        Object.keys(obj.material).forEach(prop => {
          if (obj.material[prop] && typeof obj.material[prop].dispose === 'function') {
            obj.material[prop].dispose();
          }
        });
        obj.material.dispose();
      }
    }
  }

  // Remove from parent
  if (obj.parent) {
    obj.parent.remove(obj);
  }

  obj.clear();
}

export function disposeScene(scene: THREE.Scene): void {
  console.log('Disposing scene');
  scene.traverse(disposeObject);
  scene.clear();
}

export function throttleRAF(callback: () => void): () => void {
  let frameId: number | null = null;
  let lastTime = 0;
  const targetFPS = 60;
  const frameInterval = 1000 / targetFPS;

  return () => {
    const currentTime = performance.now();
    const elapsed = currentTime - lastTime;

    if (elapsed > frameInterval) {
      lastTime = currentTime - (elapsed % frameInterval);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      frameId = requestAnimationFrame(callback);
    }
  };
} 