import React from 'react';

/**
 * DashboardLayout - 极简仪表盘布局
 * 约定大于配置：移除所有配置选项，使用CSS类
 */
const DashboardLayout = ({ data }) => {
  // 智能提取数据，提供默认值
  const { widgets = [], title = 'Dashboard', description } = data;
  
  return (
    <div className="grid-container">
      <h2 className="grid-title">{title}</h2>
      {description && <p className="grid-description">{description}</p>}
      
      <div className="dashboard-grid">
        {widgets.map((widget, index) => {
          // 提取必要属性
          const { title, content, size = 'medium', footer } = widget;
          
          // 使用CSS类代替内联样式
          const classes = [
            'dashboard-item',
            `size-${size}`,
          ].filter(Boolean).join(' ');
            
          return (
            <div key={index} className={classes}>
              <div className="dashboard-header">
                <h3>{title || `Widget ${index + 1}`}</h3>
              </div>
              
              <div className="dashboard-content">
                {renderContent(content)}
              </div>
              
              {footer && <div className="dashboard-footer">{footer}</div>}
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
      {content.text && <p>{content.text}</p>}
      {content.value && <div className="item-value">{content.value}</div>}
      {content.chart && (
        <div className="item-chart">
          <div className="chart-placeholder">{content.chart}</div>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout; 