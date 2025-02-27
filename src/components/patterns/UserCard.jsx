import React from 'react'

const UserCard = ({ data, name }) => {
  if (!data || typeof data !== 'object' || !('name' in data) || !('avatar' in data)) {
    return null
  }

  return (
    <div className="card user-card">
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)} Profile</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img 
          src={data.avatar} 
          alt={data.name} 
          style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%',
            objectFit: 'cover'
          }} 
        />
        <div>
          <h4>{data.name}</h4>
          {data.role && <p>{data.role}</p>}
        </div>
      </div>
    </div>
  )
}

export default UserCard
