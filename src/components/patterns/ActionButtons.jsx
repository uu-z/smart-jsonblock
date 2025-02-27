import React from 'react'

const ActionButtons = ({ data, name }) => {
  if (!Array.isArray(data)) return null

  return (
    <div className="card action-buttons">
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {data.map((action, index) => (
          <button 
            key={index}
            style={{
              backgroundColor: action.type === 'primary' ? '#646cff' : 'transparent',
              color: action.type === 'primary' ? 'white' : 'inherit',
              border: action.type === 'primary' ? 'none' : '1px solid #646cff'
            }}
          >
            {action.text}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ActionButtons
