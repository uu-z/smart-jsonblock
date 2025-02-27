import React from "react";
import type { ComponentProps } from "../../types";

interface StatItem {
  label: string;
  value: string | number;
  icon?: string;
  color?: string;
  [key: string]: any;
}

const StatsList: React.FC<ComponentProps> = ({ data, name }) => {
  // Type guard to ensure data is an array
  if (!Array.isArray(data)) {
    return null;
  }

  return (
    <div className="card stats-list">
      <h3>{name}</h3>
      <div className="stats-grid">
        {data.map((stat: StatItem, index: number) => (
          <div key={index} className="stat-item">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsList;
