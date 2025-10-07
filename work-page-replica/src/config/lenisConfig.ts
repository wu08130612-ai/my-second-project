/**
 * Lenis 滚动配置
 * 按照 PRD v1.2 和里程碑7最终技术决策
 */

export const lenisConfig = {
  duration: 1.2, // 创造有重量感但不迟钝的滚动体验
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // EaseOutCubic - 平滑且自然的缓动曲线
  smoothWheel: true, // 启用平滑滚轮
  touchMultiplier: 2, // 触摸设备的滚动倍数
} as const;

export type LenisConfig = typeof lenisConfig;