import type { PhysicsConfig } from '@/types';

/**
 * Framer Motion 物理参数配置
 * 提供gentle和fast两种弹簧配置
 */
export const PHYSICS: Record<'gentle' | 'fast', PhysicsConfig> = {
  /**
   * 温和配置 - 默认选择
   * 适用于大多数交互场景，提供平滑自然的动画感受
   */
  gentle: {
    name: 'gentle',
    stiffness: 100,
    damping: 20,
    mass: 1,
  },

  /**
   * 快速配置 - 特殊场景
   * 适用于需要快速响应的交互，如按钮点击等
   */
  fast: {
    name: 'fast',
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  },
} as const;
