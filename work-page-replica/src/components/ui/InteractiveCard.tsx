'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';
import type { InteractiveCardProps } from '@/types';
import { useCardAnimation } from '@/hooks/useCardAnimation';

/**
 * InteractiveCard 组件 - 混合交互版本
 *
 * 里程碑8 + 里程碑9 融合：
 * - 里程碑8: 动态凝视效果 (鼠标交互)
 * - 里程碑9: 全局滚动视差编排
 * - 双重物理引擎：鼠标交互 + 滚动动画
 * - 优雅降级：移动端仅保留滚动效果
 */
export const InteractiveCard = ({
  data,
  index,
  total,
  className = '',
  animationConfig,
}: InteractiveCardProps) => {
  // 里程碑9: 全局滚动视差编排
  const { ref: scrollRef, scrollStyle } = useCardAnimation({
    index,
    total,
    ...(animationConfig && { config: animationConfig }),
  });

  // 里程碑8: 动态凝视效果 (保持原有逻辑)
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardDimensions, setCardDimensions] = useState({ width: 600, height: 400 });

  // Motion Values - 高性能状态追踪，无重渲染
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 坐标映射到旋转角度 (10度范围)
  const rotateY = useTransform(mouseX, [0, cardDimensions.width], [-10, 10]);
  const rotateX = useTransform(mouseY, [0, cardDimensions.height], [10, -10]);

  // 物理弹簧配置 - gentle质感
  const springConfig = { stiffness: 80, damping: 20 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  // 动态获取卡片尺寸
  useEffect(() => {
    if (cardRef.current) {
      const updateDimensions = () => {
        const { width, height } = cardRef.current!.getBoundingClientRect();
        setCardDimensions({ width, height });
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  // 合并ref - 同时支持滚动动画和鼠标交互
  const mergedRef = (element: HTMLDivElement | null) => {
    cardRef.current = element;
    if (scrollRef) {
      (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = element;
    }
  };

  // 鼠标移动事件处理 - 位置感知的核心
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;

    // 更新Motion Values (无重渲染)
    mouseX.set(localX);
    mouseY.set(localY);
  };

  // 鼠标离开事件处理 - 优雅重置
  const handleMouseLeave = () => {
    // 使用animate函数驱动Motion Values归零
    animate(mouseX, cardDimensions.width / 2, { duration: 0.5 });
    animate(mouseY, cardDimensions.height / 2, { duration: 0.5 });
  };

  return (
    <motion.article
      ref={mergedRef}
      className={`
        group relative overflow-hidden rounded-lg bg-white shadow-lg
        transition-all duration-300 ease-out
        hover:shadow-xl hover:-translate-y-1
        ${className}
      `}
      style={{
        // 里程碑9: 滚动视差样式 (优先级更高)
        ...scrollStyle,
        // 里程碑8: 3D透视效果 - 800px距离增强戏剧性
        transformPerspective: 800,
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        // 为后续动画预留时间偏移
        animationDelay: `${index * 0.1}s`,
        // 固定卡片尺寸 - 600x400 (3:2比例)
        width: '600px',
        height: '400px',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // 基础hover效果保持
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* 图片容器 */}
      <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
        <Image
          src={data.imageUrl}
          alt={data.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="600px"
        />

        {/* 悬停遮罩 */}
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* 项目年份标签 */}
        <div className="absolute top-4 right-4 rounded-full bg-black/80 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
          {data.year}
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-6">
        {/* 类别标签 */}
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
            {data.category}
          </span>
          <span className="text-sm text-gray-500">{data.client}</span>
        </div>

        {/* 标题 */}
        <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
          {data.title}
        </h3>

        {/* 描述 */}
        <p className="mb-4 text-gray-600 leading-relaxed line-clamp-3">
          {data.description}
        </p>

        {/* 标签列表 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {data.tags.map((tag, tagIndex) => (
            <span
              key={`${data.id}-tag-${tagIndex}`}
              className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 底部操作区 */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Project #{String(index + 1).padStart(2, '0')}
          </div>

          {data.projectUrl && (
            <a
              href={data.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              View Project
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};
