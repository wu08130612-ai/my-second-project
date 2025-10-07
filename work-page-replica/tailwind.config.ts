import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Active Theory 风格的调色板
      colors: {
        background: {
          primary: '#0a0a0a',
          secondary: '#1a1a1a',
          tertiary: '#2a2a2a',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a0a0a0',
          tertiary: '#666666',
        },
        accent: {
          primary: '#ff6b35',
          secondary: '#00d4ff',
          tertiary: '#7c3aed',
        },
        border: {
          primary: '#333333',
          secondary: '#555555',
        }
      },
      
      // 字体栈 - 现代无衬线字体
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Monaco',
          'Consolas',
          'monospace'
        ]
      },
      
      // 间距系统 - 基于8px网格
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        '34': '8.5rem',   // 136px
        '38': '9.5rem',   // 152px
        '42': '10.5rem',  // 168px
        '46': '11.5rem',  // 184px
        '50': '12.5rem',  // 200px
      },
      
      // 响应式断点 - 严格按照PRD要求
      screens: {
        'desktop-sm': '1280px',
        'desktop-md': '1440px', 
        'desktop-lg': '1600px',
        'desktop-xl': '1920px',
      },
      
      // 动画缓动函数
      transitionTimingFunction: {
        'gentle': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'fast': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-gentle': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      
      // 动画持续时间
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      
      // 阴影系统
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.15)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(255, 107, 53, 0.3)',
      },
      
      // 边框圆角
      borderRadius: {
        'card': '12px',
        'button': '8px',
      }
    },
  },
  plugins: [],
};

export default config;