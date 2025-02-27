import React from "react"
import { useState, useEffect } from 'react'
import JSONBlock from './components/JSONBlock'
import './App.css'

function App() {
  // Basic examples with explicit type declarations
  const basicExamples = {
    title: "Smart JSON Renderer Demo",
    description: "This demo shows how components are automatically matched based on data patterns or explicit type declarations",
    
    // Using explicit type declaration with _type
    customUser: {
      _type: "userCard",
      name: "Jane Smith",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      role: "Designer"
    },
    
    // Original pattern-matched data (still works)
    user: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "Developer"
    },
    
    // Using explicit type declaration with data array
    customStats: {
      _type: "statsList",
      data: [
        { label: "Projects", value: 15 },
        { label: "Tasks", value: 50 },
        { label: "Completed", value: 35 }
      ]
    },
    
    // Original pattern-matched data
    stats: [
      { label: "Projects", value: 12 },
      { label: "Tasks", value: 42 },
      { label: "Completed", value: 30 }
    ],
    
    chart: {
      type: "bar",
      data: [10, 25, 15, 30, 20, 40],
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    },
    
    items: [
      { id: 1, name: "Item 1", price: 29.99, inStock: true },
      { id: 2, name: "Item 2", price: 39.99, inStock: false },
      { id: 3, name: "Item 3", price: 19.99, inStock: true }
    ],
    
    actions: [
      { text: "Save", type: "primary" },
      { text: "Cancel", type: "secondary" }
    ],
    
    // Using explicit type declaration
    customProgress: {
      _type: "progressBar",
      current: 75,
      total: 100,
      label: "Custom Progress"
    },
    
    // Original pattern-matched data
    progress: {
      current: 65,
      total: 100
    },
    
    location: {
      lat: 37.7749,
      lng: -122.4194,
      name: "San Francisco"
    }
  }
  
  // Advanced examples with complex nested structures
  const advancedExamples = {
    title: "Advanced JSON Rendering Examples",
    description: "These examples demonstrate more complex data structures and nested components",
    
    // Complex nested component example
    dashboard: {
      _type: "userCard",
      name: "Team Dashboard",
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      role: "Admin Panel",
      // Nested components inside a component
      details: {
        _type: "statsList",
        data: [
          { label: "Team Members", value: 8 },
          { label: "Active Projects", value: 12 },
          { label: "Completion Rate", value: "87%" }
        ]
      }
    },
    
    // Mixed component types in an array
    mixedComponents: [
      {
        _type: "progressBar",
        current: 85,
        total: 100,
        label: "Project Alpha"
      },
      {
        _type: "progressBar",
        current: 32,
        total: 100,
        label: "Project Beta"
      },
      {
        _type: "chart",
        type: "line",
        data: [5, 10, 15, 20, 25, 30],
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"]
      }
    ],
    
    // Complex data visualization
    projectOverview: {
      _type: "chart",
      type: "bar",
      data: [
        [10, 20, 30, 40],  // Team 1
        [15, 25, 35, 45],  // Team 2
        [5, 15, 25, 35]    // Team 3
      ],
      labels: ["Q1", "Q2", "Q3", "Q4"],
      series: ["Team 1", "Team 2", "Team 3"],
      title: "Quarterly Performance",
      stacked: true
    },
    
    // Nested location data
    locations: [
      {
        _type: "locationMap",
        lat: 37.7749,
        lng: -122.4194,
        name: "San Francisco HQ",
        details: {
          address: "123 Tech Street",
          employees: 150,
          established: 2010
        }
      },
      {
        _type: "locationMap",
        lat: 40.7128,
        lng: -74.0060,
        name: "New York Office",
        details: {
          address: "456 Innovation Avenue",
          employees: 75,
          established: 2015
        }
      }
    ],
    
    // Complex table with nested data
    teamMembers: {
      _type: "itemTable",
      columns: ["Name", "Role", "Projects", "Status"],
      data: [
        { 
          id: 1, 
          name: "Alice Johnson", 
          role: "Lead Developer",
          projects: [
            { id: 101, name: "Website Redesign" },
            { id: 102, name: "API Integration" }
          ],
          status: "Active"
        },
        { 
          id: 2, 
          name: "Bob Smith", 
          role: "UX Designer",
          projects: [
            { id: 101, name: "Website Redesign" }
          ],
          status: "On Leave"
        },
        { 
          id: 3, 
          name: "Carol Davis", 
          role: "Backend Developer",
          projects: [
            { id: 102, name: "API Integration" },
            { id: 103, name: "Database Migration" }
          ],
          status: "Active"
        }
      ]
    },
    
    // Dynamic action buttons with context
    contextActions: {
      _type: "actionButtons",
      context: "project-dashboard",
      data: [
        { text: "Add Task", type: "primary", icon: "plus" },
        { text: "Generate Report", type: "secondary", icon: "document" },
        { text: "Share Dashboard", type: "secondary", icon: "share" },
        { text: "Settings", type: "tertiary", icon: "gear" }
      ]
    }
  }
  
  // Example of a top-level array with mixed component types
  const arrayExamples = [
    // Each item can specify its own component type
    { 
      id: 1, 
      _type: "userCard",
      name: "Project Alpha", 
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "High Priority"
    },
    { 
      id: 2, 
      _type: "progressBar",
      current: 65,
      total: 100,
      label: "Project Beta Progress"
    },
    { 
      id: 3, 
      _type: "chart",
      type: "pie",
      data: [30, 50, 20],
      labels: ["Complete", "In Progress", "Not Started"],
      title: "Project Gamma Status"
    },
    // Regular item that will use pattern matching
    { 
      id: 4, 
      name: "Project Delta", 
      category: "Research",
      status: "Active"
    }
  ]

  // Grid layout example
  const gridLayoutExample = {
    _layout: 'grid',  // Use grid layout
    _columns: 3,      // 3 columns grid
    
    title: "Grid Layout Example",
    description: "This example demonstrates the grid layout capability with column spanning",
    
    // Full width chart (spans 3 columns)
    mainChart: {
      _type: "chart",
      _span: 3,  // Span all 3 columns
      type: "bar",
      data: [25, 40, 60, 35, 45, 30],
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      title: "Monthly Performance"
    },
    
    // User cards in first row (each spans 1 column)
    teamLead: {
      _type: "userCard",
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Team Lead"
    },
    
    designer: {
      _type: "userCard",
      name: "Sarah Miller",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      role: "UX Designer"
    },
    
    developer: {
      _type: "userCard",
      name: "David Chen",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      role: "Developer"
    },
    
    // Progress bars (spans 2 columns)
    projectProgress: {
      _type: "progressBar",
      _span: 2,  // Span 2 columns
      current: 75,
      total: 100,
      label: "Project Completion"
    },
    
    // Stats list (spans 1 column)
    metrics: {
      _type: "statsList",
      data: [
        { label: "Tasks", value: 24 },
        { label: "Completed", value: 18 },
        { label: "Pending", value: 6 }
      ]
    },
    
    // Location map (spans 2 columns)
    officeLocation: {
      _type: "locationMap",
      _span: 2,  // Span 2 columns
      lat: 37.7749,
      lng: -122.4194,
      name: "Headquarters"
    },
    
    // Action buttons (spans 1 column)
    actions: {
      _type: "actionButtons",
      data: [
        { text: "View Details", type: "primary" },
        { text: "Export", type: "secondary" }
      ]
    }
  }

  // Advanced grid layout examples
  const gridLayoutExamples = {
    title: "Advanced Grid Layout Examples",
    description: "These examples demonstrate more complex grid layouts with CSS Grid",
    
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
          background: "#e9ecef"
        },
        {
          content: "2x1 Grid Item",
          colSpan: 2,
          rowSpan: 1,
          background: "#dee2e6"
        },
        {
          content: "1x2 Grid Item",
          colSpan: 1,
          rowSpan: 2,
          background: "#ced4da"
        },
        {
          content: "2x2 Grid Item",
          colSpan: 2,
          rowSpan: 2,
          background: "#adb5bd"
        },
        {
          content: "1x1 Grid Item",
          colSpan: 1,
          rowSpan: 1,
          background: "#6c757d",
          color: "#fff"
        },
        {
          content: "3x1 Grid Item",
          colSpan: 3,
          rowSpan: 1,
          background: "#495057",
          color: "#fff"
        }
      ],
      config: {
        gap: "1rem",
        rowHeight: "100px",
        columns: 4,
        responsive: true
      }
    },
    
    // Advanced grid layout with named areas
    namedAreasLayout: {
      _type: "advancedGridLayout",
      title: "Named Grid Areas Layout",
      description: "A grid layout using named grid areas for complex layouts",
      items: [
        {
          area: "header",
          content: {
            title: "Header",
            description: "This is the header area spanning the full width"
          },
          background: "#007bff",
          color: "#fff"
        },
        {
          area: "sidebar",
          content: {
            title: "Sidebar",
            description: "Navigation sidebar"
          },
          background: "#6610f2",
          color: "#fff"
        },
        {
          area: "main",
          content: {
            title: "Main Content",
            description: "The main content area"
          },
          background: "#e9ecef"
        },
        {
          area: "right",
          content: {
            title: "Right Sidebar",
            description: "Additional information"
          },
          background: "#fd7e14"
        },
        {
          area: "footer",
          content: {
            title: "Footer",
            description: "Footer spanning the full width"
          },
          background: "#20c997",
          color: "#fff"
        }
      ],
      config: {
        rows: 3,
        columns: 4,
        gap: "1rem",
        height: "500px",
        areas: [
          ["header", "header", "header", "header"],
          ["sidebar", "main", "main", "right"],
          ["footer", "footer", "footer", "footer"]
        ]
      }
    },
    
    // Dashboard layout
    dashboardExample: {
      _type: "dashboardLayout",
      title: "Interactive Dashboard",
      description: "A responsive dashboard layout with widgets of different sizes",
      widgets: [
        {
          title: "Revenue Overview",
          size: "large",
          priority: "high",
          content: {
            text: "Monthly revenue performance",
            chart: "Bar Chart Placeholder"
          },
          actions: [
            { label: "⋮" },
            { label: "×" }
          ],
          footer: "Updated 5 minutes ago"
        },
        {
          title: "Active Users",
          size: "medium",
          content: {
            value: "1,245",
            text: "Current active users on the platform"
          },
          headerBackground: "#4263eb",
          color: "#333"
        },
        {
          title: "Conversion Rate",
          size: "medium",
          content: {
            value: "3.2%",
            text: "Conversion rate this month"
          },
          headerBackground: "#40c057"
        },
        {
          title: "Recent Orders",
          size: "large",
          content: "Table of recent orders would go here",
          headerBackground: "#fd7e14"
        },
        {
          title: "System Status",
          size: "small",
          content: {
            text: "All systems operational",
            value: "100%"
          },
          headerBackground: "#20c997"
        },
        {
          title: "Notifications",
          size: "small",
          content: "5 new notifications",
          headerBackground: "#fa5252"
        },
        {
          title: "Storage Usage",
          size: "medium",
          content: {
            value: "64%",
            text: "Current storage usage"
          },
          headerBackground: "#7950f2"
        },
        {
          title: "Weekly Report",
          size: "xlarge",
          content: {
            text: "Weekly performance metrics",
            chart: "Line Chart Placeholder"
          },
          headerBackground: "#1864ab",
          color: "#333",
          footer: "Generated on Monday, 10:00 AM"
        }
      ],
      config: {
        gap: "1.5rem",
        minWidgetWidth: "250px"
      }
    },
    
    // New Unified Layout Example
    unifiedLayoutExample: {
      _type: "unifiedLayout",
      title: "统一布局系统",
      description: "简化的布局系统，自动检测布局类型，减少配置复杂度",
      items: [
        {
          content: {
            title: "自动检测布局类型",
            description: "根据数据结构自动选择最合适的布局类型",
            value: "智能布局"
          },
          colSpan: 2,
          rowSpan: 1
        },
        {
          content: {
            title: "响应式设计",
            description: "自动适应不同屏幕尺寸"
          },
          colSpan: 1,
          rowSpan: 1
        },
        {
          content: {
            title: "主题支持",
            description: "支持亮色、暗色和多彩主题",
            value: "3种主题"
          },
          colSpan: 1,
          rowSpan: 1
        },
        {
          content: {
            title: "约定大于配置",
            description: "减少不必要的配置，专注于内容"
          },
          colSpan: 2,
          rowSpan: 1
        }
      ],
      config: {
        // Minimal configuration needed - most settings are auto-detected
        theme: "colorful"
      }
    },
    
    // Unified Layout with Areas
    unifiedAreasExample: {
      _type: "unifiedLayout",
      title: "命名区域布局",
      description: "使用命名区域创建复杂布局，无需复杂配置",
      items: [
        {
          area: "header",
          content: "页面头部"
        },
        {
          area: "nav",
          content: "导航菜单"
        },
        {
          area: "main",
          content: "主要内容区域"
        },
        {
          area: "sidebar",
          content: "侧边栏"
        },
        {
          area: "footer",
          content: "页面底部"
        }
      ],
      config: {
        // Layout type will be auto-detected as 'areas' because items have 'area' property
        areas: [
          ["header", "header", "header"],
          ["nav", "main", "sidebar"],
          ["footer", "footer", "footer"]
        ]
      }
    },
    
    // Unified Dashboard Layout
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
            description: "本月销售额"
          }
        },
        {
          title: "用户数量",
          size: "medium",
          gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
          content: {
            value: "8,240",
            description: "活跃用户"
          }
        },
        {
          title: "订单数量",
          size: "medium",
          gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
          content: {
            value: "1,024",
            description: "本周订单"
          }
        },
        {
          title: "系统状态",
          size: "small",
          gradient: "linear-gradient(135deg, #fa709a, #fee140)",
          content: {
            value: "正常",
            description: "所有系统运行正常"
          },
          footer: "最后更新: 10分钟前"
        }
      ]
    },
    
    // 添加一个新的示例 - 极简配置，智能默认值
    minimalConfigExample: {
      _type: "unifiedLayout",
      title: "极简配置示例",
      description: "约定大于配置，减少认知负担",
      config: {
        glass: true,
        texture: true
      },
      items: [
        {
          title: "自动检测布局",
          content: "系统会根据数据结构自动选择最合适的布局类型，无需显式配置"
        },
        {
          title: "智能默认值",
          content: "大多数配置项都有合理的默认值，只需关注业务数据"
        },
        {
          title: "渐变与动效",
          gradient: true,
          content: "内置多种视觉效果，一行代码即可启用"
        }
      ]
    },
    
    // 添加一个新的示例 - 智能卡片示例
    smartCardExamples: {
      _type: "unifiedLayout",
      title: "智能卡片示例",
      description: "约定大于配置的智能卡片，根据数据结构自动选择最合适的展示方式",
      config: {
        glass: true
      },
      items: [
        {
          title: "基础卡片",
          content: {
            _type: "smartCard",
            title: "智能检测类型",
            content: "这是一个基础卡片，系统会根据数据结构自动检测为basic类型"
          }
        },
        {
          title: "统计卡片",
          content: {
            _type: "smartCard",
            title: "月度销售额",
            content: {
              value: "¥128,430",
              description: "比上月增长 12.5%"
            }
            // 无需指定variant，系统会自动检测为stat类型
          }
        },
        {
          title: "媒体卡片",
          content: {
            _type: "smartCard",
            title: "自然风景",
            subtitle: "美丽的山水画卷",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            content: "系统检测到image属性，自动选择media类型展示"
            // 无需指定variant，系统会自动检测为media类型
          }
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
              { text: "删除", variant: "destructive" }
            ]
            // 无需指定variant，系统会自动检测为action类型
          }
        },
        {
          title: "信息卡片",
          content: {
            _type: "smartCard",
            title: "系统通知",
            icon: "📢",
            content: "您的系统已经更新到最新版本",
            footer: "2023-06-15 10:30"
            // 无需指定variant，系统会自动检测为info类型
          }
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
            footer: "自定义样式示例"
          }
        }
      ]
    }
  };

  // State for controlling which example set to display
  const [currentExample, setCurrentExample] = useState('basic')
  const [showConventionInfo, setShowConventionInfo] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Get the current data set based on active example
  const getCurrentData = () => {
    switch(currentExample) {
      case 'nested': return advancedExamples
      case 'array': return arrayExamples
      case 'grid': return gridLayoutExamples
      case 'unified': return {
        title: "统一布局系统示例",
        description: "简化的布局系统，自动检测布局类型，减少配置复杂度",
        unifiedGrid: gridLayoutExamples.unifiedLayoutExample,
        unifiedAreas: gridLayoutExamples.unifiedAreasExample,
        unifiedDashboard: gridLayoutExamples.unifiedDashboardExample,
        minimalConfig: gridLayoutExamples.minimalConfigExample,
        smartCards: gridLayoutExamples.smartCardExamples
      }
      case 'basic':
      default: return basicExamples
    }
  }

  return (
    <div className="max-w-[1200px] w-[95%] mx-auto p-6 bg-background text-foreground rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-semibold">Smart JSON Component Renderer</h1>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="btn btn-outline"
          aria-label={darkMode ? "切换到亮色模式" : "切换到暗色模式"}
        >
          {darkMode ? '🌞' : '🌙'}
        </button>
      </div>
      <p className="mb-6">This system intelligently matches components based on data patterns or explicit type declarations.</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <button 
          onClick={() => setCurrentExample('basic')}
          className={`btn ${currentExample === 'basic' ? 'btn-primary' : ''}`}
        >
          基础示例
        </button>
        <button 
          onClick={() => setCurrentExample('nested')}
          className={`btn ${currentExample === 'nested' ? 'btn-primary' : ''}`}
        >
          嵌套示例
        </button>
        <button 
          onClick={() => setCurrentExample('array')}
          className={`btn ${currentExample === 'array' ? 'btn-primary' : ''}`}
        >
          数组示例
        </button>
        <button 
          onClick={() => setCurrentExample('grid')}
          className={`btn ${currentExample === 'grid' ? 'btn-primary' : ''}`}
        >
          网格布局示例
        </button>
        <button 
          onClick={() => setCurrentExample('unified')}
          className={`btn ${currentExample === 'unified' ? 'btn-primary' : ''}`}
        >
          统一布局系统
        </button>
        <button 
          onClick={() => setShowConventionInfo(!showConventionInfo)}
          className="btn btn-secondary"
        >
          {showConventionInfo ? '隐藏设计理念' : '显示设计理念'}
        </button>
      </div>
      
      {showConventionInfo && (
        <div className="card p-6 mb-6 bg-muted/30">
          <h2 className="text-xl font-bold mb-3">约定大于配置的设计理念</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>减少配置复杂度</strong> - 通过智能默认值和自动检测，减少显式配置的需求</li>
            <li><strong>降低认知负担</strong> - 开发者只需关注业务数据，而非布局细节</li>
            <li><strong>提高开发效率</strong> - 更少的代码，更快的开发速度</li>
            <li><strong>保持灵活性</strong> - 需要时仍可进行细粒度控制</li>
          </ul>
          <p className="text-muted-foreground">这种设计理念让我们能够用更少的代码实现更丰富的功能，同时保持代码的可维护性。</p>
        </div>
      )}
      
      {currentExample === 'grid' ? (
        <div className="card p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">高级网格布局</h2>
          <JSONBlock data={gridLayoutExamples} />
        </div>
      ) : (
        <div className="card p-6 mb-6">
          <JSONBlock data={getCurrentData()} />
        </div>
      )}
      
      <div className="card bg-muted p-6 rounded">
        <h3 className="text-lg font-bold mb-2">使用方法：</h3>
        <pre className="bg-card p-4 rounded mb-4 text-sm font-mono">{`<JSONBlock data={yourJsonData} />`}</pre>
        <p className="mb-4">系统会根据数据结构或显式类型声明自动渲染适当的组件。</p>
        
        <h4 className="text-md font-semibold mb-2">约定大于配置的示例：</h4>
        <pre className="bg-card p-4 rounded mb-2 text-sm font-mono">{`// 极简配置，系统会自动检测布局类型
{
  _type: "unifiedLayout",
  title: "仪表盘",
  items: [
    { title: "销售额", content: { value: "¥128,430" } },
    { title: "用户数", content: { value: "8,240" } }
  ]
}`}</pre>
        <p className="text-muted-foreground text-sm">无需指定布局类型、列数等配置，系统会根据数据结构自动选择最合适的布局。</p>
      </div>
    </div>
  )
}

export default App
