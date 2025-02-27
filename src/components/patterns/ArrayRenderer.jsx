import React from 'react'
import JSONBlock from '../JSONBlock'

// Import all component types that might be used in arrays with _type
import UserCard from './UserCard'
import StatsList from './StatsList'
import Chart from './Chart'
import ItemTable from './ItemTable'
import ActionButtons from './ActionButtons'
import ProgressBar from './ProgressBar'
import LocationMap from './LocationMap'
import GenericDisplay from './GenericDisplay'

// Process data before passing to component (similar to JSONBlock)
const processComponentData = (data, componentType) => {
  // For chart components, we need to pass the entire object
  if (componentType === 'chart') {
    return data;
  }
  
  // For other components that expect an array, extract the data array
  if (data && typeof data === 'object' && !Array.isArray(data) && '_type' in data && 'data' in data && Array.isArray(data.data)) {
    return data.data;
  }
  
  return data;
}

// Define the ArrayRenderer component first
const ArrayRenderer = ({ data, name }) => {
  if (!Array.isArray(data)) return null

  // Check if array contains items with _type field
  const hasTypedItems = data.some(item => 
    typeof item === 'object' && 
    item !== null && 
    !Array.isArray(item) && 
    '_type' in item
  )

  // If array has typed items, render each with its specified component
  if (hasTypedItems) {
    return (
      <div className="card array-renderer typed-items">
        <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
        <div className="typed-array-items">
          {data.map((item, index) => {
            // If item has _type, use the specified component
            if (typeof item === 'object' && item !== null && !Array.isArray(item) && '_type' in item) {
              const componentType = item._type;
              const Component = componentMap[componentType] || GenericDisplay;
              const processedData = processComponentData(item, componentType);
              
              return (
                <div key={index} className="typed-array-item" style={{ 
                  margin: '0.75rem 0', 
                  padding: '0.5rem',
                  border: '1px solid #444',
                  borderRadius: '4px'
                }}>
                  <Component data={processedData} name={`Item ${index + 1}`} />
                </div>
              );
            }
            
            // Otherwise, render normally
            return (
              <div key={index} className="typed-array-item" style={{ 
                margin: '0.75rem 0', 
                padding: '0.5rem',
                border: '1px solid #444',
                borderRadius: '4px'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Item {index + 1}</div>
                {typeof item === 'object' && item !== null ? (
                  Array.isArray(item) ? (
                    <ArrayRenderer data={item} name={`Array ${index + 1}`} />
                  ) : (
                    <JSONBlock data={item} />
                  )
                ) : (
                  <div>{String(item)}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Original array rendering logic for arrays without _type fields
  // Determine array type
  const isPrimitive = data.every(item => 
    typeof item !== 'object' || item === null
  )
  
  const isUniformObject = data.length > 0 && 
    typeof data[0] === 'object' && 
    data[0] !== null &&
    !Array.isArray(data[0]) &&
    data.every(item => 
      typeof item === 'object' && 
      item !== null && 
      !Array.isArray(item)
    )

  const isNestedArray = data.some(item => Array.isArray(item))

  // Render based on array type
  return (
    <div className="card array-renderer">
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      
      {isPrimitive && (
        <div className="primitive-array">
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.5rem' 
          }}>
            {data.map((item, index) => (
              <div key={index} style={{ 
                padding: '0.5rem', 
                backgroundColor: '#333', 
                borderRadius: '4px',
                minWidth: '2rem',
                textAlign: 'center'
              }}>
                {String(item)}
              </div>
            ))}
          </div>
        </div>
      )}

      {isUniformObject && (
        <div className="object-array">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {Object.keys(data[0]).map(key => (
                    <th key={key} style={{ 
                      textAlign: 'left', 
                      padding: '0.5rem', 
                      borderBottom: '1px solid #666' 
                    }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    {Object.entries(item).map(([key, value]) => (
                      <td key={key} style={{ padding: '0.5rem', borderBottom: '1px solid #444' }}>
                        {typeof value === 'object' && value !== null 
                          ? JSON.stringify(value).substring(0, 30) + (JSON.stringify(value).length > 30 ? '...' : '')
                          : typeof value === 'boolean'
                            ? value ? '✓' : '✗'
                            : String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isNestedArray && (
        <div className="nested-array">
          {data.map((item, index) => (
            <div key={index} style={{ 
              margin: '0.5rem 0', 
              padding: '0.5rem',
              border: '1px solid #444',
              borderRadius: '4px'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Item {index + 1}</div>
              {Array.isArray(item) ? (
                <ArrayRenderer data={item} name={`Nested Array ${index + 1}`} />
              ) : (
                typeof item === 'object' && item !== null ? (
                  <JSONBlock data={item} />
                ) : (
                  <div>{String(item)}</div>
                )
              )}
            </div>
          ))}
        </div>
      )}

      {!isPrimitive && !isUniformObject && !isNestedArray && (
        <div className="mixed-array">
          {data.map((item, index) => (
            <div key={index} style={{ 
              margin: '0.5rem 0', 
              padding: '0.5rem',
              border: '1px solid #444',
              borderRadius: '4px'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Item {index + 1}</div>
              {typeof item === 'object' && item !== null ? (
                Array.isArray(item) ? (
                  <ArrayRenderer data={item} name={`Array ${index + 1}`} />
                ) : (
                  <JSONBlock data={item} />
                )
              ) : (
                <div>{String(item)}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Component registry - maps type names to components (same as in JSONBlock)
// Define this AFTER ArrayRenderer to avoid the circular reference
const componentMap = {
  userCard: UserCard,
  statsList: StatsList,
  chart: Chart,
  itemTable: ItemTable,
  actionButtons: ActionButtons,
  progressBar: ProgressBar,
  locationMap: LocationMap
  // Removed 'array: ArrayRenderer' to avoid circular reference
}

export default ArrayRenderer
