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
  array: ArrayRenderer
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
const processComponentData = (data) => {
  // If data has _type and a data property that's an array, use that as the main data
  // This is useful for components that expect an array but we're using _type in an object wrapper
  if (data && typeof data === 'object' && !Array.isArray(data) && '_type' in data && 'data' in data && Array.isArray(data.data)) {
    return data.data;
  }
  
  return data;
}

const JSONBlock = ({ data }) => {
  if (!data || typeof data !== 'object') {
    return <div>Invalid data provided</div>
  }

  // Handle top-level array
  if (Array.isArray(data)) {
    return <ArrayRenderer data={data} name="Array Data" />
  }

  return (
    <div className="json-block">
      {Object.entries(data).map(([key, value]) => {
        // Skip rendering _type field
        if (key === '_type') return null;
        
        const Component = resolveComponent(value, key);
        const processedData = processComponentData(value);
        
        return (
          <div key={key} className="component-wrapper">
            <Component data={processedData} name={key} />
          </div>
        )
      })}
    </div>
  )
}

export default JSONBlock
