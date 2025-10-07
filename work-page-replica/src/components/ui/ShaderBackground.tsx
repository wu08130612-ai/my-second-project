'use client';

import { Canvas } from '@react-three/fiber';

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
        {/* 暂时为空，将在后续里程碑中添加着色器 */}
      </Canvas>
    </div>
  );
}