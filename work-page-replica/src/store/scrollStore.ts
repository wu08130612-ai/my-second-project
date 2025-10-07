/**
 * 全局滚动状态管理
 * 瘦身版 Zustand Store - 只存储衍生状态和全局必需品
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ScrollStore {
  // 0-1, 整个页面的顶级进度值 (lenisInstance.progress)
  progress: number;
  
  // 滚动速度 (lenisInstance.velocity)
  velocity: number;
  
  // Lenis 是否正在运行 (lenisInstance.isRunning)
  isRunning: boolean;
  
  // Actions
  updateScroll: (data: {
    progress: number;
    velocity: number;
    isRunning: boolean;
  }) => void;
  
  // 重置状态
  reset: () => void;
}

const initialState = {
  progress: 0,
  velocity: 0,
  isRunning: false,
};

export const useScrollStore = create<ScrollStore>()(
  devtools(
    (set) => ({
      ...initialState,
      
      updateScroll: (data) =>
        set(
          (state) => ({
            ...state,
            ...data,
          }),
          false,
          'updateScroll'
        ),
      
      reset: () =>
        set(
          initialState,
          false,
          'reset'
        ),
    }),
    {
      name: 'scroll-store', // Redux DevTools 中显示的名称
      enabled: process.env.NODE_ENV === 'development', // 只在开发环境启用
    }
  )
);

// 选择器 - 用于性能优化的细粒度订阅
export const useScrollProgress = () => useScrollStore((state) => state.progress);
export const useScrollVelocity = () => useScrollStore((state) => state.velocity);
export const useScrollIsRunning = () => useScrollStore((state) => state.isRunning);