import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../Features/tasks/tasksSlice";
import { v4 as uuidv4 } from "uuid";

export interface TaskEditProps {
  taskToEdit: {
    id: string;
    content: string;
    color: string;
    font: string;
    textColor: string;
    image?: string;
    style?: "common" | "chalkboard" | "grid" | "stripes" | "folded";
  } | null;
  onSave: () => void;
  onCancel: () => void;  // Agregado para manejar la cancelación
}

const TaskEditor: React.FC<TaskEditProps> = ({ taskToEdit, onSave, onCancel }) => {
  const [task, setTask] = useState({
    content: taskToEdit?.content || "",
    color: taskToEdit?.color || "#ffffff",
    font: taskToEdit?.font || "Arial",
    textColor: taskToEdit?.textColor || "#000000",
    style: taskToEdit?.style || "common",
    image: taskToEdit?.image || undefined,
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
      case "chalkboard":
        return {
          backgroundColor: "#333",
          fontFamily: "Chalkduster, Comic Sans MS, cursive",
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

  // Función para manejar la cancelación y restablecer los valores del formulario
  const handleCancel = () => {
    setTask({
      content: taskToEdit?.content || "",
      color: taskToEdit?.color || "#ffffff",
      font: taskToEdit?.font || "Arial",
      textColor: taskToEdit?.textColor || "#000000",
      style: taskToEdit?.style || "common",
      image: taskToEdit?.image || undefined,
    });
    setImagePreview(null); // Limpiar la vista previa de la imagen
    onCancel(); // Llamar a la función onCancel pasada como prop
  };

  return (
    <div className="p-6 max-w-xl mx-auto rounded-lg shadow-xl border-2 border-gray-400 bg-white">
      <textarea
        className="w-full p-4 border rounded-lg text-lg"
        value={task.content}
        onChange={(e) => handleChange("content", e.target.value)}
        placeholder="Escribe tu tarea..."
        style={{
          ...getTextareaStyle(),
          fontFamily: task.font,
        }}
      />
      <div className="mt-4 flex flex-col space-y-2">
        <div className="flex flex-col">
          <label className="text-l font-semibold text-gray-800">Color de fondo:</label>
          <input
            type="color"
            value={task.color}
            onChange={(e) => handleChange("color", e.target.value)}
            className="w-6 h-6 border-none rounded-full transition duration-300"
          />
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
        <label className="text-l font-semibold text-gray-800">Color de texto:</label>
        <input
          type="color"
          value={task.textColor}
          className="w-6 h-6 border-none rounded-full transition duration-300"
          onChange={(e) => handleChange("textColor", e.target.value)}
        />

        <label className="text-l font-semibold text-gray-800">Estilo:</label>
        <select
          value={task.style}
          onChange={(e) => handleChange("style", e.target.value)}
          className="p-2 rounded-lg shadow-md border-none cursor-pointer w-44"
        >
          <option value="common">Simple</option>
          <option value="chalkboard">Pizarrón</option>
          <option value="grid">Cuadriculado</option>
          <option value="stripes">Rayas</option>
          <option value="folded">Arrugado</option>
        </select>

        <label className="text-l font-semibold text-gray-800">Imagen (opcional):</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imagePreview && (
          <div className="mt-4 flex justify-center">
            <img
              src={imagePreview}
              alt="Vista previa"
              className="w-32 h-32 object-contain border rounded"
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
          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-all"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default TaskEditor;