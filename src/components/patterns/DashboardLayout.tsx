import React from 'react';
import type { ComponentProps } from '../../types';
import type { DashboardLayout as DashboardLayoutType, DashboardItem } from '../../types/layout';

const DashboardLayout: React.FC<ComponentProps> = ({ data, name }) => {
  // Type guard to ensure data has required properties
  if (
    !data || 
    typeof data !== 'object' || 
    !('widgets' in data) || 
    !Array.isArray(data.widgets) ||
    !data.widgets.length
  ) {
    return null;
  }

  const dashboardData = data as DashboardLayoutType;
  const { title = name, description, widgets, config } = dashboardData;
  
  // Default configuration
  const {
    minWidgetWidth = '300px',
    gap = '1rem',
    theme = 'default',
    glass = false,
    texture = false,
    responsive = true,
    animation = false,
  } = config || {};

  // Apply theme classes
  const themeClass = theme !== 'default' ? `theme-${theme}` : '';
  const glassClass = glass ? 'glass' : '';
  const textureClass = texture ? 'texture' : '';
  const animationClass = animation ? 'animated' : '';
  const responsiveClass = responsive ? 'responsive' : '';

  return (
    <div className={`dashboard-layout ${themeClass} ${glassClass} ${textureClass} ${animationClass} ${responsiveClass}`}>
      {title && <h2 className="dashboard-title">{title}</h2>}
      {description && <p className="dashboard-description">{description}</p>}
      
      <div 
        className="dashboard-grid" 
        style={{ 
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${minWidgetWidth}, 1fr))`,
          gap
        }}
      >
        {widgets.map((widget: DashboardItem, index: number) => {
          const { size = 'medium', title, content, headerBackground, color, footer } = widget;
          
          // Determine grid span based on size
          const getSpan = (size: string) => {
            switch(size) {
              case 'small': return 1;
              case 'medium': return 1;
              case 'large': return 2;
              case 'xlarge': return 3;
              default: return 1;
            }
          };
          
          const span = getSpan(size);
          
          return (
            <div 
              key={index}
              className={`dashboard-widget size-${size}`}
              style={{ 
                gridColumn: `span ${span}`,
                color
              }}
            >
              {title && (
                <div 
                  className="widget-header"
                  style={{ background: headerBackground }}
                >
                  <h3>{title}</h3>
                </div>
              )}
              
              <div className="widget-content">
                {typeof content === 'string' 
                  ? content 
                  : (
                    <>
                      {content.value && <div className="widget-value">{content.value}</div>}
                      {content.text && <div className="widget-text">{content.text}</div>}
                      {content.chart && <div className="widget-chart">{content.chart}</div>}
                    </>
                  )
                }
              </div>
              
              {footer && <div className="widget-footer">{footer}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardLayout; 