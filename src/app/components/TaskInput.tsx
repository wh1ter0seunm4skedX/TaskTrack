import { useState } from 'react';
import axios from 'axios';

const TaskInput = ({ onAddTask, translations }: { onAddTask: (title: string, description: string) => void, translations: any }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);  // Add loading state to show progress

    const handleAddTask = async () => {
        if (!title || !description) return;

        setLoading(true); // Set loading true when the request is being made

        try {
            // Make the API request to add a new task to Firestore
            const response = await axios.post('/api/tasks', { title, description });

            // Call onAddTask to update the UI with the newly added task
            onAddTask(response.data.title, response.data.description);

            // Clear the input fields
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding task:', error);
        } finally {
            setLoading(false);  // Set loading to false after request is finished
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105 dark:bg-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600 dark:text-blue-400">
                {translations.addTask}
            </h2>
            <input
                type="text"
                className="border border-blue-300 p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-shadow duration-300 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                placeholder={translations.taskTitle || "Task Title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="border border-blue-300 p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-shadow duration-300 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                placeholder={translations.taskDescription || "Task Description"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white p-3 w-full rounded hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
                onClick={handleAddTask}
                disabled={loading} // Disable button when loading
            >
                {loading ? translations.taskButtonLoading : translations.taskButton}
            </button>
        </div>
    );
};

export default TaskInput;
