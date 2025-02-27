import React from "react";
import type { ComponentProps } from "../../types";

interface TableItem {
  id: string | number;
  name: string;
  description?: string;
  status?: string;
  [key: string]: any;
}

const ItemTable: React.FC<ComponentProps> = ({ data, name }) => {
  // Type guard to ensure data is an array
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  // Get all unique keys from the items to use as columns
  const allKeys = new Set<string>();
  data.forEach((item: TableItem) => {
    Object.keys(item).forEach((key) => {
      if (key !== "id") {
        // ID is used for the key, not displayed
        allKeys.add(key);
      }
    });
  });

  // Convert to array and ensure 'name' is first if it exists
  const columns = Array.from(allKeys);
  if (columns.includes("name")) {
    columns.splice(columns.indexOf("name"), 1);
    columns.unshift("name");
  }

  return (
    <div className="card item-table">
      <h3>{name}</h3>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item: TableItem) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={`${item.id}-${column}`}>
                    {item[column] !== undefined ? String(item[column]) : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemTable;
