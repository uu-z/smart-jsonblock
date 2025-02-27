import React from "react";

/**
 * Shared utility functions for component rendering
 * This centralizes common logic used across multiple components
 */

/**
 * Process data before passing to component
 * Used by both JSONBlock and ArrayRenderer
 *
 * @param {any} data - The data to process
 * @param {string} componentType - The type of component that will receive the data
 * @returns {any} - The processed data
 */
export const processComponentData = (data, componentType) => {
  // For chart components, we need to pass the entire object
  if (componentType === "chart") {
    return data;
  }

  // For other components that expect an array, extract the data array
  if (
    data &&
    typeof data === "object" &&
    !Array.isArray(data) &&
    "_type" in data &&
    "data" in data &&
    Array.isArray(data.data)
  ) {
    return data.data;
  }

  return data;
};

/**
 * Renders content based on its type
 * Shared between components that need generic content rendering
 * 
 * Note: This is a simplified version. SmartCard and SmartLayout now implement
 * their own specialized content rendering functions directly.
 *
 * @param {any} content - The content to render
 * @param {string} title - Optional title for context
 * @param {string} prefix - Optional CSS class prefix (default: 'component')
 * @returns {JSX.Element} - The rendered content
 */
export const renderContent = (content, title, prefix = 'component') => {
  // If content is a string, display directly
  if (typeof content === "string") {
    return <div className={`${prefix}-text`}>{content}</div>;
  }

  // If content is an object, check for specific structures
  if (content && typeof content === "object") {
    // Check if it has _type field, if so return null (component will handle this)
    if ("_type" in content) {
      return null;
    }

    // Check if it has value field, render as statistics
    if ("value" in content) {
      return (
        <div className={`${prefix}-stats`}>
          <div className={`${prefix}-value`}>{content.value}</div>
          {content.description && (
            <div className={`${prefix}-description`}>{content.description}</div>
          )}
        </div>
      );
    }

    // Check if it has image field, render as media
    if ("image" in content) {
      return (
        <div className={`${prefix}-media`}>
          <img
            src={content.image}
            alt={content.caption || title || "图片"}
            className={`${prefix}-image`}
          />
          {content.caption && (
            <div className={`${prefix}-caption`}>{content.caption}</div>
          )}
        </div>
      );
    }

    // Check if it has items field (list)
    if ("items" in content && Array.isArray(content.items)) {
      return (
        <ul className={`${prefix}-list`}>
          {content.items.map((item, i) => (
            <li key={i}>
              {typeof item === "string" ? item : JSON.stringify(item)}
            </li>
          ))}
        </ul>
      );
    }
  }

  // If content is a React element, return directly
  if (React.isValidElement && React.isValidElement(content)) {
    return content;
  }

  // Default case, try to JSON stringify
  return (
    <div className={`${prefix}-content`}>
      {content ? JSON.stringify(content) : "无内容"}
    </div>
  );
};

/**
 * Renders action buttons
 * Shared between SmartCard and other components
 *
 * @param {Array} actions - The actions to render
 * @returns {JSX.Element|null} - The rendered actions or null
 */
export const renderActions = (actions) => {
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
};
