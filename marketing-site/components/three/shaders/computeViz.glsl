uniform float time;
uniform vec2 resolution;
uniform vec3 computeColor;   // Electric blue: vec3(0.2, 0.6, 1.0)
uniform vec3 energyColor;    // Vibrant purple: vec3(0.8, 0.2, 1.0)
uniform vec3 dataColor;      // Neon green: vec3(0.2, 1.0, 0.4)

varying vec2 vUv;

#define PI 3.14159265359
#define CUBE_COUNT 6

// 3D rotation matrix
mat3 rotMat(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat3(
        oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,
        oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,
        oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c
    );
}

// GPU cube visualization
vec4 gpuCube(vec2 uv, vec3 pos, float size, float activity) {
    // Project 3D position to 2D
    vec2 projected = pos.xy / (pos.z + 2.0);
    vec2 delta = uv - projected;
    
    // Create cube faces with perspective
    float face = smoothstep(size, size * 0.9, max(abs(delta.x), abs(delta.y)));
    float edge = smoothstep(size * 1.1, size, max(abs(delta.x), abs(delta.y)));
    
    // Activity pulse
    float pulse = sin(activity * 10.0 + time * 2.0) * 0.5 + 0.5;
    vec3 color = mix(computeColor, energyColor, pulse);
    
    // Add data flow patterns
    float data = sin(delta.x * 20.0 + delta.y * 20.0 + time * 3.0) * 0.5 + 0.5;
    color = mix(color, dataColor, data * 0.3 * activity);
    
    return vec4(color, (face + edge * 0.5) * smoothstep(2.0, 1.8, pos.z));
}

// Energy connection beam
vec4 energyBeam(vec2 uv, vec2 start, vec2 end, float power) {
    vec2 dir = end - start;
    float len = length(dir);
    dir = dir / len;
    
    vec2 pos = uv - start;
    float proj = dot(pos, dir);
    float perpDist = length(pos - dir * proj);
    
    float beam = smoothstep(0.05, 0.0, perpDist) * 
                 smoothstep(0.0, 0.1, proj/len) * 
                 smoothstep(1.0, 0.9, proj/len);
    
    // Energy pulse effect
    float pulse = sin(proj * 10.0 - time * 5.0) * 0.5 + 0.5;
    beam *= (0.5 + pulse * 0.5);
    
    return vec4(energyColor, beam * power);
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= resolution.x/resolution.y;
    
    vec4 color = vec4(0.0);
    
    // Generate GPU cubes in 3D space
    vec3 cubePositions[CUBE_COUNT];
    float cubeActivities[CUBE_COUNT];
    
    for(int i = 0; i < CUBE_COUNT; i++) {
        float angle = float(i) * 2.0 * PI / float(CUBE_COUNT);
        float radius = 0.8;
        
        // Create rotating orbit effect
        mat3 rot = rotMat(vec3(1.0, 1.0, 0.0), time * 0.2);
        vec3 basePos = vec3(cos(angle) * radius, sin(angle) * radius, 0.0);
        cubePositions[i] = rot * basePos;
        
        // Compute activity level
        cubeActivities[i] = sin(time + float(i) * PI / 3.0) * 0.5 + 0.5;
    }
    
    // Draw energy connections
    for(int i = 0; i < CUBE_COUNT; i++) {
        for(int j = i + 1; j < CUBE_COUNT; j++) {
            vec2 start = cubePositions[i].xy / (cubePositions[i].z + 2.0);
            vec2 end = cubePositions[j].xy / (cubePositions[j].z + 2.0);
            
            float power = cubeActivities[i] * cubeActivities[j];
            vec4 beam = energyBeam(uv, start, end, power);
            color = mix(color, beam, beam.a * 0.5);
        }
    }
    
    // Draw GPU cubes
    for(int i = 0; i < CUBE_COUNT; i++) {
        vec4 cube = gpuCube(uv, cubePositions[i], 0.1, cubeActivities[i]);
        color = mix(color, cube, cube.a);
    }
    
    // Add ambient glow
    float glow = 0.0;
    for(int i = 0; i < CUBE_COUNT; i++) {
        vec2 pos = cubePositions[i].xy / (cubePositions[i].z + 2.0);
        float dist = length(uv - pos);
        glow += 0.02 / (dist + 0.2) * cubeActivities[i];
    }
    color += vec4(computeColor, glow * 0.2);
    
    gl_FragColor = color;
} 