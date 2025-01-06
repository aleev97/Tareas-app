import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TasksState } from "../../types";

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]").map((task: Task) => ({
    ...task,
    priority: task.priority || "media", // Valor predeterminado para tareas existentes
    dueDate: task.dueDate || null, // Asignar valor por defecto a la fecha límite
  })),
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const newTask = { 
        ...action.payload, 
        priority: action.payload.priority || "media", // Valor predeterminado
        createdAt: action.payload.createdAt || new Date().toISOString(), // Fecha de creación
        dueDate: action.payload.dueDate || null, // Fecha límite (puede ser nula)
      };
      state.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        // Mantener la fecha de creación y la fecha límite si no se proporcionan
        state.tasks[index] = {
          ...action.payload,
          createdAt: state.tasks[index].createdAt || action.payload.createdAt || new Date().toISOString(),
          dueDate: state.tasks[index].dueDate || action.payload.dueDate || null, // Si no tiene, se asigna `null`
        };
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
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.tasks[index].completed = !state.tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    
    deleteCompletedTasks: (state) => {
      state.tasks = state.tasks.filter(task => !task.completed);
    },
  },
});

export const { addTask, editTask, deleteTask, toggleCompleted, deleteCompletedTasks } = tasksSlice.actions;
export default tasksSlice.reducer;