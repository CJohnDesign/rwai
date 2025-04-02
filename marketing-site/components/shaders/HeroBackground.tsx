import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '../theme-provider'

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec2 iMouse;
  uniform vec4 overlayColor;

  vec2 M_;
  #define A_ min( iResolution.x, iResolution.y )

  // rotation
  mat2 n(float a) {
    float b = sin(a), c = cos(a);
    return mat2(c, b, -b, c);
  }
  const mat2 L = mat2(-1.1, -.4, .3, 1);
  // fbm
  float M(in vec2 a) {
    a *= L;
    return cos(a.x + .18975) * sin(a.y + .494516) + .161525;
  }
  // material
  float o(in vec2 d, in float e) {
    float f = 0.;
    for (int a = 0; a < 7; a++) {
      float b = pow(2., float(a));
      d *= n(float(a));
      float c = pow(b, -e);
      c = smoothstep(0., .05, c), f += c * M(b * d * n(float(a)));
    }
    return f;
  }
  // repetition
  vec2 p(inout vec2 a, vec2 b) {
    vec2 c = b * .5, d = floor((a + c) / b);
    a.y -= mod(d.x, 2.) * .02, a = mod(a + c, b) - c;
    return d;
  }
  // sphere ( ellipse attached )
  float r(vec3 b) {
    b.y += 1.6;
    return length(b * vec3( 1, 1, .8 ) ) - 2.;
  }
  // ellipse
  float z(vec3 b) {
    vec3 a = b;
    vec2 c = p(a.xz, vec2(.025, .05));
    a.y -= .6, a.y += distance(a.y, r(b)) - .014,
    a.xz *= n( atan( M_.x, M_.y ) ),
    a.yz *= n(iTime * .7 * atan(abs(c.x - iTime * 2.), abs(c.y - iTime * 2.) ) );

    float d = length(vec3(a.x * 1.2, a.y * (2. + cos( -iTime ) * .3 ), a.z )) - .014;
    return d;
  }
  // sdf
  float g(vec3 b) {
    vec3 c = b;
    float a = 5.;
    a = min(a, r(c)), a = min(a, z(c));
    return a;
  }
  // calcNormal (IQ)
  vec3 A(in vec3 b) {
    vec2 a = vec2(1, -1) * .5773;
    return normalize(a.xyy * g(b + a.xyy * 5e-4) + a.yyx * g(b + a.yyx * 5e-4) +
                     a.yxy * g(b + a.yxy * 5e-4) + a.xxx * g(b + a.xxx * 5e-4));
  }

  float q(vec2 a, vec2 d) {
    a.y /= iResolution.y / iResolution.x;
    vec2 b = p(a, d);
    float c = 0.;
    c += smoothstep(.021, .02, length(a) - .02) * .05;
    float e = mod(b.x, 2.) > 0. && mod(b.y, 2.) > 0. ? 0. : .015;
    c = mix(c, 0., smoothstep(e, 0., length(a) - e));
    return c;
  }

  float S_( vec2 u ){
    float p = .1;
    
    u.y += .015;
  
    vec2 vv = u;
    u.y = abs( u.y ) - .006;
  
    if( vv.y < 0. ){
      u.x *= -1.;
    }
  
    vec2 v = u;

    u.y -= .039;
  
    p = max(
            length( u * vec2( 8. * abs( v.x ), 1. ) ) - .05,
            -( length( u * vec2( 8. * abs( v.x ), 1. ) ) - .025 )
      );
  
    u = v;
  
    u.x += .028;
    u.y -= .014;
  
    p = max(
      p,
        sin( atan( u.x, u.y ) - .015 ) - .98
      );
  
    return p;
  }

  void mainImage(out vec4 U, in vec2 V) {
    // initial ro, rd global matrix (IQ)
    vec2 a = V.xy / iResolution.xy, m = a;
    a = (a - .5) * 2., a.x *= iResolution.x / iResolution.y;
    
    M_ = ( iMouse.xy * 2. - iResolution.xy ) / min( iResolution.x, iResolution.y );
    
    vec3 e = vec3(0), C = vec3(0, 0, 0);
    e = vec3(0, .6, -1);
    vec3 f = normalize(C - e), l = normalize(cross(f, vec3(0, 1, 0))),
         D = normalize(cross(l, f)), s = vec3(0),
         c = normalize(a.x * l + a.y * D + 2.5 * f);
    float h = 0.;
    // trace
    for (int E = 0; E < 64; ++E) {
      vec3 F = e + c * h;
      float N = g(F) * .44445; // smoothly step
      h += N;
    }
    vec3 i = vec3(0), j = normalize(vec3(0, .05, .3)), G = normalize(j - c),
         t = normalize(vec3(-10.5, .05, -2.5)), H = normalize(t - c),
         u = normalize(vec3(.7, .05, 2)), I = normalize(u - c);
    t.yz *= n(-iTime * .1), j.xy *= n(iTime * .6), u.xy *= n(iTime * .5);
    // integrated lights
    if (h < 5.) {
      vec3 d = e + h * c, b = A(d);
      float J = o(vec2(o(b.xz * 15., cos(iTime))), .9),
            k = clamp(dot(b, vec3(.4, 1, -.5)), 0., 1.),
            v = pow(clamp(dot(b, G), 0., 1.), 150.);
      v *= k;
      float w = pow(clamp(dot(b, H), .2, 2.), 250.);
      w *= k;
      float x = pow(clamp(dot(b, I), .2, 2.), 80.);
      x *= k;
      float O = dot(b, vec3(0));
      vec3 K = vec3(.7, .1, .09) * 3. + vec3(sin(atan(a.x, a.y)),
                                             cos(atan(a.x, a.y)),
                                             sin(atan(a.x, a.y))),
           P = .7 + .3 * cos(iTime * .1 + a.yxy + vec3(6, 2, 4)),
           Q = v * vec3(1, .91, .37), R = w * vec3(.19, 7e-3, .63),
           S = x * vec3(1, .1, .2);
      if (g(d) == r(d)) {
        float W = q(b.xz + J, vec2(3e-3, 3e-3));
      } else if (g(d) == z(d)) {
        float T = smoothstep( 5. / A_, -5. / A_, S_( A(d).xz * vec2(-1,1) + vec2( .0, .45 ) ) ) * max( A( d ).y, 0. );
        i = T * .01 + q(b.xy, vec2(.05, .07)) * .05 + Q + R + S + K * O + vec3(5e-3) * K * k + P * vec3(.035);
        i *= pow(k, 3.);
      }
    }
    i = i * 2.5, i += .02 * cos(iTime * .5 + a.xyx + vec3(0, 2, 4)), s += i,
    s *= mix( // after mask
        1. - smoothstep(0., .1, length(vec2(m.x * .8, m.y) - vec2(.4, .5)) - .4),
        1., step(m.y, .5)),
    U = vec4(mix(s, overlayColor.rgb, overlayColor.a), 1.0);
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