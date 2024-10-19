import { useState, useRef } from 'react';
import axios from 'axios';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import ErrorModal from './ErrorModal'; // Import the error modal component

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const TaskInput = ({ onAddTask, translations }: { onAddTask: (title: string, description: string) => void, translations: any }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // Error state
    const [retryAction, setRetryAction] = useState<() => void | null>(null); // Store retry action

    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleAddTask = async () => {
        if (!title || !description) return;

        setLoading(true);

        try {
            const response = await axios.post('/api/tasks', { title, description });
            onAddTask(response.data.title, response.data.description);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding task:', error);
            setError('Failed to add task. Do you want to try again?');
            setRetryAction(() => handleAddTask); // Set the retry action
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {error && (
                <ErrorModal
                    errorMessage={error}
                    onRetry={retryAction}
                    onClose={() => setError(null)}
                />
            )}
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transformStyle: 'preserve-3d',
                    transform,
                }}
                className="p-4 bg-white shadow-md rounded-lg transition-transform dark:bg-gray-700 dark:text-gray-300"
            >
                <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600 dark:text-blue-400">
                    {translations.addTask}
                </h2>
                <input
                    type="text"
                    className="border border-blue-300 p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-shadow duration-300 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                    placeholder={translations.taskTitle || 'Task Title'}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="border border-blue-300 p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-shadow duration-300 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                    placeholder={translations.taskDescription || 'Task Description'}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button
                    className={`rounded-2xl border-2 border-dashed border-blue-500 bg-white dark:bg-gray-800 px-6 py-3 w-full font-semibold uppercase text-blue-500 dark:text-white transition-all duration-300 
                    hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_blue] 
                    active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none 
                    ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={handleAddTask}
                    disabled={loading}
                >
                    {loading ? translations.taskButtonLoading : translations.taskButton}
                </button>
            </motion.div>
        </>
    );
};

export default TaskInput;
