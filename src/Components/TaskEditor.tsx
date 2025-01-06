import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../Features/tasks/tasksSlice";
import { v4 as uuidv4 } from "uuid";
import { TaskEditProps } from "../types";

export const TaskEditor: React.FC<TaskEditProps> = ({ taskToEdit, onSave, onCancel }) => {
  const [task, setTask] = useState({
    content: taskToEdit?.content || "",
    color: taskToEdit?.color || "#ffffff",
    font: taskToEdit?.font || "Arial",
    textColor: taskToEdit?.textColor || "#000000",
    style: taskToEdit?.style || "common",
    image: taskToEdit?.image || undefined,
    priority: taskToEdit?.priority || "baja",
    dueDate: taskToEdit?.dueDate || "", // Cambiado de tipo "date" a "datetime-local"
  });



  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleChange = (key: string, value: string | undefined) => {
    setTask((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!task.content.trim()) {
      alert("El contenido no puede estar vacío.");
      return;
    }

    const newTask = {
      ...task,
      id: taskToEdit?.id || uuidv4(),
      completed: false,
      createdAt: taskToEdit?.createdAt || new Date().toISOString(),
    };

    if (taskToEdit) {
      dispatch(editTask(newTask));
    } else {
      dispatch(addTask(newTask));
    }
    onSave();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setImagePreview(reader.result as string);
        handleChange("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getTextareaStyle = () => {
    switch (task.style) {
      case "grid":
        return {
          backgroundImage: `linear-gradient(90deg, #f0f0f0 1px, transparent 1px), linear-gradient(#f0f0f0 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          color: task.textColor,
        };
      case "stripes":
        return {
          backgroundImage: `repeating-linear-gradient(0deg, #e2e2e2, #e2e2e2 1px, transparent 2px, transparent 17px)`,
          color: task.textColor,
        };
      case "folded":
        return {
          backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')`,
          backgroundSize: "cover",
          color: task.textColor,
        };
      default:
        return task.image
          ? {
            backgroundColor: task.color,
            color: task.textColor,
          }
          : { backgroundColor: task.color, color: task.textColor };
    }
  };

  const handleCancel = () => {
    setTask({
      content: taskToEdit?.content || "",
      color: taskToEdit?.color || "#ffffff",
      font: taskToEdit?.font || "Arial",
      textColor: taskToEdit?.textColor || "#000000",
      style: taskToEdit?.style || "common",
      image: taskToEdit?.image || undefined,
      priority: taskToEdit?.priority || "baja",
      dueDate: taskToEdit?.dueDate || "", // Restaurar la fecha si existe
    });
    setImagePreview(null);
    onCancel();
  };

  return (
    <div className="p-3 max-w-xl h-auto mx-auto rounded-lg shadow-xl border-2 border-violet-700 bg-opacity-60 backdrop-blur-md bg-violet-400 overflow-y-auto max-h-[100vh]">
      <textarea
        className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-violet-700 transition duration-300 ease-in-out bg-opacity-50 backdrop-blur-md"
        value={task.content}
        onChange={(e) => handleChange("content", e.target.value)}
        placeholder="Escribe tu tarea..."
        style={{ ...getTextareaStyle(), fontFamily: task.font }}
      />
      <div className="mt-4 flex flex-col space-y-2">
        <div className="flex flex-col">
          <label className="text-l font-semibold text-gray-800">Fecha y hora límite:</label>
          <input
            type="datetime-local"
            value={task.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            className="p-2 rounded-lg shadow-md border-none cursor-pointer w-44"
          />
        </div>
        <label className="text-l font-semibold text-gray-800">Prioridad:</label>
        <select
          value={task.priority}
          onChange={(e) => handleChange("priority", e.target.value)}
          className="p-2 rounded-lg shadow-md border-none cursor-pointer w-44"
        >
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        <div className="flex justify-start mt-4 space-x-4">
          <div className="flex flex-col">
            <label className="text-l font-semibold text-gray-800">Color de fondo:</label>
            <input
              type="color"
              value={task.color}
              onChange={(e) => handleChange("color", e.target.value)}
              className="w-6 h-6 bg-violet-300 border-none rounded-full transition duration-300"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-l font-semibold text-gray-800">Color de texto:</label>
            <input
              type="color"
              value={task.textColor}
              onChange={(e) => handleChange("textColor", e.target.value)}
              className="w-6 h-6 bg-violet-300 border-none rounded-full transition duration-300"
            />
          </div>
        </div>
        <label className="text-l font-semibold text-gray-800">Fuente:</label>
        <select
          value={task.font}
          onChange={(e) => handleChange("font", e.target.value)}
          className="p-2 rounded-lg shadow-md border-none cursor-pointer w-44"
        >
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>
        <label className="text-l font-semibold text-gray-800">Estilo:</label>
        <select
          value={task.style}
          onChange={(e) => handleChange("style", e.target.value)}
          className="p-2 rounded-lg shadow-md border-none cursor-pointer w-44"
        >
          <option value="common">Simple</option>
          <option value="grid">Cuadriculado</option>
          <option value="stripes">Rayas</option>
          <option value="folded">Arrugado</option>
        </select>
        <label className="text-l font-semibold text-gray-800">Imagen (opcional):</label>
        <div className="relative w-full group flex">
          <div className="relative z-40 cursor-pointer group-hover:translate-x-4 group-hover:shadow-2xl group-hover:-translate-y-4 transition-all duration-500 bg-slate-200 flex items-center justify-center h-10 w-10 rounded-xl mr-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <svg
              className="h-6 w-6 text-black/60"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              height="10"
              width="10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
              <path d="M7 9l5 -5l5 5"></path>
              <path d="M12 4l0 12"></path>
            </svg>
          </div>
          <div className="absolute border opacity-0 group-hover:opacity-80 transition-all duration-300 border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-10 w-10 rounded-xl"></div>
        </div>
        {imagePreview && (
          <div className="mt-4 flex justify-center">
            <img
              src={imagePreview}
              alt="Vista previa"
              className="w-32 h-32 object-contain"
            />
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleSave}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
        >
          Guardar
        </button>
        <button
          onClick={handleCancel}
          className="p-2 bg-white text-black rounded hover:bg-gray-600 hover:text-white transition-all"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};