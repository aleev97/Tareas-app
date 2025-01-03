import React from "react";
import { motion } from "framer-motion";

interface TaskCardProps {
  task: {
    id: string;
    color: string;
    textColor: string;
    font: string;
    content: string;
    completed: boolean;
    image?: string;
    style?: "common" | "chalkboard" | "grid" | "stripes" | "folded";
  };
  onEdit: () => void;
  onDelete: () => void;
  onToggleCompleted: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = React.memo(({ task, onEdit, onDelete, onToggleCompleted }) => {
  
  const getCardStyle = () => {
    switch (task.style) {
      case "grid":
        return {
          backgroundImage: `linear-gradient(90deg, #f0f0f0 1px, transparent 1px), linear-gradient(#f0f0f0 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        };
      case "stripes":
        return {
          backgroundImage: `repeating-linear-gradient(0deg, #e2e2e2, #e2e2e2 1px, transparent 1px, transparent 10px)`,
        };
      case "folded":
        return {
          backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')`,
          backgroundSize: "cover",
        };
      case "chalkboard":
        return {
          backgroundColor: "#333",
          color: "#fff",
          fontFamily: "Chalkduster, Comic Sans MS, cursive",
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

  return (
    <motion.div
      className="p-4 border rounded shadow-lg hover:shadow-xl transition-shadow"
      style={{ ...getCardStyle(), fontFamily: task.font }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p style={{ color: task.textColor }} className="text-lg mb-2">
        {task.content}
      </p>

      {/* Mostrar la imagen en la parte inferior y en tamaño reducido */}
      {task.image && (
        <div className="mt-2 flex justify-center">
          <img
            src={task.image}
            alt="Imagen de la tarea"
            className="w-20 h-20 object-contain"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
      )}

      <div className="flex justify-between items-center mt-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          aria-label="Editar tarea"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          aria-label="Eliminar tarea"
        >
          Eliminar
        </button>
      </div>

      <label className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleCompleted(task.id)}
          className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring focus:ring-blue-300"
          aria-label={`Marcar tarea como ${task.completed ? "pendiente" : "completada"}`}
        />
        <span>{task.completed ? "Tarea completada" : "Tarea pendiente"}</span>
      </label>
    </motion.div>
  );
});

export default TaskCard;