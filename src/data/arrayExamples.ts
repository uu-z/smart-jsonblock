// Example of a top-level array with mixed component types
import type {
    BaseJSONData,
    ComponentType
} from "../types";

// Define interfaces for the different item types
interface UserCardItem extends BaseJSONData {
    id: number;
    _type: "userCard";
    name: string;
    avatar: string;
    role: string;
}

interface ProgressBarItem extends BaseJSONData {
    id: number;
    _type: "progressBar";
    current: number;
    total: number;
    label: string;
}

interface ChartItem extends BaseJSONData {
    id: number;
    _type: "chart";
    type: string;
    data: number[];
    labels: string[];
    title: string;
}

interface GenericItem {
    id: number;
    name: string;
    category: string;
    status: string;
}

// Define the array type as a union of possible item types
type ArrayExampleItem = UserCardItem | ProgressBarItem | ChartItem | GenericItem;

const arrayExamples: ArrayExampleItem[] = [
    // Each item can specify its own component type
    {
        id: 1,
        _type: "userCard",
        name: "Project Alpha",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        role: "High Priority",
    },
    {
        id: 2,
        _type: "progressBar",
        current: 65,
        total: 100,
        label: "Project Beta Progress",
    },
    {
        id: 3,
        _type: "chart",
        type: "pie",
        data: [30, 50, 20],
        labels: ["Complete", "In Progress", "Not Started"],
        title: "Project Gamma Status",
    },
    // Regular item that will use pattern matching
    {
        id: 4,
        name: "Project Delta",
        category: "Research",
        status: "Active",
    },
];

export default arrayExamples; 