import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../Features/store';
import { deleteTask } from "../Features/tasks/tasksSlice";
import TaskCard from "./TaskCard";

interface TaskListProps {
    onEdit: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEdit }) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

    const dispatch = useDispatch();

    const handleDelete = (id: string) => {
        dispatch(deleteTask(id));
    };

    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id} // Asegúrate de que cada tarea tenga un key único
            task={task}
            onEdit={() => onEdit(task.id)}
            onDelete={() => handleDelete(task.id)}
          />
        ))}
      </div>
    );
};

export default TaskList;
