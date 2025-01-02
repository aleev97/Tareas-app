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
    image?: string;  // Agregar este campo para la imagen
  };
  onEdit: () => void;
  onDelete: () => void;
  onToggleCompleted: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = React.memo(({ task, onEdit, onDelete, onToggleCompleted }) => {
  return (
    <motion.div
      className="p-4 border rounded"
      style={{ backgroundColor: task.color }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Mostrar la imagen si está disponible */}
      {task.image && <img src={task.image} alt="Tarea imagen" className="w-full h-auto mb-2" />}

      <p style={{ color: task.textColor, fontFamily: task.font }}>{task.content}</p>
      <button onClick={onEdit}>Editar</button>
      <button onClick={onDelete}>Eliminar</button>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleCompleted(task.id)}
          className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring focus:ring-blue-300"
        />
        {task.completed ? "Tarea completada" : "Tarea pendiente"}
      </label>
    </motion.div>
  );
});

export default TaskCard;