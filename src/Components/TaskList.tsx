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
    className="text-center text-gray-500 mt-8"
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
      {/* Mostrar contadores solo según el filtro activo */}
      {filter === "all" && (
        <div className="mb-4 text-lg font-semibold text-gray-700">
          <p>Total de tareas: {totalTasks}</p>
        </div>
      )}
      {filter === "completed" && (
        <div className="mb-4 text-lg font-semibold text-gray-700">
          <p>Tareas completadas: {completedTasks}</p>
          <button
            onClick={handleDeleteCompletedTasks}
            className="mb-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Eliminar tareas completadas
          </button>
        </div>

      )}
      {filter === "pending" && (
        <div className="mb-4 text-lg font-semibold text-gray-700">
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