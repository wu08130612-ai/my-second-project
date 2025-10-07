'use client';

import { useControls } from 'leva';
import { useEffect } from 'react';

/**
 * Leva调试面板配置接口
 */
interface LevaDebugConfig {
  /** offset乘数 */
  offsetMultiplier: number;
  /** scale范围 */
  scaleMin: number;
  scaleMax: number;
  /** opacity范围 */
  opacityMin: number;
  opacityMax: number;
  /** rotateX范围 */
  rotateMin: number;
  rotateMax: number;
}

/**
 * LevaDebugPanel - 实时参数调试面板
 * 
 * 功能：
 * - 实时调整动画参数
 * - 可视化参数变化效果
 * - 开发环境专用
 * - 支持参数导出/导入
 */
export const LevaDebugPanel = ({
  onConfigChange,
}: {
  onConfigChange: (config: LevaDebugConfig) => void;
}) => {
  // Leva控制面板配置
  const config = useControls('🎬 Scroll Parallax Animation', {
    // Offset配置
    offsetMultiplier: {
      value: 0.1,
      min: 0,
      max: 0.5,
      step: 0.01,
      label: 'Offset Multiplier'
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
      label: 'Rotate Min (deg)'
    },
    rotateMax: {
      value: 0,
      min: -15,
      max: 15,
      step: 1,
      label: 'Rotate Max (deg)'
    },
  });

  // 配置变化时通知父组件
  useEffect(() => {
    onConfigChange(config);
  }, [config, onConfigChange]);

  // 仅在开发环境渲染
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return null; // Leva面板通过useControls自动渲染
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