import React from 'react'
import UserCard from './patterns/UserCard'
import StatsList from './patterns/StatsList'
import Chart from './patterns/Chart'
import ItemTable from './patterns/ItemTable'
import ActionButtons from './patterns/ActionButtons'
import ProgressBar from './patterns/ProgressBar'
import LocationMap from './patterns/LocationMap'
import GenericDisplay from './patterns/GenericDisplay'
import ArrayRenderer from './patterns/ArrayRenderer'

// Component registry - maps type names to components
const componentMap = {
  userCard: UserCard,
  statsList: StatsList,
  chart: Chart,
  itemTable: ItemTable,
  actionButtons: ActionButtons,
  progressBar: ProgressBar,
  locationMap: LocationMap,
  array: ArrayRenderer  // This is used for explicit _type: "array" declarations
}

// Pattern matchers for backward compatibility and automatic detection
const patternMatchers = [
  {
    type: 'userCard',
    matcher: (data) => 
      typeof data === 'object' && 
      data !== null && 
      'name' in data && 
      'avatar' in data
  },
  {
    type: 'statsList',
    matcher: (data) => 
      Array.isArray(data) && 
      data.length > 0 && 
      data.every(item => 
        typeof item === 'object' && 
        item !== null && 
        'label' in item && 
        'value' in item
      )
  },
  {
    type: 'chart',
    matcher: (data) => 
      typeof data === 'object' && 
      data !== null && 
      'type' in data && 
      'data' in data && 
      Array.isArray(data.data)
  },
  {
    type: 'itemTable',
    matcher: (data) => 
      Array.isArray(data) && 
      data.length > 0 && 
      data.every(item => 
        typeof item === 'object' && 
        item !== null && 
        'id' in item && 
        'name' in item
      )
  },
  {
    type: 'actionButtons',
    matcher: (data) => 
      Array.isArray(data) && 
      data.length > 0 && 
      data.every(item => 
        typeof item === 'object' && 
        item !== null && 
        'text' in item && 
        'type' in item
      )
  },
  {
    type: 'progressBar',
    matcher: (data) => 
      typeof data === 'object' && 
      data !== null && 
      'current' in data && 
      'total' in data
  },
  {
    type: 'locationMap',
    matcher: (data) => 
      typeof data === 'object' && 
      data !== null && 
      'lat' in data && 
      'lng' in data
  },
  {
    type: 'array',
    matcher: (data) => Array.isArray(data)
  }
]

// Find the appropriate component based on data
const resolveComponent = (data, key) => {
  // Convention over configuration: Check for _type field first
  if (data && typeof data === 'object' && !Array.isArray(data) && '_type' in data) {
    const requestedType = data._type;
    return componentMap[requestedType] || GenericDisplay;
  }
  
  // Backward compatibility: Use pattern matching
  for (const { type, matcher } of patternMatchers) {
    if (matcher(data)) {
      return componentMap[type] || GenericDisplay;
    }
  }
  
  return GenericDisplay;
}

// Process data before passing to component
const processComponentData = (data, componentType) => {
  // For chart components, we need to pass the entire object
  if (componentType === 'chart') {
    return data;
  }
  
  // For other components that expect an array, extract the data array
  // This is useful for components that expect an array but we're using _type in an object wrapper
  if (data && typeof data === 'object' && !Array.isArray(data) && '_type' in data && 'data' in data && Array.isArray(data.data)) {
    return data.data;
  }
  
  return data;
}

const JSONBlock = ({ data, layout = 'list', columns = 2 }) => {
  if (!data || typeof data !== 'object') {
    return <div>Invalid data provided</div>
  }

  // Handle top-level array
  if (Array.isArray(data)) {
    return <ArrayRenderer data={data} name="Array Data" />
  }

  // Filter out _type field and other metadata fields
  const entries = Object.entries(data).filter(([key]) => 
    key !== '_type' && key !== '_layout' && key !== '_columns'
  );

  // Check if layout is specified in the data
  const dataLayout = data._layout || layout;
  const dataColumns = data._columns || columns;

  // Grid layout styles
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${dataColumns}, 1fr)`,
    gap: '1rem',
    gridAutoRows: 'minmax(100px, auto)'
  };

  // List layout styles
  const listStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  return (
    <div 
      className={`json-block json-block-${dataLayout}`}
      style={dataLayout === 'grid' ? gridStyles : listStyles}
    >
      {entries.map(([key, value]) => {
        const Component = resolveComponent(value, key);
        
        // Determine component type
        let componentType = null;
        if (value && typeof value === 'object' && !Array.isArray(value) && '_type' in value) {
          componentType = value._type;
        } else {
          // Try to find matching pattern
          for (const { type, matcher } of patternMatchers) {
            if (matcher(value)) {
              componentType = type;
              break;
            }
          }
        }
        
        const processedData = processComponentData(value, componentType);
        
        // Determine if this component should span multiple columns
        const span = (value && typeof value === 'object' && !Array.isArray(value) && '_span' in value) 
          ? value._span 
          : 1;
        
        // Component wrapper styles
        const wrapperStyles = {
          gridColumn: dataLayout === 'grid' && span > 1 ? `span ${Math.min(span, dataColumns)}` : undefined,
        };
        
        return (
          <div 
            key={key} 
            className={`component-wrapper component-type-${componentType || 'unknown'}`}
            style={wrapperStyles}
          >
            <Component data={processedData} name={key} />
          </div>
        )
      })}
    </div>
  )
}

export default JSONBlock
