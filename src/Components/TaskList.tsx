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
      <div>
          {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={() => onEdit(task.id)} onDelete={() => handleDelete(task.id)} />
          ))}
      </div>
  );
};

export default TaskList;
