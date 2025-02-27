import React from "react";
import type { ComponentProps } from "../../types";
import type {
  GridLayout as GridLayoutType,
  GridItem,
  GridConfig,
} from "../../types/layout";

const GridLayout: React.FC<ComponentProps> = ({ data, name }) => {
  // Type guard to ensure data has the required properties
  if (
    !data ||
    typeof data !== "object" ||
    !("items" in data) ||
    !Array.isArray(data.items)
  ) {
    return null;
  }

  const gridData = data as GridLayoutType;
  const { title = name, description, items, config } = gridData;

  // Default configuration
  const {
    columns = 3,
    gap = "1rem",
    rowHeight = "auto",
    theme = "default",
    glass = false,
    texture = false,
  } = config || {};

  // Grid container styles
  const gridStyles: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
    gridAutoRows: rowHeight,
  };

  // Apply theme classes
  const themeClass = theme !== "default" ? `theme-${theme}` : "";
  const glassClass = glass ? "glass" : "";
  const textureClass = texture ? "texture" : "";

  return (
    <div className={`grid-layout ${themeClass} ${glassClass} ${textureClass}`}>
      {title && <h2 className="grid-title">{title}</h2>}
      {description && <p className="grid-description">{description}</p>}

      <div className="grid-container" style={gridStyles}>
        {items.map((item: GridItem, index: number) => {
          // Item styles for spanning columns and rows
          const itemStyles: React.CSSProperties = {
            gridColumn: item.colSpan ? `span ${item.colSpan}` : undefined,
            gridRow: item.rowSpan ? `span ${item.rowSpan}` : undefined,
            background: item.background,
            color: item.color,
          };

          // Apply gradient if specified
          if (item.gradient) {
            if (typeof item.gradient === "string") {
              itemStyles.background = item.gradient;
            } else {
              itemStyles.background =
                "linear-gradient(135deg, #4f46e5, #9333ea)";
            }
            itemStyles.color = itemStyles.color || "white";
          }

          return (
            <div key={index} className="grid-item" style={itemStyles}>
              {item.title && <h3 className="item-title">{item.title}</h3>}
              <div className="item-content">
                {typeof item.content === "string"
                  ? item.content
                  : JSON.stringify(item.content)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GridLayout;
