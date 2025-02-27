import React from 'react'

const LocationMap = ({ data, name }) => {
  if (!data || typeof data !== 'object' || !('lat' in data) || !('lng' in data)) return null

  return (
    <div className="card location-map">
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <div>
        <div style={{ 
          backgroundColor: '#333', 
          padding: '1rem', 
          borderRadius: '4px',
          textAlign: 'center',
          marginBottom: '0.5rem'
        }}>
          <p>Map would display here in a real application</p>
          <p>Coordinates: {data.lat}, {data.lng}</p>
        </div>
        {data.name && <div style={{ fontWeight: 'bold' }}>{data.name}</div>}
      </div>
    </div>
  )
}

export default LocationMap
