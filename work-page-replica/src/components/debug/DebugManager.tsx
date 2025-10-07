/**
 * DebugManager - 调试系统管理器
 * 
 * 核心功能：
 * - 管理键盘快捷键 (Ctrl/Cmd + Shift + D)
 * - 控制调试抽屉的显示/隐藏
 * - 整合所有调试组件
 * - 实现 "Invisibility until summoned" 特性
 */

'use client';

import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { DebugDrawer } from './DebugDrawer';
import { UnifiedDebugPanel } from './UnifiedDebugPanel';

interface LevaDebugConfig {
  offsetMultiplier: number;
  scaleMin: number;
  scaleMax: number;
  opacityMin: number;
  opacityMax: number;
  rotateMin: number;
  rotateMax: number;
}

interface DebugManagerProps {
  onConfigChange?: (config: LevaDebugConfig) => void;
}

export const DebugManager: React.FC<DebugManagerProps> = ({
  onConfigChange,
}) => {
  // 注册键盘快捷键
  useKeyboardShortcut();

  // 仅在开发环境中渲染
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <DebugDrawer>
      <UnifiedDebugPanel 
        onConfigChange={onConfigChange || (() => {})} 
      />
    </DebugDrawer>
  );
};