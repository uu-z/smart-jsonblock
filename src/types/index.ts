/**
 * Central type definitions for the JSONBlock system
 * Convention over configuration: Using TypeScript to enforce consistent patterns
 */

// Re-export all layout types
export * from './layout';

// Component type definitions
export type ComponentType =
    | 'userCard'
    | 'statsList'
    | 'chart'
    | 'itemTable'
    | 'actionButtons'
    | 'progressBar'
    | 'locationMap'
    | 'array'
    | 'gridLayout'
    | 'advancedGridLayout'
    | 'dashboardLayout'
    | 'unifiedLayout'
    | 'smartCard'
    | 'generic';

// Base JSON data interface
export interface BaseJSONData {
    _type?: ComponentType;
    _layout?: 'list' | 'grid';
    _columns?: number;
    _span?: number;
    [key: string]: any;
}

// JSONBlock component props
export interface JSONBlockProps {
    data: BaseJSONData | any[] | any;
    layout?: 'list' | 'grid';
    columns?: number;
}

// Pattern matcher interface
export interface PatternMatcher {
    type: ComponentType;
    matcher: (data: any) => boolean;
}

// Component props interface
export interface ComponentProps {
    data: any;
    name: string;
} 