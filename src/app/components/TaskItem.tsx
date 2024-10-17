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
        <div
            className={`p-4 border-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl ${task.completed ? 'bg-green-100' : 'bg-white'} animate-fade-in`}
        >
            {isEditing ? (
                <div>
                    <input
                        className="border p-2 w-full mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        className="border p-2 w-full mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <div className="flex space-x-2">
                        <button
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 transform hover:scale-105"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <h3 className={`text-lg font-bold ${task.completed ? 'line-through text-gray-500' : ''} transition-colors`}>
                        {task.title}
                    </h3>
                    <p className="text-gray-700">{task.description}</p>
                    <div className="mt-4 flex space-x-2">
                        <button
                            className={`p-2 rounded text-white transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 ${task.completed ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'}`}
                            onClick={() => onToggleComplete(task.id)}
                        >
                            {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                        </button>
                        <button
                            className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition-colors transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
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
