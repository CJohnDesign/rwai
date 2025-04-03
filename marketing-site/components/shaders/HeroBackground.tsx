import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '../theme-provider'

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec3 brandColorLight;
  uniform vec3 brandColorDark;
  uniform bool isDarkTheme;

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // Normalize coordinates to be between -1 and 1
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
    
    // Scale for number of lines
    float lines = 20.0;
    float y = uv.y * lines;
    
    // Create the line pattern
    float line = fract(y);
    float cell = floor(y);
    
    // Animate based on x position and time
    float speed = 2.0;
    float offset = sin(cell * 0.3 + iTime * speed) * 0.3;
    line += offset + uv.x;
    
    // Smooth the lines
    float thickness = 0.4;
    float pattern = smoothstep(0.5 - thickness, 0.5, line) - 
                   smoothstep(0.5, 0.5 + thickness, line);
                   
    // Add some variation based on x position
    pattern *= 0.8 + 0.2 * sin(uv.x * 3.0 + iTime);
    
    vec3 color = isDarkTheme ? brandColorDark : brandColorLight;
    fragColor = vec4(color * pattern, 1.0);
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export function HeroBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()
  
  const shaderRef = useRef({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    brandColorLight: { value: new THREE.Color('#6366f1') },  // Indigo brand color
    brandColorDark: { value: new THREE.Color('#818cf8') },   // Lighter indigo for dark mode
    isDarkTheme: { value: theme === 'dark' }
  })

  useFrame((state) => {
    if (!meshRef.current) return
    shaderRef.current.iTime.value = state.clock.elapsedTime
    shaderRef.current.isDarkTheme.value = theme === 'dark'
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={shaderRef.current}
      />
    </mesh>
  )
} 