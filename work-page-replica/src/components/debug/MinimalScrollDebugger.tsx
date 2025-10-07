/**
 * MinimalScrollDebugger - 极简滚动调试组件
 * 
 * 重新设计为 21st.dev 风格的极简指标
 * 集成到 DebugDrawer 中使用，不再独立显示
 */

'use client';

import { useScrollStore } from '@/store/scrollStore';

export const MinimalScrollDebugger: React.FC = () => {
  const { progress, velocity, isRunning } = useScrollStore();

  return (
    <div className="space-y-4">
      {/* 标题 */}
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        <h3 className="text-sm font-medium text-gray-900 tracking-tight">
          Scroll State
        </h3>
      </div>

      {/* 数据指标 */}
      <div className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 font-medium tracking-wide">Progress</span>
            <span className="text-xs font-mono text-gray-800 font-semibold">
              {(progress * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-150 ease-out rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Velocity */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 font-medium tracking-wide">Velocity</span>
            <span className="text-xs font-mono text-gray-800 font-semibold">
              {velocity.toFixed(3)}
            </span>
          </div>
          <div className="flex items-center space-x-0.5">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className={`w-1 h-4 rounded-full transition-all duration-150 ${
                  Math.abs(velocity) > i * 0.3 
                    ? velocity > 0 
                      ? 'bg-emerald-400' 
                      : 'bg-orange-400'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Running Status */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-gray-600 font-medium tracking-wide">Status</span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              isRunning ? 'bg-emerald-500' : 'bg-gray-300'
            }`}></div>
            <span className="text-xs font-mono text-gray-800 font-semibold">
              {isRunning ? 'Running' : 'Stopped'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};