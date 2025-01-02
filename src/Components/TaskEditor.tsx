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

  const getBackgroundStyle = () => {
    switch (task.style) {
      case "grid":
        return "background-image: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px;";
      case "stripes":
        return "background-image: repeating-linear-gradient(0deg, #e2e2e2, #e2e2e2 1px, transparent 1px, transparent 10px);";
      case "folded":
        return "background-image: url('https://www.transparenttextures.com/patterns/fancy-gravel.png'); background-size: cover; background-position: top left;";
      default:
        return task.image ? `background-image: url(${task.image}); background-size: cover;` : "";
    }
  };

  return (
    <div
      className={`p-6 max-w-xl mx-auto rounded-lg shadow-xl ${task.style === "chalkboard" ? "bg-gray-700 text-white" : "bg-white text-black"
        } border-2 border-gray-300`}
      style={{ ...task.style && { background: getBackgroundStyle() } }}
    >
      <textarea
        className="w-full p-4 border rounded-lg text-lg"
        value={task.content}
        onChange={(e) => handleChange("content", e.target.value)}
        placeholder="Escribe tu tarea..."
        style={{
          fontFamily: task.font,
          backgroundColor: task.color,
          color: task.textColor,
        }}
      />
      <div className="mt-4 flex flex-col space-y-2">
        <label>Color de fondo:</label>
        <input
          type="color"
          value={task.color}
          onChange={(e) => handleChange("color", e.target.value)}
        />
        <label className="text-sm">Fuente:</label>
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
          <option value="Tahoma">Tahoma</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
          <option value="Impact">Impact</option>
          <option value="Palatino Linotype">Palatino Linotype</option>
          <option value="Lucida Console">Lucida Console</option>
          <option value="Roboto">Roboto</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Lato">Lato</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Raleway">Raleway</option>
          <option value="Oswald">Oswald</option>
          <option value="Playfair Display">Playfair Display</option>
          <option value="Merriweather">Merriweather</option>
          <option value="Poppins">Poppins</option>
          <option value="Lora">Lora</option>
          <option value="Droid Sans">Droid Sans</option>
          <option value="Ubuntu">Ubuntu</option>
          <option value="Nunito">Nunito</option>
          <option value="Indie Flower">Indie Flower</option>
          <option value="Pacifico">Pacifico</option>
          <option value="Dancing Script">Dancing Script</option>
        </select>
        <label>Color de texto:</label>
        <input
          type="color"
          value={task.textColor}
          onChange={(e) => handleChange("textColor", e.target.value)}
        />

        <label>Imagen de fondo (opcional):</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Vista previa"
              className="w-32 h-32 object-contain"
            />
          </div>
        )}
      </div>

      <button
        onClick={handleSave}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
      >
        Guardar
      </button>
    </div>
  );
};

export default TaskEditor;