import React from "react";
import type { ComponentProps } from "../../types";

interface ProgressData {
  current: number;
  total: number;
  label?: string;
  color?: string;
  [key: string]: any;
}

const ProgressBar: React.FC<ComponentProps> = ({ data, name }) => {
  // Type guard to ensure data has the required properties
  if (
    !data ||
    typeof data !== "object" ||
    !("current" in data) ||
    !("total" in data)
  ) {
    return null;
  }

  const progressData = data as ProgressData;
  const percentage = Math.min(
    100,
    Math.max(0, (progressData.current / progressData.total) * 100)
  );

  return (
    <div className="card progress-card">
      <h3>{name}</h3>
      {progressData.label && (
        <div className="progress-label">{progressData.label}</div>
      )}
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${percentage}%`,
            backgroundColor: progressData.color || "#4f46e5",
          }}
        ></div>
      </div>
      <div className="progress-stats">
        {progressData.current} / {progressData.total} ({percentage.toFixed(0)}%)
      </div>
    </div>
  );
};

export default ProgressBar;
