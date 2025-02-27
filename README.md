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
