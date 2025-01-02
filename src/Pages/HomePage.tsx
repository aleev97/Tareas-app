import React, { useState } from "react";
import { TaskList } from "../Components/TaskList";
import TaskEditor from "../Components/TaskEditor";
import NoteCanvas from "../Components/NoteCanvas"; // Asegúrate de importar el componente NoteCanvas

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
  const [showCanvas, setShowCanvas] = useState(false); // Estado para controlar el lienzo

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

  const toggleCanvas = () => {
    setShowCanvas((prevState) => !prevState);
  };

  return (
    <div className="p-4">
      <h1 className="text-5xl font-extrabold text-center mb-20 leading-tight tracking-wide 
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent 
              bg-clip-text shadow-xl shadow-black-500/50 relative">
        Lista de Tareas
        <span className="text-black absolute right-96 top-1/3 transform -translate-y-1/2 text-5xl">📝</span>
      </h1>
      <div className="text-center flex justify-center space-x-8">
        <button
          onClick={toggleCanvas}
          className="mb-3 p-3 text-white border-2 border-transparent rounded-md bg-gradient-to-r from-purple-600 to-purple-700 hover:border-purple-400 hover:border-3 font-semibold text-lg w-40 h-12 transition-all ease-in-out transform hover:scale-110 shadow-lg flex items-center justify-center"
        >
          Pizarrón
        </button>
        {showCanvas && <NoteCanvas />}
        <button
          onClick={() => setIsEditorOpen(true)}
          className="mb-3 p-3 text-white border-2 border-transparent rounded-md bg-gradient-to-r from-purple-600 to-purple-700 hover:border-purple-400 hover:border-3 font-semibold text-lg w-48 h-12 transition-all ease-in-out transform hover:scale-110 shadow-lg flex items-center justify-center"
        >
          Crear nueva tarea
        </button>
      </div>
      <div className="absolute top-20 right-4 mt-4 mr-4 mb-2 flex flex-col items-center">
        <label htmlFor="filter" className="block text-l font-semibold text-gray-900 text-center">
          Filtrar tareas por estado
        </label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="mt-1 block w-36 px-3 py-1.5 bg-violet-200 border border-stone-950 rounded-lg shadow-sm text-center text-s focus:ring-slate-900 focus:border-teal-700"
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