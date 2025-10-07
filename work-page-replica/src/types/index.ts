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
 */
export interface InteractiveCardProps {
  /** 卡片数据 */
  data: CardData;

  /** 卡片索引 (用于动画时间偏移) */
  index: number;

  /** 自定义类名 (可选) */
  className?: string;
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
