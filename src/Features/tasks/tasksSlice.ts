import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
    id: string;
    content: string;
    color: string;
    font: string;
    textColor: string;
    completed: boolean;
    image?: string;
    style?: 'common' | 'chalkboard';
}

export interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        editTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index >= 0) {
                state.tasks[index] = action.payload;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
    },
});

export const { addTask, editTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;