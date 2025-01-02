import React, { useState } from "react";
import { TaskList } from "../Components/TaskList";
import TaskEditor from "../Components/TaskEditor";

const HomePage: React.FC = () => {
  const [editingTask, setEditingTask] = useState<{
    id: string;
    content: string;
    color: string;
    font: string;
    textColor: string;
    image?: string;
    style?: "common" | "chalkboard";
  } | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const handleEdit = (taskId: string) => {
    const taskToEdit = {
      id: taskId,
      content: "",
      color: "",
      font: "",
      textColor: "",
    };
    setEditingTask(taskToEdit);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setEditingTask(null);
    setIsEditorOpen(false);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as "all" | "completed" | "pending");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Tareas</h1>
      <button
        onClick={() => setIsEditorOpen(true)}
        className="mb-4 p-2 bg-green-500 text-white rounded"
      >
        Crear nueva tarea
      </button>
      <div className="mb-4">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>
      </div>
      <TaskList onEdit={handleEdit} filter={filter} />
      {isEditorOpen && (
        <TaskEditor
          taskToEdit={editingTask || { id: "", content: "", color: "", font: "", textColor: "" }}
          onSave={handleCloseEditor}
        />
      )}
    </div>
  );
};

export default HomePage;
