import { useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
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

    // Disable body scrolling when the modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup on modal close
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur grid place-items-center cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-gray-700 w-full max-w-md p-6 rounded-lg shadow-lg relative z-50 transition-all overflow-hidden"
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 transition-colors text-3xl"
                            onClick={onClose}
                        >
                            &times;
                        </button>

                        {children}

                        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-3">
                            {/* Bounce Animation */}
                            <motion.button
                                className={`w-full sm:w-1/3 p-2 sm:p-3 rounded ${isCompleted ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} 
                                text-white transition-all transform active:scale-110 active:bg-opacity-80`}
                                onClick={onToggleComplete}
                                whileTap={{ scale: 0.9 }}
                            >
                                {isCompleted ? translations.markIncomplete : translations.markComplete}
                            </motion.button>

                            <div className="hidden sm:block w-px h-full bg-gray-300 mx-3"></div>

                            {/* Rotate Animation */}
                            <motion.button
                                className="w-full sm:w-1/3 bg-blue-500 text-white p-2 sm:p-3 rounded hover:bg-blue-600
                                transition-all transform active:bg-opacity-80"
                                onClick={onSave}
                                whileTap={{ rotate: 10 }}
                            >
                                {translations.saveChanges}
                            </motion.button>

                            <div className="hidden sm:block w-px h-full bg-gray-300 mx-3"></div>

                            {/* Shake Animation */}
                            <motion.button
                                className="w-full sm:w-1/3 bg-red-700 text-white p-2 sm:p-3 rounded hover:bg-red-800
                                transition-all transform active:bg-opacity-80"
                                onClick={onDelete}
                                whileTap={{ x: [-5, 5, -5, 0] }}
                            >
                                {translations.deleteTask}
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TaskModal;
