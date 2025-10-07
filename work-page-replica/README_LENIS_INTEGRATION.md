# Lenis 平滑滚动集成文档

## 概述

本项目集成了 [Lenis](https://lenis.studiofreight.com/) 平滑滚动库，提供丝滑的滚动体验。集成包括：

- 🚀 Lenis 平滑滚动引擎
- 📊 Zustand 状态管理集成
- 🔧 性能优化和错误处理
- 🐛 开发环境调试工具

## 架构设计

### 核心组件

1. **SmoothScroller** (`src/components/layout/SmoothScroller.tsx`)
   - 管理 Lenis 实例的生命周期
   - 处理滚动事件和状态同步
   - 页面可见性 API 优化

2. **ScrollStore** (`src/store/scrollStore.ts`)
   - Zustand 状态管理
   - 实时跟踪滚动进度、速度和状态

3. **LenisConfig** (`src/config/lenisConfig.ts`)
   - 集中管理 Lenis 配置参数

## 使用方法

### 基础集成

Lenis 已经在 `app/layout.tsx` 中全局集成：

```tsx
import SmoothScroller from '@/components/layout/SmoothScroller';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SmoothScroller />
        {children}
      </body>
    </html>
  );
}
```

### 访问滚动状态

在任何组件中使用 Zustand store：

```tsx
import { useScrollStore } from '@/store/scrollStore';

function MyComponent() {
  const { progress, velocity, isRunning } = useScrollStore();
  
  return (
    <div>
      <p>滚动进度: {Math.round(progress * 100)}%</p>
      <p>滚动速度: {velocity.toFixed(2)}</p>
      <p>状态: {isRunning ? '运行中' : '停止'}</p>
    </div>
  );
}
```

### 配置参数

修改 `src/config/lenisConfig.ts` 来调整滚动行为：

```typescript
export const LENIS_CONFIG = {
  duration: 1.2,        // 滚动持续时间
  easing: (t) => ...,   // 缓动函数
  smoothWheel: true,    // 平滑鼠标滚轮
  touchMultiplier: 2,   // 触摸灵敏度
} as const;
```

## 开发工具

### ScrollDebugger

实时显示滚动状态的调试组件：

```tsx
import ScrollDebugger from '@/components/debug/ScrollDebugger';

// 在开发环境中使用
<ScrollDebugger />
```

### PerformanceMonitor

监控应用性能指标：

```tsx
import PerformanceMonitor from '@/components/test/PerformanceMonitor';

// 按 Ctrl+P 切换显示
<PerformanceMonitor />
```

## 性能优化

### 页面可见性优化

当页面不可见时自动暂停 Lenis：

```typescript
useEffect(() => {
  const handleVisibilityChange = () => {
    if (lenisRef.current) {
      if (document.hidden) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, []);
```

### 内存管理

组件卸载时自动清理资源：

```typescript
useEffect(() => {
  return () => {
    if (lenisRef.current) {
      lenisRef.current.destroy();
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  };
}, []);
```

## 错误处理

### ErrorBoundary

使用专门的错误边界处理 Lenis 相关错误：

```tsx
import { SmoothScrollerErrorBoundary } from '@/components/layout/ErrorBoundary';

<SmoothScrollerErrorBoundary>
  <SmoothScroller />
</SmoothScrollerErrorBoundary>
```

### 降级策略

当 Lenis 初始化失败时，自动降级到原生滚动。

## 最佳实践

### 1. 避免滚动冲突

```css
/* 禁用默认滚动条样式 */
html.lenis {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto;
}
```

### 2. 响应式设计

```typescript
// 根据设备类型调整配置
const isMobile = window.innerWidth < 768;
const config = {
  ...LENIS_CONFIG,
  touchMultiplier: isMobile ? 1.5 : 2,
};
```

### 3. 性能监控

定期检查滚动性能：

- FPS 保持在 60fps
- 内存使用率 < 70%
- 避免频繁的重渲染

## 故障排除

### 常见问题

1. **滚动不平滑**
   - 检查 CSS 是否有冲突的 `scroll-behavior` 属性
   - 确认 `duration` 和 `easing` 配置合理

2. **内存泄漏**
   - 确保组件卸载时正确清理 Lenis 实例
   - 检查事件监听器是否正确移除

3. **状态不同步**
   - 验证 Zustand store 的更新逻辑
   - 检查 `requestAnimationFrame` 循环是否正常

### 调试步骤

1. 启用 ScrollDebugger 查看实时状态
2. 使用 PerformanceMonitor 检查性能指标
3. 检查浏览器控制台是否有错误信息
4. 验证 Lenis 实例是否正确初始化

## 更新和维护

### 版本升级

更新 Lenis 版本时注意：

1. 检查 API 变更
2. 测试所有滚动功能
3. 验证性能表现
4. 更新类型定义

### 配置调优

根据用户反馈调整：

- 滚动速度和缓动
- 触摸设备的响应性
- 性能优化参数

## 相关资源

- [Lenis 官方文档](https://lenis.studiofreight.com/)
- [Zustand 文档](https://zustand-demo.pmnd.rs/)
- [性能优化指南](https://web.dev/performance/)

---

*最后更新: 2024年12月*