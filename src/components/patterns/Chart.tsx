import React from "react";
import type { ComponentProps } from "../../types";

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  [key: string]: any;
}

interface ChartData {
  type: "bar" | "line" | "pie" | "doughnut" | "radar" | string;
  data: ChartDataPoint[];
  title?: string;
  colors?: string[];
  options?: Record<string, any>;
  [key: string]: any;
}

const Chart: React.FC<ComponentProps> = ({ data, name }) => {
  // Type guard to ensure data has the required properties
  if (
    !data ||
    typeof data !== "object" ||
    !("type" in data) ||
    !("data" in data) ||
    !Array.isArray(data.data)
  ) {
    return null;
  }

  const chartData = data as ChartData;
  const { type, data: dataPoints, title = name } = chartData;

  // Calculate the maximum value for scaling
  const maxValue = Math.max(...dataPoints.map((point) => point.value));

  // Simple chart rendering - in a real app, you'd use a chart library
  return (
    <div className="card chart-card">
      <h3>{title}</h3>
      <div
        className="chart-container"
        style={{ height: "200px", position: "relative" }}
      >
        {type === "bar" && (
          <div
            className="bar-chart"
            style={{ display: "flex", height: "100%", alignItems: "flex-end" }}
          >
            {dataPoints.map((point, index) => (
              <div
                key={index}
                className="chart-column"
                style={{ flex: 1, textAlign: "center" }}
              >
                <div
                  className="bar"
                  style={{
                    height: `${(point.value / maxValue) * 100}%`,
                    backgroundColor: point.color || "#4f46e5",
                    margin: "0 4px",
                    borderRadius: "4px 4px 0 0",
                  }}
                ></div>
                <div
                  className="label"
                  style={{ fontSize: "12px", marginTop: "4px" }}
                >
                  {point.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {type === "pie" && (
          <div
            className="pie-chart"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              style={{ width: "150px", height: "150px", position: "relative" }}
            >
              <svg
                viewBox="0 0 100 100"
                style={{ transform: "rotate(-90deg)" }}
              >
                {dataPoints.map((point, index, arr) => {
                  // Calculate the percentage and angles for the pie slice
                  const total = arr.reduce((sum, p) => sum + p.value, 0);
                  const percentage = point.value / total;
                  const startAngle = arr
                    .slice(0, index)
                    .reduce((sum, p) => sum + (p.value / total) * 360, 0);
                  const endAngle = startAngle + percentage * 360;

                  // Convert angles to radians and calculate coordinates
                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;

                  const x1 = 50 + 50 * Math.cos(startRad);
                  const y1 = 50 + 50 * Math.sin(startRad);
                  const x2 = 50 + 50 * Math.cos(endRad);
                  const y2 = 50 + 50 * Math.sin(endRad);

                  // Create the arc path
                  const largeArcFlag = percentage > 0.5 ? 1 : 0;
                  const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                  return (
                    <path
                      key={index}
                      d={pathData}
                      fill={point.color || `hsl(${index * 60}, 70%, 60%)`}
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {/* For other chart types, display a placeholder */}
        {type !== "bar" && type !== "pie" && (
          <div
            className="chart-placeholder"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              backgroundColor: "#f3f4f6",
              borderRadius: "0.5rem",
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Chart
          </div>
        )}
      </div>

      {/* Legend */}
      <div
        className="chart-legend"
        style={{ display: "flex", flexWrap: "wrap", marginTop: "1rem" }}
      >
        {dataPoints.map((point, index) => (
          <div
            key={index}
            className="legend-item"
            style={{
              display: "flex",
              alignItems: "center",
              margin: "0.25rem 1rem 0.25rem 0",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor:
                  point.color ||
                  (type === "pie" ? `hsl(${index * 60}, 70%, 60%)` : "#4f46e5"),
                marginRight: "0.5rem",
                borderRadius: "2px",
              }}
            ></div>
            <span>
              {point.label}: {point.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
