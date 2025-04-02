import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '../theme-provider'

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec2 iMouse;
  uniform vec4 overlayColor;

  #define AA true
  #define TAU 6.28318530718
  
  vec3 boxSize = vec3(.34,.99,.99);
  vec3 frameSize = vec3(.35,1.0,1.0);

  // Rotation matrix
  mat2 rotation(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  // Map function
  float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
  }

  // Easing function
  float easeInOutCubic(float x) {
    return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
  }

  // Signed Distance Functions
  float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
  }

  float sdBoxFrame(vec3 p, vec3 b, float e) {
    p = abs(p) - b;
    vec3 q = abs(p + e) - e;
    return min(min(
        length(max(vec3(p.x,q.y,q.z),0.0)) + min(max(p.x,max(q.y,q.z)),0.0),
        length(max(vec3(q.x,p.y,q.z),0.0)) + min(max(q.x,max(p.y,q.z)),0.0)),
        length(max(vec3(q.x,q.y,p.z),0.0)) + min(max(q.x,max(q.y,p.z)),0.0));
  }

  float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa,ba)/dot(ba,ba), 0.0, 1.0);
    return length(pa - ba*h);
  }

  void mainImage0(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord-.5*iResolution.xy)/iResolution.y;
    uv.x -= 1.5; // Shift everything to the right
    uv.y -= 0.5; // Shift everything to the bottom

    vec3 col = vec3(0);  
    float tt = fract(.2 * iTime);
     
    vec3 camPos = vec3(0., 0., 4.5); 
    vec3 rayDir = normalize(vec3(uv, -1));
    
    // Rotate 90 degrees around Z axis
    vec3 rotatedCamPos = vec3(camPos.y, -camPos.x, camPos.z);
    vec3 rotatedRayDir = vec3(rayDir.y, -rayDir.x, rayDir.z);
    
    float depth = 0.0;
    float closest;
    float d;
    vec3 p = vec3(0);
    float cID;
    
    for(int numIter = 0; numIter < 200; numIter++) {
      p = rotatedCamPos + depth * rotatedRayDir;

      // Limited Domain Repetition    
      float scale = 2.;
      float cellID = clamp(round(scale * p.x),-2.5 * scale,2.5 * scale); 
      p.x = (scale * p.x) - cellID;
      
      // Rotation calculation
      float nCell = (cellID + 5.) / 10.; // 0 to 1  
      float start = map(nCell,0.,1.,0.,.12);
      float end = start + .88;
      if (tt > start && tt < end) {
        float ttt = easeInOutCubic(map(tt, start, end, 0., 1.));
        p.yz *= rotation(TAU * ttt);
      }
      
      // SDFs
      float box = sdBox(p, boxSize);
      float frame = sdBoxFrame(p, frameSize, .01);  
      d = min(box,frame);
      closest = step(0.,box-frame);
      depth += d * .3;
      if (d < .01 || depth > 20.0) { 
        cID = cellID;
        break;
      }
    }
    
    d = depth;

    if (d > 20.) {
      col = vec3(0.);  
    } 
    else if (closest == 0.) {
      vec2 side;
      bool stars;
      vec3 q = abs(p);
      
      if (q.x > q.y && q.x > q.z) { 
        side = p.yz; 
        stars = false; 
      } 
      else if (q.y >= q.x && q.y > q.z) { 
        side = p.xz; 
        stars = true; 
      }
      else { 
        side = p.xy; 
        stars = true; 
      }    

      if (stars) {
        // Draw Lines
        float line_1 = sdSegment(side, vec2(.2,.8), vec2(.2,-.8));
        float line_2 = sdSegment(side, vec2(-.2,.8), vec2(-.2,-.8));
        col += 10. * smoothstep(.025,-.025,line_1);
        col += 10. * smoothstep(.025,-.025,line_2);
        
        // Draw Stars (on boxes)
        vec2 star_uv = 4. * side * boxSize.y/boxSize.x;
        vec2 starID = round(star_uv);
        starID.x = clamp(starID.x,-1.,1.);
        starID.y = clamp(starID.y,-9.,9.);
        star_uv = star_uv - starID;
        float off = fract(323.23*sin(cID + starID.x/10.) * 12.*sin(cID + starID.y/10.));
        float star_rad = .25 + .25*sin(4.*TAU*tt + TAU*off);
        float star = length(star_uv) - star_rad;
        col += smoothstep(0.,-fwidth(star),star);
      }
    } 
    else if (closest == 1.) {
      col = vec3(1.);
    }

    fragColor = vec4(mix(col, overlayColor.rgb, overlayColor.a), 1.0);
  }

  void mainImage(out vec4 O, vec2 U) {
    mainImage0(O,U);
    if(AA) {
      if (fwidth(length(O)) > .01) {  // difference threshold between neighbor pixels
        vec4 o;
        for (int k=0; k < 9; k+= k==3?2:1) { 
          mainImage0(o,U+vec2(k%3-1,k/3-1)/3.); 
          O += o; 
        }
        O /= 9.;
      }
    }
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
  const { size } = useThree()
  
  const uniformsRef = useRef({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    iMouse: { value: new THREE.Vector2(0, 0) },
    overlayColor: { value: new THREE.Vector4(0, 0, 0, 1) }
  })

  // Update mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      uniformsRef.current.iMouse.value.set(
        event.clientX,
        size.height - event.clientY // Flip Y coordinate for WebGL
      )
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [size.height])

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