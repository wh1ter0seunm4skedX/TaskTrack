import React, { ReactNode } from 'react';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    onToggleComplete: () => void;
    isCompleted: boolean;
    onSave: () => void;
    children: ReactNode;
    translations: any;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onDelete, onToggleComplete, isCompleted, onSave, children, translations }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative z-50 animate-modal-open">
                {/* Larger X button for closing */}
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors text-3xl"
                    onClick={onClose}
                >
                    &times;
                </button>

                {children}

                <div className="mt-4 flex justify-between items-center">
                    {/* Complete/incomplete button - Left aligned */}
                    <button
                        className={`p-2 rounded ${isCompleted ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors`}
                        onClick={onToggleComplete}
                    >
                        {isCompleted ? translations.markIncomplete : translations.markComplete}
                    </button>

                    {/* Save button - Center aligned */}
                    <button
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors mx-auto"
                        onClick={onSave}
                    >
                        {translations.saveChanges}
                    </button>

                    {/* Delete button - Right aligned */}
                    <button
                        className="bg-red-700 text-white p-2 rounded hover:bg-red-800 transition-colors"
                        onClick={onDelete}
                    >
                        {translations.deleteTask}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
