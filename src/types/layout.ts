/**
 * 统一布局系统类型定义
 * 约定大于配置：通过类型系统减少重复代码和配置
 */

// 基础内容对象接口
export interface ContentObject {
    title?: string;
    description?: string;
    value?: string | number;
    text?: string;
    chart?: string;
    items?: any[];
    [key: string]: any;
}

// 基础项目接口
export interface BaseItem {
    content: string | ContentObject;
    background?: string;
    color?: string;
    gradient?: boolean | string;
    title?: string;
    [key: string]: any;
}

// 网格项目接口
export interface GridItem extends BaseItem {
    colSpan?: number;
    rowSpan?: number;
}

// 区域项目接口
export interface AreaItem extends BaseItem {
    area: string;
}

// 仪表盘项目接口
export interface DashboardItem extends BaseItem {
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    headerBackground?: string;
    footer?: string;
}

// 操作按钮接口
export interface Action {
    text: string;
    variant?: 'primary' | 'secondary' | 'destructive';
    icon?: string;
    onClick?: () => void;
    [key: string]: any;
}

// 智能卡片数据接口
export interface SmartCardData {
    _type: 'smartCard';
    title: string;
    subtitle?: string;
    content: string | ContentObject;
    icon?: string;
    image?: string;
    footer?: string;
    actions?: Action[];
    gradient?: boolean | string;
    glass?: boolean;
    bordered?: boolean;
    variant?: 'basic' | 'media' | 'info' | 'stat' | 'action';
}

// 基础配置接口
export interface BaseConfig {
    gap?: string;
    theme?: string;
    glass?: boolean;
    texture?: boolean;
    type?: 'grid' | 'areas' | 'dashboard';
    responsive?: boolean;
    animation?: boolean;
    [key: string]: any;
}

// 网格布局配置
export interface GridConfig extends BaseConfig {
    columns?: number;
    rowHeight?: string;
}

// 区域布局配置
export interface AreasConfig extends BaseConfig {
    rows?: number;
    columns?: number;
    height?: string;
    areas: string[][];
}

// 仪表盘布局配置
export interface DashboardConfig extends BaseConfig {
    minWidgetWidth?: string;
}

// 统一布局接口
export interface UnifiedLayout<T extends BaseItem = BaseItem, C extends BaseConfig = BaseConfig> {
    _type: 'unifiedLayout';
    title: string;
    description: string;
    items: T[];
    config?: C;
}

// 网格布局接口
export interface GridLayout {
    _type: 'gridLayout';
    title: string;
    description: string;
    items: GridItem[];
    config?: GridConfig;
}


// 仪表盘布局接口
export interface DashboardLayout {
    _type: 'dashboardLayout';
    title: string;
    description: string;
    widgets: DashboardItem[];
    config?: DashboardConfig;
}

// 布局类型联合类型
export type LayoutType = 'grid' | 'areas' | 'dashboard';

// 所有布局类型联合
export type AnyLayout =
    | UnifiedLayout
    | GridLayout
    | DashboardLayout;

// 布局示例集合接口
export interface LayoutExamples {
    title: string;
    description: string;
    [key: string]: AnyLayout | string;
} 