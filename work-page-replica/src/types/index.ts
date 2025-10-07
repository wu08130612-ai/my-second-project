/**
 * 卡片数据接口定义
 * 严格按照PRD v1.2规范
 */
export interface CardData {
  /** 唯一标识符 */
  id: string;

  /** 项目标题 */
  title: string;

  /** 项目描述 */
  description: string;

  /** 项目图片URL */
  imageUrl: string;

  /** 项目类别 */
  category: string;

  /** 项目标签 */
  tags: string[];

  /** 客户名称 */
  client: string;

  /** 项目年份 */
  year: number;

  /** 项目链接 (可选) */
  projectUrl?: string;
}

/**
 * 卡片组件Props接口
 * 里程碑9升级：支持全局滚动视差编排
 */
export interface InteractiveCardProps {
  /** 卡片数据 */
  data: CardData;

  /** 卡片索引 (用于动画时间偏移和层次感) */
  index: number;

  /** 卡片总数 (用于动态offset计算) */
  total: number;

  /** 自定义类名 (可选) */
  className?: string;

  /** 动画配置 (可选) - 里程碑9新增 */
  animationConfig?: {
    /** offset乘数，控制层次感强度 */
    offsetMultiplier?: number;
    /** scale变化范围 */
    scaleRange?: [number, number];
    /** opacity变化范围 */
    opacityRange?: [number, number];
    /** rotateX变化范围 */
    rotateRange?: [string, string];
  };
}

/**
 * 卡片列表组件Props接口
 */
export interface CardListProps {
  /** 卡片数据数组 */
  cards: CardData[];

  /** 自定义类名 (可选) */
  className?: string;
}

/**
 * 配置对象类型定义
 */
export interface Config {
  /** 卡片动画延迟系数 */
  cardAnimationDelay: number;
}

/**
 * 物理参数配置类型
 */
export interface PhysicsConfig {
  /** 弹簧配置名称 */
  name: 'gentle' | 'fast';

  /** 弹簧刚度 */
  stiffness: number;

  /** 阻尼系数 */
  damping: number;

  /** 质量 */
  mass: number;
}
