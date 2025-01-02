import React from "react";
import { Task } from '../Features/tasks/tasksSlice';

export interface TaskCardProps {
    task: Task;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onToggleCompleted: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onToggleCompleted }) => {
  return (
    <div
      style={{ backgroundColor: task.color }}
      className={`p-4 border rounded ${task.completed ? 'line-through' : ''}`}
    >
      <p style={{ color: task.textColor, fontFamily: task.font }}>{task.content}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleCompleted(task.id)}
            className="mr-2"
          />
          <label>{task.completed ? "Completada" : "No completada"}</label>
        </div>
        <div>
          <button onClick={() => onEdit(task.id)} className="mr-2">Editar</button>
          <button onClick={() => onDelete(task.id)} className="mr-2">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
