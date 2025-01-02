import { motion } from "framer-motion";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Features/store";
import { deleteTask, toggleCompleted, deleteCompletedTasks } from "../Features/tasks/tasksSlice";
import TaskCard from "./TaskCard";

interface TaskListProps {
  onEdit: (id: string) => void;
  filter: "all" | "completed" | "pending";
}

const EmptyState: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="text-center text-gray-500 mt-8 text-2xl"
  >
    <p>¡Todavía no tienes tareas!</p>
  </motion.div>
);

export const TaskList: React.FC<TaskListProps> = ({ onEdit, filter }) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => dispatch(deleteTask(id));
  const handleToggleCompleted = (id: string) => dispatch(toggleCompleted(id));

  const handleDeleteCompletedTasks = () => {
    dispatch(deleteCompletedTasks());
  };

  // Filtrar tareas según el filtro
  const filteredTasks = tasks.filter((task) =>
    filter === "completed" ? task.completed : filter === "pending" ? !task.completed : true
  );

  // Contadores de tareas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div className="p-4">
      {filter === "all" && (
        <div className="mb-3 text-xl font-semibold text-gray-700 text-center">
          <p>Total de tareas: {totalTasks}</p>
        </div>
      )}
      {filter === "completed" && (
        <div className="flex flex-col items-center justify-center mb-4 text-lg font-semibold text-gray-700 text-center">
          <p className="mb-4">Tareas completadas: {completedTasks}</p>
          <button
            onClick={handleDeleteCompletedTasks}
            className="p-2 bg-red-500 text-white rounded flex items-center justify-center space-x-2 hover:bg-red-600 hover:shadow-lg transition-transform duration-300 group text-center"
          >
            <span className="text-lg font-semibold">Eliminar tareas completadas</span>
            <span className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-white group-hover:animate-trash"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 10.5V19a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 19v-8.5m-12-3h12m-7.5 0v-3h3v3m-4.5 0h6"
                />
              </svg>
            </span>
          </button>
        </div>

      )}
      {filter === "pending" && (
        <div className="mb-4 text-lg font-semibold text-gray-700 text-center">
          <p>Tareas pendientes: {pendingTasks}</p>
        </div>
      )}

      {/* Mostrar tareas filtradas o mensaje vacío */}
      {filteredTasks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TaskCard
                task={task}
                onEdit={() => onEdit(task.id)}
                onDelete={() => handleDelete(task.id)}
                onToggleCompleted={handleToggleCompleted}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};