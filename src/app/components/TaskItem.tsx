import { useState } from 'react';
import { Task } from '../types';
import TaskModal from './TaskModal';

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }: {
    task: Task,
    onToggleComplete: (id: string) => void,
    onDelete: (id: string) => void,
    onEdit: (id: string, title: string, description: string) => void
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);

    const handleSave = () => {
        onEdit(task.id, editedTitle, editedDescription);
        setIsModalOpen(false);
    };

    return (
        <div className={`p-4 border ${task.completed ? 'bg-green-100' : 'bg-white'}`}>
            <h3
                className={`text-lg font-bold ${task.completed ? 'line-through' : ''}`}
                onClick={() => setIsModalOpen(true)} /* Clicking opens modal */
            >
                {task.title}
            </h3>
            <p>{task.description}</p>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onDelete={() => {
                    onDelete(task.id);
                    setIsModalOpen(false);
                }}
                onToggleComplete={() => onToggleComplete(task.id)}
                isCompleted={task.completed}
            >
                <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                <input
                    className="border p-2 w-full mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                    className="border p-2 w-full mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                    <button
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-colors"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </TaskModal>
        </div>
    );
};

export default TaskItem;
