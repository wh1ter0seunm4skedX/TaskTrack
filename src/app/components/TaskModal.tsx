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
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors text-3xl"
                    onClick={onClose}
                >
                    &times;
                </button>

                {children}

                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    {/* Bounce Animation */}
                    <button
                        className={`w-full sm:w-1/3 p-2 sm:p-3 rounded ${isCompleted ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} 
                        text-white transition-all duration-200 transform active:scale-110 active:bg-opacity-80`}
                        onClick={onToggleComplete}
                    >
                        {isCompleted ? translations.markIncomplete : translations.markComplete}
                    </button>

                    {/* Separator line for larger screens */}
                    <div className="hidden sm:block w-px h-full bg-gray-300 mx-3"></div>

                    {/* Rotate Animation */}
                    <button
                        className="w-full sm:w-1/3 bg-blue-500 text-white p-2 sm:p-3 rounded hover:bg-blue-600
                        transition-all duration-200 transform active:rotate-12 active:bg-opacity-80"
                        onClick={onSave}
                    >
                        {translations.saveChanges}
                    </button>

                    {/* Separator line for larger screens */}
                    <div className="hidden sm:block w-px h-full bg-gray-300 mx-3"></div>

                    {/* Shake Animation */}
                    <button
                        className="w-full sm:w-1/3 bg-red-700 text-white p-2 sm:p-3 rounded hover:bg-red-800
                        transition-all duration-200 transform active:translate-x-1 active:-translate-x-1 active:bg-opacity-80"
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
