'use client';

import { useRef, useMemo } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';
import type { RefObject } from 'react';

/**
 * 动画配置接口
 */
interface AnimationConfig {
  /** offset乘数，控制层次感强度 */
  offsetMultiplier?: number;
  /** scale变化范围 */
  scaleRange?: [number, number];
  /** opacity变化范围 */
  opacityRange?: [number, number];
  /** rotateX变化范围 */
  rotateRange?: [string, string];
}

/**
 * useCardAnimation Hook 参数接口
 */
interface UseCardAnimationProps {
  /** 卡片索引 */
  index: number;
  /** 卡片总数 */
  total: number;
  /** 动画配置 */
  config?: AnimationConfig;
}

/**
 * useCardAnimation Hook 返回值接口
 */
interface UseCardAnimationReturn {
  /** DOM引用 */
  ref: RefObject<HTMLDivElement | null>;
  /** 滚动动画样式 */
  scrollStyle: {
    scale: MotionValue<number>;
    opacity: MotionValue<number>;
    rotateX: MotionValue<string>;
    y: MotionValue<string>;
  };
  /** 调试信息 (开发环境) */
  debugInfo?: {
    scrollProgress: MotionValue<number>;
    offsetProgress: MotionValue<number>;
  };
}

/**
 * 默认动画配置
 */
const DEFAULT_CONFIG: Required<AnimationConfig> = {
  offsetMultiplier: 0.1,
  scaleRange: [0.8, 1],
  opacityRange: [0, 1],
  rotateRange: ['15deg', '0deg'],
};

/**
 * useCardAnimation - 全局滚动视差编排核心Hook
 * 
 * 里程碑9核心功能：
 * - 多维度映射：scale, opacity, rotateX, y 四个属性的声明式映射
 * - 输入端offset策略：基于index创建层次感
 * - 动态offset计算：后面的卡片offset更大
 * - 性能优化：使用useMemo缓存计算结果
 * 
 * @param props - Hook配置参数
 * @returns 滚动动画相关的ref和样式
 */
export const useCardAnimation = ({
  index,
  total,
  config = {},
}: UseCardAnimationProps): UseCardAnimationReturn => {
  // DOM引用
  const ref = useRef<HTMLDivElement>(null);

  // 合并配置
  const finalConfig = useMemo(() => ({
    ...DEFAULT_CONFIG,
    ...config,
  }), [config]);

  // 获取滚动进度 - 最大化动画展示空间
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] // 产品经理确认的最优配置
  });

  // 动态offset计算 - 创造层次感的核心算法
  const dynamicOffset = useMemo(() => {
    const baseOffset = finalConfig.offsetMultiplier;
    const normalizedIndex = total > 1 ? index / (total - 1) : 0; // 0 to 1
    return baseOffset * (1 + normalizedIndex * 0.5); // 后面的卡片offset更大
  }, [index, total, finalConfig.offsetMultiplier]);

  // 输入端offset策略 - 在输入端应用offset，架构更清晰
  const offsetProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [dynamicOffset, 1 + dynamicOffset]
  );

  // 多维度映射算法 - 四个独立属性的声明式映射
  
  // Scale: 从远处（小）到近处（正常大小）
  const scale = useTransform(
    offsetProgress,
    [0, 0.3, 0.7, 1],
    [finalConfig.scaleRange[0], 0.9, finalConfig.scaleRange[1], finalConfig.scaleRange[1]]
  );

  // Opacity: 从透明逐渐显现，最激进的变化
  const opacity = useTransform(
    offsetProgress,
    [0, 0.2, 0.6, 1],
    [finalConfig.opacityRange[0], 0.3, finalConfig.opacityRange[1], finalConfig.opacityRange[1]]
  );

  // RotateX: 从倾斜视角逐渐转正，最保守的变化
  const rotateX = useTransform(
    offsetProgress,
    [0, 0.4, 0.8, 1],
    [finalConfig.rotateRange[0], '5deg', finalConfig.rotateRange[1], finalConfig.rotateRange[1]]
  );

  // Y: 线性位移，提供基础视差效果
  const y = useTransform(
    offsetProgress,
    [0, 1],
    ['100px', '-100px']
  );

  // 调试信息 (仅开发环境)
  const debugInfo = process.env.NODE_ENV === 'development' ? {
    scrollProgress: scrollYProgress,
    offsetProgress,
  } : undefined;

  return {
    ref,
    scrollStyle: {
      scale,
      opacity,
      rotateX,
      y,
    },
    ...(debugInfo && { debugInfo }),
  };
};