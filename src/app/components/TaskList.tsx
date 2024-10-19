import { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';
import axios from 'axios'; // Import axios for API requests
import { Task } from '../types';

const TaskList = ({ translations }: { translations: any }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
    const [deletedTask, setDeletedTask] = useState<Task | null>(null);
    const [isUndoVisible, setIsUndoVisible] = useState(false);
    const [undoTimer, setUndoTimer] = useState<NodeJS.Timeout | null>(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    // Fetch tasks from API on component mount
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/api/tasks');
                setTasks(response.data); // Update state with tasks from Firestore
                console.log('Tasks fetched:', response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const addTask = (title: string, description: string) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            description,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        console.log('Adding task:', newTask);
    };

    const toggleComplete = (id: string) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
        console.log(`Toggling completion for task id: ${id}`);
    };

    const deleteTask = (id: string) => {
        const taskToDelete = tasks.find(task => task.id === id);
        if (!taskToDelete) return;

        setDeletedTask(taskToDelete);
        setTasks(tasks.filter(task => task.id !== id));
        setIsUndoVisible(true);

        if (undoTimer) clearTimeout(undoTimer);

        const timer = setTimeout(() => {
            setIsUndoVisible(false);
            setDeletedTask(null);
            console.log(`Deleted task permanently from server: ${taskToDelete.id}`);
        }, 5000);

        setUndoTimer(timer);
    };

    const undoDelete = () => {
        if (deletedTask) {
            setTasks([...tasks, deletedTask]);
            setDeletedTask(null);
            setIsUndoVisible(false);
            console.log('Task restored:', deletedTask);
            if (undoTimer) clearTimeout(undoTimer);
        }
    };

    const editTask = (id: string, title: string, description: string) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, title, description } : task
            )
        );
        console.log(`Editing task id: ${id}`, { title, description });
    };

    const openModal = (id: string) => {
        setActiveTaskId(id);
        const task = tasks.find(task => task.id === id);
        if (task) {
            setEditedTitle(task.title);
            setEditedDescription(task.description);
        }
    };

    const closeModal = () => {
        setActiveTaskId(null);
    };

    const saveTaskChanges = () => {
        if (activeTaskId) {
            editTask(activeTaskId, editedTitle, editedDescription);
            closeModal();
        }
    };

    const activeTask = tasks.find(task => task.id === activeTaskId);

    return (
        <div className="p-4">
            <TaskInput onAddTask={addTask} translations={translations} />
            <div className="mt-4">
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggleComplete={toggleComplete}
                        onDelete={deleteTask}
                        onEdit={editTask}
                        onOpenModal={() => openModal(task.id)}
                        translations={translations}
                    />
                ))}
            </div>

            {activeTask && (
                <TaskModal
                    isOpen={!!activeTaskId}
                    onClose={closeModal}
                    onDelete={() => {
                        deleteTask(activeTask.id);
                        closeModal();
                    }}
                    onToggleComplete={() => toggleComplete(activeTask.id)}
                    isCompleted={activeTask.completed}
                    onSave={saveTaskChanges}
                    translations={translations}
                >
                    <h2 className="text-xl font-bold mb-4">{translations.editTask}</h2>
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
                </TaskModal>
            )}

            {isUndoVisible && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-red-200 p-3 rounded shadow-inner text-center z-50">
                    <p className="mb-4">
                        {translations.undoDeleteMessage}
                    </p>
                    <button
                        className="bg-yellow-500 text-white p-2 rounded transition-transform hover:scale-105"
                        onClick={undoDelete}
                    >
                        {translations.undoDeleteButton}
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskList;
