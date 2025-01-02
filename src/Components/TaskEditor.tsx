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
    style?: "common" | "chalkboard";
  } | null;
  onSave: () => void;
}

const TaskEditor: React.FC<TaskEditProps> = ({ taskToEdit, onSave }) => {
  const [task, setTask] = useState({
    content: taskToEdit?.content || "",
    color: taskToEdit?.color || "#ffffff",
    font: taskToEdit?.font || "Arial",
    textColor: taskToEdit?.textColor || "#000000",
    style: taskToEdit?.style || "common",
    image: taskToEdit?.image || undefined,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null); // Nuevo estado para la vista previa de la imagen

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
      
      // Mostrar la vista previa de la imagen
      reader.onload = () => {
        setImagePreview(reader.result as string); // Guardamos la URL temporal de la imagen
        handleChange("image", reader.result as string); // Guardamos la imagen en el estado de la tarea
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`p-4 ${task.style === "chalkboard" ? "bg-gray-700 text-white" : "bg-white text-black"}`}>
      <textarea
        className="w-full p-2 border rounded"
        value={task.content}
        onChange={(e) => handleChange("content", e.target.value)}
        placeholder="Escribe tu tarea..."
      />
      <div className="mt-4 flex flex-col space-y-2">
        <input
          type="color"
          value={task.color}
          onChange={(e) => handleChange("color", e.target.value)}
        />
        <select
          value={task.font}
          onChange={(e) => handleChange("font", e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
        <input
          type="color"
          value={task.textColor}
          onChange={(e) => handleChange("textColor", e.target.value)}
        />
        <select
          value={task.style}
          onChange={(e) => handleChange("style", e.target.value as "common" | "chalkboard")}
        >
          <option value="common">Nota común</option>
          <option value="chalkboard">Pizarrón</option>
        </select>

        {/* Campo para seleccionar la imagen */}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        
        {/* Vista previa de la imagen */}
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Vista previa"
              className="w-32 h-32 object-contain" // Cambié el tamaño a 128x128 px
            />
          </div>
        )}
      </div>
      
      <button onClick={handleSave} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Guardar
      </button>
    </div>
  );
};

export default TaskEditor;