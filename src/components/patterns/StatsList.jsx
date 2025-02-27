import React from 'react'

const StatsList = ({ data, name }) => {
  if (!Array.isArray(data)) return null

  return (
    <div className="card stats-list">
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
        {data.map((stat, index) => (
          <div key={index} style={{ padding: '0.5rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.value}</div>
            <div>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsList
