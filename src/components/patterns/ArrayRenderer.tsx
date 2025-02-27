import React, { useState } from "react";
import type { ComponentProps } from "../../types";
import JSONBlock from "../JSONBlock";

interface ArrayRendererProps extends ComponentProps {
  nested?: boolean;
}

const ArrayRenderer: React.FC<ArrayRendererProps> = ({
  data,
  name,
  nested = false,
}) => {
  const [viewMode, setViewMode] = useState<"list" | "grid" | "table">("list");
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );

  // Type guard to ensure data is an array
  if (!Array.isArray(data)) {
    return null;
  }

  // Toggle item expansion
  const toggleItem = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Detect if items are complex objects that need expansion
  const hasComplexItems = data.some(
    (item) =>
      typeof item === "object" && item !== null && Object.keys(item).length > 0
  );

  // Detect if all items have the same structure (for table view)
  const allSameStructure = (): boolean => {
    if (data.length < 2 || !hasComplexItems) return false;

    const firstItemKeys =
      data[0] && typeof data[0] === "object" && data[0] !== null
        ? Object.keys(data[0]).sort().join(",")
        : "";

    return data.every(
      (item) =>
        item &&
        typeof item === "object" &&
        item !== null &&
        Object.keys(item).sort().join(",") === firstItemKeys
    );
  };

  // Get all unique keys for table headers
  const getAllKeys = (): string[] => {
    if (!hasComplexItems) return [];

    const keySet = new Set<string>();
    data.forEach((item) => {
      if (item && typeof item === "object" && item !== null) {
        Object.keys(item).forEach((key) => keySet.add(key));
      }
    });

    return Array.from(keySet);
  };

  // Render simple value
  const renderValue = (value: any): React.ReactNode => {
    if (value === null) return <span className="null-value">null</span>;
    if (value === undefined)
      return <span className="undefined-value">undefined</span>;

    if (typeof value === "boolean") {
      return <span className="boolean-value">{value.toString()}</span>;
    }

    if (typeof value === "number") {
      return <span className="number-value">{value}</span>;
    }

    if (typeof value === "string") {
      if (value.length > 100) {
        return (
          <span className="string-value">"{value.substring(0, 100)}..."</span>
        );
      }
      return <span className="string-value">"{value}"</span>;
    }

    if (Array.isArray(value)) {
      return <span className="array-value">Array({value.length})</span>;
    }

    if (typeof value === "object") {
      return <span className="object-value">Object</span>;
    }

    return String(value);
  };

  // Render as list
  const renderList = (): React.ReactNode => (
    <div className="array-list">
      {data.map((item, index) => (
        <div key={index} className="array-item">
          <div
            className="item-header"
            onClick={() => hasComplexItems && toggleItem(index)}
            style={{ cursor: hasComplexItems ? "pointer" : "default" }}
          >
            <span className="item-index">[{index}]</span>
            {!expandedItems[index] && (
              <span className="item-preview">
                {typeof item === "object" && item !== null
                  ? Array.isArray(item)
                    ? `Array(${item.length})`
                    : `Object {${Object.keys(item).join(", ")}}`
                  : renderValue(item)}
              </span>
            )}
            {hasComplexItems && (
              <span className="expand-icon">
                {expandedItems[index] ? "▼" : "▶"}
              </span>
            )}
          </div>

          {expandedItems[index] &&
            typeof item === "object" &&
            item !== null && (
              <div className="item-details">
                {Array.isArray(item) ? (
                  <ArrayRenderer
                    data={item}
                    name={`${name}[${index}]`}
                    nested={true}
                  />
                ) : (
                  <JSONBlock data={item} layout="list" />
                )}
              </div>
            )}
        </div>
      ))}
    </div>
  );

  // Render as grid
  const renderGrid = (): React.ReactNode => (
    <div
      className="array-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem",
      }}
    >
      {data.map((item, index) => (
        <div key={index} className="grid-item card">
          <div className="item-header">
            <span className="item-index">[{index}]</span>
          </div>
          <div className="item-content">
            {typeof item === "object" && item !== null ? (
              <JSONBlock data={item} layout="list" />
            ) : (
              renderValue(item)
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Render as table
  const renderTable = (): React.ReactNode => {
    const keys = getAllKeys();

    return (
      <div className="array-table-container">
        <table className="array-table">
          <thead>
            <tr>
              <th>#</th>
              {keys.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                {keys.map((key) => (
                  <td key={key}>
                    {item &&
                    typeof item === "object" &&
                    item !== null &&
                    key in item ? (
                      renderValue(item[key])
                    ) : (
                      <span className="empty-cell">-</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={`array-renderer ${nested ? "nested" : ""}`}>
      <div className="array-header">
        <h3>
          {name} ({data.length} items)
        </h3>

        {/* View mode toggle */}
        {data.length > 0 && (
          <div className="view-mode-toggle">
            <button
              className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              List
            </button>
            <button
              className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              Grid
            </button>
            {allSameStructure() && (
              <button
                className={`toggle-btn ${viewMode === "table" ? "active" : ""}`}
                onClick={() => setViewMode("table")}
              >
                Table
              </button>
            )}
          </div>
        )}
      </div>

      {data.length === 0 ? (
        <div className="empty-array">Empty array</div>
      ) : (
        <div className="array-content">
          {viewMode === "list" && renderList()}
          {viewMode === "grid" && renderGrid()}
          {viewMode === "table" && allSameStructure() && renderTable()}
        </div>
      )}
    </div>
  );
};

export default ArrayRenderer;
