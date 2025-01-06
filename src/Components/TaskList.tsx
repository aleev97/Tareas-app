import React from "react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Features/store";
import { deleteTask, toggleCompleted, deleteCompletedTasks } from "../Features/tasks/tasksSlice";
import { TaskCard } from "./TaskCard";
import { TaskListProps } from "../types";

const EmptyState: React.FC<{ filter: "all" | "completed" | "pending" }> = ({ filter }) => {
  const messages = {
    all: "¡Todavía no tienes tareas!",
    completed: "¡No tienes tareas completadas!",
    pending: "¡No tienes tareas pendientes!",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center text-gray-500 mt-8 text-2xl"
    >
      <p>{messages[filter]}</p>
    </motion.div>
  );
};

export const TaskList: React.FC<TaskListProps> = ({ onEdit, filter }) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => dispatch(deleteTask(id));
  const handleToggleCompleted = (id: string) => dispatch(toggleCompleted(id));

  const handleDeleteCompletedTasks = () => {
    dispatch(deleteCompletedTasks());
  };

  // Filtrar tareas según el filtro
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      filter === "completed" ? task.completed : filter === "pending" ? !task.completed : true
    );
  }, [tasks, filter]);

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
            className={`p-2 ${filter === "completed" ? "bg-red-500" : "bg-gray-500"
              } text-white rounded flex items-center justify-center space-x-2 hover:shadow-lg transition-transform duration-300`}
          >
            Eliminar tareas completadas
          </button>
        </div>

      )}
      {filter === "pending" && (
        <div className="mb-4 text-lg font-semibold text-gray-700 text-center">
          <p>Tareas pendientes: {pendingTasks}</p>
        </div>
      )}

      {filteredTasks.length === 0 ? (
        <EmptyState filter={filter} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <TaskCard
                task={{ ...task, createdAt: task.createdAt || new Date().toISOString(), dueDate: task.dueDate || new Date().toISOString() }}
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