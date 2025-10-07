/**
 * 调试抽屉组件
 * 右侧滑出式面板，带磨砂玻璃效果和平滑动画
 * 遵循 21st.dev 极简美学
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useDebugPanelOpen, useDebugStore } from '@/store/debugStore';

interface DebugDrawerProps {
  children: React.ReactNode;
}

export const DebugDrawer: React.FC<DebugDrawerProps> = ({ children }) => {
  const isOpen = useDebugPanelOpen();
  const { closeDebugPanel } = useDebugStore();

  // 抽屉动画配置
  const drawerVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  // 背景遮罩动画配置
  const backdropVariants = {
    closed: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      backdropFilter: 'blur(8px)',
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 right-0 flex justify-end z-[9999]"
          style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {/* 背景遮罩 - 磨砂玻璃效果 */}
          <motion.div
            className="absolute inset-0 bg-black/20"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={closeDebugPanel}
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* 抽屉面板 */}
          <motion.div
            className="relative w-96 h-full bg-white/95 shadow-2xl border-l border-gray-200/50"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* 头部 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/20">
              <h2 className="text-sm font-semibold text-gray-800 tracking-tight">
                Debug Panel
              </h2>
              <button
                onClick={closeDebugPanel}
                className="p-2 rounded-lg hover:bg-gray-100/60 transition-all duration-200 group"
                aria-label="Close debug panel"
              >
                <svg 
                  className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 内容区域 */}
            <div className="h-[calc(100%-73px)] overflow-y-auto">
              <div className="p-6 space-y-6">
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};