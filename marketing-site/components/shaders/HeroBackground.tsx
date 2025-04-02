import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '../theme-provider'

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec4 overlayColor;

  void mainImage(out vec4 o, vec2 v) {
    vec2 u = (v+v-(o.xy = iResolution.xy))/o.y;   
    u /= .5 + .2*dot(u,u);
    u += .2*cos(iTime) - 7.56;
    
    for (int i = 0; i < 3; i++) {
      v = sin(1.5*u.yx + 2.*cos(u -= .01));
      o[i] = 1. - exp(-6./exp(6.*length(v+sin(5.*v.y-3.*iTime)/4.)));
    }
    o.a = 1.0;
  }

  void main() {
    vec4 color;
    mainImage(color, gl_FragCoord.xy);
    // Apply the theme-based color overlay
    gl_FragColor = vec4(mix(color.rgb, overlayColor.rgb, overlayColor.a), 1.0);
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