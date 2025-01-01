import React from "react";
import { Task } from '../Features/tasks/tasksSlice';

export interface TaskCardProps {
    task: Task;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const TaskCard: React.FC<{ task: Task; onEdit: () => void; onDelete: () => void }> = ({ task, onEdit, onDelete }) => {
    return (
        <div style={{ backgroundColor: task.color }} className="p-4 border rounded">
          <p style={{ color: task.textColor, fontFamily: task.font }}>{task.content}</p>
          <button onClick={onEdit}>Editar</button>
          <button onClick={onDelete}>Eliminar</button>
        </div>
      );
    };

export default TaskCard;