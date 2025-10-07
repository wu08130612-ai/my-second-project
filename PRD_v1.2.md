# PRD v1.2 Final - "Work Page" Replica
## React DOM-Hybrid Edition (技术宪法)

> **项目宪法** | 所有开发决策的最高准则  
> **版本**: v1.2 Final | **状态**: 不可变更 | **生效日期**: 2024

---

## 🎯 项目目标与哲学 (Project Goals & Philosophy)

### 核心使命
复现 `activetheory.net/work` 的**驱动哲学**和**性能表现**，而非复制其引擎实现。我们追求的是：
- **圈速标准**: 稳定 60fps，无掉帧
- **过弯顺滑度**: 物理级动画质感
- **代码卓越**: 工程师级别的架构设计

### 技术哲学
- **声明式优于命令式**: 使用 React + Framer Motion 的声明式范式
- **性能优先**: 每个技术选择都必须通过性能验证
- **无魔法数字**: 所有关键参数必须在配置文件中统一定义

---

## 🏗️ 核心技术规范 (Core Technical Specifications)

### 项目架构 (Project Architecture)
```typescript
// 技术栈配置
Framework: Next.js 13+ (App Router)
Language: TypeScript (strict: true)
State Management: Zustand
Styling: Tailwind CSS
Animation: Framer Motion 10+
Smooth Scroll: Lenis
```

### 项目结构 (Project Structure)
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主页面
│   └── globals.css        # 全局样式
├── components/
│   ├── ui/                # 基础UI组件
│   │   ├── InteractiveCard.tsx
│   │   ├── CardList.tsx
│   │   └── ScrollProgress.tsx
│   └── layout/            # 布局组件
│       ├── Header.tsx
│       └── Footer.tsx
├── hooks/                 # 自定义Hooks
│   ├── useScrollStore.ts
│   └── useLenis.ts
├── lib/                   # 工具函数
│   └── utils.ts
├── store/                 # Zustand状态管理
│   └── scrollStore.ts
├── types/                 # TypeScript类型定义
│   └── index.ts
├── data/                  # 静态数据
│   └── cardData.ts
└── config/                # 项目静态配置
    ├── physics.ts
    └── siteConfig.ts
```

### TypeScript 配置 (TypeScript Configuration)
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### 性能目标 (Performance Targets)
- **帧率**: 稳定 60fps (Chrome DevTools 验证)
- **包大小**: Framer Motion (~50KB) 可接受，换取极致的开发效率和用户体验

---

## 🎨 视觉与交互标准 (Visual & Interaction Standards)

### 物理配置 (Physics Configuration)
```typescript
// config/physics.ts
export const physics = {
  gentle: { type: 'spring', stiffness: 80, damping: 20 },
  fast: { type: 'spring', stiffness: 150, damping: 25 }
};

export const CONFIG = {
  cardAnimationDelay: 0.1,   // 卡片动画层次感延迟 (秒)
  returnDuration: 0.5        // 卡片归位时间 (秒)
};
```

### 3D变换映射 (3D Transform Mapping)
- **映射策略**: `useTransform` hook, 在 `[0, 0.3, 0.7, 1]` 区间创建"平坦区"效果
- **层次感**: `const timeOffset = index * CONFIG.cardAnimationDelay;`

---

## 📋 状态管理架构 (State Management Architecture)

### Zustand 滚动状态 (Scroll Store)
```typescript
// store/scrollStore.ts
interface ScrollStore {
  progress: number;           // 滚动进度 [0, 1]
  velocity: number;           // 滚动速度
  direction: 'up' | 'down' | 'still';  // 滚动方向
  timestamp: number;          // 时间戳 (用于速度计算)
  
