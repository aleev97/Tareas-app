import React, { useState } from "react";
import { TaskList } from "../Components/TaskList";
import { TaskEditor } from "../Components/TaskEditor";

const HomePage: React.FC = () => {
  const [editingTask, setEditingTask] = useState<{
    id: string;
    content: string;
    color: string;
    font: string;
    textColor: string;
    image?: string;
    style?: "common";
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
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white/60 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <h1 className="text-3xl sm:text-6xl font-bold text-center gap-1 mb-8 sm:mb-6 p-12 sm:p-10 tracking-tight 
           bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent 
           bg-clip-text flex justify-center">
        Lista de Tareas
        <span className="text-black p-2 sm:p-2 text-3xl sm:text-5xl relative -top-1.5">📝</span>
      </h1>
      <div className="flex justify-center items-center mt-4 sm:mt-4">
        <button
          onClick={() => setIsEditorOpen(true)}
          className="p-3 text-white border-2 border-transparent rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:border-purple-400 font-semibold text-lg sm:text-xl w-48 sm:w-60 h-12 transition-all ease-in-out transform hover:scale-110 shadow-lg flex items-center justify-center"
        >
          Crear nueva tarea
        </button>
      </div>
      <div className="flex flex-col items-center sm:items-start sm:absolute sm:top-4 sm:right-10 mt-4">
        <label htmlFor="filter" className="block text-sm sm:text-base font-semibold text-gray-900 text-center">
          Filtrar tareas por estado
        </label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="mt-2 block w-36 sm:w-48 px-3 py-1.5 bg-violet-200 border border-stone-950 rounded-lg shadow-sm text-center text-sm sm:text-base focus:ring-slate-900 focus:border-teal-700"
        >
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>
      </div>
      <div className="mt-6 sm:mt-8">
        <TaskList onEdit={handleEdit} filter={filter} />
      </div>
      {isEditorOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 backdrop-blur-sm z-50">
          <div className="p-6 rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl">
            <TaskEditor
              taskToEdit={editingTask || { id: "", content: "", color: "", font: "", textColor: "" }}
              onSave={handleCloseEditor}
              onCancel={handleCloseEditor}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;