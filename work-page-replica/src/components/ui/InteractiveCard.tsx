import Image from 'next/image';
import type { InteractiveCardProps } from '@/types';

/**
 * InteractiveCard 组件 - 静态版本
 *
 * 严格按照PRD v1.2规范实现：
 * - 使用PascalCase文件命名
 * - 命名导出
 * - 严格的Props类型定义
 * - 响应式设计 (1280px-1920px)
 * - Active Theory风格的视觉设计
 */
export const InteractiveCard = ({
  data,
  index,
  className = '',
}: InteractiveCardProps) => {
  return (
    <article
      className={`
        group relative overflow-hidden rounded-lg bg-white shadow-lg
        transition-all duration-300 ease-out
        hover:shadow-xl hover:-translate-y-1
        ${className}
      `}
      style={{
        // 为后续动画预留时间偏移
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* 图片容器 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={data.imageUrl}
          alt={data.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1280px) 100vw, (max-width: 1440px) 50vw, (max-width: 1920px) 33vw, 25vw"
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
    </article>
  );
};
