import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { TaskCardProps } from '../types';

Modal.setAppElement('#root');

export const TaskCard: React.FC<TaskCardProps> = React.memo(({ task, onEdit, onDelete, onToggleCompleted }) => {

  const getPriorityIndicator = () => {
    switch (task.priority) {
      case "alta":
        return { label: "Alta", color: "#ff4d4f" }; // Rojo
      case "media":
        return { label: "Media", color: "#ffa940" }; // Naranja
      case "baja":
        return { label: "Baja", color: "#52c41a" }; // Verde
      default:
        return { label: "Sin prioridad", color: "#d9d9d9" }; // Gris
    }
  };

  const { label, color } = getPriorityIndicator();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Verificar si la tarea está vencida
  const isTaskExpired = task.dueDate ? new Date(task.dueDate) < new Date() : false;

  const formatDate = (dateString: string) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) return "Fecha no válida";
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const getCardStyle = () => {
    const baseStyle = {
      backgroundColor: task.color || "#fffbe6",
      color: task.textColor || "#333",
      fontFamily: task.font || "'Comic Sans MS', cursive, sans-serif",
      boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.2)",
      borderRadius: "12px",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    };

    switch (task.style) {
      case "grid":
        return {
          ...baseStyle,
          backgroundImage: "linear-gradient(90deg, #f0f0f0 1px, transparent 1px), linear-gradient(#f0f0f0 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        };
      case "stripes":
        return {
          ...baseStyle,
          backgroundImage: "repeating-linear-gradient(0deg, #e2e2e2, #e2e2e2 1px, transparent 1px, transparent 10px)",
        };
      case "folded":
        return {
          ...baseStyle,
          backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
          backgroundSize: "cover",
        };
      default:
        return baseStyle;
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setConfirmDelete(false);
  };

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete();
      closeModal();
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <motion.div
      className="task-card"
      style={getCardStyle() as React.CSSProperties}
      initial={{ scale: 0.9, rotate: -1 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div
        className="priority-indicator"
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: color,
          color: "#fff",
          borderRadius: "12px",
          padding: "4px 8px",
          fontSize: "0.75rem",
          fontWeight: "bold",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        {label}
      </div>

      {isTaskExpired && (
        <div className="expired-indicator" style={{ color: "#d32f2f", fontWeight: "bold", marginBottom: "8px", textAlign: "center" }}>
          ¡Tarea vencida!
        </div>
      )}

      <p className="text-xs mt-2 text-black w-72 border-t pt-2 bg-gray-100 rounded-lg px-3 py-1 shadow-sm">
        Creado: {formatDate(task.createdAt)}
      </p>
      <p className="text-xs mt-2 text-black w-72 border-t pt-2 bg-gray-100 rounded-lg px-3 py-1 shadow-sm">
        Finalización: {formatDate(task.dueDate?.toString() || "")}
      </p>

      <p className="text-lg mt-4" style={{ color: task.textColor, whiteSpace: "pre-wrap" }}>
        {task.content}
      </p>

      {task.image && (
        <div className="relative mt-4">
          <motion.img
            src={task.image}
            alt="Imagen de la tarea"
            className="w-48 h-48 object-cover rounded-lg shadow-md"
            onError={(e) => (e.currentTarget.style.display = "none")}
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
          />
        </div>
      )}

      <button
        onClick={openModal}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "6px",
        }}
        className="hover:scale-110 active:scale-100 transition-all"
        title="Opciones"
      >
        <svg className="stroke-gray-600 fill-none" xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 -0.5 25 25">
          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M15.17 11.053L11.18 15.315C10.8416 15.6932 10.3599 15.9119 9.85236 15.9178C9.34487 15.9237 8.85821 15.7162 8.51104 15.346C7.74412 14.5454 7.757 13.2788 8.54004 12.494L13.899 6.763C14.4902 6.10491 15.3315 5.72677 16.2161 5.72163C17.1006 5.71649 17.9463 6.08482 18.545 6.736C19.8222 8.14736 19.8131 10.2995 18.524 11.7L12.842 17.771C12.0334 18.5827 10.9265 19.0261 9.78113 18.9971C8.63575 18.9682 7.55268 18.4695 6.78604 17.618C5.0337 15.6414 5.07705 12.6549 6.88604 10.73L12.253 5"></path>
        </svg>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex justify-center items-center backdrop-blur-sm"
        contentLabel="Opciones de tarea"
      >
        <div className="bg-violet-500 bg-opacity-80 p-6 rounded-lg shadow-lg w-80 relative">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 rounded-full px-3 py-1 bg-white hover:bg-red-400 transition-colors"
          >
            X
          </button>
          <h2 className="text-xl mb-4 font-semibold text-white">Opciones:</h2>
          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all"
            >
              {confirmDelete ? "Confirmar eliminación" : "Eliminar"}
            </button>
            <button
              onClick={() => {
                onEdit();
                closeModal();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-800 transition-all"
            >
              Editar
            </button>
          </div>
        </div>
      </Modal>

      <label className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleCompleted(task.id)}
          className="form-checkbox h-6 w-6 text-green-500 rounded-full focus:ring-2 focus:ring-blue-500"
          aria-label={`Marcar tarea como ${task.completed ? "pendiente" : "completada"}`}
        />
        <span className="text-sm">{task.completed ? "Tarea completada" : "Tarea pendiente"}</span>
      </label>
    </motion.div>
  );
});