// Advanced grid layout examples with TypeScript
// Using convention over configuration principles to simplify complexity
import type {
    GridLayout,
    DashboardLayout,
    UnifiedLayout,
    GridItem,
    AreaItem,
    DashboardItem,
    SmartCardData,
    LayoutExamples
} from "../types/layout";

// The main examples object with proper typing
const gridLayoutExamples: LayoutExamples = {
    title: "Advanced Grid Layout Examples",
    description:
        "These examples demonstrate more complex grid layouts with CSS Grid",

    // Basic grid layout with different sized items
    basicGridLayout: {
        _type: "gridLayout",
        title: "Basic Grid Layout",
        description: "A simple grid layout with items of different sizes",
        items: [
            {
                content: "1x1 Grid Item",
                colSpan: 1,
                rowSpan: 1,
                background: "#e9ecef",
            },
            {
                content: "2x1 Grid Item",
                colSpan: 2,
                rowSpan: 1,
                background: "#dee2e6",
            },
            {
                content: "1x2 Grid Item",
                colSpan: 1,
                rowSpan: 2,
                background: "#ced4da",
            },
            {
                content: "2x2 Grid Item",
                colSpan: 2,
                rowSpan: 2,
                background: "#adb5bd",
            },
            {
                content: "1x1 Grid Item",
                colSpan: 1,
                rowSpan: 1,
                background: "#6c757d",
                color: "#fff",
            },
            {
                content: "3x1 Grid Item",
                colSpan: 3,
                rowSpan: 1,
                background: "#495057",
                color: "#fff",
            },
        ],
        config: {
            gap: "1rem",
            rowHeight: "100px",
            columns: 4,
            responsive: true,
        },
    } as GridLayout,

    // Dashboard layout
    dashboardExample: {
        _type: "dashboardLayout",
        title: "Interactive Dashboard",
        description:
            "A responsive dashboard layout with widgets of different sizes",
        widgets: [
            {
                title: "Revenue Overview",
                size: "large",
                priority: "high",
                content: {
                    text: "Monthly revenue performance",
                    chart: "Bar Chart Placeholder",
                },
                actions: [{ label: "⋮" }, { label: "×" }],
                footer: "Updated 5 minutes ago",
            },
            {
                title: "Active Users",
                size: "medium",
                content: {
                    value: "1,245",
                    text: "Current active users on the platform",
                },
                headerBackground: "#4263eb",
                color: "#333",
            },
            {
                title: "Conversion Rate",
                size: "medium",
                content: {
                    value: "3.2%",
                    text: "Conversion rate this month",
                },
                headerBackground: "#40c057",
            },
            {
                title: "Recent Orders",
                size: "large",
                content: "Table of recent orders would go here",
                headerBackground: "#fd7e14",
            },
            {
                title: "System Status",
                size: "small",
                content: {
                    text: "All systems operational",
                    value: "100%",
                },
                headerBackground: "#20c997",
            },
            {
                title: "Notifications",
                size: "small",
                content: "5 new notifications",
                headerBackground: "#fa5252",
            },
            {
                title: "Storage Usage",
                size: "medium",
                content: {
                    value: "64%",
                    text: "Current storage usage",
                },
                headerBackground: "#7950f2",
            },
            {
                title: "Weekly Report",
                size: "xlarge",
                content: {
                    text: "Weekly performance metrics",
                    chart: "Line Chart Placeholder",
                },
                headerBackground: "#1864ab",
                color: "#333",
                footer: "Generated on Monday, 10:00 AM",
            },
        ],
        config: {
            gap: "1.5rem",
            minWidgetWidth: "250px",
        },
    } as DashboardLayout,

    // New Unified Layout Example - convention over configuration
    unifiedLayoutExample: {
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
    } as UnifiedLayout<GridItem>,

    // Unified Layout with Areas - convention over configuration
    unifiedAreasExample: {
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
    } as UnifiedLayout<AreaItem>,

    // Unified Dashboard Layout - convention over configuration
    unifiedDashboardExample: {
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
    } as UnifiedLayout<DashboardItem>,

    // 极简配置，智能默认值 - convention over configuration
    minimalConfigExample: {
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
    } as UnifiedLayout,

    // 智能卡片示例 - convention over configuration
    smartCardExamples: {
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
                } as SmartCardData,
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
                } as SmartCardData,
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
                } as SmartCardData,
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
                } as SmartCardData,
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
                } as SmartCardData,
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
                } as SmartCardData,
            },
        ],
    } as UnifiedLayout,
};

export default gridLayoutExamples; 