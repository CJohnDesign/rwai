uniform float time;
uniform vec2 resolution;
uniform vec3 primaryColor;   // Deep purple: vec3(0.4, 0.0, 1.0)
uniform vec3 secondaryColor; // Neon blue: vec3(0.0, 0.8, 1.0)
uniform vec3 accentColor;    // Electric pink: vec3(1.0, 0.2, 0.8)

varying vec2 vUv;

#define PI 3.14159265359
#define NODE_COUNT 12

// Hash function for randomization
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// Smooth pulse function
float pulse(float x, float center, float width) {
    float v = abs(x - center);
    return max(0.0, 1.0 - v/width);
}

// Node structure simulation
vec4 node(vec2 uv, vec2 position, float size, float intensity) {
    float dist = length(uv - position);
    float glow = exp(-dist * 3.0) * intensity;
    float core = smoothstep(size, size * 0.8, dist);
    return vec4(mix(primaryColor, accentColor, core), glow);
}

// Connection line with flowing data
vec4 connection(vec2 uv, vec2 start, vec2 end, float phase) {
    vec2 dir = end - start;
    float len = length(dir);
    dir = dir / len;
    
    // Project point onto line
    vec2 pos = uv - start;
    float proj = dot(pos, dir);
    float perpDist = length(pos - dir * proj);
    
    // Data packet flow
    float flow = fract(proj/len - time * 0.5 + phase);
    float pulse = exp(-flow * 8.0) * exp(-(1.0-flow) * 8.0);
    
    // Line with flowing data
    float line = smoothstep(0.02, 0.01, perpDist) * 
                 smoothstep(0.0, 0.1, proj/len) * 
                 smoothstep(1.0, 0.9, proj/len);
    
    return vec4(secondaryColor, line * (0.2 + pulse * 0.8));
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= resolution.x/resolution.y;
    
    vec4 color = vec4(0.0);
    
    // Node positions (hexagonal grid with slight randomization)
    vec2 nodes[NODE_COUNT];
    for(int i = 0; i < NODE_COUNT; i++) {
        float angle = float(i) * 2.0 * PI / float(NODE_COUNT);
        float radius = 0.6 + hash(vec2(float(i), time * 0.1)) * 0.1;
        nodes[i] = vec2(cos(angle), sin(angle)) * radius;
    }
    
    // Draw connections
    for(int i = 0; i < NODE_COUNT; i++) {
        for(int j = i + 1; j < NODE_COUNT; j++) {
            float activity = hash(vec2(float(i*j), floor(time)));
            if(activity > 0.7) { // Only show some connections
                vec4 conn = connection(uv, nodes[i], nodes[j], float(i*j));
                color += conn * (1.0 - color.a);
            }
        }
    }
    
    // Draw nodes
    for(int i = 0; i < NODE_COUNT; i++) {
        float intensity = 0.5 + 0.5 * sin(time * (1.0 + hash(vec2(float(i), 0.0))));
        vec4 n = node(uv, nodes[i], 0.05, intensity);
        color += n * (1.0 - color.a);
    }
    
    // Add subtle background glow
    float bgGlow = 0.0;
    for(int i = 0; i < NODE_COUNT; i++) {
        float dist = length(uv - nodes[i]);
        bgGlow += 0.02 / (dist + 0.1);
    }
    
    color += vec4(primaryColor * 0.2, bgGlow * 0.1);
    
    gl_FragColor = color;
} 