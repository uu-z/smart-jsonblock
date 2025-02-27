# Smart JSON Component Renderer

A modern React application that intelligently renders components based on JSON data patterns or explicit type declarations. This project uses Tailwind CSS with Shadcn-inspired design principles.

## Features

- **Intelligent Component Matching**: Automatically selects the appropriate component based on data structure
- **Convention Over Configuration**: Supports both automatic detection and explicit type declaration
- **Flexible Layout Options**: Grid, dashboard, and named area layouts
- **Responsive Design**: Adapts to different screen sizes
- **Modern Styling**: Uses Tailwind CSS with Shadcn-inspired design tokens

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/smart-json-renderer.git
cd smart-json-renderer
```

2. Install dependencies

```bash
npm install
# or
yarn
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

```jsx
import JSONBlock from "./components/JSONBlock";

// Your JSON data
const data = {
  title: "Example Dashboard",
  description: "A sample dashboard with various components",
  stats: {
    _type: "statCard", // Explicit type declaration
    value: "1,234",
    label: "Total Users",
  },
  // Component type will be auto-detected based on data structure
  recentActivity: {
    items: [
      { user: "John", action: "Created a post", time: "2 hours ago" },
      { user: "Jane", action: "Updated profile", time: "4 hours ago" },
    ],
  },
};

// Render the components
function App() {
  return (
    <div className="container">
      <JSONBlock data={data} />
    </div>
  );
}
```

## Layout Types

### Basic Layout

Renders components in a vertical list.

### Grid Layout

Arranges components in a grid with configurable columns.

```jsx
{
  _layout: "grid",
  _columns: 3,

  mainChart: {
    _type: "chart",
    _span: 3,  // Span all 3 columns
    // ...
  },

  sidebar: {
    _type: "userCard",
    _span: 1,  // Span 1 column
    // ...
  }
}
```

### Dashboard Layout

Specialized grid layout for dashboard widgets with headers and footers.

### Named Areas Layout

CSS Grid-like named template areas for complex layouts.

## Styling

This project uses Tailwind CSS with custom design tokens inspired by Shadcn UI. The color scheme and component styles follow modern design principles with support for both light and dark modes.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

# JSONBlock - Convention Over Configuration

A React component library that emphasizes "convention over configuration" to simplify development and reduce boilerplate code.

## Core Philosophy

This project is built around the principle of "convention over configuration," which means:

1. **Smart defaults** - Components automatically detect the best way to render data
2. **Reduced boilerplate** - Minimal configuration required to get started
3. **Progressive enhancement** - Basic features work with zero config, advanced features available when needed
4. **Consistent patterns** - Standardized data structures across components

## Key Components

### JSONBlock

The core component that intelligently renders JSON data by selecting the appropriate component based on data structure.

```jsx
<JSONBlock data={myData} />
```

### SmartCard

A versatile card component that automatically detects the appropriate card type based on the data structure.

```jsx
// Basic usage - automatically detects card type
<SmartCard data={{
  title: "Card Title",
  content: "Card content goes here"
}} />

// Stat card - automatically detected by content structure
<SmartCard data={{
  title: "Monthly Sales",
  content: {
    value: "$12,500",
    description: "+15% from last month"
  }
}} />

// Media card - automatically detected by image property
<SmartCard data={{
  title: "Beautiful Scenery",
  image: "/images/scenery.jpg",
  content: "A beautiful mountain landscape"
}} />
```

### SmartLayout

An intelligent layout system that adapts to content structure and device characteristics.

```jsx
<SmartLayout
  data={{
    title: "Dashboard",
    items: [
      { title: "Item 1", content: "Content 1" },
      {
        title: "Item 2",
        content: { value: "5,230", description: "Total Users" },
      },
    ],
  }}
/>
```

## Content Type System

The library uses a standardized content type system that allows components to automatically detect and render content appropriately:

- **Text Content**: Simple string values
- **Stat Content**: Objects with `value` and optional `description`
- **Media Content**: Objects with `image` and optional `caption`
- **List Content**: Objects with an `items` array
- **Custom Content**: Objects with a `_type` property for custom components

## Recent Improvements

1. **Standardized Content Types**: Created a unified content type system in `contentTypes.js`
2. **Simplified Rendering Logic**: Each component now has direct rendering logic without dependencies
3. **Consistent Class Naming**: Standardized CSS class naming conventions
4. **Reduced Code Duplication**: Eliminated duplicate code across components
5. **Better Type Detection**: Improved content type detection with dedicated utility functions

## Getting Started

```jsx
import { JSONBlock, SmartCard, SmartLayout } from "./components";

// Simple example
const App = () => (
  <div className="app">
    <SmartCard
      data={{
        title: "Welcome",
        content: "This card automatically uses the basic card type",
      }}
    />

    <SmartLayout
      data={{
        title: "Dashboard",
        items: [
          {
            title: "Sales",
            content: {
              value: "$45,231",
              description: "+12% from last month",
            },
          },
          {
            title: "Users",
            content: {
              value: "1,205",
              description: "Active users",
            },
          },
        ],
      }}
    />
  </div>
);
```

## Benefits of Convention Over Configuration

- **Reduced Development Time**: 90% less configuration code
- **Improved Maintainability**: Centralized rendering logic
- **Better Consistency**: Standardized patterns across components
- **Enhanced Flexibility**: Components adapt to data without explicit configuration
- **Progressive Disclosure**: Simple use cases are simple, complex use cases are possible
