'use client';

import { useEffect, useState } from 'react';

/**
 * PerformanceMonitor - 性能监控组件
 * 
 * 监控应用的性能指标，包括：
 * - 内存使用情况
 * - 渲染性能
 * - FPS 监控
 * - 组件重渲染次数
 */

interface PerformanceMetrics {
  memoryUsage: {
    used: number;
    total: number;
    percentage: number;
  } | null;
  fps: number;
  renderCount: number;
  lastRenderTime: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    memoryUsage: null,
    fps: 0,
    renderCount: 0,
    lastRenderTime: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  // 监控渲染次数
  useEffect(() => {
    setMetrics(prev => ({
      ...prev,
      renderCount: prev.renderCount + 1,
      lastRenderTime: performance.now(),
    }));
  }, []); // 添加空依赖数组，只在组件挂载时执行一次

  // 监控内存和FPS
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const updateMetrics = () => {
      const currentTime = performance.now();
      frameCount++;

      // 每秒更新一次指标
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // 获取内存使用情况（仅在支持的浏览器中）
        let memoryUsage = null;
        if ('memory' in performance) {
          const memory = (performance as { memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
          memoryUsage = {
            used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
            total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
            percentage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100),
          };
        }

        setMetrics(prev => ({
          ...prev,
          fps,
          memoryUsage,
        }));

        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(updateMetrics);
    };

    animationId = requestAnimationFrame(updateMetrics);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // 键盘快捷键切换显示
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // 仅在开发环境显示
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-mono hover:bg-gray-700 transition-colors"
        >
          📊 性能
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 backdrop-blur-sm text-white p-4 rounded-lg font-mono text-sm border border-gray-600 min-w-[280px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-green-400">📊 性能监控</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2">
        {/* FPS */}
        <div className="flex justify-between">
          <span className="text-gray-300">FPS:</span>
          <span className={`font-semibold ${metrics.fps >= 55 ? 'text-green-400' : metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'}`}>
            {metrics.fps}
          </span>
        </div>

        {/* 内存使用 */}
        {metrics.memoryUsage && (
          <>
            <div className="flex justify-between">
              <span className="text-gray-300">内存:</span>
              <span className={`font-semibold ${metrics.memoryUsage.percentage < 70 ? 'text-green-400' : metrics.memoryUsage.percentage < 85 ? 'text-yellow-400' : 'text-red-400'}`}>
                {metrics.memoryUsage.used}MB
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">使用率:</span>
              <span className={`font-semibold ${metrics.memoryUsage.percentage < 70 ? 'text-green-400' : metrics.memoryUsage.percentage < 85 ? 'text-yellow-400' : 'text-red-400'}`}>
                {metrics.memoryUsage.percentage}%
              </span>
            </div>
          </>
        )}

        {/* 渲染统计 */}
        <div className="flex justify-between">
          <span className="text-gray-300">渲染次数:</span>
          <span className="text-blue-400 font-semibold">{metrics.renderCount}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-300">最后渲染:</span>
          <span className="text-gray-400 font-semibold">
            {Math.round(metrics.lastRenderTime)}ms
          </span>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-600 text-xs text-gray-400">
        按 Ctrl+P 切换显示
      </div>
    </div>
  );
}