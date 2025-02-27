import React from "react";
import type { ReactNode } from "react";
import type { SmartCardData, Action, ContentObject } from "../../types/layout";

// Component props interface
interface SmartCardProps {
  data: SmartCardData;
}

/**
 * SmartCard - 极简智能卡片
 * 约定大于配置：自动适应数据结构，零配置使用
 */
const SmartCard: React.FC<SmartCardProps> = ({ data }) => {
  // 智能提取数据
  const {
    title,
    content,
    icon,
    image,
    footer,
    actions,
    gradient,
    glass,
    bordered = true,
    subtitle,
    variant: explicitVariant, // 允许显式指定变体
  } = data;

  // 自动检测卡片类型
  const detectedVariant = image
    ? "media"
    : icon && typeof content === "string"
    ? "info"
    : content && typeof content === "object" && "value" in content
    ? "stat"
    : Array.isArray(actions) && actions.length
    ? "action"
    : "basic";

  // 使用显式指定的变体或检测到的变体
  const variant = explicitVariant || detectedVariant;

  // 简化类名生成 - 确保变体类名正确应用
  const classes = [
    "card",
    `card-${variant}`, // 始终应用变体类
    glass ? "card-glass" : "",
    !bordered ? "border-0" : "",
    gradient && typeof gradient === "boolean" ? "bg-gradient-primary" : "",
    "animate-fade-in",
  ]
    .filter(Boolean)
    .join(" ");

  // 使用直接的样式属性处理自定义渐变
  const style: React.CSSProperties =
    gradient && typeof gradient === "string"
      ? { background: gradient, color: "white" }
      : {};

  // 根据变体渲染不同的卡片内容
  const renderCardByVariant = (): ReactNode => {
    switch (variant) {
      case "media":
        return (
          <>
            {image && (
              <div className="card-image">
                <img src={image} alt={title || "Card"} />
              </div>
            )}
            <div className="card-body">
              {title && <h3 className="card-title">{title}</h3>}
              {subtitle && <p className="card-description">{subtitle}</p>}
              {renderContent(content)}
              {renderActions(actions)}
            </div>
            {footer && <div className="card-footer">{footer}</div>}
          </>
        );

      case "info":
        return (
          <div className="card-body">
            <div className="card-info">
              {icon && <div className="card-icon">{icon}</div>}
              <div className="flex-1">
                {title && <h3 className="card-title">{title}</h3>}
                {subtitle && <p className="card-description">{subtitle}</p>}
                {renderContent(content)}
              </div>
            </div>
            {renderActions(actions)}
            {footer && <div className="card-footer">{footer}</div>}
          </div>
        );

      case "stat":
        return (
          <div className="card-body text-center">
            {icon && <div className="card-icon">{icon}</div>}
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-description">{subtitle}</p>}
            {content && typeof content === "object" && content.value && (
              <div className="card-value">{content.value}</div>
            )}
            {content && typeof content === "object" && content.description && (
              <p className="card-description">{content.description}</p>
            )}
            {renderActions(actions)}
            {footer && <div className="card-footer">{footer}</div>}
          </div>
        );

      case "action":
        return (
          <div className="card-body">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-description">{subtitle}</p>}
            {renderContent(content)}
            <div className="card-actions">{renderActions(actions)}</div>
            {footer && <div className="card-footer">{footer}</div>}
          </div>
        );

      case "basic":
      default:
        return (
          <div className="card-body">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-description">{subtitle}</p>}
            {renderContent(content)}
            {renderActions(actions)}
            {footer && <div className="card-footer">{footer}</div>}
          </div>
        );
    }
  };

  return (
    <div className={classes} style={style} data-variant={variant}>
      {renderCardByVariant()}
    </div>
  );
};

/**
 * 智能渲染内容
 */
function renderContent(content?: string | ContentObject): ReactNode {
  if (!content) return null;

  // 字符串内容
  if (typeof content === "string") {
    return <p className="card-text">{content}</p>;
  }

  // 数组内容（列表）
  if (Array.isArray(content)) {
    return (
      <ul className="card-list">
        {content.map((item, i) => (
          <li key={i}>
            {typeof item === "string" ? item : JSON.stringify(item)}
          </li>
        ))}
      </ul>
    );
  }

  // 对象内容
  if (typeof content === "object") {
    // 文本对象
    if ("text" in content) {
      return <p className="card-text">{content.text}</p>;
    }

    // 列表对象
    if ("items" in content && Array.isArray(content.items)) {
      return (
        <ul className="card-list">
          {content.items.map((item, i) => (
            <li key={i}>
              {typeof item === "string" ? item : JSON.stringify(item)}
            </li>
          ))}
        </ul>
      );
    }

    // 统计对象
    if ("value" in content) {
      return (
        <div className="card-stat">
          <div className="card-value">{content.value}</div>
          {content.description && (
            <p className="card-description">{content.description}</p>
          )}
        </div>
      );
    }
  }

  // 默认情况
  return <p className="card-text">{JSON.stringify(content)}</p>;
}

/**
 * 渲染操作按钮
 */
function renderActions(actions?: Action[]): ReactNode {
  if (!actions || !Array.isArray(actions) || actions.length === 0) return null;

  return (
    <div className="card-actions">
      {actions.map((action, i) => (
        <button
          key={i}
          className={`btn ${action.variant ? `btn-${action.variant}` : ""}`}
          onClick={action.onClick}
        >
          {action.icon && <span className="btn-icon">{action.icon}</span>}
          {action.text}
        </button>
      ))}
    </div>
  );
}

export default SmartCard;
