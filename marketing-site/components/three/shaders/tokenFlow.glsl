uniform float time;
uniform vec2 resolution;
uniform vec3 tokenColor;    // Bright gold: vec3(1.0, 0.8, 0.0)
uniform vec3 flowColor;     // Cyan: vec3(0.0, 1.0, 0.8)
uniform vec3 gridColor;     // Deep blue: vec3(0.1, 0.2, 0.5)

varying vec2 vUv;

#define PI 3.14159265359
#define GRID_SIZE 8.0

// Improved hash function
vec3 hash3(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yxz+33.33);
    return fract((p3.xxy+p3.yzz)*p3.zyx);
}

// Smooth value noise
float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash3(i).x;
    float b = hash3(i + vec2(1.0, 0.0)).x;
    float c = hash3(i + vec2(0.0, 1.0)).x;
    float d = hash3(i + vec2(1.0, 1.0)).x;
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Token visualization
vec4 token(vec2 uv, vec2 pos, float size, float value) {
    float dist = length(uv - pos);
    float ring = smoothstep(size+0.02, size, dist) * 
                 smoothstep(size-0.04, size-0.02, dist);
    float core = smoothstep(size-0.02, 0.0, dist);
    
    vec3 color = mix(tokenColor, flowColor, value);
    float alpha = ring * 0.8 + core;
    
    // Add spinning effect
    float angle = atan(uv.y - pos.y, uv.x - pos.x);
    float spin = sin(angle * 6.0 + time * 2.0) * 0.5 + 0.5;
    color = mix(color, flowColor, spin * 0.3);
    
    return vec4(color, alpha);
}

// Flow field effect
vec2 flowField(vec2 uv) {
    float noise = valueNoise(uv * 3.0 + time * 0.2);
    float angle = noise * 2.0 * PI;
    return vec2(cos(angle), sin(angle));
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= resolution.x/resolution.y;
    
    vec4 color = vec4(0.0);
    
    // Grid effect
    vec2 grid = fract(uv * GRID_SIZE) - 0.5;
    float gridLine = smoothstep(0.05, 0.04, abs(grid.x)) + 
                    smoothstep(0.05, 0.04, abs(grid.y));
    color += vec4(gridColor, gridLine * 0.1);
    
    // Flow field visualization
    vec2 flow = flowField(uv);
    float flowStr = length(flow);
    
    // Generate tokens
    for(float i = 0.0; i < 5.0; i++) {
        vec2 center = vec2(
            cos(time * 0.5 + i * PI * 0.4),
            sin(time * 0.3 + i * PI * 0.4)
        ) * 0.5;
        
        // Move tokens along flow field
        center += flow * sin(time + i) * 0.1;
        
        float value = sin(time + i * PI * 0.5) * 0.5 + 0.5;
        vec4 tok = token(uv, center, 0.15, value);
        color = mix(color, tok, tok.a);
    }
    
    // Add flow lines
    float flowLine = sin(dot(uv, flow) * 10.0 - time * 2.0) * 0.5 + 0.5;
    color += vec4(flowColor, flowLine * 0.1);
    
    // Add glow
    float glow = 0.0;
    for(float i = 0.0; i < 5.0; i++) {
        vec2 center = vec2(
            cos(time * 0.5 + i * PI * 0.4),
            sin(time * 0.3 + i * PI * 0.4)
        ) * 0.5;
        float dist = length(uv - center);
        glow += 0.02 / (dist + 0.2);
    }
    color += vec4(tokenColor, glow * 0.2);
    
    gl_FragColor = color;
} 