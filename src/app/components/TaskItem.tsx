import { useState } from 'react';
import { Task } from '../types';

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }: {
    task: Task,
    onToggleComplete: (id: string) => void,
    onDelete: (id: string) => void,
    onEdit: (id: string, title: string, description: string) => void
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);

    const handleSave = () => {
        onEdit(task.id, editedTitle, editedDescription);
        setIsEditing(false);
    };

    return (
        <div className={`p-4 border ${task.completed ? 'bg-green-100' : 'bg-white'}`}>
            {isEditing ? (
                <div>
                    {}
                    <input
                        className="border p-2 w-full mb-2"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        className="border p-2 w-full mb-2"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white p-2 mr-2" onClick={handleSave}>
                        Save
                    </button>
                    <button className="bg-gray-500 text-white p-2" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </div>
            ) : (
                <div>
                    <h3 className={`text-lg font-bold ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
                    <p>{task.description}</p>
                    <div className="mt-2">
                        <button
                            className={`mr-2 ${task.completed ? 'bg-red-500' : 'bg-green-500'} text-white p-2`}
                            onClick={() => onToggleComplete(task.id)}
                        >
                            {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                        </button>
                        <button
                            className="bg-yellow-500 text-white p-2 mr-2"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-500 text-white p-2"
                            onClick={() => onDelete(task.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
