import React from 'react'
import UserCard from './patterns/UserCard'
import StatsList from './patterns/StatsList'
import Chart from './patterns/Chart'
import ItemTable from './patterns/ItemTable'
import ActionButtons from './patterns/ActionButtons'
import ProgressBar from './patterns/ProgressBar'
import LocationMap from './patterns/LocationMap'
import GenericDisplay from './patterns/GenericDisplay'
import ArrayRenderer from './patterns/ArrayRenderer'
import GridLayout from './patterns/GridLayout'
import AdvancedGridLayout from './patterns/AdvancedGridLayout'
import DashboardLayout from './patterns/DashboardLayout'
import UnifiedLayout from './patterns/UnifiedLayout'
import SmartCard from './patterns/SmartCard'

/**
 * 组件注册表 - 将类型名称映射到组件
 * 约定大于配置：通过统一的注册机制减少重复代码
 */
const componentMap = {
  userCard: UserCard,
  statsList: StatsList,
  chart: Chart,
  itemTable: ItemTable,
  actionButtons: ActionButtons,
  progressBar: ProgressBar,
  locationMap: LocationMap,
  array: ArrayRenderer,  // 用于显式 _type: "array" 声明
  gridLayout: GridLayout,
  advancedGridLayout: AdvancedGridLayout,
  dashboardLayout: DashboardLayout,
  unifiedLayout: UnifiedLayout,  // 统一布局组件
  smartCard: SmartCard  // 智能卡片组件
}

/**
 * 模式匹配器 - 用于向后兼容和自动检测
 * 约定大于配置：通过数据结构自动推断组件类型
 */
const patternMatchers = [
  {
    type: 'userCard',
    matcher: (data) => 
      typeof data === 'object' && 
      data !== null && 
      'name' in data && 
      'avatar' in data
  },
  {
    type: 'statsList',
    matcher: (data) => 
      Array.isArray(data) && 
      data.length > 0 && 
      data.every(item => 
        typeof item === 'object' && 
        item !== null && 
        'label' in item && 
        'value' in item
      )
  },
  {
    type: 'chart',
    matcher: (data) => 
      typeof data === 'object' && 
      data !== null && 
      'type' in data && 
      'data' in data && 
      Array.isArray(data.data)
  },
  {
    type: 'itemTable',
    matcher: (data) => 
      Array.isArray(data) && 
      data.length > 0 && 
      data.every(item => 
        typeof item === 'object' && 
        item !== null && 
        'id' in item && 
        'name' in item
      )
  },
  {
    type: 'actionButtons',
    matcher: (data) => 
      Array.isArray(data) && 
      data.length > 0 && 
      data.every(item => 
        typeof item === 'object' && 
        item !== null && 
        'text' in item && 
        'type' in item
      )
  },
  {
    type: 'progressBar',
    matcher: (data) => 
      typeof data === 'object' && 
      data !== null && 
      'current' in data && 
      'total' in data
  },
  {
    type: 'locationMap',
    matcher: (data) => 
      typeof data === 'object' && 
      data !== null && 
      'lat' in data && 
      'lng' in data
  },
  {
    type: 'array',
    matcher: (data) => Array.isArray(data)
  }
]

/**
 * 根据数据查找适当的组件
 * 约定大于配置：优先使用显式类型，其次使用模式匹配
 */
const resolveComponent = (data, key) => {
  // 约定优于配置：首先检查 _type 字段
  if (data && typeof data === 'object' && !Array.isArray(data) && '_type' in data) {
    const requestedType = data._type;
    return componentMap[requestedType] || GenericDisplay;
  }
  
  // 向后兼容：使用模式匹配
  for (const { type, matcher } of patternMatchers) {
    if (matcher(data)) {
      return componentMap[type] || GenericDisplay;
    }
  }
  
  return GenericDisplay;
}

/**
 * 在传递给组件之前处理数据
 * 约定大于配置：智能处理不同数据结构
 */
const processComponentData = (data, componentType) => {
  // 对于图表组件，我们需要传递整个对象
  if (componentType === 'chart') {
    return data;
  }
  
  // 对于期望数组的其他组件，提取数据数组
  // 这对于使用 _type 包装数组的组件很有用
  if (data && typeof data === 'object' && !Array.isArray(data) && '_type' in data && 'data' in data && Array.isArray(data.data)) {
    return data.data;
  }
  
  return data;
}

/**
 * JSONBlock - 智能JSON渲染组件
 * 约定大于配置：通过数据结构自动选择合适的组件和布局
 */
const JSONBlock = ({ data, layout = 'list', columns = 2 }) => {
  if (!data || typeof data !== 'object') {
    return <div className="empty-state">无效数据</div>
  }

  // 处理顶层数组
  if (Array.isArray(data)) {
    return <ArrayRenderer data={data} name="数组数据" />
  }

  // 过滤掉 _type 字段和其他元数据字段
  const entries = Object.entries(data).filter(([key]) => 
    key !== '_type' && key !== '_layout' && key !== '_columns'
  );

  // 检查数据中是否指定了布局
  const dataLayout = data._layout || layout;
  const dataColumns = data._columns || columns;

  // 网格布局样式
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${dataColumns}, 1fr)`,
    gap: '1rem',
    gridAutoRows: 'minmax(100px, auto)'
  };

  // 列表布局样式
  const listStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  // 如果没有数据，显示空状态
  if (entries.length === 0) {
    return <div className="empty-state">暂无数据</div>
  }

  return (
    <div 
      className={`json-block json-block-${dataLayout} animate-fade-in`}
      style={dataLayout === 'grid' ? gridStyles : listStyles}
    >
      {entries.map(([key, value]) => {
        const Component = resolveComponent(value, key);
        
        // 确定组件类型
        let componentType = null;
        if (value && typeof value === 'object' && !Array.isArray(value) && '_type' in value) {
          componentType = value._type;
        } else {
          // 尝试查找匹配的模式
          for (const { type, matcher } of patternMatchers) {
            if (matcher(value)) {
              componentType = type;
              break;
            }
          }
        }
        
        const processedData = processComponentData(value, componentType);
        
        // 确定此组件是否应跨越多个列
        const span = (value && typeof value === 'object' && !Array.isArray(value) && '_span' in value) 
          ? value._span 
          : 1;
        
        // 组件包装器样式
        const wrapperStyles = {
          gridColumn: dataLayout === 'grid' && span > 1 ? `span ${Math.min(span, dataColumns)}` : undefined,
        };
        
        return (
          <div 
            key={key} 
            className={`component-wrapper component-type-${componentType || 'unknown'} animate-slide-up`}
            style={wrapperStyles}
          >
            <Component data={processedData} name={key} />
          </div>
        )
      })}
    </div>
  )
}

export default JSONBlock
