import { CardList } from '@/components/ui/CardList';
import { CARD_DATA } from '@/data/cardData';
import { SITE_CONFIG } from '@/config/siteConfig';

/**
 * 主页组件
 *
 * 职责：
 * - 渲染项目作品集页面
 * - 集成CardList组件
 * - 提供页面级别的布局和样式
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {SITE_CONFIG.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SITE_CONFIG.keywords.slice(0, 6).map(keyword => (
                <span
                  key={keyword}
                  className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="py-16">
        <CardList cards={CARD_DATA} />
      </main>

      {/* 页面底部 */}
      <footer className="bg-white border-t border-gray-200 mt-24">
        <div className="max-w-screen-2xl mx-auto px-8 py-12">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
            </p>
            <div className="flex justify-center gap-6">
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                GitHub
              </a>
              <a
                href={SITE_CONFIG.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Twitter
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              © 2024 {SITE_CONFIG.author.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
