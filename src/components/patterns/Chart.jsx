import React from 'react'

const Chart = ({ data, name }) => {
  if (!data || !data.data || !Array.isArray(data.data)) return null

  const maxValue = Math.max(...data.data)
  const chartHeight = 150

  return (
    <div className="card chart">
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        height: `${chartHeight}px`, 
        gap: '8px',
        padding: '1rem 0'
      }}>
        {data.data.map((value, index) => {
          const height = (value / maxValue) * chartHeight
          return (
            <div key={index} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ 
                height: `${height}px`, 
                backgroundColor: '#646cff', 
                borderRadius: '4px 4px 0 0',
                width: '100%',
                minWidth: '20px'
              }}></div>
              {data.labels && <div style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>{data.labels[index]}</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Chart
