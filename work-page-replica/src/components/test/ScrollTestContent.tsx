'use client';

/**
 * ScrollTestContent - 滚动测试内容组件
 * 
 * 提供足够的内容高度来测试 Lenis 平滑滚动效果
 * 包含不同类型的内容区块，便于观察滚动行为
 */

export default function ScrollTestContent() {
  const sections = [
    {
      id: 'hero',
      title: '🚀 Lenis 平滑滚动测试',
      content: '这是一个测试 Lenis 平滑滚动效果的页面。请尝试滚动页面，观察左上角的调试信息。',
      bgColor: 'bg-gradient-to-br from-blue-900 to-purple-900',
    },
    {
      id: 'features',
      title: '✨ 功能特性',
      content: 'Lenis 提供了丝滑的滚动体验，支持鼠标滚轮、触摸板和触摸屏操作。',
      bgColor: 'bg-gradient-to-br from-green-900 to-teal-900',
    },
    {
      id: 'performance',
      title: '⚡ 性能优化',
      content: '通过 requestAnimationFrame 和页面可见性 API 优化，确保最佳性能表现。',
      bgColor: 'bg-gradient-to-br from-orange-900 to-red-900',
    },
    {
      id: 'integration',
      title: '🔗 状态集成',
      content: '与 Zustand 状态管理完美集成，实时同步滚动进度、速度和运行状态。',
      bgColor: 'bg-gradient-to-br from-purple-900 to-pink-900',
    },
    {
      id: 'responsive',
      title: '📱 响应式设计',
      content: '支持各种设备和屏幕尺寸，在桌面端和移动端都有出色的滚动体验。',
      bgColor: 'bg-gradient-to-br from-indigo-900 to-blue-900',
    },
  ];

  return (
    <div className="space-y-0">
      {sections.map((section, index) => (
        <section
          key={section.id}
          className={`min-h-screen flex items-center justify-center ${section.bgColor}`}
        >
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-6xl font-bold text-white mb-8 tracking-tight">
                {section.title}
              </h2>
              <p className="text-2xl text-gray-200 leading-relaxed mb-12">
                {section.content}
              </p>
              
              {/* 添加一些装饰性内容 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">
                        {index === 0 ? '🎯' : index === 1 ? '🔥' : index === 2 ? '💎' : index === 3 ? '🌟' : '🚀'}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      特性 {i + 1}
                    </h3>
                    <p className="text-gray-300">
                      这里是一些描述性文本，用于展示滚动效果和视觉层次。
                    </p>
                  </div>
                ))}
              </div>

              {/* 滚动提示 */}
              {index === 0 && (
                <div className="mt-16 animate-bounce">
                  <div className="w-8 h-12 border-2 border-white/50 rounded-full mx-auto flex justify-center">
                    <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
                  </div>
                  <p className="text-white/70 mt-4 text-sm">向下滚动体验平滑效果</p>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* 底部区域 */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-8">
            🎉 测试完成
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            恭喜！你已经体验了完整的 Lenis 平滑滚动效果
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors"
          >
            回到顶部
          </button>
        </div>
      </section>
    </div>
  );
}