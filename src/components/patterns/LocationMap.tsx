import React from "react";
import type { ComponentProps } from "../../types";

interface LocationData {
  lat: number;
  lng: number;
  title?: string;
  zoom?: number;
  [key: string]: any;
}

const LocationMap: React.FC<ComponentProps> = ({ data, name }) => {
  // Type guard to ensure data has the required properties
  if (
    !data ||
    typeof data !== "object" ||
    !("lat" in data) ||
    !("lng" in data)
  ) {
    return null;
  }

  const locationData = data as LocationData;

  // In a real implementation, this would render an actual map
  // For this example, we'll just show the coordinates
  return (
    <div className="card location-map">
      <h3>{name}</h3>
      <div
        className="map-placeholder"
        style={{
          height: "200px",
          backgroundColor: "#e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0.5rem",
        }}
      >
        {locationData.title && (
          <div className="map-title">{locationData.title}</div>
        )}
        <div className="map-coordinates">
          Latitude: {locationData.lat.toFixed(6)}, Longitude:{" "}
          {locationData.lng.toFixed(6)}
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
