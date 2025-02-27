import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import JSONBlock from '../JSONBlock';
import { detectContentType, isCustomContent } from '../../utils/contentTypes';

/**
 * 安全的JSON.stringify，处理循环引用
 */
function safeStringify(obj, indent = 0) {
  const cache = new Set();
  
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        return '[循环引用]';
      }
      cache.add(value);
    }
    return value;
  }, indent);
}

/**
 * SmartLayout - 智能布局系统
 * 
 * 创新点：
 * 1. 自动布局检测 - 根据内容结构自动选择最合适的布局类型
 * 2. 内容感知 - 根据内容类型和数量动态调整布局
 * 3. 上下文适应 - 根据设备、屏幕尺寸和用户偏好调整布局
 * 4. 统一API - 将多种布局模式整合为一个简单的API
 * 5. 渐进增强 - 基本配置即可工作，高级配置可选
 * 
 * 约定大于配置：通过智能默认值和自动检测，减少90%的配置代码
 */
const SmartLayout = ({ data, name }) => {
  // 状态管理 - 确保在函数开始时定义状态
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 提取基本属性
  const {
    title,
    description,
    items = [],
    config = {},
    _type, // 忽略，由JSONBlock处理
    ...restProps
  } = data;

  // 计算最佳列数
  function calculateOptimalColumns(itemCount) {
    // 显式指定的列数优先
    if (config.columns && config.columns !== 'auto') {
      return typeof config.columns === 'number' ? config.columns : parseInt(config.columns, 10);
    }
    
    // 根据项目数量和窗口宽度计算最佳列数
    const width = windowSize.width;
    
    if (width < 600) return 1;  // 移动设备单列
    if (width < 900) return Math.min(2, itemCount); // 平板最多2列
    if (width < 1200) return Math.min(3, itemCount); // 小桌面最多3列
    return Math.min(4, itemCount); // 大桌面最多4列
  }

  // 智能默认配置 - 约定大于配置的核心
  const {
    // 布局配置
    layoutType = detectLayoutType(items),
    columns = calculateOptimalColumns(items.length),
    gap = detectOptimalGap(items),
    padding = detectOptimalPadding(items),
    
    // 视觉效果
    theme = 'system',
    glass = shouldUseGlass(items),
    bordered = true,
    shadow = detectShadowLevel(items),
    rounded = 'medium',
    animation = detectAnimationLevel(items),
    
    // 内容配置
    contentAlign = detectContentAlignment(items),
    textAlign = detectTextAlignment(items),
    
    // 交互配置
    interactive = true,
    hoverEffect = detectHoverEffect(items),
    
    // 自定义样式
    customStyles = {},
    
    // 调试模式
    debug = false,
    
    ...restConfig
  } = config;

  // 智能布局类型检测 - 增强版
  function detectLayoutType(items) {
    // 显式指定的布局类型优先
    if (config.layoutType && config.layoutType !== 'auto') {
      return config.layoutType;
    }
    
    // 1. 检查项目数量
    if (items.length <= 2) {
      return 'list'; // 项目少时使用列表布局
    }
    
    // 2. 检查内容类型
    const contentTypes = items.map(item => item.contentType || detectContentType(item.content));
    
    // 如果主要是媒体内容，使用网格布局
    const mediaCount = contentTypes.filter(type => type === 'media').length;
    if (mediaCount > items.length * 0.4) {
      return 'grid';
    }
    
    // 如果主要是统计内容，使用网格布局
    const statCount = contentTypes.filter(type => type === 'stat').length;
    if (statCount > items.length * 0.4) {
      return 'grid';
    }
    
    // 如果有复杂内容（图表、表格等），使用列表布局
    const hasComplexContent = items.some(item => 
      isCustomContent(item.content) && 
      ['chart', 'itemTable', 'locationMap'].includes(item.content._type)
    );
    
    if (hasComplexContent) {
      return 'list';
    }
    
    // 检查是否有大量文本内容
    const hasLongText = items.some(item => 
      typeof item.content === 'string' && item.content.length > 100
    );
    
    if (hasLongText) {
      return 'list';
    }
    
    // 默认使用网格布局
    return items.length > 4 ? 'grid' : 'list';
  }
  
  // 自动检测是否应该使用玻璃效果
  function shouldUseGlass(items) {
    // 显式指定的玻璃效果优先
    if ('glass' in config) {
      return config.glass;
    }
    
    // 如果有渐变背景的项目，玻璃效果会更好看
    const hasGradients = items.some(item => item.gradient);
    
    // 如果有图片背景，玻璃效果会更好看
    const hasImages = items.some(item => 
      item.content && 
      typeof item.content === 'object' && 
      'image' in item.content
    );
    
    return hasGradients || hasImages;
  }
  
  // 自动检测阴影级别
  function detectShadowLevel(items) {
    // 显式指定的阴影级别优先
    if (config.shadow) {
      return config.shadow;
    }
    
    // 如果有很多项目，使用较小的阴影避免视觉混乱
    if (items.length > 10) return 'small';
    
    // 如果有渐变或玻璃效果，中等阴影效果好
    if (items.some(item => item.gradient) || shouldUseGlass(items)) {
      return 'medium';
    }
    
    // 如果项目较少，可以使用较大阴影增强层次感
    if (items.length <= 4) return 'large';
    
    return 'medium';
  }
  
  // 自动检测动画级别
  function detectAnimationLevel(items) {
    // 显式指定的动画级别优先
    if (config.animation) {
      return config.animation;
    }
    
    // 如果有很多项目，使用较少的动画避免干扰
    if (items.length > 12) return 'none';
    
    // 如果有动态卡片，使用较少的动画避免冲突
    if (items.some(item => 
      item.content && 
      typeof item.content === 'object' && 
      isCustomContent(item.content) &&
      ['chart', 'progressBar'].includes(item.content._type)
    )) {
      return 'subtle';
    }
    
    return 'moderate';
  }
  
  // 自动检测最佳间距
  function detectOptimalGap(items) {
    // 显式指定的间距优先
    if (config.gap) {
      return config.gap;
    }
    
    // 项目多时使用较小间距
    if (items.length > 12) return '0.5rem';
    
    // 项目适中时使用中等间距
    if (items.length > 6) return '1rem';
    
    // 项目少时可以使用较大间距
    return '1.5rem';
  }
  
  // 自动检测最佳内边距
  function detectOptimalPadding(items) {
    // 显式指定的内边距优先
    if (config.padding) {
      return config.padding;
    }
    
    // 根据内容复杂度决定内边距
    const hasComplexContent = items.some(item => 
      item.content && 
      typeof item.content === 'object' && 
      isCustomContent(item.content) &&
      ['chart', 'itemTable'].includes(item.content._type)
    );
    
    return hasComplexContent ? '1.5rem' : '1rem';
  }
  
  // 自动检测内容对齐方式
  function detectContentAlignment(items) {
    // 显式指定的内容对齐方式优先
    if (config.contentAlign) {
      return config.contentAlign;
    }
    
    // 检查是否有统计类内容，统计类通常居中对齐更好看
    const hasStats = items.some(item => 
      item.content && 
      typeof item.content === 'object' && 
      'value' in item.content
    );
    
    if (hasStats) return 'center';
    
    // 默认左对齐
    return 'start';
  }
  
  // 自动检测文本对齐方式
  function detectTextAlignment(items) {
    // 显式指定的文本对齐方式优先
    if (config.textAlign) {
      return config.textAlign;
    }
    
    // 检查是否主要是短文本
    const isMainlyShortText = items.every(item => 
      typeof item.content === 'string' && 
      item.content.length < 100
    );
    
    // 短文本居中更好看
    if (isMainlyShortText) return 'center';
    
    // 默认左对齐
    return 'left';
  }
  
  // 自动检测悬停效果
  function detectHoverEffect(items) {
    // 显式指定的悬停效果优先
    if (config.hoverEffect) {
      return config.hoverEffect;
    }
    
    // 如果有链接或操作，使用明显的悬停效果
    const hasActions = items.some(item => item.actions || item.onClick || item.link);
    
    if (hasActions) return 'lift';
    
    // 默认使用微妙的效果
    return 'subtle';
  }

  // 生成容器样式
  const containerStyles = {
    display: layoutType === 'grid' ? 'grid' : 'flex',
    gridTemplateColumns: layoutType === 'grid' ? `repeat(${columns}, 1fr)` : undefined,
    flexDirection: layoutType === 'list' ? 'column' : undefined,
    gap,
    padding,
    borderRadius: getBorderRadius(rounded),
    boxShadow: getBoxShadow(shadow),
    background: glass ? 'rgba(255, 255, 255, 0.1)' : undefined,
    backdropFilter: glass ? 'blur(10px)' : undefined,
    border: bordered ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
    ...customStyles
  };

  // 获取边框圆角值
  function getBorderRadius(size) {
    const radiusMap = {
      none: '0',
      small: '0.25rem',
      medium: '0.5rem',
      large: '1rem'
    };
    return radiusMap[size] || radiusMap.medium;
  }
  
  // 获取阴影值
  function getBoxShadow(size) {
    const shadowMap = {
      none: 'none',
      small: '0 1px 3px rgba(0,0,0,0.1)',
      medium: '0 4px 6px rgba(0,0,0,0.1)',
      large: '0 10px 15px rgba(0,0,0,0.1)'
    };
    return shadowMap[size] || shadowMap.medium;
  }

  // 渲染布局
  return (
    <div className={`smart-layout layout-${layoutType} theme-${theme}`} style={containerStyles}>
      {title && (
        <div className="layout-header" style={{ gridColumn: '1 / -1' }}>
          <h2 className="layout-title">{title}</h2>
          {description && <p className="layout-description">{description}</p>}
        </div>
      )}
      
      {items.map((item, index) => {
        // 计算项目样式
        const itemStyles = {
          gridColumn: layoutType === 'grid' && item.span > 1 
            ? `span ${Math.min(item.span, columns)}` 
            : undefined,
          textAlign: item.textAlign || textAlign,
          animation: animation !== 'none' 
            ? `fadeIn 0.3s ease-in-out ${index * 0.05}s both` 
            : undefined,
          transition: 'all 0.2s ease-in-out',
          transform: hoverEffect === 'lift' ? 'scale(1)' : undefined,
          ':hover': {
            transform: hoverEffect === 'lift' ? 'scale(1.02)' : undefined,
            boxShadow: hoverEffect !== 'none' ? getBoxShadow('medium') : undefined
          }
        };
        
        // 渲染项目
        return (
          <div 
            key={index} 
            className={`layout-item item-${item.contentType || 'unknown'}`}
            style={itemStyles}
            onClick={item.onClick}
          >
            {item.title && <h3 className="item-title">{item.title}</h3>}
            
            <div className="item-content">
              {isCustomContent(item.content) ? (
                <JSONBlock data={item.content} />
              ) : (
                renderItemContent(item.content, item.title)
              )}
            </div>
            
            {item.actions && (
              <div className="item-actions">
                {item.actions.map((action, actionIndex) => (
                  <button 
                    key={actionIndex}
                    className={`action-button ${action.variant || 'default'}`}
                    onClick={(e) => {
                      e.stopPropagation(); // 防止触发项目的onClick
                      if (action.onClick) action.onClick(e);
                    }}
                  >
                    {action.icon && <span className="action-icon">{action.icon}</span>}
                    {action.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
      
      {debug && (
        <div className="debug-info" style={{ gridColumn: '1 / -1' }}>
          <pre>{safeStringify({ layoutType, columns, windowSize }, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

// 渲染项目内容
function renderItemContent(content, itemTitle) {
  // 处理空内容
  if (content === undefined || content === null) {
    return <div className="empty-content">无内容</div>;
  }
  
  // 检查自定义内容类型
  if (content && typeof content === 'object' && '_type' in content) {
    // 处理表格类型
    if (content._type === 'itemTable' && content.data && Array.isArray(content.data)) {
      return renderTableContent(content.data);
    }
    
    // 处理统计类型
    if (content._type === 'stat') {
      return renderStatContent(content);
    }
    
    // 处理媒体类型
    if (content._type === 'media') {
      return renderMediaContent(content, itemTitle);
    }
  }
  
  // 如果内容是字符串，直接显示
  if (typeof content === 'string') {
    return <div className="text-content">{content}</div>;
  }
  
  // 如果内容是数字，格式化显示
  if (typeof content === 'number') {
    return <div className="number-content">{content.toLocaleString()}</div>;
  }
  
  // 如果内容是布尔值，显示为是/否
  if (typeof content === 'boolean') {
    return <div className="boolean-content">{content ? '是' : '否'}</div>;
  }
  
  // 如果内容是日期，格式化显示
  if (content instanceof Date) {
    return <div className="date-content">{content.toLocaleDateString()}</div>;
  }
  
  // 如果内容是对象，检查特定结构
  if (content && typeof content === 'object') {
    // 检查是否有值字段，渲染为统计信息
    if ('value' in content) {
      return renderStatContent(content);
    }
    
    // 检查是否有图像字段，渲染为媒体
    if ('image' in content) {
      return renderMediaContent(content, itemTitle);
    }
    
    // 检查是否有项目字段（列表）
    if ('items' in content && Array.isArray(content.items)) {
      return (
        <ul className="list-content">
          {content.items.length === 0 
            ? <li className="empty-list">空列表</li>
            : content.items.map((item, i) => (
              <li key={i} className="list-item">
                {typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean'
                  ? String(item)
                  : safeStringify(item)}
              </li>
            ))
          }
        </ul>
      );
    }
    
    // 如果是数组，渲染为列表
    if (Array.isArray(content)) {
      // 空数组处理
      if (content.length === 0) {
        return <div className="empty-array">空数组</div>;
      }
      
      // 检查数组内容类型
      const allPrimitive = content.every(item => 
        typeof item === 'string' || 
        typeof item === 'number' || 
        typeof item === 'boolean'
      );
      
      // 如果数组元素都是基本类型，渲染为简单列表
      if (allPrimitive) {
        return (
          <ul className="array-content">
            {content.map((item, i) => (
              <li key={i} className="array-item">{String(item)}</li>
            ))}
          </ul>
        );
      }
      
      // 如果数组元素是对象且结构相似，渲染为表格
      const allObjects = content.every(item => typeof item === 'object' && item !== null && !Array.isArray(item));
      
      if (allObjects && content.length > 0) {
        return renderTableContent(content);
      }
      
      // 默认数组渲染
      return (
        <div className="complex-array-content">
          {content.map((item, i) => (
            <div key={i} className="array-item">
              {typeof item === 'object' 
                ? <JSONBlock data={item} /> 
                : String(item)}
            </div>
          ))}
        </div>
      );
    }
    
    // 如果是简单对象，渲染为属性列表
    if (Object.keys(content).length > 0) {
      return (
        <div className="object-content">
          {Object.entries(content).map(([key, value], i) => (
            <div key={i} className="object-property">
              <span className="property-key">{key}:</span>
              <span className="property-value">
                {typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
                  ? String(value)
                  : Array.isArray(value) && value.length < 5
                    ? value.map((v, idx) => (
                      <span key={idx} className="array-item">
                        {typeof v === 'object' ? safeStringify(v) : String(v)}
                      </span>
                    ))
                    : safeStringify(value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    
    // 空对象处理
    if (Object.keys(content).length === 0) {
      return <div className="empty-object">空对象</div>;
    }
  }
  
  // 默认情况，尝试JSON字符串化
  return (
    <div className="generic-content">
      {content ? safeStringify(content) : "无内容"}
    </div>
  );
}

// 渲染表格内容
function renderTableContent(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="empty-table">空表格</div>;
  }
  
  // 获取所有对象的键
  const allKeys = new Set();
  data.forEach(obj => {
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      Object.keys(obj).forEach(key => allKeys.add(key));
    }
  });
  
  // 转换为数组
  const keys = Array.from(allKeys);
  
  // 如果键太多，使用简单列表
  if (keys.length > 10) {
    return (
      <div className="object-array-content">
        {data.map((item, i) => (
          <div key={i} className="object-item">
            {Object.entries(item).map(([key, value], j) => (
              <div key={j} className="object-property">
                <span className="property-key">{key}:</span>
                <span className="property-value">
                  {typeof value === 'object' ? safeStringify(value) : String(value)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  
  // 渲染为表格
  return (
    <div className="table-container" style={{ overflowX: 'auto' }}>
      <table className="array-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {keys.map(key => (
              <th key={key} style={{ padding: '8px', borderBottom: '2px solid #eaeaea', textAlign: 'left' }}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #eaeaea' }}>
              {keys.map(key => (
                <td key={`${i}-${key}`} style={{ padding: '8px' }}>
                  {key in item 
                    ? typeof item[key] === 'object' 
                      ? safeStringify(item[key]) 
                      : String(item[key])
                    : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 渲染统计内容
function renderStatContent(content) {
  const value = content.value || (content._type === 'stat' ? content.data : 0);
  const description = content.description || content.label || '';
  const trend = content.trend || '';
  const change = content.change || '';
  
  return (
    <div className="stat-content" style={{ textAlign: 'center', padding: '10px' }}>
      <div className="stat-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      {description && (
        <div className="stat-description" style={{ color: '#666', marginTop: '5px' }}>
          {description}
        </div>
      )}
      {trend && (
        <div className={`stat-trend trend-${trend}`} style={{ 
          marginTop: '5px', 
          color: trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#6b7280',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px'
        }}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          {change && ` ${change}%`}
        </div>
      )}
    </div>
  );
}

// 渲染媒体内容
function renderMediaContent(content, itemTitle) {
  const imageUrl = content.image || (content._type === 'media' ? content.url : '');
  const caption = content.caption || content.alt || itemTitle || "图片";
  
  if (!imageUrl) {
    return <div className="empty-media">无图片</div>;
  }
  
  return (
    <div className="media-content" style={{ textAlign: 'center' }}>
      <img
        src={imageUrl}
        alt={caption}
        className="media-image"
        style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
        loading="lazy" // 懒加载图片
      />
      {content.caption && (
        <div className="media-caption" style={{ marginTop: '8px', color: '#666' }}>
          {content.caption}
        </div>
      )}
    </div>
  );
}

SmartLayout.propTypes = {
  data: PropTypes.object.isRequired,
  name: PropTypes.string
};

export default SmartLayout; 