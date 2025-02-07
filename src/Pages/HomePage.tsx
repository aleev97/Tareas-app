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
      <div className="flex justify-center items-center mt-4">
  <button
    onClick={() => setIsEditorOpen(true)}
    className="relative group p-3 text-white rounded-full bg-gradient-to-r from-purple-600 to-purple-700 font-semibold text-lg sm:text-xl w-48 sm:w-60 h-12 shadow-lg flex items-center justify-center 
    transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-2xl"
  >
    Crear nueva tarea
    {/* Efecto de brillo envolvente */}
    <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
    {/* Efecto de borde dinámico */}
    <span className="absolute inset-0 border-2 border-transparent rounded-full group-hover:border-purple-400 transition-all duration-300"></span>
  </button>
</div>

      <div className="flex flex-col sm:flex-row items-center sm:absolute sm:top-6 sm:right-10 mt-4 gap-2">
        <label
          htmlFor="filter"
          className="text-sm sm:text-base font-medium text-gray-800"
        >
          Filtrar tareas:
        </label>
        <div className="relative w-40">
          <select
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            className="w-full appearance-none px-4 py-2 bg-violet-200 text-gray-900 rounded-lg shadow-md text-sm sm:text-base font-medium focus:ring-2 focus:ring-violet-400 transition-all"
          >
            <option value="all">Todas</option>
            <option value="completed">Completadas</option>
            <option value="pending">Pendientes</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
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