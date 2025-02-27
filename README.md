# JSONBlock

A smart, convention-over-configuration JSON renderer for React applications built with TypeScript and Tailwind CSS.

## 🌟 Features

- **Smart Component Detection**: Automatically detects and renders appropriate components based on data structure
- **TypeScript Integration**: Full TypeScript support with comprehensive type definitions
- **Convention Over Configuration**: Minimizes boilerplate through intelligent defaults
- **Flexible Layouts**: Supports list, grid, and advanced dashboard layouts
- **Responsive Design**: Built with Tailwind CSS for responsive, beautiful UI
- **Dark Mode Support**: Seamless light/dark mode switching

## 🚀 Getting Started

### Installation

```bash
npm install json-block
# or
yarn add json-block
```

### Basic Usage

```tsx
import { JSONBlock } from "json-block";

function App() {
  const data = {
    userProfile: {
      name: "John Doe",
      avatar: "https://example.com/avatar.jpg",
      role: "Developer",
    },
    statistics: [
      { label: "Projects", value: 12 },
      { label: "Tasks", value: 34 },
      { label: "Completed", value: 28 },
    ],
  };

  return <JSONBlock data={data} />;
}
```

## 📖 Convention Over Configuration

This library follows the "convention over configuration" principle to reduce complexity and maintenance costs:

1. **Automatic Component Detection**: Components are automatically selected based on data structure
2. **Explicit Type Declaration**: Use `_type` field for explicit component selection
3. **Consistent Patterns**: Standardized data structures for common UI patterns
4. **Smart Defaults**: Sensible defaults that work for most use cases
5. **Type Safety**: TypeScript ensures correct usage and provides autocompletion

### Example: Automatic Detection vs Explicit Configuration

```tsx
// Automatic detection - JSONBlock detects this is a user card
const implicitData = {
  userProfile: {
    name: "John Doe",
    avatar: "https://example.com/avatar.jpg",
  },
};

// Explicit configuration - Same result, but with explicit type
const explicitData = {
  userProfile: {
    _type: "userCard",
    name: "John Doe",
    avatar: "https://example.com/avatar.jpg",
  },
};
```

## 🧩 Component Types

JSONBlock supports the following component types:

| Type            | Description              | Required Fields                    |
| --------------- | ------------------------ | ---------------------------------- |
| `userCard`      | User profile card        | `name`, `avatar`                   |
| `statsList`     | List of statistics       | Array of `{ label, value }`        |
| `chart`         | Data visualization       | `type`, `data`                     |
| `itemTable`     | Table of items           | Array of objects with `id`, `name` |
| `actionButtons` | Button group             | Array of `{ text, type }`          |
| `progressBar`   | Progress indicator       | `current`, `total`                 |
| `locationMap`   | Map display              | `lat`, `lng`                       |
| `smartCard`     | Versatile card component | `title`, `content`                 |
| `gridLayout`    | Grid layout system       | `items`                            |
| `unifiedLayout` | Advanced layout system   | `title`, `items`                   |

## 🔧 Advanced Usage

### Layout Control

```tsx
// Grid layout with 3 columns
<JSONBlock data={data} layout="grid" columns={3} />;

// Or specify in the data
const data = {
  _layout: "grid",
  _columns: 3,
  // ... content
};
```

### Component Spanning

```tsx
const data = {
  chart: {
    _type: "chart",
    _span: 2, // Span 2 columns in grid layout
    type: "bar",
    data: [
      /* ... */
    ],
  },
};
```

### Unified Layout System

```tsx
const dashboardData = {
  _type: "unifiedLayout",
  title: "Dashboard",
  description: "Performance overview",
  items: [
    {
      title: "Revenue",
      content: { value: "$12,345" },
      colSpan: 2,
    },
    {
      title: "Users",
      content: { value: "1,234" },
    },
  ],
  config: {
    columns: 4,
    gap: "1rem",
    responsive: true,
  },
};
```

## 🛠️ TypeScript Refactoring

This project has been fully refactored to TypeScript with a focus on:

1. **Type Safety**: Comprehensive type definitions for all components and data structures
2. **Consistent Patterns**: Standardized component interfaces and props
3. **Developer Experience**: Improved autocompletion and error detection
4. **Maintainability**: Reduced complexity through type-driven development

### Type System

The type system is organized around:

- **Component Types**: Enumeration of all supported component types
- **Base Interfaces**: Common properties shared across components
- **Specialized Interfaces**: Type-specific properties and constraints
- **Type Guards**: Runtime validation of data structures

### Convention Over Configuration in TypeScript

TypeScript enhances our convention over configuration approach by:

- **Type Inference**: Automatically detecting appropriate types
- **Default Values**: Providing type-safe defaults
- **Interface Composition**: Building complex types from simpler ones
- **Documentation**: Self-documenting code through types

## 🧪 Development

### Project Structure

```
src/
├── components/
│   ├── JSONBlock.tsx       # Main component
│   └── patterns/           # Individual component patterns
├── types/                  # TypeScript type definitions
├── App.tsx                 # Demo application
└── main.tsx                # Entry point
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📝 License

ISC License
