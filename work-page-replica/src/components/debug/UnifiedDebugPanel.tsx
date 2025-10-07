/**
 * UnifiedDebugPanel - 统一调试面板
 * 
 * 整合所有调试功能到一个统一的界面：
 * - Leva 参数控制面板
 * - 极简的 Scroll 状态指标
 * - 21st.dev 风格的视觉设计
 */

'use client';

import { useControls } from 'leva';
import { useEffect } from 'react';
import { MinimalScrollDebugger } from './MinimalScrollDebugger';

interface LevaDebugConfig {
  offsetMultiplier: number;
  scaleMin: number;
  scaleMax: number;
  opacityMin: number;
  opacityMax: number;
  rotateMin: number;
  rotateMax: number;
}

interface UnifiedDebugPanelProps {
  onConfigChange?: (config: LevaDebugConfig) => void;
}

export const UnifiedDebugPanel: React.FC<UnifiedDebugPanelProps> = ({
  onConfigChange,
}) => {
  // Leva控制面板配置 - 使用更简洁的标签
  const config = useControls('Animation Controls', {
    // Offset配置
    offsetMultiplier: {
      value: 0.1,
      min: 0,
      max: 0.5,
      step: 0.01,
      label: 'Offset'
    },
    
    // Scale配置
    scaleMin: {
      value: 0.8,
      min: 0.1,
      max: 1,
      step: 0.05,
      label: 'Scale Min'
    },
    scaleMax: {
      value: 1,
      min: 0.8,
      max: 1.5,
      step: 0.05,
      label: 'Scale Max'
    },
    
    // Opacity配置
    opacityMin: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.1,
      label: 'Opacity Min'
    },
    opacityMax: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
      label: 'Opacity Max'
    },
    
    // RotateX配置
    rotateMin: {
      value: 15,
      min: 0,
      max: 45,
      step: 1,
      label: 'Rotate Min'
    },
    rotateMax: {
      value: 0,
      min: -15,
      max: 15,
      step: 1,
      label: 'Rotate Max'
    },
  });

  // 配置变化时通知父组件
  useEffect(() => {
    if (onConfigChange) {
      onConfigChange(config);
    }
  }, [config, onConfigChange]);

  return (
    <div className="space-y-8">
      {/* Scroll 状态监控 */}
      <div className="bg-gray-50/50 rounded-lg p-4 border border-gray-200/50">
        <MinimalScrollDebugger />
      </div>

      {/* 分隔线 */}
      <div className="border-t border-gray-200/30"></div>

      {/* Leva 控制面板说明 */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <h3 className="text-sm font-medium text-gray-900 tracking-tight">
            Animation Controls
          </h3>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          Use the floating Leva panel to adjust animation parameters in real-time. 
          Changes are applied immediately to the scroll-based animations.
        </p>
      </div>

      {/* 快捷键提示 */}
      <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-200/30">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <h4 className="text-xs font-medium text-blue-900">Keyboard Shortcuts</h4>
        </div>
        <div className="space-y-1 text-xs text-blue-700">
          <div className="flex items-center justify-between">
            <span>Toggle Debug Panel</span>
            <kbd className="px-2 py-1 bg-blue-100 rounded text-xs font-mono">
              ⌘ + Shift + D
            </kbd>
          </div>
          <div className="flex items-center justify-between">
            <span>Toggle Leva Panel</span>
            <kbd className="px-2 py-1 bg-blue-100 rounded text-xs font-mono">
              H
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 默认调试配置
 */
export const DEFAULT_DEBUG_CONFIG: LevaDebugConfig = {
  offsetMultiplier: 0.1,
  scaleMin: 0.8,
  scaleMax: 1,
  opacityMin: 0,
  opacityMax: 1,
  rotateMin: 15,
  rotateMax: 0,
};