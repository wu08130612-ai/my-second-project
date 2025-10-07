/**
 * 键盘快捷键 Hook
 * 实现 Ctrl/Cmd + Shift + D 触发调试面板
 */

import { useEffect, useCallback } from 'react';
import { useDebugStore } from '@/store/debugStore';

export const useKeyboardShortcut = () => {
  const { toggleDebugPanel, setShortcutRegistered } = useDebugStore();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // 检测 Ctrl/Cmd + Shift + D
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      const isShift = event.shiftKey;
      const isD = event.key.toLowerCase() === 'd';

      if (isCtrlOrCmd && isShift && isD) {
        event.preventDefault();
        event.stopPropagation();
        toggleDebugPanel();
      }
    },
    [toggleDebugPanel]
  );

  useEffect(() => {
    // 只在开发环境注册快捷键
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // 注册键盘事件监听器
    document.addEventListener('keydown', handleKeyDown, { capture: true });
    setShortcutRegistered(true);

    // 清理函数
    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
      setShortcutRegistered(false);
    };
  }, [handleKeyDown, setShortcutRegistered]);

  return {
    // 可以返回一些状态供组件使用
    isRegistered: true,
  };
};