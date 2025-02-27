import React from "react"
import { useState, useEffect } from 'react'
import JSONBlock from './components/JSONBlock'
import './App.css'

function App() {
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


  // Advanced grid layout examples
  const gridLayoutExamples = {
    title: "Advanced Grid Layout Examples",
    description: "These examples demonstrate more complex grid layouts with CSS Grid",
    
    // SmartLayout - 智能布局系统
    smartLayoutExamples: {
      _type: "smartLayout",
      title: "智能布局系统",
      description: "一个布局组件解决所有布局需求，自动检测最合适的布局类型",
      items: [
        {
          title: "自动布局检测",
          content: "SmartLayout 会根据内容结构自动选择最合适的布局类型，无需显式配置"
        },
        {
          title: "内容感知",
          content: "根据内容类型和数量动态调整布局，提供最佳展示效果"
        },
        {
          title: "上下文适应",
          content: "根据设备、屏幕尺寸和用户偏好自动调整布局，实现真正的响应式设计"
        },
        {
          title: "统一API",
          content: "将多种布局模式整合为一个简单的API，减少学习成本"
        },
        {
          title: "渐进增强",
          content: "基本配置即可工作，高级配置可选，满足不同复杂度的需求"
        },
        {
          title: "约定大于配置",
          gradient: true,
          content: "通过智能默认值和自动检测，减少90%的配置代码"
        }
      ],
      config: {
        debug: false
      }
    },
    
    
    // SmartLayout - 区域布局示例
    smartAreasExample: {
      _type: "smartLayout",
      title: "智能区域布局",
      description: "自动检测为区域布局，根据区域名称组织内容",
      items: [
        {
          area: "header",
          title: "页面头部",
          content: "这是页面的头部区域，通常包含标题、导航等内容"
        },
        {
          area: "sidebar",
          title: "侧边栏",
          content: "这是侧边栏区域，通常包含导航、筛选器等内容"
        },
        {
          area: "main",
          title: "主要内容",
          content: "这是主要内容区域，展示核心信息"
        },
        {
          area: "footer",
          title: "页面底部",
          content: "这是页面底部区域，通常包含版权信息、链接等"
        }
      ],
      config: {
        areas: [
          ["header", "header", "header"],
          ["sidebar", "main", "main"],
          ["footer", "footer", "footer"]
        ],
        gap: "1rem"
      }
    },
    
    // SmartLayout - 时间线布局示例
    smartTimelineExample: {
      _type: "smartLayout",
      title: "智能时间线布局",
      description: "自动检测为时间线布局，展示时间序列数据",
      items: [
        {
          title: "项目启动",
          date: "2023-01-15",
          content: "项目正式启动，确定了核心功能和开发计划"
        },
        {
          title: "设计阶段",
          date: "2023-02-20",
          content: "完成产品设计和用户界面设计，准备进入开发阶段"
        },
        {
          title: "开发阶段",
          date: "2023-03-10",
          content: "开始核心功能开发，团队协作进行前后端实现"
        },
        {
          title: "测试阶段",
          date: "2023-04-05",
          content: "进行功能测试和性能优化，修复发现的问题"
        },
        {
          title: "发布上线",
          date: "2023-05-01",
          content: "产品正式发布上线，开始收集用户反馈"
        }
      ],
      config: {
        shadow: "large"
      }
    },
    
    // SmartLayout - 画廊布局示例
    smartGalleryExample: {
      _type: "smartLayout",
      title: "智能画廊布局",
      description: "自动检测为画廊布局，优化图片展示",
      items: [
        {
          title: "自然风景",
          content: {
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            caption: "壮丽的山川"
          }
        },
        {
          title: "城市风光",
          content: {
            image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            caption: "繁华的都市"
          }
        },
        {
          title: "海洋世界",
          content: {
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            caption: "宁静的海滩"
          }
        },
        {
          title: "动物王国",
          content: {
            image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            caption: "可爱的动物"
          }
        },
        {
          title: "植物世界",
          content: {
            image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            caption: "绚丽的花朵"
          }
        },
        {
          title: "美食佳肴",
          content: {
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            caption: "美味的食物"
          }
        }
      ],
      config: {
        columns: 3,
        aspectRatio: "4/3",
        gap: "0.5rem"
      }
    },
    
    // SmartLayout - 仪表盘布局示例
    smartDashboardExample: {
      _type: "smartLayout",
      title: "智能仪表盘布局",
      description: "自动检测为仪表盘布局，优化数据展示",
      items: [
        {
          title: "总销售额",
          size: "large",
          gradient: true,
          content: {
            value: "¥1,234,567",
            description: "同比增长 12.5%"
          }
        },
        {
          title: "用户数量",
          size: "medium",
          content: {
            value: "87,432",
            description: "活跃用户"
          }
        },
        {
          title: "订单数量",
          size: "medium",
          content: {
            value: "6,789",
            description: "本月订单"
          }
        },
        {
          title: "客户满意度",
          size: "small",
          gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
          content: {
            value: "4.8/5.0",
            description: "基于 1,234 条评价"
          }
        },
        {
          title: "系统状态",
          size: "small",
          gradient: "linear-gradient(135deg, #fa709a, #fee140)",
          content: {
            value: "正常",
            description: "所有服务运行正常"
          }
        }
      ],
      config: {
        glass: true,
        shadow: "large",
        rounded: "large"
      }
    },
    
    // 添加一个新的示例 - 极简配置，智能默认值
    minimalConfigExample: {
      _type: "smartLayout",
      title: "最小配置示例",
      description: "使用智能默认值，只需提供必要数据",
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
      _type: "smartLayout",
      title: "约定优于配置示例",
      description: "通过数据结构自动推断布局类型和配置",
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
    },
    
    // 新增：约定大于配置的极简示例
    conventionOverConfigExample: {
      _type: "smartLayout",
      title: "约定大于配置的极简示例",
      description: "只需提供数据，系统自动推断最佳布局",
      items: [
        // 系统会自动检测为仪表盘项目
        {
          title: "销售额",
          content: { value: "¥1,234,567" }
        },
        // 系统会自动检测为图表项目
        {
          title: "趋势图",
          content: {
            type: "line",
            data: [10, 25, 30, 45, 60, 75]
          }
        },
        // 系统会自动检测为图片项目
        {
          title: "产品展示",
          content: {
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          }
        }
      ]
      // 无需任何配置，系统会自动推断：
      // 1. 布局类型（网格）
      // 2. 列数（基于屏幕尺寸和项目数量）
      // 3. 间距（基于项目数量）
      // 4. 主题（基于系统偏好）
      // 5. 视觉效果（基于内容类型）
    },
    
    // 新增：数据驱动的布局示例
    dataFirstExample: {
      _type: "smartLayout",
      title: "数据驱动布局",
      description: "系统根据数据结构自动推断最佳展示方式",
      items: [
        // 步骤1、2、3 - 系统会自动检测为流程布局
        { title: "步骤 1", content: "定义问题" },
        { title: "步骤 2", content: "分析数据" },
        { title: "步骤 3", content: "得出结论" }
      ]
      // 系统会自动检测为流程布局，并应用适当的视觉样式
    }
  };

  // State for controlling which example set to display
  const [currentExample, setCurrentExample] = useState('nested')
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
      case 'smart': return gridLayoutExamples
      default: return advancedExamples
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
          onClick={() => setCurrentExample('smart')}
          className={`btn ${currentExample === 'smart' ? 'btn-primary' : ''}`}
        >
          智能布局系统
        </button>
        <button 
          onClick={() => setCurrentExample('convention')}
          className={`btn ${currentExample === 'convention' ? 'btn-primary' : ''} btn-accent`}
        >
          约定大于配置
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
          <p className="text-muted-foreground mb-4">这种设计理念让我们能够用更少的代码实现更丰富的功能，同时保持代码的可维护性。</p>
          
          <h3 className="text-lg font-bold mb-2">实现方式：</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>智能默认值</strong> - 每个配置项都有经过精心设计的默认值，适用于大多数场景</li>
            <li><strong>自动类型检测</strong> - 根据数据结构自动推断最合适的组件类型</li>
            <li><strong>内容感知</strong> - 分析内容特征，自动选择最佳展示方式</li>
            <li><strong>上下文适应</strong> - 根据设备、屏幕尺寸和用户偏好自动调整</li>
            <li><strong>渐进增强</strong> - 基本配置即可工作，高级配置可选</li>
          </ul>
          
          <div className="bg-card p-4 rounded-lg border border-border mt-4">
            <h4 className="font-semibold mb-2">代码示例对比：</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium mb-1">传统配置方式：</h5>
                <pre className="bg-muted p-3 rounded text-xs font-mono overflow-auto">{`{
  type: "grid",
  columns: 3,
  gap: "1rem",
  padding: "1rem",
  items: [
    { 
      title: "项目1",
      content: "内容1",
      colSpan: 1,
      rowSpan: 1
    },
    // 更多项目...
  ],
  theme: "light",
  shadow: "medium",
  rounded: "medium",
  animation: "subtle",
  // 更多配置...
}`}</pre>
              </div>
              <div>
                <h5 className="text-sm font-medium mb-1">约定大于配置：</h5>
                <pre className="bg-muted p-3 rounded text-xs font-mono overflow-auto">{`{
  items: [
    { 
      title: "项目1",
      content: "内容1"
    },
    // 更多项目...
  ]
  // 其他配置自动推断
}`}</pre>
              </div>
            </div>
          </div>
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
  _type: "smartLayout",
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
