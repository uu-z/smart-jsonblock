import React from 'react';

/**
 * AdvancedGridLayout - 极简网格布局
 * 约定大于配置：只保留核心功能，移除一切非必要选项
 */
const AdvancedGridLayout = ({ data }) => {
  // 智能提取数据，提供默认值
  const { items = [], title, description } = data;
  
  // 使用CSS变量代替JavaScript配置
  return (
    <div className="grid-container">
      {title && <h3 className="grid-title">{title}</h3>}
      {description && <p className="grid-description">{description}</p>}
      
      <div className="responsive-grid">
        {items.map((item, index) => {
          // 提取必要属性
          const { content, gradient, glass, icon } = item;
          
          // 使用CSS类代替内联样式
          const classes = [
            'grid-item',
            'animate-hover',
            gradient ? 'bg-gradient-primary' : '',
            glass ? 'card-glass' : '',
          ].filter(Boolean).join(' ');
          
          // 使用自定义样式属性传递渐变
          const style = gradient && typeof gradient === 'string' 
            ? { '--item-gradient': gradient } 
            : {};
            
          return (
            <div key={index} className={classes} style={style}>
              {icon && <div className="item-icon">{icon}</div>}
              {renderContent(content)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 内容渲染函数
function renderContent(content) {
  if (!content) return null;
  if (typeof content === 'string') return <div>{content}</div>;
  
  return (
    <div className="item-content">
      {content.title && <h4>{content.title}</h4>}
      {content.description && <p>{content.description}</p>}
      {content.value && <div className="item-value">{content.value}</div>}
    </div>
  );
}

export default AdvancedGridLayout; 