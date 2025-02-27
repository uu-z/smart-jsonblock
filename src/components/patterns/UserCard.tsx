import React from "react";
import type { ComponentProps } from "../../types";

interface UserData {
  name: string;
  avatar: string;
  role?: string;
  [key: string]: any;
}

const UserCard: React.FC<ComponentProps> = ({ data, name }) => {
  // Type guard to ensure data has the required properties
  if (
    !data ||
    typeof data !== "object" ||
    !("name" in data) ||
    !("avatar" in data)
  ) {
    return null;
  }

  const userData = data as UserData;

  return (
    <div className="card user-card">
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)} Profile</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img
          src={userData.avatar}
          alt={userData.name}
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <div>
          <h4>{userData.name}</h4>
          {userData.role && <p>{userData.role}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
