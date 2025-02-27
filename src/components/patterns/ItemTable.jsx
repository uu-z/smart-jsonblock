import React from 'react'

const ItemTable = ({ data, name }) => {
  if (!Array.isArray(data) || data.length === 0) return null

  // Get all unique keys from all objects
  const allKeys = [...new Set(data.flatMap(item => Object.keys(item)))]

  return (
    <div className="card item-table">
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {allKeys.map(key => (
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
                {allKeys.map(key => (
                  <td key={key} style={{ padding: '0.5rem', borderBottom: '1px solid #444' }}>
                    {typeof item[key] === 'boolean' 
                      ? item[key] ? '✓' : '✗'
                      : item[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ItemTable
