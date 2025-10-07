import type { CardListProps } from '@/types';
import { InteractiveCard } from './InteractiveCard';

/**
 * CardList 组件
 *
 * 职责：
 * - 获取卡片数据并循环渲染
 * - 实现响应式网格布局
 * - 为后续滚动视差效果预留结构
 *
 * 布局规范：
 * - 1280px-1440px: 2列网格
 * - 1440px-1920px: 3列网格
 * - 1920px+: 4列网格
 */
export const CardList = ({ cards, className = '' }: CardListProps) => {
  return (
    <section
      className={`
        w-full max-w-screen-2xl mx-auto px-8
        ${className}
      `}
    >
      {/* 网格容器 */}
      <div
        className="
        grid gap-8
        grid-cols-1
        xl:grid-cols-2
        2xl:grid-cols-3
        3xl:grid-cols-4
        auto-rows-fr
      "
      >
        {cards.map((card, index) => (
          <InteractiveCard
            key={card.id}
            data={card}
            index={index}
            className="h-full"
          />
        ))}
      </div>

      {/* 空状态处理 */}
      {cards.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            No projects found
          </h3>
          <p className="text-gray-500 max-w-sm">
            There are no projects to display at the moment. Please check back
            later.
          </p>
        </div>
      )}
    </section>
  );
};
