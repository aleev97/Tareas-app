import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../Features/tasks/tasksSlice";
import { v4 as uuidv4 } from 'uuid';

export interface TaskEditProps {
    taskToEdit: {
      id: string;
      content: string;
      color: string;
      font: string;
      textColor: string;
      image?: string;
      style?: "common" | "chalkboard";
    } | null;
    onSave: () => void;
  }

const TaskEditor: React.FC<TaskEditProps> = ({ taskToEdit, onSave }) => {
    const [content, setContent] = useState(taskToEdit?.content || '');
    const [color, setColor] = useState(taskToEdit?.color || '#ffffff');
    const [font, setFont] = useState(taskToEdit?.font || 'Arial');
    const [textColor, setTextColor] = useState(taskToEdit?.textColor || '#000000');
    const [style, setStyle] = useState<'common' | 'chalkboard'>(taskToEdit?.style || 'common');
    const [image, setImage] = useState<string | undefined>(taskToEdit?.image);

    const dispatch = useDispatch();

    const handleSave = () => {
        const task = {
            id: taskToEdit?.id || uuidv4(),
            content,
            color,
            font,
            textColor,
            style,
            image,
            completed: false,
        };
    
        if (taskToEdit) {
            dispatch(editTask(task));
        } else {
            dispatch(addTask(task));
        }
    
        onSave();
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = () => {
            setImage(reader.result as string); // Almacenamos la imagen en formato base64
          };
          reader.readAsDataURL(e.target.files[0]);
        }
      };
      

    return (
      <div className="p-4">
        <textarea className="w-full p-2 border rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe tu tarea..."
      />
      <div className="mt-4 flex flex-col space-y-2">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <select value={font} onChange={(e) => setFont(e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="Times New Roman">Times New Roman</option>
        </select>
        <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} /> 
        <select value={style} onChange={(e) => setStyle(e.target.value as 'common' | 'chalkboard')}>
          <option value="common">Nota común</option>
          <option value="chalkboard">Pizarrón</option>
        </select>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <button onClick={handleSave} className="mt-4 p-2 bg-blue-500 text-white rounded"> 
        Guardar
      </button>
      </div>
    );
};

export default TaskEditor;