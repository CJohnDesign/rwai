import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '../theme-provider'

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec4 overlayColor;

  /*
    "Shield" effect shader
    Creates a dynamic hexagonal pattern with spherical distortion and glow
  */
  void mainImage(out vec4 O, vec2 I) {
    // Iterator, z and time
    float i = 0.0;
    float z;
    float t = iTime;
    
    // Clear fragment color
    O = vec4(0.0);
    
    // Loop 100 times for layered effect
    for(; i < 1.0; i += 0.01) {
      // Resolution for scaling
      vec2 v = iResolution.xy;
      
      // Center and scale outward
      vec2 p = (I + I - v) / v.y * i;
      
      // Sphere distortion and compute z
      z = max(1.0 - dot(p, p), 0.0);
      p /= 0.2 + sqrt(z) * 0.3;
      
      // Offset for hex pattern
      p.y += fract(ceil(p.x = p.x / 0.9 + t) * 0.5) + t * 0.2;
      
      // Mirror quadrants
      vec2 v2 = abs(fract(p) - 0.5);
      
      // Compute hex distance and add color with outward fade
      float hexDist = abs(max(v2.x * 1.5 + v2, v2 + v2).y - 1.0) + 0.1 - i * 0.09;
      
      // Add color with energy tint
      vec3 energyColor = vec3(2.0, 3.0, 5.0) / 2000.0;
      O += vec4(energyColor, 1.0) * z / hexDist;
    }
    
    // Tanh tonemap for nice color curve
    O = tanh(O * O);
    
    // Mix with theme overlay
    O = vec4(mix(O.rgb, overlayColor.rgb, overlayColor.a), 1.0);
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

// Convert OKLCH to RGB
function oklchToRGB(l: number, c: number, h: number) {
  // For dark mode: oklch(0.129 0.042 264.695)
  // For light mode: oklch(1 0 0)
  
  if (l === 1 && c === 0 && h === 0) {
    // Light mode - pure white
    return { r: 1, g: 1, b: 1 }
  }
  
  // Dark mode specific conversion
  // These values are tuned specifically for the dark mode background color
  return {
    r: l * 0.2,  // Slightly blue tinted
    g: l * 0.15,
    b: l * 0.4   // More blue for the dark theme
  }
}

export function HeroBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()
  
  const uniformsRef = useRef({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    overlayColor: { value: new THREE.Vector4(0, 0, 0, 1) }
  })

  // Update overlay color based on theme
  useEffect(() => {
    // Get the computed background color from CSS variables
    const root = document.documentElement
    const computedStyle = getComputedStyle(root)
    const bgColor = computedStyle.getPropertyValue('--background').trim()
    
    // Parse the OKLCH color
    const match = bgColor.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/)
    if (match) {
      const [_, l, c, h] = match.map(Number)
      const rgb = oklchToRGB(l, c, h)
      uniformsRef.current.overlayColor.value.set(rgb.r, rgb.g, rgb.b, 0.75)
    }
  }, [theme])

  useFrame((state) => {
    if (!meshRef.current) return
    uniformsRef.current.iTime.value = state.clock.elapsedTime
    uniformsRef.current.iResolution.value.set(window.innerWidth, window.innerHeight)
  })

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: uniformsRef.current,
        vertexShader,
        fragmentShader,
      }),
    []
  )

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  )
} 