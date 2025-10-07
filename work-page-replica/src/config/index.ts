import type { Config } from '@/types';

/**
 * 核心配置对象
 * 遵循"无魔法数字"原则 - 所有关键参数统一定义
 */
export const CONFIG: Config = {
  /**
   * 卡片动画延迟系数
   * 用于创建滚动视差的时间偏移效果
   * timeOffset = index * cardAnimationDelay
   */
  cardAnimationDelay: 0.1,
} as const;
