export interface TaskCardProps {
    task: {
        dueDate: string | number | Date;
        id: string;
        color: string;
        textColor: string;
        font: string;
        content: string;
        completed: boolean;
        createdAt: string;
        priority: "alta" | "media" | "baja";
        image?: string;
        style?: "common" | "chalkboard" | "grid" | "stripes" | "folded";
    };
    onEdit: () => void;
    onDelete: () => void;
    onToggleCompleted: (id: string) => void;
}

export interface TaskEditProps {
    taskToEdit?: {
        id: string;
        content: string;
        color: string;
        font: string;
        textColor: string;
        image?: string;
        style?: "common" | "grid" | "stripes" | "folded";
        createdAt?: string;
        priority?: "baja" | "media" | "alta";
        dueDate?: string; // Added dueDate property
        completed?: boolean;
    };

    onSave: () => void;
    onCancel: () => void;
}

export interface TaskListProps {
    onEdit: (id: string) => void;
    filter: "all" | "completed" | "pending";
}

export interface Task {
    id: string;
    content: string;
    priority: "alta" | "media" | "baja";
    createdAt: string;
    dueDate?: string | null;
    completed?: boolean;
    color: string;
    font: string;
    textColor: string;
    image?: string;
    style: "common" | "chalkboard" | "grid" | "stripes" | "folded";  
}

export interface TasksState {
    tasks: Task[];
}