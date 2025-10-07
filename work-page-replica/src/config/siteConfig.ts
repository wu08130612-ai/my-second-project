/**
 * 站点配置
 * 定义网站的基础信息和元数据
 */
export const SITE_CONFIG = {
  /** 网站名称 */
  name: 'Work Page Replica',

  /** 网站描述 */
  description:
    'A pixel-perfect replica of Active Theory work page with React + Framer Motion',

  /** 网站URL */
  url: 'https://work-page-replica.vercel.app',

  /** 作者信息 */
  author: {
    name: 'TraeAI Assistant',
    url: 'https://trae.ai',
  },

  /** 社交媒体链接 */
  links: {
    github: 'https://github.com/username/work-page-replica',
    twitter: 'https://twitter.com/username',
  },

  /** SEO关键词 */
  keywords: [
    'React',
    'Next.js',
    'Framer Motion',
    'TypeScript',
    'Tailwind CSS',
    'Active Theory',
    'Portfolio',
    'Interactive Design',
  ],
} as const;
