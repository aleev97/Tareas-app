import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Features/store";
import { deleteTask, toggleCompleted } from "../Features/tasks/tasksSlice";
import TaskCard from "./TaskCard";

interface TaskListProps {
  onEdit: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEdit }) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleToggleCompleted = (id: string) => {
    dispatch(toggleCompleted(id));
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No hay tareas disponibles. ¡Crea una nueva!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEdit(task.id)}
              onDelete={() => dispatch(deleteTask(task.id))}
              onToggleCompleted={handleToggleCompleted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
