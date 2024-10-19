import { useState } from 'react';
import { Task } from '../types';
import TaskModal from './TaskModal';

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit, isModalOpen, onOpenModal, onCloseModal, translations }: {
    task: Task,
    onToggleComplete: (id: string) => void,
    onDelete: (id: string) => void,
    onEdit: (id: string, title: string, description: string) => (id: string, title: string, description: string, completed: boolean) => Promise<void>,
    isModalOpen: boolean,
    onOpenModal: () => void,
    onCloseModal: () => void,
    translations: any
}) => {
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);

    const handleSave = () => {
        onEdit(task.id, editedTitle, editedDescription);
        onCloseModal();
    };

    return (
        <div className={`p-4 border mb-4 ${task.completed ? 'bg-green-100' : 'bg-white'} rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer relative z-10`}
             onClick={onOpenModal}>
            <h3 className={`text-lg font-bold ${task.completed ? 'line-through' : ''}`}>
                {task.title}
            </h3>
            <p>{task.description}</p>

            <TaskModal
                isOpen={isModalOpen}
                onClose={onCloseModal}
                onDelete={() => {
                    onDelete(task.id);
                    onCloseModal();
                }}
                onToggleComplete={() => onToggleComplete(task.id)}
                isCompleted={task.completed}
                onSave={handleSave}
                translations={translations} // Pass translations down to the modal
            >
                <h2 className="text-xl font-bold mb-4">
                    {translations && translations.editTask ? translations.editTask : 'Edit Task'}
                </h2>
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
                        {translations && translations.saveChanges ? translations.saveChanges : 'Save Changes'}
                    </button>
                    <button
                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-colors"
                        onClick={onCloseModal}
                    >
                        {translations && translations.cancel ? translations.cancel : 'Cancel'}
                    </button>
                </div>
            </TaskModal>
        </div>
    );
};

export default TaskItem;
