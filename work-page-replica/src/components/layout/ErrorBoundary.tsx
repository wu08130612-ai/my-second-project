'use client';

/**
 * ErrorBoundary - React 错误边界组件
 * 
 * 用于捕获和处理 SmoothScroller 及其他组件的运行时错误
 * 提供优雅的错误降级体验
 */

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | undefined;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error | undefined; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 记录错误到控制台或错误监控服务
    console.error('🚨 ErrorBoundary 捕获到错误:', error, errorInfo);
    
    // 在生产环境中，这里可以发送错误到监控服务
    // 例如: Sentry.captureException(error, { extra: errorInfo });
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // 如果提供了自定义 fallback 组件，使用它
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      // 默认错误 UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              出现了一些问题
            </h2>
            <p className="text-gray-600 mb-6">
              页面遇到了意外错误，请刷新页面重试
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              刷新页面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// 用于 SmoothScroller 的专用错误边界
export function SmoothScrollerErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={({ resetError }) => (
        <div className="fixed top-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 max-w-md z-50">
          <h3 className="text-red-800 font-semibold mb-2">滚动系统错误</h3>
          <p className="text-red-600 text-sm mb-3">
            平滑滚动功能暂时不可用，页面将使用默认滚动
          </p>
          <button
            onClick={resetError}
            className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded transition-colors"
          >
            重试
          </button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}