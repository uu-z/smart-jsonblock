// Unified layout examples
import type {
    BaseJSONData,
    ComponentType
} from "../types";
import type {
    UnifiedLayout,
    GridItem,
    AreaItem,
    DashboardItem,
    SmartCardData,
    BaseConfig,
    AreasConfig
} from "../types/layout";

// Define interfaces for the different layout types
interface UnifiedGridLayout extends UnifiedLayout<GridItem> {
    _type: "unifiedLayout";
    title: string;
    description: string;
    items: GridItem[];
    config?: BaseConfig;
}

interface UnifiedAreasLayout extends UnifiedLayout<AreaItem> {
    _type: "unifiedLayout";
    title: string;
    description: string;
    items: AreaItem[];
    config: {
        areas: string[][];
        [key: string]: any;
    };
}

interface UnifiedDashboardLayout extends UnifiedLayout<DashboardItem> {
    _type: "unifiedLayout";
    title: string;
    description: string;
    items: DashboardItem[];
    config?: BaseConfig;
}

interface MinimalConfigLayout extends UnifiedLayout {
    _type: "unifiedLayout";
    title: string;
    description: string;
    config: {
        glass: boolean;
        texture: boolean;
        [key: string]: any;
    };
}

interface SmartCardLayout extends UnifiedLayout {
    _type: "unifiedLayout";
    title: string;
    description: string;
    config: {
        glass: boolean;
        [key: string]: any;
    };
    items: Array<{
        title: string;
        content: SmartCardData;
    }>;
}

// Define the main interface for the examples object
interface UnifiedLayoutExamples {
    title: string;
    description: string;
    unifiedGrid: UnifiedGridLayout;
    unifiedAreas: UnifiedAreasLayout;
    unifiedDashboard: UnifiedDashboardLayout;
    minimalConfig: MinimalConfigLayout;
    smartCards: SmartCardLayout;
    [key: string]: any;
}

const unifiedLayoutExamples: UnifiedLayoutExamples = {
    title: "统一布局系统示例",
    description: "简化的布局系统，自动检测布局类型，减少配置复杂度",

    unifiedGrid: {
        _type: "unifiedLayout",
        title: "统一布局系统",
        description: "简化的布局系统，自动检测布局类型，减少配置复杂度",
        items: [
            {
                content: {
                    title: "自动检测布局类型",
                    description: "根据数据结构自动选择最合适的布局类型",
                    value: "智能布局",
                },
                colSpan: 2,
                rowSpan: 1,
            },
            {
                content: {
                    title: "响应式设计",
                    description: "自动适应不同屏幕尺寸",
                },
                colSpan: 1,
                rowSpan: 1,
            },
            {
                content: {
                    title: "主题支持",
                    description: "支持亮色、暗色和多彩主题",
                    value: "3种主题",
                },
                colSpan: 1,
                rowSpan: 1,
            },
            {
                content: {
                    title: "约定大于配置",
                    description: "减少不必要的配置，专注于内容",
                },
                colSpan: 2,
                rowSpan: 1,
            },
        ],
        config: {
            // Minimal configuration needed - most settings are auto-detected
            theme: "colorful",
        },
    },

    unifiedAreas: {
        _type: "unifiedLayout",
        title: "命名区域布局",
        description: "使用命名区域创建复杂布局，无需复杂配置",
        items: [
            {
                area: "header",
                content: "页面头部",
            },
            {
                area: "nav",
                content: "导航菜单",
            },
            {
                area: "main",
                content: "主要内容区域",
            },
            {
                area: "sidebar",
                content: "侧边栏",
            },
            {
                area: "footer",
                content: "页面底部",
            },
        ],
        config: {
            // Layout type will be auto-detected as 'areas' because items have 'area' property
            areas: [
                ["header", "header", "header"],
                ["nav", "main", "sidebar"],
                ["footer", "footer", "footer"],
            ],
        },
    },

    unifiedDashboard: {
        _type: "unifiedLayout",
        title: "仪表盘布局",
        description: "简化的仪表盘布局，专注于内容展示",
        items: [
            {
                title: "销售概览",
                size: "large",
                gradient: true,
                content: {
                    value: "¥128,430",
                    description: "本月销售额",
                },
            },
            {
                title: "用户数量",
                size: "medium",
                gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
                content: {
                    value: "8,240",
                    description: "活跃用户",
                },
            },
            {
                title: "订单数量",
                size: "medium",
                gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
                content: {
                    value: "1,024",
                    description: "本周订单",
                },
            },
            {
                title: "系统状态",
                size: "small",
                gradient: "linear-gradient(135deg, #fa709a, #fee140)",
                content: {
                    value: "正常",
                    description: "所有系统运行正常",
                },
                footer: "最后更新: 10分钟前",
            },
        ],
    },

    minimalConfig: {
        _type: "unifiedLayout",
        title: "极简配置示例",
        description: "约定大于配置，减少认知负担",
        config: {
            glass: true,
            texture: true,
        },
        items: [
            {
                title: "自动检测布局",
                content: "系统会根据数据结构自动选择最合适的布局类型，无需显式配置",
            },
            {
                title: "智能默认值",
                content: "大多数配置项都有合理的默认值，只需关注业务数据",
            },
            {
                title: "渐变与动效",
                gradient: true,
                content: "内置多种视觉效果，一行代码即可启用",
            },
        ],
    },

    smartCards: {
        _type: "unifiedLayout",
        title: "智能卡片示例",
        description: "约定大于配置的智能卡片，根据数据结构自动选择最合适的展示方式",
        config: {
            glass: true,
        },
        items: [
            {
                title: "基础卡片",
                content: {
                    _type: "smartCard",
                    title: "智能检测类型",
                    content: "这是一个基础卡片，系统会根据数据结构自动检测为basic类型",
                },
            },
            {
                title: "统计卡片",
                content: {
                    _type: "smartCard",
                    title: "月度销售额",
                    content: {
                        value: "¥128,430",
                        description: "比上月增长 12.5%",
                    },
                    // 无需指定variant，系统会自动检测为stat类型
                },
            },
            {
                title: "媒体卡片",
                content: {
                    _type: "smartCard",
                    title: "自然风景",
                    subtitle: "美丽的山水画卷",
                    image:
                        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                    content: "系统检测到image属性，自动选择media类型展示",
                    // 无需指定variant，系统会自动检测为media类型
                },
            },
            {
                title: "操作卡片",
                content: {
                    _type: "smartCard",
                    title: "文件管理",
                    content: "对文件进行操作",
                    actions: [
                        { text: "下载", variant: "primary" },
                        { text: "分享", variant: "secondary" },
                        { text: "删除", variant: "destructive" },
                    ],
                    // 无需指定variant，系统会自动检测为action类型
                },
            },
            {
                title: "信息卡片",
                content: {
                    _type: "smartCard",
                    title: "系统通知",
                    icon: "📢",
                    content: "您的系统已经更新到最新版本",
                    footer: "2023-06-15 10:30",
                    // 无需指定variant，系统会自动检测为info类型
                },
            },
            {
                title: "自定义样式",
                content: {
                    _type: "smartCard",
                    title: "渐变背景",
                    content: "可以通过gradient属性设置渐变背景",
                    gradient: "linear-gradient(135deg, #6a11cb, #2575fc)",
                    glass: true,
                    bordered: false,
                    footer: "自定义样式示例",
                },
            },
        ],
    },
};

export default unifiedLayoutExamples; 