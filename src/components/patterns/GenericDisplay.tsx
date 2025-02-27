import React from "react";
import type { ComponentProps } from "../../types";

const GenericDisplay: React.FC<ComponentProps> = ({ data, name }) => {
  // Format the data for display
  const formatData = (value: any): string => {
    if (value === null) return "null";
    if (value === undefined) return "undefined";

    if (typeof value === "object") {
      return JSON.stringify(value, null, 2);
    }

    return String(value);
  };

  return (
    <div className="card generic-display">
      <h3>{name}</h3>
      <div className="generic-content">
        <pre className="code-block">{formatData(data)}</pre>
      </div>
    </div>
  );
};

export default GenericDisplay;
