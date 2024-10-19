import { useState } from 'react';

const TaskInput = ({ onAddTask, translations }: { onAddTask: (title: string, description: string) => void, translations: any }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = () => {
        if (title && description) {
            onAddTask(title, description);
            setTitle('');
            setDescription('');
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">{translations.addTask}</h2>
            <input
                type="text"
                className="border border-blue-300 p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-shadow duration-300"
                placeholder={translations.taskTitle || "Task Title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="border border-blue-300 p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-shadow duration-300"
                placeholder={translations.taskDescription || "Task Description"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white p-3 w-full rounded hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={handleAddTask}
            >
                {translations.addTask}
            </button>
        </div>
    );
};

export default TaskInput;
