// Advanced examples with complex nested structures
import type {
    BaseJSONData,
    ComponentType
} from "../types";
import type {
    Action
} from "../types/layout";

// Define interfaces for the nested data structures
interface Project {
    id: number;
    name: string;
}

interface TeamMember {
    id: number;
    name: string;
    role: string;
    projects: Project[];
    status: string;
}

interface LocationDetails {
    address: string;
    employees: number;
    established: number;
}

interface LocationData extends BaseJSONData {
    _type: "locationMap";
    lat: number;
    lng: number;
    name: string;
    details: LocationDetails;
}

interface ProgressData extends BaseJSONData {
    _type: "progressBar";
    current: number;
    total: number;
    label: string;
}

interface ChartData extends BaseJSONData {
    _type: "chart";
    type: string;
    data: number[] | number[][];
    labels?: string[];
    series?: string[];
    title?: string;
    stacked?: boolean;
}

interface ContextActions extends BaseJSONData {
    _type: "actionButtons";
    context: string;
    data: Action[];
}

// Define the main interface for the examples object
interface AdvancedExamples {
    title: string;
    description: string;
    dashboard: BaseJSONData & {
        _type: "userCard";
        name: string;
        avatar: string;
        role: string;
        details: BaseJSONData & {
            _type: "statsList";
            data: Array<{
                label: string;
                value: string | number;
            }>;
        };
    };
    mixedComponents: Array<ProgressData | ChartData>;
    projectOverview: ChartData;
    locations: LocationData[];
    teamMembers: BaseJSONData & {
        _type: "itemTable";
        columns: string[];
        data: TeamMember[];
    };
    contextActions: ContextActions;
    [key: string]: any;
}

const advancedExamples: AdvancedExamples = {
    title: "Advanced JSON Rendering Examples",
    description:
        "These examples demonstrate more complex data structures and nested components",

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
                { label: "Completion Rate", value: "87%" },
            ],
        },
    },

    // Mixed component types in an array
    mixedComponents: [
        {
            _type: "progressBar",
            current: 85,
            total: 100,
            label: "Project Alpha",
        },
        {
            _type: "progressBar",
            current: 32,
            total: 100,
            label: "Project Beta",
        },
        {
            _type: "chart",
            type: "line",
            data: [5, 10, 15, 20, 25, 30],
            labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
        },
    ],

    // Complex data visualization
    projectOverview: {
        _type: "chart",
        type: "bar",
        data: [
            [10, 20, 30, 40], // Team 1
            [15, 25, 35, 45], // Team 2
            [5, 15, 25, 35], // Team 3
        ],
        labels: ["Q1", "Q2", "Q3", "Q4"],
        series: ["Team 1", "Team 2", "Team 3"],
        title: "Quarterly Performance",
        stacked: true,
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
                established: 2010,
            },
        },
        {
            _type: "locationMap",
            lat: 40.7128,
            lng: -74.006,
            name: "New York Office",
            details: {
                address: "456 Innovation Avenue",
                employees: 75,
                established: 2015,
            },
        },
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
                    { id: 102, name: "API Integration" },
                ],
                status: "Active",
            },
            {
                id: 2,
                name: "Bob Smith",
                role: "UX Designer",
                projects: [{ id: 101, name: "Website Redesign" }],
                status: "On Leave",
            },
            {
                id: 3,
                name: "Carol Davis",
                role: "Backend Developer",
                projects: [
                    { id: 102, name: "API Integration" },
                    { id: 103, name: "Database Migration" },
                ],
                status: "Active",
            },
        ],
    },

    // Dynamic action buttons with context
    contextActions: {
        _type: "actionButtons",
        context: "project-dashboard",
        data: [
            { text: "Add Task", variant: "primary", icon: "plus" },
            { text: "Generate Report", variant: "secondary", icon: "document" },
            { text: "Share Dashboard", variant: "secondary", icon: "share" },
            { text: "Settings", variant: "secondary", icon: "gear" },
        ],
    },
};

export default advancedExamples; 