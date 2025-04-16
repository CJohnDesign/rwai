import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '../theme-provider'

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec4 overlayColor;
  uniform vec2 mousePos;

  // rotate position around axis
  vec2 rotate(vec2 p, float a) {
    return vec2(p.x * cos(a) - p.y * sin(a), p.x * sin(a) + p.y * cos(a));
  }

  // 1D random numbers
  float rand(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  // 2D random numbers
  vec2 rand2(in vec2 p) {
    return fract(vec2(sin(p.x * 591.32 + p.y * 154.077), cos(p.x * 391.32 + p.y * 49.077)));
  }

  // 1D noise
  float noise1(float p) {
    float fl = floor(p);
    float fc = fract(p);
    return mix(rand(fl), rand(fl + 1.0), fc);
  }

  // voronoi distance noise
  float voronoi(in vec2 x) {
    vec2 p = floor(x);
    vec2 f = fract(x);
    
    vec2 res = vec2(8.0);
    for(int j = -1; j <= 1; j ++) {
      for(int i = -1; i <= 1; i ++) {
        vec2 b = vec2(i, j);
        vec2 r = vec2(b) - f + rand2(p + b);
        float d = max(abs(r.x), abs(r.y));
        
        if(d < res.x) {
          res.y = res.x;
          res.x = d;
        }
        else if(d < res.y) {
          res.y = d;
        }
      }
    }
    return res.y - res.x;
  }

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    float flicker = noise1(iTime * 1.2) * 0.4 + 0.7;

    vec2 uv = fragCoord.xy / iResolution.xy;
    uv = (uv - 0.5) * 2.0;
    vec2 suv = uv;
    uv.x *= iResolution.x / iResolution.y;
    
    // Convert mouse to normalized device coordinates with amplified movement
    vec2 mouseNDC = (mousePos.xy / iResolution.xy) * 2.0 - 1.0;
    mouseNDC.y = -mouseNDC.y;
    mouseNDC.x *= iResolution.x / iResolution.y;
    
    // Reduced amplification with gentler curve
    float xAmplification = 1.6;  // Reduced horizontal amplification
    float yAmplification = 1.8;  // Reduced vertical amplification
    
    // Asymmetric horizontal movement - gentler on the left
    float xPower = mouseNDC.x < 0.0 ? 0.9 : 0.8;  // Higher power = gentler movement
    
    vec2 adjustedMouse = vec2(
      sign(mouseNDC.x) * pow(abs(mouseNDC.x), xPower) * xAmplification,  // Asymmetric x amplification
      sign(mouseNDC.y) * pow(abs(mouseNDC.y), 0.85) * yAmplification     // Gentler y amplification
    );
    
    // Add larger offset to center position
    adjustedMouse.x += 0.85;  // Further increased right shift
    adjustedMouse.y += 0.6;   // Further increased upward shift
    
    // Scale UV to zoom in
    uv *= 2.5;
    
    float v = 0.0;
    
    // Higher contrast settings
    float a = 0.9, f = 0.8;
    
    for(int i = 0; i < 3; i ++) {  
      float v1 = voronoi(uv * f + 5.0);
      float v2 = 0.0;
      
      if(i > 0) {
        v2 = voronoi(uv * f * 0.5 + 50.0 + iTime * 0.7);
        
        float va = 0.0, vb = 0.0;
        va = 1.0 - smoothstep(0.0, 0.06, v1);
        vb = 1.0 - smoothstep(0.0, 0.04, v2);
        v += a * pow(va * (0.5 + vb), 1.6);
      }
      
      v1 = 1.0 - smoothstep(0.0, 0.15, v1);
      v2 = a * (noise1(v1 * 5.5 + 0.1));
      
      if(i == 0)
        v += v2 * flicker * 0.8;
      else
        v += v2;
      
      f *= 3.0;
      a *= 0.75;
    }

    // Wider, more contrasty vignette with transparent center
    float distFromMouse = length(suv - adjustedMouse);
    float innerRadius = 0.3;
    float outerRadius = 0.7;
    float vignetteStrength = smoothstep(innerRadius, outerRadius, distFromMouse);
    float vignette = mix(1.0, 0.5, vignetteStrength);
    v *= vignette;
    
    // Enhanced contrast through stronger gamma adjustment
    v = pow(v, 1.3);
    
    // Expanded monochromatic color range
    vec3 darkColor = vec3(0.004, 0.016, 0.07);
    vec3 lightColor = vec3(0.080, 0.110, 0.170);
    vec3 col = mix(darkColor, lightColor, pow(v, 1.1));
    
    // Mix with theme color with reduced overlay influence for monochromatic look
    fragColor = vec4(mix(col, overlayColor.rgb, overlayColor.a * 0.25), 1.0);
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

export function HeroBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()
  const mousePosRef = useRef({ x: 0, y: 0 })
  
  const uniformsRef = useRef({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    overlayColor: { value: new THREE.Vector4(0, 0, 0, 1) },
    mousePos: { value: new THREE.Vector2(0, 0) }
  })

  // Update mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Just pass raw coordinates, we'll handle the conversion in the shader
      uniformsRef.current.mousePos.value.set(event.clientX, event.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Update overlay color based on theme
  useEffect(() => {
    const root = document.documentElement
    const computedStyle = getComputedStyle(root)
    const bgColor = computedStyle.getPropertyValue('--background').trim()
    
    const match = bgColor.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/)
    if (match) {
      const [_, l, c, h] = match.map(Number)
      const rgb = oklchToRGB(l, c, h)
      uniformsRef.current.overlayColor.value.set(rgb.r, rgb.g, rgb.b, 0.25)
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

// Convert OKLCH to RGB helper function
function oklchToRGB(l: number, c: number, h: number) {
  if (l === 1 && c === 0 && h === 0) {
    return { r: 1, g: 1, b: 1 }
  }
  
  return {
    r: l * 0.2,
    g: l * 0.15,
    b: l * 0.4
  }
} 