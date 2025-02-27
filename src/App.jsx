import React from "react"
import { useState } from 'react'
import JSONBlock from './components/JSONBlock'
import './App.css'

function App() {
  // Basic examples with explicit type declarations
  const basicExamples = {
    title: "Smart JSON Renderer Demo",
    description: "This demo shows how components are automatically matched based on data patterns or explicit type declarations",
    
    // Using explicit type declaration with _type
    customUser: {
      _type: "userCard",
      name: "Jane Smith",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      role: "Designer"
    },
    
    // Original pattern-matched data (still works)
    user: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "Developer"
    },
    
    // Using explicit type declaration with data array
    customStats: {
      _type: "statsList",
      data: [
        { label: "Projects", value: 15 },
        { label: "Tasks", value: 50 },
        { label: "Completed", value: 35 }
      ]
    },
    
    // Original pattern-matched data
    stats: [
      { label: "Projects", value: 12 },
      { label: "Tasks", value: 42 },
      { label: "Completed", value: 30 }
    ],
    
    chart: {
      type: "bar",
      data: [10, 25, 15, 30, 20, 40],
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    },
    
    items: [
      { id: 1, name: "Item 1", price: 29.99, inStock: true },
      { id: 2, name: "Item 2", price: 39.99, inStock: false },
      { id: 3, name: "Item 3", price: 19.99, inStock: true }
    ],
    
    actions: [
      { text: "Save", type: "primary" },
      { text: "Cancel", type: "secondary" }
    ],
    
    // Using explicit type declaration
    customProgress: {
      _type: "progressBar",
      current: 75,
      total: 100,
      label: "Custom Progress"
    },
    
    // Original pattern-matched data
    progress: {
      current: 65,
      total: 100
    },
    
    location: {
      lat: 37.7749,
      lng: -122.4194,
      name: "San Francisco"
    }
  }
  
  // Advanced examples with complex nested structures
  const advancedExamples = {
    title: "Advanced JSON Rendering Examples",
    description: "These examples demonstrate more complex data structures and nested components",
    
    // Complex nested component example
    dashboard: {
      _type: "userCard",
      name: "Team Dashboard",
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      role: "Admin Panel",
      // Nested components inside a component
      details: {
        _type: "statsList",
        data: [
          { label: "Team Members", value: 8 },
          { label: "Active Projects", value: 12 },
          { label: "Completion Rate", value: "87%" }
        ]
      }
    },
    
    // Mixed component types in an array
    mixedComponents: [
      {
        _type: "progressBar",
        current: 85,
        total: 100,
        label: "Project Alpha"
      },
      {
        _type: "progressBar",
        current: 32,
        total: 100,
        label: "Project Beta"
      },
      {
        _type: "chart",
        type: "line",
        data: [5, 10, 15, 20, 25, 30],
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"]
      }
    ],
    
    // Complex data visualization
    projectOverview: {
      _type: "chart",
      type: "bar",
      data: [
        [10, 20, 30, 40],  // Team 1
        [15, 25, 35, 45],  // Team 2
        [5, 15, 25, 35]    // Team 3
      ],
      labels: ["Q1", "Q2", "Q3", "Q4"],
      series: ["Team 1", "Team 2", "Team 3"],
      title: "Quarterly Performance",
      stacked: true
    },
    
    // Nested location data
    locations: [
      {
        _type: "locationMap",
        lat: 37.7749,
        lng: -122.4194,
        name: "San Francisco HQ",
        details: {
          address: "123 Tech Street",
          employees: 150,
          established: 2010
        }
      },
      {
        _type: "locationMap",
        lat: 40.7128,
        lng: -74.0060,
        name: "New York Office",
        details: {
          address: "456 Innovation Avenue",
          employees: 75,
          established: 2015
        }
      }
    ],
    
    // Complex table with nested data
    teamMembers: {
      _type: "itemTable",
      columns: ["Name", "Role", "Projects", "Status"],
      data: [
        { 
          id: 1, 
          name: "Alice Johnson", 
          role: "Lead Developer",
          projects: [
            { id: 101, name: "Website Redesign" },
            { id: 102, name: "API Integration" }
          ],
          status: "Active"
        },
        { 
          id: 2, 
          name: "Bob Smith", 
          role: "UX Designer",
          projects: [
            { id: 101, name: "Website Redesign" }
          ],
          status: "On Leave"
        },
        { 
          id: 3, 
          name: "Carol Davis", 
          role: "Backend Developer",
          projects: [
            { id: 102, name: "API Integration" },
            { id: 103, name: "Database Migration" }
          ],
          status: "Active"
        }
      ]
    },
    
    // Dynamic action buttons with context
    contextActions: {
      _type: "actionButtons",
      context: "project-dashboard",
      data: [
        { text: "Add Task", type: "primary", icon: "plus" },
        { text: "Generate Report", type: "secondary", icon: "document" },
        { text: "Share Dashboard", type: "secondary", icon: "share" },
        { text: "Settings", type: "tertiary", icon: "gear" }
      ]
    }
  }
  
  // Example of a top-level array with mixed component types
  const arrayExamples = [
    // Each item can specify its own component type
    { 
      id: 1, 
      _type: "userCard",
      name: "Project Alpha", 
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "High Priority"
    },
    { 
      id: 2, 
      _type: "progressBar",
      current: 65,
      total: 100,
      label: "Project Beta Progress"
    },
    { 
      id: 3, 
      _type: "chart",
      type: "pie",
      data: [30, 50, 20],
      labels: ["Complete", "In Progress", "Not Started"],
      title: "Project Gamma Status"
    },
    // Regular item that will use pattern matching
    { 
      id: 4, 
      name: "Project Delta", 
      category: "Research",
      status: "Active"
    }
  ]

  // State for controlling which example set to display
  const [activeExample, setActiveExample] = useState('basic')
  const [showConventionInfo, setShowConventionInfo] = useState(false)

  // Get the current data set based on active example
  const getCurrentData = () => {
    switch(activeExample) {
      case 'advanced': return advancedExamples
      case 'array': return arrayExamples
      case 'basic':
      default: return basicExamples
    }
  }

  return (
    <div className="container">
      <h1>Smart JSON Component Renderer</h1>
      <p>This system intelligently matches components based on data patterns or explicit type declarations.</p>
      
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveExample('basic')}
          style={{ 
            backgroundColor: activeExample === 'basic' ? '#4a90e2' : '#333',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Basic Examples
        </button>
        <button 
          onClick={() => setActiveExample('advanced')}
          style={{ 
            backgroundColor: activeExample === 'advanced' ? '#4a90e2' : '#333',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Advanced Examples
        </button>
        <button 
          onClick={() => setActiveExample('array')}
          style={{ 
            backgroundColor: activeExample === 'array' ? '#4a90e2' : '#333',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Array Examples
        </button>
        <button 
          onClick={() => setShowConventionInfo(!showConventionInfo)}
          style={{ 
            backgroundColor: showConventionInfo ? '#e24a4a' : '#333',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showConventionInfo ? 'Hide Convention Info' : 'Show Convention Info'}
        </button>
      </div>
      
      {showConventionInfo && (
        <div className="info-panel" style={{ 
          backgroundColor: '#2a2a2a', 
          padding: '1rem', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <h3>Convention Over Configuration</h3>
          <p>This improved version supports two ways to render components:</p>
          <ol>
            <li><strong>Explicit Type Declaration:</strong> Add an <code>_type</code> field to your data object</li>
            <li><strong>Pattern Matching:</strong> The original automatic detection based on data structure</li>
          </ol>
          <p>Example with explicit type:</p>
          <pre>{`{
  customComponent: {
    _type: "userCard",  // Explicitly tells which component to use
    name: "Jane Smith",
    avatar: "url/to/avatar.jpg"
  }
}`}</pre>
          <p>Benefits of convention over configuration:</p>
          <ul>
            <li>More explicit and predictable rendering</li>
            <li>Allows for custom data structures that don't match pattern rules</li>
            <li>Supports nested components and complex hierarchies</li>
            <li>Maintains backward compatibility with pattern matching</li>
          </ul>
        </div>
      )}
      
      <JSONBlock data={getCurrentData()} />
      
      <div className="code-example">
        <h3>How to use:</h3>
        <pre>{`<JSONBlock data={yourJsonData} />`}</pre>
        <p>The system will automatically render appropriate components based on data structure or explicit type declaration.</p>
      </div>
    </div>
  )
}

export default App
