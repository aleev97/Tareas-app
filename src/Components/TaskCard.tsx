import React from "react";
import { Task } from '../Features/tasks/tasksSlice'

export interface TaskCardProps {
    task: Task;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
    return (
        <div className='p-4 rounded-md'
            style={{ backgroundColor: task.color, fontFamily: task.font, color: task.textColor }}
        >
            <p>{task.content}</p>
            {task.image && <img src={task.image} alt="Task Attachment" className="w-full h-auto rounded" />}
            <div className="flex justify-between mt-2">
                <button className="text-blue-500" onClick={() => onEdit(task.id.toString())}>
                    Editar
                </button>
                <button className="text-red-500" onClick={() => onDelete(task.id.toString())}>
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default TaskCard;