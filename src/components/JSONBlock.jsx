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

// Component registry with pattern matching functions
const componentRegistry = [
  {
    matcher: (key, data) => 
      typeof data === 'object' && 
      data !== null && 
      'name' in data && 
      'avatar' in data,
    component: UserCard
  },
  {
    matcher: (key, data) => 
      Array.isArray(data) && 
      data.length > 0 && 
      data.every(item => 
        typeof item === 'object' && 
        item !== null && 
        'label' in item && 
        'value' in item
      ),
    component: StatsList
  },
  {
    matcher: (key, data) => 
      typeof data === 'object' && 
      data !== null && 
      'type' in data && 
      'data' in data && 
      Array.isArray(data.data),
    component: Chart
  },
  {
    matcher: (key, data) => 
      Array.isArray(data) && 
      data.length > 0 && 
      data.every(item => 
        typeof item === 'object' && 
        item !== null && 
        'id' in item && 
        'name' in item
      ),
    component: ItemTable
  },
  {
    matcher: (key, data) => 
      Array.isArray(data) && 
      data.length > 0 && 
      data.every(item => 
        typeof item === 'object' && 
        item !== null && 
        'text' in item && 
        'type' in item
      ),
    component: ActionButtons
  },
  {
    matcher: (key, data) => 
      typeof data === 'object' && 
      data !== null && 
      'current' in data && 
      'total' in data,
    component: ProgressBar
  },
  {
    matcher: (key, data) => 
      typeof data === 'object' && 
      data !== null && 
      'lat' in data && 
      'lng' in data,
    component: LocationMap
  },
  {
    // Generic array handler for arrays that don't match other patterns
    matcher: (key, data) => Array.isArray(data),
    component: ArrayRenderer
  }
]

// Find the appropriate component based on data pattern
const findComponent = (key, data) => {
  for (const { matcher, component } of componentRegistry) {
    if (matcher(key, data)) {
      return component
    }
  }
  return GenericDisplay
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
        const Component = findComponent(key, value)
        return (
          <div key={key} className="component-wrapper">
            <Component data={value} name={key} />
          </div>
        )
      })}
    </div>
  )
}

export default JSONBlock
