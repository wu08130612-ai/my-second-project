# PRD v1.0 - "Work Page" Replica
## 🏎️ Active Theory 驾驶哲学复现项目

---

## 📋 项目概述

### 项目目标与哲学
本项目旨在复现 Active Theory Work Page 的**驾驶哲学**和**赛道表现**，而非复制其引擎技术。我们是一个极具天赋的"单人车手"，专注于：

- **性能优先**：不妥协的 60fps 稳定表现
- **质感交互**：有重量感而非粘滞感的动画体验  
- **代码卓越**：模块化、可维护的架构设计
- **精准控制**：每一个技术决策都有明确的性能和质量目标

### 核心价值主张
> "我们无法复制F1车队的引擎，但我们可以学习并超越他们的驾驶技术"

---

## 🎯 核心技术规范

### 性能基准 (Performance Benchmark)
- **圈速目标**: 稳定、不妥协的 **60fps**
- **测量标准**: Chrome DevTools Performance Monitor
  - FPS图表无红色掉帧区域
  - CPU使用率峰值不长时间超过50%
- **资源控制**: 事件驱动的极简计算原则
  - rAF循环外禁止重度计算
  - 内存/GPU无硬性上限，通过算法优化控制

### 代码架构 (Code Architecture)
- **模块化系统**: 基于 `InteractiveCard` Class 的节点架构
  ```javascript
  class InteractiveCard {
    constructor(element, index) { /* 封装DOM、位置、状态 */ }
    update(mouseX, mouseY) { /* 独立更新逻辑 */ }
    reset() { /* 归位动画 */ }
  }
  ```
- **主控制器**: `CardManager` 负责全局输入分发
- **配置驱动**: 所有魔法数字必须在 `CONFIG` 对象中定义

### 兼容性范围
- **目标浏览器**: 最新版本的 Chrome, Firefox, Safari
- **视口范围**: 1280px - 1920px (Desktop-First)
- **明确排除**: 移动端适配 (标记为 v2.0 规划)

---

## 🎨 视觉与交互标准

### 动画质感规范
- **Lerp系数**: CONFIG.lerpFactor = 0.1 (可配置)
- **质感目标**: "有重量感、而非粘滞感的跟随效果"
- **精度标准**: JavaScript Number类型 (64位浮点数) 足够
- **边界处理**: 
  - `mouseout` 事件触发 0.5秒平滑归位
  - 禁止抖动或卡在中间角度

### 3D变换标准
- **最大倾斜角度**: CONFIG.maxTiltAngle = 15deg
- **影响半径**: CONFIG.effectRadius = 300px  
- **距离衰减**: 使用 `Math.hypot()` 计算欧几里得距离
- **变换性能**: 纯 `transform` 属性，零 reflow

### 滚动视差算法
- **映射函数**: 
  ```javascript
  translateY = f(scrollProgress) // 从下向上移动
  rotateX = g(scrollProgress)   // 逐渐变平
  ```
- **平滑库**: Lenis (smooth: true, duration: 1.2)

---

## 🚀 分阶段里程碑计划

### 里程碑 6: 性能重构 (rAF Architecture)
**技术目标**: 实现与浏览器绘制同步的更新循环

**核心要求**:
- 分离"状态记录"(`mousemove`) 和"视觉更新"(`rAF`)
- 全局鼠标坐标存储: `mouse = {x: 0, y: 0}`
- rAF循环批量更新所有卡片

**验收标准**:
- [ ] `mousemove` 事件仅更新坐标变量
- [ ] `requestAnimationFrame` 循环独立运行
- [ ] Performance Monitor 显示稳定60fps
- [ ] 无 forced reflow 警告

**实现细节**:
```javascript
// 事件分离模式
document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  cardManager.updateAll(mouse.x, mouse.y);
  requestAnimationFrame(animate);
}
```

### 里程碑 7: 质感重构 (Lerp Smoothness)
**技术目标**: 实现有重量感的线性插值动画

**核心要求**:
- 实现 Linear Interpolation: `current += (target - current) * lerpFactor`
- 配置化参数管理
- 完美的边界条件处理

