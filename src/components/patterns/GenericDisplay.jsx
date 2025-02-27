import React from 'react'

const GenericDisplay = ({ data, name }) => {
  const renderValue = (value) => {
    if (value === null) return <span style={{ color: '#888' }}>null</span>
    if (value === undefined) return <span style={{ color: '#888' }}>undefined</span>
    
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return (
          <div style={{ marginLeft: '1rem' }}>
            {value.map((item, i) => (
              <div key={i}>
                {i}: {renderValue(item)}
              </div>
            ))}
          </div>
        )
      } else {
        return (
          <div style={{ marginLeft: '1rem' }}>
            {Object.entries(value).map(([k, v]) => (
              <div key={k}>
                {k}: {renderValue(v)}
              </div>
            ))}
          </div>
        )
      }
    }
    
    return String(value)
  }

  return (
    <div className="card generic-display">
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <div>{renderValue(data)}</div>
    </div>
  )
}

export default GenericDisplay
