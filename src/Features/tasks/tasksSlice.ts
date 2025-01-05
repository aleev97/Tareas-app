import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  content: string;
  color: string;
  font: string;
  textColor: string;
  image?: string;
  createdAt: string;
  style: "common" | "chalkboard" | "grid" | "stripes" | "folded";
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      console.log("Agregando tarea:", action.payload); // Depuración
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      } else {
        state.tasks.push(action.payload);
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },    
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleCompleted: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task)=> task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      } 
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteCompletedTasks: (state) => {
      state.tasks = state.tasks.filter(task => !task.completed);
    },
  },
});

export const { addTask, editTask, deleteTask, toggleCompleted, deleteCompletedTasks } = tasksSlice.actions;
export default tasksSlice.reducer;