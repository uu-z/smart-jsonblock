// Basic examples with explicit type declarations
import type {
    BaseJSONData,
    ComponentType
} from "../types";
import type {
    SmartCardData
} from "../types/layout";

// Define the interface for the examples object
interface BasicExamples {
    title: string;
    description: string;
    customUser: BaseJSONData & {
        _type: "userCard";
        name: string;
        avatar: string;
        role: string;
    };
    user: {
        name: string;
        avatar: string;
        role: string;
    };
    customStats: BaseJSONData & {
        _type: "statsList";
        data: Array<{
            label: string;
            value: number;
        }>;
    };
    stats: Array<{
        label: string;
        value: number;
    }>;
    chart: {
        type: string;
        data: number[];
        labels: string[];
    };
    items: Array<{
        id: number;
        name: string;
        price: number;
        inStock: boolean;
    }>;
    actions: Array<{
        text: string;
        type: string;
    }>;
    customProgress: BaseJSONData & {
        _type: "progressBar";
        current: number;
        total: number;
        label: string;
    };
    progress: {
        current: number;
        total: number;
    };
    location: {
        lat: number;
        lng: number;
        name: string;
    };
    [key: string]: any;
}

const basicExamples: BasicExamples = {
    title: "Smart JSON Renderer Demo",
    description:
        "This demo shows how components are automatically matched based on data patterns or explicit type declarations",

    // Using explicit type declaration with _type
    customUser: {
        _type: "userCard",
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        role: "Designer",
    },

    // Original pattern-matched data (still works)
    user: {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        role: "Developer",
    },

    // Using explicit type declaration with data array
    customStats: {
        _type: "statsList",
        data: [
            { label: "Projects", value: 15 },
            { label: "Tasks", value: 50 },
            { label: "Completed", value: 35 },
        ],
    },

    // Original pattern-matched data
    stats: [
        { label: "Projects", value: 12 },
        { label: "Tasks", value: 42 },
        { label: "Completed", value: 30 },
    ],

    chart: {
        type: "bar",
        data: [10, 25, 15, 30, 20, 40],
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },

    items: [
        { id: 1, name: "Item 1", price: 29.99, inStock: true },
        { id: 2, name: "Item 2", price: 39.99, inStock: false },
        { id: 3, name: "Item 3", price: 19.99, inStock: true },
    ],

    actions: [
        { text: "Save", type: "primary" },
        { text: "Cancel", type: "secondary" },
    ],

    // Using explicit type declaration
    customProgress: {
        _type: "progressBar",
        current: 75,
        total: 100,
        label: "Custom Progress",
    },

    // Original pattern-matched data
    progress: {
        current: 65,
        total: 100,
    },

    location: {
        lat: 37.7749,
        lng: -122.4194,
        name: "San Francisco",
    },
};

export default basicExamples; 