  // Actions
  updateScroll: (data: Partial<Omit<ScrollStore, 'updateScroll'>>) => void;
}
```

### 组件状态策略
- **全局状态**: 滚动位置、速度、方向 (Zustand)
- **局部状态**: 单个卡片的鼠标交互状态 (React useState)
- **动画状态**: 完全由 Framer Motion 管理

---

## 🚀 分阶段里程碑计划 (Phased Milestone Plan)

### [ ] Milestone 6: 静态布局组件化
**目标**: 建立 React 组件架构和"像素级"静态布局。

**要求**:
- 初始化 Next.js App Router 项目，配置 `strict: true` TypeScript。
- 实现 `<CardList>` 和 `<InteractiveCard>` 组件。
- 使用 Tailwind CSS 精确还原静态布局。

**验收标准**:
- [ ] 项目结构完全符合规范。
- [ ] **零动画策略**: 本阶段严禁任何JS动画。
- [ ] 在1920px分辨率下，与目标网站视觉稿误差 < 5px。

### [ ] Milestone 7: 全局滚动管理系统
**目标**: 集成 Lenis + Zustand，创建全局滚动状态。

**要求**:
- 在React组件中正确初始化和销毁 Lenis。
- 创建 `scrollStore`，并通过 Lenis 的 `on('scroll')` 事件实时更新。
- 创建 `useScrollStore` hook。

**验收标准**:
- [ ] 页面滚动如丝般顺滑。
- [ ] `useScrollStore` hook 能实时、精确地提供全局滚动数据。
- [ ] 性能测试: 滚动时 CPU使用率 < 30%。

### [ ] Milestone 8: 单卡交互激活
**目标**: 使用 Framer Motion 实现单个卡片基于物理的 hover 效果。

**要求**:
- 将 `<InteractiveCard>` 转换为 `motion.div`。
- 使用 `whileHover` prop 和 `animate` 控制器。
- 应用 `config/physics.ts` 中的 `gentle` 配置。

**验收标准**:
- [ ] hover时有平滑的、带物理质感的3D倾斜和缩放效果。
- [ ] hover离开后，在0.5秒内平滑归位，无抖动。
- [ ] 交互时稳定保持60fps。

### [ ] Milestone 9: 全局滚动视差编排
**目标**: 实现基于滚动的、有层次感的全局视差动画。

**要求**:
- 在 `<InteractiveCard>` 中使用 `useScroll({ target: ref, offset: [...] })`。
- 基于卡片索引 `index` 和 `CONFIG.cardAnimationDelay` 创建动画时间偏移。
- 使用 `useTransform` 实现滚动进度到 `y` 和 `rotateX` 的精确映射。

**验收标准**:
- [ ] **视差层次感**: 滚动时，卡片动画有明确的、流畅的先后顺序。
- [ ] **交互质感**: 最终效果在主观感受上达到 `activetheory.net/work` 的80%+相似度。
- [ ] **性能测试**: 30秒随机滚动+交互，FPS曲线保持绿色。

---

## ✅ 验收标准 (Acceptance Criteria)

### 性能测试 (Performance Testing)
```bash
# Chrome DevTools 性能监控
测试场景: 30秒随机滚动 + 卡片交互
目标指标:
- FPS 曲线: 保持绿色区域 (>55fps)
- CPU 使用率: < 50%
- 内存增长: < 10MB
- GPU 利用率: 充分使用硬件加速
```

### 兼容性测试 (Compatibility Testing)
- **Chrome**: 最新版本 (主要目标)
- **Firefox**: 最新版本
- **Safari**: 最新版本 (macOS)
- **分辨率**: 1280px - 1920px (Desktop-First)

### 用户体验量化 (UX Quantification)
- **对比基准**: `activetheory.net/work`
- **主观评分**: 80%+ 平滑度和响应性
- **客观指标**: 交互延迟 < 16ms (60fps)

---

## 🎁 拉伸目标 (Stretch Goals)

### 高级物理效果
- **弹性反馈**: 卡片交互的微妙弹性效果
- **惯性滚动**: 更自然的滚动物理
- **边界效果**: 滚动到顶部/底部的视觉反馈

### 性能优化
- **虚拟化**: 为大量卡片预留架构接口
- **预加载**: 智能资源预加载策略
- **缓存**: 动画状态缓存机制

### 视觉增强
- **光影效果**: 基于鼠标位置的动态光影
- **景深**: 更丰富的 3D 层次感
- **粒子系统**: 微妙的装饰性动画

---

## 📦 版本范围 (Version Scope)

### v1.2 包含 (Included)
- ✅ React + Framer Motion 架构
- ✅ Desktop-First 响应式设计 (1280px-1920px)
- ✅ 完整的滚动视差系统
- ✅ 单卡片 3D 交互效果
- ✅ 性能优化和监控

### v2.0 规划 (Future Planning)
- 📱 移动端适配和触摸交互
- 🌐 多语言支持
- 📊 高级分析和监控
- 🎨 主题系统和自定义配置

---

## 🔒 技术风险评估 (Technical Risk Assessment)

### 已评估风险
1. **Framer Motion 包大小**: ✅ 可接受 (~50KB)
2. **SSR 兼容性**: ✅ Next.js App Router 良好支持
3. **移动端性能**: ✅ v2.0 考虑，当前架构友好

### 缓解策略
- 使用 Next.js 代码分割优化加载
- 服务端渲染时避免 window 依赖
- 预留虚拟化接口应对性能瓶颈

---

## 📋 数据结构定义 (Data Structure Definition)

### 卡片数据结构
```typescript
// types/index.ts
interface CardData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  year: number;
  tags: string[];
}

// data/cardData.ts
export const cardData: CardData[] = [
  // 静态数组，20-30个卡片数据
];
```

---

## 🎯 最终确认 (Final Confirmation)

这份 PRD v1.2 是项目的**技术宪法**，所有开发决策必须严格遵循。任何偏离都需要重新评估和批准。

**技术栈最终确认**:
- ✅ Next.js 13+ App Router
- ✅ TypeScript 严格模式
- ✅ Zustand 状态管理
- ✅ Tailwind CSS 样式方案
- ✅ Framer Motion 动画引擎
- ✅ Lenis 平滑滚动

**准备状态**: 🚀 **已就绪，等待里程碑6启动批准**

---

*文档版本: v1.2 Final | 创建日期: 2024