import React from "react"
import { useState } from 'react'
import JSONBlock from './components/JSONBlock'
import './App.css'

function App() {
  // Example JSON data with different patterns
  const exampleData = {
    title: "Smart JSON Renderer Demo",
    description: "This demo shows how components are automatically matched based on data patterns",
    user: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "Developer"
    },
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
    progress: {
      current: 65,
      total: 100
    },
    location: {
      lat: 37.7749,
      lng: -122.4194,
      name: "San Francisco"
    },
    // New array examples
    primitiveArray: [1, 2, 3, 4, 5, 10, 15, 20],
    stringArray: ["Apple", "Banana", "Cherry", "Date", "Elderberry"],
    mixedArray: [1, "two", true, { name: "object" }, [1, 2, 3]],
    nestedArrays: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ],
    complexData: [
      { id: 1, data: [10, 20, 30], active: true },
      { id: 2, data: [15, 25, 35], active: false },
      { id: 3, data: [5, 15, 25], active: true }
    ]
  }

  // Example of a top-level array
  const arrayData = [
    { id: 1, name: "First Item", category: "A" },
    { id: 2, name: "Second Item", category: "B" },
    { id: 3, name: "Third Item", category: "A" },
    { id: 4, name: "Fourth Item", category: "C" }
  ]

  const [showArrayExample, setShowArrayExample] = useState(false)

  return (
    <div className="container">
      <h1>Smart JSON Component Renderer</h1>
      <p>This system intelligently matches components based on data patterns.</p>
      
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setShowArrayExample(!showArrayExample)}>
          {showArrayExample ? 'Show Object Example' : 'Show Array Example'}
        </button>
      </div>
      
      {showArrayExample ? (
        <JSONBlock data={arrayData} />
      ) : (
        <JSONBlock data={exampleData} />
      )}
      
      <div className="code-example">
        <h3>How to use:</h3>
        <pre>{`<JSONBlock data={yourJsonData} />`}</pre>
        <p>The system will automatically render appropriate components based on data structure.</p>
      </div>
    </div>
  )
}

export default App
