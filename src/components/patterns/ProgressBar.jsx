import React from 'react'

const ProgressBar = ({ data, name }) => {
  if (!data || typeof data !== 'object' || !('current' in data) || !('total' in data)) return null

  const percentage = Math.min(100, Math.max(0, (data.current / data.total) * 100))

  return (
    <div className="card progress-bar">
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <div style={{ marginBottom: '0.5rem' }}>
        {data.current} / {data.total} ({percentage.toFixed(0)}%)
      </div>
      <div style={{ 
        width: '100%', 
        height: '12px', 
        backgroundColor: '#333',
        borderRadius: '6px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          width: `${percentage}%`, 
          height: '100%', 
          backgroundColor: '#646cff',
          transition: 'width 0.3s ease'
        }}></div>
      </div>
    </div>
  )
}

export default ProgressBar
