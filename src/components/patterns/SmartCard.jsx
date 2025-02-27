import React from 'react';
import { renderActions } from '../../utils/componentUtils';
import { detectContentType, isStatContent, isMediaContent, isCustomContent } from '../../utils/contentTypes';
import JSONBlock from '../JSONBlock';

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
 * SmartCard - 极简智能卡片
 * 约定大于配置：自动适应数据结构，零配置使用
 * 
 * 创新点：
 * 1. 自动检测 - 根据内容自动选择最佳卡片样式
 * 2. 零配置 - 无需手动指定卡片类型
 * 3. 内容优先 - 以内容为中心的设计
 * 4. 自适应 - 根据内容自动调整布局
 */
const SmartCard = ({ data, config = {} }) => {
  // 智能提取数据
  const {
    title,
    subtitle,
    content,
    icon,
    image,
    footer,
    actions,
    gradient,
    glass = shouldUseGlass(content, image),
    bordered = true,
    shadow = detectShadowLevel(content),
    rounded = 'medium',
    variant: explicitVariant, // 允许显式指定变体
    onClick,
    link,
    ...restProps
  } = data;
  
  // 自动检测卡片类型 - 使用标准化的内容类型检测
  const detectedVariant = detectCardVariant(data);
  
  // 使用显式指定的变体或检测到的变体
  const variant = explicitVariant || detectedVariant;
  
  // 简化类名生成 - 确保变体类名正确应用
  const classes = [
    'card',
    `card-${variant}`, // 始终应用变体类
    glass ? 'card-glass' : '',
    !bordered ? 'border-0' : '',
    gradient && typeof gradient === 'boolean' ? 'bg-gradient-primary' : '',
    onClick || link ? 'card-interactive' : '',
    'animate-fade-in',
  ].filter(Boolean).join(' ');
  
  // 使用直接的样式属性处理自定义渐变
  const style = {
    borderRadius: getBorderRadius(rounded),
    boxShadow: getBoxShadow(shadow),
    ...(gradient && typeof gradient === 'string' ? { background: gradient, color: 'white' } : {}),
    ...(glass ? { 
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)'
    } : {})
  };

  // 处理点击事件
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else if (link) {
      window.open(link, '_blank');
    }
  };

  // 通用元素 - 所有变体共享的部分
  const commonElements = (
    <>
      {title && <h3 className="card-title">{title}</h3>}
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
    </>
  );

  // 渲染卡片内容
  const renderCardBody = () => {
    // 信息卡片有特殊布局
    if (variant === 'info') {
      return (
        <div className="card-body">
          <div className="card-info">
            {icon && <div className="card-icon">{icon}</div>}
            <div className="flex-1">
              {commonElements}
              {content && renderCardContent(content, title)}
            </div>
          </div>
          {renderActions(actions)}
        </div>
      );
    }
    
    // 统计卡片居中显示
    if (variant === 'stat') {
      return (
        <div className="card-body text-center">
          {icon && <div className="card-icon">{icon}</div>}
          {commonElements}
          {content && renderCardContent(content, title)}
          {renderActions(actions)}
        </div>
      );
    }
    
    // 其他卡片类型使用标准布局
    return (
      <div className="card-body">
        {commonElements}
        {content && renderCardContent(content, title)}
        {renderActions(actions)}
      </div>
    );
  };

  return (
    <div 
      className={classes} 
      style={style}
      onClick={handleClick}
      role={onClick || link ? 'button' : undefined}
      tabIndex={onClick || link ? 0 : undefined}
    >
      {/* 媒体卡片的图像在卡片体之前 */}
      {variant === 'media' && image && (
        <div className="card-image">
          <img src={image} alt={title || 'Card'} loading="lazy" />
        </div>
      )}
      
      {/* 卡片主体 */}
      {renderCardBody()}
      
      {/* 页脚在所有变体中都是一样的 */}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

/**
 * 自动检测卡片变体
 * 约定大于配置：根据内容结构自动选择最佳卡片类型
 */
function detectCardVariant(data) {
  const { image, icon, content, actions } = data;
  
  // 媒体卡片
  if (image || (content && isMediaContent(content))) {
    return 'media';
  }
  
  // 信息卡片
  if (icon && typeof content === 'string') {
    return 'info';
  }
  
  // 统计卡片
  if (isStatContent(content) || (typeof content === 'object' && 'value' in content)) {
    return 'stat';
  }
  
  // 操作卡片
  if (Array.isArray(actions) && actions.length) {
    return 'action';
  }
  
  // 默认基本卡片
  return 'basic';
}

/**
 * 自动检测是否应该使用玻璃效果
 */
function shouldUseGlass(content, image) {
  // 如果有图片，玻璃效果会更好看
  if (image) return true;
  
  // 如果内容是媒体类型，玻璃效果会更好看
  if (content && isMediaContent(content)) return true;
  
  // 如果内容有渐变背景，玻璃效果会更好看
  if (content && typeof content === 'object' && content.gradient) return true;
  
  return false;
}

/**
 * 自动检测阴影级别
 */
function detectShadowLevel(content) {
  // 如果内容是统计类型，使用较大阴影突出显示
  if (content && isStatContent(content)) return 'medium';
  
  // 如果内容是媒体类型，使用较大阴影增强视觉效果
  if (content && isMediaContent(content)) return 'medium';
  
  // 默认使用小阴影
  return 'small';
}

/**
 * 获取边框圆角值
 */
function getBorderRadius(size) {
  const radiusMap = {
    none: '0',
    small: '0.25rem',
    medium: '0.5rem',
    large: '1rem'
  };
  return radiusMap[size] || radiusMap.medium;
}

/**
 * 获取阴影值
 */
function getBoxShadow(size) {
  const shadowMap = {
    none: 'none',
    small: '0 1px 3px rgba(0,0,0,0.1)',
    medium: '0 4px 6px rgba(0,0,0,0.1)',
    large: '0 10px 15px rgba(0,0,0,0.1)'
  };
  return shadowMap[size] || shadowMap.medium;
}

/**
 * 统一的内容渲染函数
 * 直接处理各种内容类型，无需依赖外部函数
 */
function renderCardContent(content, cardTitle) {
  // 处理空内容
  if (!content) return null;
  
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
      return renderMediaContent(content, cardTitle);
    }
  }
  
  // 使用标准化的内容类型检测
  const contentType = detectContentType(content);
  
  switch (contentType) {
    case 'text':
      return <div className="card-text">{content}</div>;
      
    case 'stat':
      return renderStatContent(content);
      
    case 'media':
      return renderMediaContent(content, cardTitle);
      
    case 'list':
      return (
        <ul className="card-list">
          {content.items.map((item, i) => (
            <li key={i} className="card-list-item">
              {typeof item === 'string' || typeof item === 'number' 
                ? item 
                : safeStringify(item)}
            </li>
          ))}
        </ul>
      );
      
    case 'custom':
      // 避免循环引用，使用简化的渲染
      if (isCustomContent(content) && content._type === 'smartCard') {
        return renderSimpleContent(content);
      }
      return <JSONBlock data={content} />;
      
    default:
      // 如果内容是 React 元素，直接返回
      if (React.isValidElement && React.isValidElement(content)) {
        return content;
      }
      
      // 如果是对象，渲染为属性列表
      if (typeof content === 'object' && content !== null && !Array.isArray(content)) {
        return (
          <div className="card-properties">
            {Object.entries(content).map(([key, value], i) => (
              <div key={i} className="card-property">
                <span className="property-key">{key}:</span>
                <span className="property-value">
                  {typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
                    ? String(value)
                    : Array.isArray(value) && value.length < 5
                      ? value.map((v, idx) => <span key={idx} className="array-item">{typeof v === 'object' ? safeStringify(v) : String(v)}</span>)
                      : safeStringify(value)}
                </span>
              </div>
            ))}
          </div>
        );
      }
      
      // 如果是数组，渲染为列表
      if (Array.isArray(content)) {
        return (
          <ul className="card-array">
            {content.length === 0 
              ? <li className="card-empty-array">空数组</li>
              : content.map((item, i) => (
                <li key={i} className="card-array-item">
                  {typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean'
                    ? String(item) 
                    : safeStringify(item)}
                </li>
              ))
            }
          </ul>
        );
      }
      
      // 默认情况，尝试 JSON stringify
      return (
        <div className="card-content">
          {content ? safeStringify(content) : "无内容"}
        </div>
      );
  }
}

