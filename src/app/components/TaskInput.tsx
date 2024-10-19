import { useState, useRef } from 'react';
import axios from 'axios';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import ErrorModal from './ErrorModal'; // Import the error modal component
import { FiCheckSquare, FiX } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const NOTIFICATION_TTL = 5000;  // Notification time to live

const TaskInput = ({ onAddTask, tasks = [], translations }: { onAddTask: (title: string, description: string) => void, tasks: any[], translations: any }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [retryAction, setRetryAction] = useState<() => void | null>(null);
    const [notifications, setNotifications] = useState<any[]>([]);  // To handle notifications
    const [isButtonLocked, setIsButtonLocked] = useState(false); // Button lock state
    const [lockMessage, setLockMessage] = useState(''); // Lock message for button

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


    // Function to add notification when a task is successfully added
    const addNotification = (taskTitle: string) => {
        const id = Math.random();
        setNotifications((prev) => [{ id, text: `${translations.taskAddedMessage} "${taskTitle}"`, taskTitle }, ...prev]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        }, NOTIFICATION_TTL);
    };

    // Handle task addition with error handling and duplicate checks
    const handleAddTask = async () => {
        if (!title || !description) return;

        const isDuplicate = tasks.some(task => task.title === title && task.description === description);
        if (isDuplicate) {
            setError(translations.duplicateTaskMessage);
            return;
        }

        setLoading(true);
        setIsButtonLocked(true); // Lock button

        try {
            const response = await axios.post('/api/tasks', { title, description });
            onAddTask(response.data.title, response.data.description);
            setTitle('');
            setDescription('');
            addNotification(response.data.title);  // Notify with task title
        } catch (error) {
            console.error('Error adding task:', error);
            setError(translations.errorMessage);
            setRetryAction(() => handleAddTask);
        } finally {
            setLoading(false);
            setLockMessage(translations.buttonLockedMessage);
            setTimeout(() => {
                setIsButtonLocked(false);
                setLockMessage('');
            }, 5000);
        }
    };

    return (
        <>
            {/* Error Modal */}
            {error && (
                <ErrorModal
                    errorMessage={error}
                    onRetry={retryAction}
                    onClose={() => setError(null)}
                />
            )}

            {/* Notifications */}
            <div className="fixed top-4 right-4 z-50 pointer-events-none">
                <AnimatePresence>
                    {notifications.map((notif) => (
                        <motion.div
                            key={notif.id}
                            initial={{ y: -15, scale: 0.95 }}
                            animate={{ y: 0, scale: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="p-2 flex items-start rounded gap-2 text-xs font-medium shadow-lg text-white bg-indigo-500 pointer-events-auto"
                        >
                            <FiCheckSquare className="mt-0.5" />
                            <span>{notif.text}</span>
                            <button
                                onClick={() => setNotifications((prev) => prev.filter((n) => n.id !== notif.id))}
                                className="ml-auto mt-0.5"
                            >
                                <FiX />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Task Input Form */}
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
               // onMouseLeave={handleMouseLeave}
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
                    ${loading || isButtonLocked ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={handleAddTask}
                    disabled={loading || isButtonLocked}
                >
                    {loading ? translations.taskButtonLoading : (isButtonLocked ? lockMessage : translations.taskButton)}
                </button>
            </motion.div>
        </>
    );
};

export default TaskInput;
