'use client';

import { SITE_CONFIG } from '@/config/siteConfig';
import { CARD_DATA } from '@/data/cardData';
import { CardList } from '@/components/ui/CardList';
import ScrollTestContent from '@/components/test/ScrollTestContent';
import PerformanceMonitor from '@/components/test/PerformanceMonitor';
import { DebugManager } from '@/components/debug/DebugManager';
import ShaderBackground from '@/components/ui/ShaderBackground';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Shader背景 - GPU驱动的3D画布 */}
      <ShaderBackground />
      
      {/* 隐形调试管理器 - 只在开发环境启用 */}
      {process.env.NODE_ENV === 'development' && (
        <>
          <DebugManager />
          <PerformanceMonitor />
        </>
      )}
      
      {/* 原有的首页内容 - 移除CSS背景，让Shader背景透过 */}
      <section className="min-h-screen relative">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              {SITE_CONFIG.name}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {SITE_CONFIG.description}
            </p>
          </div>
          
          <CardList cards={CARD_DATA} />
        </div>
      </section>

      {/* 滚动测试内容 */}
      <ScrollTestContent />
    </main>
  );
}
