import React, { useState, lazy } from 'react';
import SmartCard from './SmartCard';

/**
 * UnifiedLayout - 约定大于配置的布局系统
 * 通过减少配置选项和增加智能默认值来降低认知负担
 */
const UnifiedLayout = ({ data }) => {
  // 智能提取数据，提供合理默认值
  const { items = [], title, description } = data;
  
  // 自动检测布局类型，减少显式配置
  const type = data.config?.type || detectLayoutType(items);
  const responsive = data.config?.responsive !== false;
  const animation = data.config?.animation !== false;
  
  // 简化配置，使用更少的选项
  const config = {
    columns: data.config?.columns || Math.min(4, items.length || 3),
    gap: data.config?.gap || '1rem',
    areas: data.config?.areas || [],
  };
  
  // 响应式状态
  const [isResponsive, setIsResponsive] = useState(responsive);
  
  // 生成容器样式
  const containerStyle = {
    gap: config.gap,
    ...(type === 'areas' ? {
      gridTemplateAreas: isResponsive ? 'none' : config.areas.map(row => `"${row.join(' ')}"`).join(' '),
      gridTemplateColumns: isResponsive ? '1fr' : `repeat(${config.areas[0]?.length || config.columns}, 1fr)`,
    } : type === 'dashboard' ? {
      gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
    } : {
      gridTemplateColumns: isResponsive 
        ? `repeat(auto-fit, minmax(${Math.floor(100/config.columns)}%, 1fr))` 
        : `repeat(${config.columns}, 1fr)`,
    })
  };
  
  return (
    <div className={`unified-layout ${type === 'areas' ? 'areas-layout' : type === 'dashboard' ? 'dashboard-layout' : 'grid-layout'} ${data.config?.glass ? 'card-glass' : ''} ${data.config?.texture ? 'bg-texture' : ''}`}>
      {/* 标题区域 */}
      {(title || description) && (
        <div className="flex justify-between items-center mb-4">
          <div>
            {title && <h3 className="layout-title">{title}</h3>}
            {description && <p className="layout-description">{description}</p>}
          </div>
          
          {/* 仅在网格和区域布局中显示响应式切换 */}
          {(type === 'grid' || type === 'areas') && (
            <button 
              onClick={() => setIsResponsive(!isResponsive)}
              className={`btn ${isResponsive ? 'btn-primary' : ''}`}
            >
              {isResponsive ? '固定布局' : '响应式'}
            </button>
          )}
        </div>
      )}
      
      {/* 主布局容器 */}
      <div className="layout-container" style={containerStyle}>
        {items.length > 0 ? renderItems(items, type, isResponsive, config) : (
          <div className="empty-state">暂无内容</div>
        )}
      </div>
      
      {/* 区域模板展示 */}
      {type === 'areas' && config.areas.length > 0 && (
        <div className="areas-template">
          <details>
            <summary className="areas-summary">查看网格区域模板</summary>
            <pre className="areas-code">
              {config.areas.map(row => row.join(' ')).join('\n')}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

// 根据项目自动检测布局类型
function detectLayoutType(items) {
  if (!items || items.length === 0) return 'grid';
  
  // 检查是否有区域属性（用于区域布局）
  const hasAreas = items.some(item => item.area);
  if (hasAreas) return 'areas';
  
  // 检查是否有大小属性（用于仪表盘布局）
  const hasSizes = items.some(item => item.size);
  if (hasSizes) return 'dashboard';
  
  // 默认为网格
  return 'grid';
}

// 根据布局类型渲染项目
function renderItems(items, type, isResponsive, config) {
  if (type === 'areas') {
    return renderAreasItems(items, isResponsive, config.areas);
  } else if (type === 'dashboard') {
    return renderDashboardItems(items);
  } else {
    return renderGridItems(items);
  }
}

// 渲染网格项目
function renderGridItems(items) {
  return items.map((item, index) => {
    // 提取项目属性
    const { 
      content, 
      colSpan = 1, 
      rowSpan = 1, 
      background,
      color,
      icon,
      gradient,
    } = item;
    
    // 项目样式
    const itemStyle = {
      gridColumn: `span ${colSpan}`,
      gridRow: `span ${rowSpan}`,
      background: gradient ? 
        (gradient === true ? 'var(--gradient-primary)' : gradient) : 
        background,
      color,
    };
    
    return (
      <div 
        key={index} 
        className="item"
        style={itemStyle}
      >
        {icon && <div className="item-icon">{icon}</div>}
        {renderContent(content)}
      </div>
    );
  });
}

// 渲染区域项目
function renderAreasItems(items, isResponsive, areas) {
  // 创建按区域名称的项目映射
  const itemsByArea = {};
  items.forEach(item => {
    if (item.area) {
      itemsByArea[item.area] = item;
    }
  });
  
  // 查找所有唯一的区域名称
  const allAreas = new Set();
  areas.forEach(row => {
    row.forEach(area => {
      if (area !== '.') {
        allAreas.add(area);
      }
    });
  });
  
  return Array.from(allAreas).map(areaName => {
    const item = itemsByArea[areaName] || { content: areaName };
    const { content, background, color, gradient } = item;
    
    // 项目样式
    const itemStyle = {
      gridArea: isResponsive ? 'auto' : areaName,
      background: gradient ? 
        (gradient === true ? 'var(--gradient-primary)' : gradient) : 
        background,
      color,
      marginBottom: isResponsive ? '1rem' : 0,
    };
    
    return (
      <div 
        key={areaName} 
        className="area-item"
        style={itemStyle}
      >
        <div className="area-badge">{areaName}</div>
        {renderContent(content)}
      </div>
    );
  });
}

// 渲染仪表盘项目
function renderDashboardItems(items) {
  // 大小映射
  const sizeMap = {
    small: 1,
    medium: 2,
    large: 3,
    xlarge: 4,
  };
  
  return items.map((item, index) => {
    const { 
      title, 
      content, 
      size = 'medium',
      headerBackground,
      background,
      color,
      footer,
      gradient,
    } = item;
    
    // 根据大小计算跨度
    const span = sizeMap[size] || 1;
    
    // 项目样式
    const itemStyle = {
      gridColumn: `span ${span}`,
      background: gradient ? 
        (gradient === true ? 'var(--gradient-primary)' : gradient) : 
        background,
      color,
    };
    
    const headerStyle = {
      background: headerBackground,
    };
    
    return (
      <div 
        key={index} 
        className={`dashboard-item size-${size}`}
        style={itemStyle}
      >
        <div className="dashboard-header" style={headerStyle}>
          <h3>{title || `项目 ${index + 1}`}</h3>
        </div>
        
        <div className="dashboard-content">
          {renderContent(content)}
        </div>
        
        {footer && (
          <div className="dashboard-footer">
            {footer}
          </div>
        )}
      </div>
    );
  });
}

// 渲染内容
function renderContent(content) {
  if (!content) return null;
  
  // 处理字符串内容
  if (typeof content === 'string') {
    return <div>{content}</div>;
  }
  
  // 处理带有 _type 属性的内容对象（如 SmartCard）
  if (typeof content === 'object' && '_type' in content) {
    // 根据类型渲染不同的组件
    switch(content._type) {
      case 'smartCard':
        return <SmartCard data={content} />;
      default:
        // 对于其他类型，使用默认渲染
        return (
          <div className="item-content">
            {content.title && <h4 className="text-lg font-semibold mb-2">{content.title}</h4>}
            {content.description && <p className="text-muted-foreground mb-3">{content.description}</p>}
            {content.value && <div className="item-value">{content.value}</div>}
            {content.chart && <div className="item-chart">{content.chart}</div>}
          </div>
        );
    }
  }
  
  // 默认渲染
  return (
    <div className="item-content">
      {content.title && <h4 className="text-lg font-semibold mb-2">{content.title}</h4>}
      {content.description && <p className="text-muted-foreground mb-3">{content.description}</p>}
      {content.value && <div className="item-value">{content.value}</div>}
      {content.chart && <div className="item-chart">{content.chart}</div>}
    </div>
  );
}

export default UnifiedLayout; 