/**
 * 调试面板状态管理
 * 实现 "Invisibility until summoned" 的核心状态控制
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface DebugStore {
  // 调试面板是否显示
  isDebugPanelOpen: boolean;
  
  // 键盘快捷键是否已注册
  isShortcutRegistered: boolean;
  
  // Actions
  toggleDebugPanel: () => void;
  openDebugPanel: () => void;
  closeDebugPanel: () => void;
  setShortcutRegistered: (registered: boolean) => void;
}

const initialState = {
  isDebugPanelOpen: false,
  isShortcutRegistered: false,
};

export const useDebugStore = create<DebugStore>()(
  devtools(
    (set) => ({
      ...initialState,
      
      toggleDebugPanel: () =>
        set(
          (state) => ({
            ...state,
            isDebugPanelOpen: !state.isDebugPanelOpen,
          }),
          false,
          'toggleDebugPanel'
        ),
      
      openDebugPanel: () =>
        set(
          (state) => ({
            ...state,
            isDebugPanelOpen: true,
          }),
          false,
          'openDebugPanel'
        ),
      
      closeDebugPanel: () =>
        set(
          (state) => ({
            ...state,
            isDebugPanelOpen: false,
          }),
          false,
          'closeDebugPanel'
        ),
      
      setShortcutRegistered: (registered) =>
        set(
          (state) => ({
            ...state,
            isShortcutRegistered: registered,
          }),
          false,
          'setShortcutRegistered'
        ),
    }),
    {
      name: 'debug-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);

// 选择器 - 用于性能优化的细粒度订阅
export const useDebugPanelOpen = () => useDebugStore((state) => state.isDebugPanelOpen);
export const useShortcutRegistered = () => useDebugStore((state) => state.isShortcutRegistered);