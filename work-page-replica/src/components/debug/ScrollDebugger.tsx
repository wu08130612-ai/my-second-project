'use client';

/**
 * ScrollDebugger - 滚动状态调试组件
 * 
 * 用于实时显示 Zustand 滚动状态，验证 Lenis 与 Zustand 的同步
 * 仅在开发环境中使用
 */

import { useScrollStore } from '@/store/scrollStore';

export default function ScrollDebugger() {
  const { progress, velocity, isRunning } = useScrollStore();

  // 仅在开发环境显示
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 bg-black/80 text-white p-4 rounded-lg font-mono text-sm z-50 backdrop-blur-sm">
      <h3 className="text-green-400 font-bold mb-2">🔍 Scroll Debug</h3>
      <div className="space-y-1">
        <div>
          <span className="text-gray-300">Progress:</span>{' '}
          <span className="text-blue-400">{(progress * 100).toFixed(2)}%</span>
        </div>
        <div>
          <span className="text-gray-300">Velocity:</span>{' '}
          <span className="text-yellow-400">{velocity.toFixed(3)}</span>
        </div>
        <div>
          <span className="text-gray-300">Running:</span>{' '}
          <span className={isRunning ? 'text-green-400' : 'text-red-400'}>
            {isRunning ? '✅' : '❌'}
          </span>
        </div>
      </div>
      
      {/* 进度条可视化 */}
      <div className="mt-3">
        <div className="text-gray-300 text-xs mb-1">Progress Bar:</div>
        <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* 速度指示器 */}
      <div className="mt-2">
        <div className="text-gray-300 text-xs mb-1">Velocity:</div>
        <div className="flex items-center space-x-1">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className={`w-1 h-4 rounded-full transition-all duration-100 ${
                Math.abs(velocity) > i * 0.5 
                  ? velocity > 0 
                    ? 'bg-green-400' 
                    : 'bg-red-400'
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}