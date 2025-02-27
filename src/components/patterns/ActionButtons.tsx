import React from "react";
import type { ComponentProps } from "../../types";
import type { Action } from "../../types/layout";

const ActionButtons: React.FC<ComponentProps> = ({ data }) => {
  // Type guard to ensure data is an array
  if (!Array.isArray(data)) {
    return null;
  }

  // Ensure each item has required properties
  const buttons = data.filter(
    (item): item is Action => 
      typeof item === 'object' && 
      item !== null && 
      'text' in item
  );

  if (buttons.length === 0) {
    return null;
  }

  return (
    <div className="action-buttons-container">
      {buttons.map((button, index) => {
        const { 
          text, 
          variant = 'primary', 
          icon,
          onClick,
          ...rest 
        } = button;
        
        return (
          <button
            key={index}
            className={`action-button ${variant}`}
            onClick={onClick}
            {...rest}
          >
            {icon && <span className="button-icon">{icon}</span>}
            <span className="button-text">{text}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ActionButtons;
