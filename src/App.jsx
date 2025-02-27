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
    }
  }

  return (
    <div className="container">

      <JSONBlock data={exampleData} />
      
    </div>
  )
}

export default App