**验收标准**:
- [ ] 鼠标移动时卡片有"重量感"跟随
- [ ] `mouseout` 时 0.5秒平滑归位到 `rotateX(0) rotateY(0)`
- [ ] 无抖动、无卡顿、无中间角度停留
- [ ] CONFIG 对象控制所有动画参数

**实现细节**:
```javascript
const CONFIG = {
  lerpFactor: 0.1,
  maxTiltAngle: 15,
  effectRadius: 300,
  resetDuration: 0.5
};

// Lerp 实现
update(targetX, targetY) {
  this.currentRotateX += (targetX - this.currentRotateX) * CONFIG.lerpFactor;
  this.currentRotateY += (targetY - this.currentRotateY) * CONFIG.lerpFactor;
}
```

### 里程碑 8: 布局对齐 (Grid to Column)
**技术目标**: 从3x3网格转换为单列垂直布局

**核心要求**:
- 使用 Flexbox 实现垂直单列布局
- 精确的间距控制
- 保持卡片的3D透视效果

**验收标准**:
- [ ] 卡片垂直排列，居中对齐
- [ ] 间距统一且视觉平衡
- [ ] 3D效果在新布局下正常工作
- [ ] 响应式间距 (1280px-1920px 范围内)

**实现细节**:
```css
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(40px, 5vw, 80px);
  perspective: 1000px;
}
```

### 里程碑 9: 交互对齐 (Mouse to Scroll)
**技术目标**: 从鼠标驱动转换为滚动驱动的交互

**核心要求**:
- 集成 Lenis 平滑滚动库
- 实现滚动位置到3D变换的映射
- 创造"从下向上移动并逐渐变平"的视差效果

**验收标准**:
- [ ] Lenis 库正确配置 (smooth: true, duration: 1.2)
- [ ] 滚动时卡片有视差移动效果
- [ ] 卡片根据可见度调整 rotateX 角度
- [ ] 平滑的滚动体验，无卡顿

**滚动映射算法**:
```javascript
function calculateScrollTransform(element, scrollProgress) {
  const visibility = getElementVisibility(element);
  const translateY = (1 - scrollProgress) * 100; // 从下向上
  const rotateX = (1 - visibility) * 15; // 逐渐变平
  return { translateY, rotateX };
}
```

---

## 🎯 验收标准与测试方法

### 性能测试协议
1. **工具**: Chrome DevTools > Performance Monitor
2. **测试流程**: 30秒快速、随机滚动
3. **通过标准**: 
   - FPS曲线保持绿色区域
   - 无红色长帧
   - CPU峰值不长时间超过50%

### 用户体验验证
**对比测试法**:
- 将成品与 activetheory.net/work 并排显示
- **通过标准**: 主观感受达到目标网站80%以上质量
- 无明显卡顿、抖动或延迟感

### 代码质量审查
- [ ] 所有魔法数字在 CONFIG 中定义
- [ ] Class 架构清晰，职责分离
- [ ] 无全局变量污染
- [ ] 注释覆盖核心算法

---

## 🚀 延伸目标 (Stretch Goals)

### 高级动画效果
- **回弹效果**: Spring Physics 实现
- **缓动函数**: EaseInOutQuad 等高级缓动
- **微交互**: Hover 状态的细节动画

### 性能优化
- **GPU加速**: 完整的 `transform3d` 优化
- **内存管理**: 对象池模式
- **预加载**: 资源预加载策略

---

## 📋 版本范围与限制

### v1.0 包含范围
- ✅ 桌面端完整交互体验
- ✅ 60fps 性能保证
- ✅ 模块化代码架构
- ✅ 基础 Lerp 动画质感

### 明确排除 (v2.0 规划)
- ❌ 移动端适配
- ❌ 触摸手势支持
- ❌ 陀螺仪交互
- ❌ 复杂的弹性物理

---

## 🎯 项目成功定义

**当我们能够自豪地说："这个交互体验在技术实现和视觉质感上，达到了 Active Theory 80%的水准"时，PRD v1.0 即宣告成功。**

---

*本文档是项目的技术宪法，所有开发决策必须以此为准则。*

**版本**: v1.0  
**创建日期**: 2024年12月  
**状态**: 草案待确认