uniform float time;
uniform vec2 resolution;
uniform vec3 startColor;
uniform vec3 endColor;

varying vec2 vUv;

#define PI 3.14159265359

void main() {
    float t = time + 5.0;
    float z = 6.0;
    
    const int n = 100; // particle count
    
    vec2 uv = vUv;
    vec2 v = z * (2.0 * uv - 1.0);
    
    vec3 col = vec3(0.0);
    float sum = 0.0;
    
    float startRadius = 0.84;
    float endRadius = 1.6;
    float power = 0.51;
    float duration = 4.0;
    
    float dMax = duration;
    float evo = (sin(time * 0.01 + 400.0) * 0.5 + 0.5) * 99.0 + 1.0;
    
    for(int i = 0; i < n; i++) {
        float d = fract(t * power + 48934.4238 * sin(float(i/int(evo)) * 692.7398));
        float a = 2.0 * PI * float(i) / float(n);
        
        float x = d * cos(a) * duration;
        float y = d * sin(a) * duration;
        
        float distRatio = d / dMax;
        float mbRadius = mix(startRadius, endRadius, distRatio);
        
        vec2 p = v - vec2(x, y);
        float mb = mbRadius / dot(p, p);
        
        sum += mb;
        col = mix(col, mix(startColor, endColor, distRatio), mb/sum);
    }
    
    sum /= float(n);
    col = normalize(col) * sum;
    sum = clamp(sum, 0.0, 0.4);
    
    vec3 tex = vec3(1.0);
    col *= smoothstep(tex, vec3(0.0), vec3(sum));
    
    gl_FragColor = vec4(col, 1.0);
} 