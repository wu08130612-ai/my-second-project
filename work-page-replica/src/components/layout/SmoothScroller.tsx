'use client';

/**
 * SmoothScroller - 全局滚动管理系统
 * 
 * 核心职责：
 * 1. 管理 Lenis 实例的生命周期（单例模式）
 * 2. 将 Lenis 滚动数据同步到 Zustand 全局状态
 * 3. 处理页面可见性优化
 * 4. 提供错误边界保护
 */

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { lenisConfig } from '@/config/lenisConfig';
import { useScrollStore } from '@/store/scrollStore';

interface SmoothScrollerProps {
  children?: React.ReactNode;
}

export default function SmoothScroller({ children }: SmoothScrollerProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const updateScroll = useScrollStore((state) => state.updateScroll);
  const reset = useScrollStore((state) => state.reset);

  useEffect(() => {
    // 初始化 Lenis 实例（单例模式）
    if (!lenisRef.current) {
      try {
        lenisRef.current = new Lenis(lenisConfig);
        
        // 监听滚动事件并同步到 Zustand
        lenisRef.current.on('scroll', (e: any) => {
          updateScroll({
            progress: e.progress || 0,
            velocity: e.velocity || 0,
            isRunning: Boolean(lenisRef.current?.isScrolling),
          });
        });

        console.log('✅ Lenis 初始化成功');
      } catch (error) {
        console.error('❌ Lenis 初始化失败:', error);
        return;
      }
    }

    // RAF 循环 - Lenis 的心跳
    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    // 页面可见性API优化
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // 页面隐藏时暂停RAF循环
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      } else {
        // 页面显示时恢复RAF循环
        if (!rafRef.current && lenisRef.current) {
          const raf = (time: number) => {
            lenisRef.current?.raf(time);
            rafRef.current = requestAnimationFrame(raf);
          };
          rafRef.current = requestAnimationFrame(raf);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 清理函数 - 确保无内存泄漏
    return () => {
      // 清理 RAF 循环
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      // 移除事件监听器
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // 销毁 Lenis 实例
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      // 重置 Zustand 状态
      reset();

      console.log('🧹 SmoothScroller 清理完成');
    };
  }, []); // 空依赖数组确保只初始化一次

  // 如果没有children，返回null（作为纯管理器使用）
  return children ? <>{children}</> : null;
}

// 错误边界组件
export function SmoothScrollerErrorBoundary({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div>
      {/* 在实际项目中，这里应该使用 React Error Boundary */}
      {/* 目前先用简单的 div 包装，后续可以升级 */}
      {children}
    </div>
  );
}