/**
 * 渲染表格内容
 */
function renderTableContent(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="card-empty-table">空表格</div>;
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
  if (keys.length > 5) {
    return (
      <div className="card-object-array">
        {data.map((item, i) => (
          <div key={i} className="card-object-item" style={{ marginBottom: '10px', padding: '8px', borderBottom: '1px solid #eee' }}>
            {Object.entries(item).map(([key, value], j) => (
              <div key={j} className="card-object-property" style={{ display: 'flex', marginBottom: '4px' }}>
                <span className="property-key" style={{ fontWeight: 'bold', marginRight: '8px' }}>{key}:</span>
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
    <div className="card-table-container" style={{ overflowX: 'auto' }}>
      <table className="card-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
        <thead>
          <tr>
            {keys.map(key => (
              <th key={key} style={{ padding: '6px', borderBottom: '2px solid #eaeaea', textAlign: 'left' }}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #eaeaea' }}>
              {keys.map(key => (
                <td key={`${i}-${key}`} style={{ padding: '6px' }}>
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

/**
 * 渲染统计内容
 */
function renderStatContent(content) {
  const value = content.value || (content._type === 'stat' ? content.data : 0);
  const description = content.description || content.label || '';
  const trend = content.trend || '';
  const change = content.change || '';
  
  return (
    <div className="card-stat" style={{ textAlign: 'center', padding: '10px' }}>
      <div className="card-value" style={{ fontSize: '28px', fontWeight: 'bold' }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      {description && (
        <div className="card-description" style={{ color: '#666', marginTop: '5px' }}>
          {description}
        </div>
      )}
      {trend && (
        <div className={`card-trend trend-${trend}`} style={{ 
          marginTop: '8px', 
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

/**
 * 渲染媒体内容
 */
function renderMediaContent(content, cardTitle) {
  const imageUrl = content.image || (content._type === 'media' ? content.url : '');
  const caption = content.caption || content.alt || cardTitle || "图片";
  
  if (!imageUrl) {
    return <div className="card-empty-media">无图片</div>;
  }
  
  return (
    <div className="card-media" style={{ textAlign: 'center' }}>
      <img
        src={imageUrl}
        alt={caption}
        className="card-image"
        style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
        loading="lazy"
      />
      {content.caption && (
        <div className="card-caption" style={{ marginTop: '8px', color: '#666' }}>
          {content.caption}
        </div>
      )}
    </div>
  );
}

/**
 * 简化的内容渲染 - 避免循环引用
 */
function renderSimpleContent(content) {
  return (
    <div className="card-simple-content">
      {content.title && <div className="card-simple-title">{content.title}</div>}
      {content.content && (
        <div className="card-simple-body">
          {typeof content.content === 'string' 
            ? content.content 
            : safeStringify(content.content)}
        </div>
      )}
    </div>
  );
}

export default SmartCard; 