'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// 顶点着色器 - 传递UV坐标到片元着色器
const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// 片元着色器 - 艺术升华：彩色渐变与抛光效果
const fragmentShader = `
  uniform float u_time;
  uniform vec3 u_colorA;
  uniform vec3 u_colorB;
  uniform float u_noiseSpeed;
  uniform float u_noiseScale;
  varying vec2 vUv;
  
  // 简化版Simplex噪点函数
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec3 permute(vec3 x) {
    return mod289(((x*34.0)+1.0)*x);
  }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
    
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    // 多层噪点创建更丰富的纹理
    vec2 noiseCoord1 = vUv * u_noiseScale + u_time * u_noiseSpeed;
    vec2 noiseCoord2 = vUv * u_noiseScale * 2.0 + u_time * u_noiseSpeed * 0.7;
    
    float noise1 = snoise(noiseCoord1);
    float noise2 = snoise(noiseCoord2) * 0.5;
    
    // 组合噪点
    float combinedNoise = noise1 + noise2;
    combinedNoise = combinedNoise * 0.5 + 0.5; // 映射到[0,1]
    
    // 添加径向渐变效果
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    float radialGradient = 1.0 - smoothstep(0.0, 0.8, dist);
    
    // 结合噪点和径向渐变
    float finalNoise = combinedNoise * radialGradient;
    
    // 使用mix函数在两种颜色间插值
    vec3 finalColor = mix(u_colorA, u_colorB, finalNoise);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function ShaderMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // 着色器uniforms - 添加新的颜色和参数控制
  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_colorA: { value: new THREE.Color(0x0a0a0a) }, // 深灰色
    u_colorB: { value: new THREE.Color(0x1a1a2e) }, // 深蓝紫色
    u_noiseSpeed: { value: 0.1 },
    u_noiseScale: { value: 3.0 }
  }), []);

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms.u_time) {
        material.uniforms.u_time.value = state.clock.getElapsedTime();
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <ShaderMesh />
      </Canvas>
    </div>
  );
}