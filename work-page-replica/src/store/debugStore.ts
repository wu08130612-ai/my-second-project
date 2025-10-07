/**
 * 调试面板状态管理
 * 实现 "Invisibility until summoned" 的核心状态控制
 */

import { create } from 'zustand';

export interface DebugStore {
  // 状态
  isDebugPanelOpen: boolean;
  
  // 快捷键注册状态
  isShortcutRegistered: boolean;
  
  // 动作
  toggleDebugPanel: () => void;
  openDebugPanel: () => void;
  closeDebugPanel: () => void;
  setShortcutRegistered: (registered: boolean) => void;
}

const initialState = {
  isDebugPanelOpen: false,
  isShortcutRegistered: false,
};

export const useDebugStore = create<DebugStore>((set) => ({
  ...initialState,
  
  toggleDebugPanel: () =>
    set((state) => ({
      ...state,
      isDebugPanelOpen: !state.isDebugPanelOpen,
    })),
  
  openDebugPanel: () =>
    set((state) => ({
      ...state,
      isDebugPanelOpen: true,
    })),
  
  closeDebugPanel: () =>
    set((state) => ({
      ...state,
      isDebugPanelOpen: false,
    })),
  
  setShortcutRegistered: (registered: boolean) =>
    set((state) => ({
      ...state,
      isShortcutRegistered: registered,
    })),
}));

// 选择器 - 用于性能优化的细粒度订阅
export const useDebugPanelOpen = () => useDebugStore((state) => state.isDebugPanelOpen);
export const useShortcutRegistered = () => useDebugStore((state) => state.isShortcutRegistered);