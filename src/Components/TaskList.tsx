import { motion } from "framer-motion";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Features/store";
import { deleteTask, toggleCompleted } from "../Features/tasks/tasksSlice";
import TaskCard from "./TaskCard";

interface TaskListProps {
  onEdit: (id: string) => void;
  filter: "all" | "completed" | "pending";
}

export const TaskList: React.FC<TaskListProps> = ({ onEdit, filter }) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // "all"
  });

  const handleToggleCompleted = (id: string) => {
    dispatch(toggleCompleted(id));
  };

  return (
    <div className="p-4">
      {filteredTasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center text-gray-500 mt-8"
        >
          <p> ¡Todavia no tienes tareas!</p>
        </motion.div>
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