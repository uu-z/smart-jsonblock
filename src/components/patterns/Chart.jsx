import React from 'react'

// Color palette for multi-series data
const colorPalette = [
  '#646cff', // Primary color
  '#42b883', // Green
  '#ff7e67', // Coral
  '#4a90e2', // Blue
  '#f7b731', // Yellow
  '#a55eea', // Purple
  '#2ed573', // Mint
  '#ff6b6b', // Red
  '#747d8c'  // Gray
]

// Helper to normalize data structure
const normalizeData = (data) => {
  // If data is a simple array, wrap it in an array to make it multi-series compatible
  if (Array.isArray(data) && !Array.isArray(data[0])) {
    return [data]
  }
  return data
}

// Bar chart renderer
const renderBarChart = (data, options) => {
  const { 
    labels = [], 
    series = [], 
    stacked = false,
    chartHeight = 150
  } = options

  // Normalize data to multi-series format
  const normalizedData = normalizeData(data)
  
  // Calculate max value for scaling
  const maxValue = stacked 
    ? Math.max(...normalizedData[0].map((_, colIndex) => 
        normalizedData.reduce((sum, row) => sum + (row[colIndex] || 0), 0)
      ))
    : Math.max(...normalizedData.flat())

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'flex-end', 
      height: `${chartHeight}px`, 
      gap: '8px',
      padding: '1rem 0'
    }}>
      {/* For each label/column */}
      {labels.map((label, colIndex) => {
        // For stacked bars, we stack all series values for this column
        // For regular bars, we place series side by side
        return (
          <div key={colIndex} style={{ 
            flex: 1, 
            textAlign: 'center',
            display: 'flex',
            flexDirection: stacked ? 'column-reverse' : 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            height: '100%'
          }}>
            {/* Render each series as a bar */}
            {normalizedData.map((seriesData, seriesIndex) => {
              const value = seriesData[colIndex] || 0
              const height = (value / maxValue) * chartHeight
              
              // For stacked bars, calculate position based on previous bars
              const stackedHeight = stacked 
                ? (value / maxValue) * chartHeight
                : (value / maxValue) * chartHeight
              
              return (
                <div 
                  key={seriesIndex} 
                  style={{ 
                    height: `${stackedHeight}px`,
                    backgroundColor: colorPalette[seriesIndex % colorPalette.length],
                    borderRadius: stacked 
                      ? (seriesIndex === normalizedData.length - 1 ? '4px 4px 0 0' : '0')
                      : '4px 4px 0 0',
                    width: stacked ? '100%' : `${80 / normalizedData.length}%`,
                    margin: stacked ? '0' : '0 2px',
                    minWidth: '10px',
                    position: 'relative'
                  }}
                  title={`${series[seriesIndex] || `Series ${seriesIndex + 1}`}: ${value}`}
                >
                  {/* Optional value label on bar */}
                  {value > maxValue * 0.15 && (
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      left: 0,
                      right: 0,
                      textAlign: 'center',
                      fontSize: '0.7rem',
                      color: 'white'
                    }}>
                      {value}
                    </div>
                  )}
                </div>
              )
            })}
            {/* Column label */}
            <div style={{ 
              marginTop: '0.5rem', 
              fontSize: '0.8rem',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {label}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Line chart renderer
const renderLineChart = (data, options) => {
  const { 
    labels = [], 
    series = [],
    chartHeight = 150
  } = options

  // Normalize data to multi-series format
  const normalizedData = normalizeData(data)
  
  // Calculate max value for scaling
  const maxValue = Math.max(...normalizedData.flat())
  const width = 100 / (labels.length - 1 || 1) // Width percentage between points
  
  return (
    <div style={{ 
      position: 'relative',
      height: `${chartHeight}px`, 
      padding: '1rem 0',
      marginBottom: '2rem'
    }}>
      {/* Render each series as a line */}
      {normalizedData.map((seriesData, seriesIndex) => {
        const color = colorPalette[seriesIndex % colorPalette.length]
        
        return (
          <div key={seriesIndex}>
            {/* Line segments */}
            {seriesData.map((value, pointIndex) => {
              if (pointIndex === seriesData.length - 1) return null
              
              const startHeight = (seriesData[pointIndex] / maxValue) * chartHeight
              const endHeight = (seriesData[pointIndex + 1] / maxValue) * chartHeight
              const startX = pointIndex * width
              const endX = (pointIndex + 1) * width
              
              // Calculate line angle
              const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endHeight - startHeight, 2))
              const angle = Math.atan2(endHeight - startHeight, endX - startX) * 180 / Math.PI
              
              return (
                <div 
                  key={pointIndex}
                  style={{
                    position: 'absolute',
                    bottom: `${startHeight}px`,
                    left: `${startX}%`,
                    width: `${length}px`,
                    height: '2px',
                    backgroundColor: color,
                    transformOrigin: '0 50%',
                    transform: `rotate(${angle}deg)`,
                    zIndex: 1
                  }}
                />
              )
            })}
            
            {/* Data points */}
            {seriesData.map((value, pointIndex) => {
              const height = (value / maxValue) * chartHeight
              
              return (
                <div 
                  key={`point-${pointIndex}`}
                  style={{
                    position: 'absolute',
                    bottom: `${height}px`,
                    left: `${pointIndex * width}%`,
                    width: '8px',
                    height: '8px',
                    backgroundColor: color,
                    borderRadius: '50%',
                    transform: 'translate(-50%, 50%)',
                    zIndex: 2,
                    boxShadow: '0 0 0 2px rgba(0,0,0,0.1)'
                  }}
                  title={`${series[seriesIndex] || `Series ${seriesIndex + 1}`}: ${value}`}
                />
              )
            })}
          </div>
        )
      })}
      
      {/* X-axis labels */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: '-25px',
        left: 0,
        right: 0
      }}>
        {labels.map((label, index) => (
          <div 
            key={index} 
            style={{ 
              fontSize: '0.8rem',
              textAlign: 'center',
              width: `${100 / labels.length}%`
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

// Pie chart renderer
const renderPieChart = (data, options) => {
  const { 
    labels = [],
    chartHeight = 150
  } = options

  // Flatten data if it's multi-series
  const flatData = Array.isArray(data[0]) ? data[0] : data
  
  // Calculate total for percentages
  const total = flatData.reduce((sum, value) => sum + value, 0)
  
  // Calculate segments
  let currentAngle = 0
  const segments = flatData.map((value, index) => {
    const percentage = (value / total) * 100
    const angle = (percentage / 100) * 360
    const startAngle = currentAngle
    currentAngle += angle
    
    return {
      value,
      percentage,
      startAngle,
      angle,
      color: colorPalette[index % colorPalette.length],
      label: labels[index] || `Segment ${index + 1}`
    }
  })
  
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '1rem 0',
      gap: '1rem'
    }}>
      {/* Pie chart */}
      <div style={{ 
        width: `${chartHeight}px`, 
        height: `${chartHeight}px`,
        borderRadius: '50%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {segments.map((segment, index) => (
          <div 
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: segment.color,
              clipPath: `polygon(50% 50%, 50% 0%, ${generateArcPoints(segment.startAngle, segment.angle)}, 50% 0%)`,
              transform: `rotate(${segment.startAngle}deg)`,
              transformOrigin: 'center'
            }}
            title={`${segment.label}: ${segment.value} (${segment.percentage.toFixed(1)}%)`}
          />
        ))}
      </div>
      
      {/* Legend */}
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        fontSize: '0.8rem'
      }}>
        {segments.map((segment, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: segment.color,
              borderRadius: '2px'
            }} />
            <div>{segment.label}: {segment.percentage.toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper function to generate arc points for pie chart
const generateArcPoints = (startAngle, angle) => {
  // For simplicity, we'll use a polygon approximation
  // More points = smoother curve
  const points = []
  const steps = Math.max(Math.ceil(angle / 5), 1) // One point every 5 degrees
  
  for (let i = 0; i <= steps; i++) {
    const currentAngle = (i / steps) * angle * Math.PI / 180
    const x = 50 + 50 * Math.sin(currentAngle)
    const y = 50 - 50 * Math.cos(currentAngle)
    points.push(`${x}% ${y}%`)
  }
  
  return points.join(', ')
}

// Main Chart component
const Chart = ({ data, name }) => {
  if (!data || !data.data || !Array.isArray(data.data)) return null

  // Extract chart options
  const { 
    type = 'bar',
    data: chartData,
    labels = [],
    series = [],
    title = name,
    stacked = false
  } = data

  // Chart options
  const options = {
    labels,
    series,
    stacked,
    chartHeight: 150
  }

  // Render the appropriate chart type
  const renderChartContent = () => {
    switch(type) {
      case 'line': return renderLineChart(chartData, options)
      case 'pie': return renderPieChart(chartData, options)
      case 'bar':
      default: return renderBarChart(chartData, options)
    }
  }

  return (
    <div className="card chart">
      <h3>{(title || name).charAt(0).toUpperCase() + (title || name).slice(1)}</h3>
      
      {/* Series legend for multi-series charts */}
      {Array.isArray(chartData[0]) && series.length > 0 && type !== 'pie' && (
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '0.5rem',
          fontSize: '0.8rem'
        }}>
          {series.map((seriesName, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: colorPalette[index % colorPalette.length],
                borderRadius: '2px'
              }} />
              <div>{seriesName}</div>
            </div>
          ))}
        </div>
      )}
      
      {/* Chart content */}
      {renderChartContent()}
    </div>
  )
}

export default Chart
