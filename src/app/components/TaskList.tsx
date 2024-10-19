import { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';
import axios from 'axios';
import { Task } from '../types';
import ErrorModal from './ErrorModal';

const TaskList = ({ translations }: { translations: any }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
    const [deletedTask, setDeletedTask] = useState<Task | null>(null);
    const [isUndoVisible, setIsUndoVisible] = useState(false);
    const [undoTimer, setUndoTimer] = useState<NodeJS.Timeout | null>(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [error, setError] = useState<string | null>(null);  // Error state
    const [retryAction, setRetryAction] = useState<() => void | null>(null);  // Store retry function

    // Fetch tasks from API when component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/api/tasks');
                setTasks(response.data);
            } catch (error) {
                setError('Failed to fetch tasks. Do you want to try again?');
                setRetryAction(() => fetchTasks);  // Set retry action for the modal
            }
        };

        fetchTasks();
    }, []);

    // Add a new task (POST request)
    const addTask = async (title: string, description: string) => {
        try {
            const response = await axios.post('/api/tasks', { title, description, completed: false });
            setTasks([...tasks, response.data]);
        } catch (error) {
            setError('Failed to add task. Do you want to try again?');
            setRetryAction(() => () => addTask(title, description));  // Set retry action for adding task
        }
    };

    // Edit an existing task (PUT request)
    const editTask = async (id: string, title: string, description: string, completed: boolean) => {
        try {
            await axios.put('/api/tasks', { id, title, description, completed });
            setTasks(tasks.map(task => (task.id === id ? { ...task, title, description, completed } : task)));
        } catch (error) {
            setError('Failed to edit task. Do you want to try again?');
            setRetryAction(() => () => editTask(id, title, description, completed));  // Set retry action for editing task
        }
    };

    // Delete a task (DELETE request) with undo capability
    const deleteTask = async (id: string) => {
        const taskToDelete = tasks.find(task => task.id === id);
        if (!taskToDelete) return;

        setDeletedTask(taskToDelete);
        setTasks(tasks.filter(task => task.id !== id));

        try {
            await axios.delete('/api/tasks', { data: { id } });
        } catch (error) {
            setError('Failed to delete task. Do you want to try again?');
            setRetryAction(() => () => deleteTask(id));  // Set retry action for deleting task
        }

        setIsUndoVisible(true);
        if (undoTimer) clearTimeout(undoTimer);

        const timer = setTimeout(() => {
            setIsUndoVisible(false);
            setDeletedTask(null);
        }, 5000);

        setUndoTimer(timer);
    };

    // Undo the delete action
    const undoDelete = () => {
        if (deletedTask) {
            setTasks([...tasks, deletedTask]);
            setDeletedTask(null);
            setIsUndoVisible(false);
            if (undoTimer) clearTimeout(undoTimer);
        }
    };

    // Toggle the completion status of a task
    const toggleComplete = (id: string) => {
        const taskToToggle = tasks.find(task => task.id === id);
        if (taskToToggle) {
            editTask(id, taskToToggle.title, taskToToggle.description, !taskToToggle.completed);
        }
    };

    // Open the task editing modal
    const openModal = (id: string) => {
        setActiveTaskId(id);
        const task = tasks.find(task => task.id === id);
        if (task) {
            setEditedTitle(task.title);
            setEditedDescription(task.description);
        }
    };

    // Close the task editing modal
    const closeModal = () => {
        setActiveTaskId(null);
    };

    // Save task changes after editing
    const saveTaskChanges = () => {
        if (activeTaskId) {
            const taskToEdit = tasks.find(task => task.id === activeTaskId);
            if (taskToEdit) {
                editTask(activeTaskId, editedTitle, editedDescription, taskToEdit.completed);
                closeModal();
            }
        }
    };

    const activeTask = tasks.find(task => task.id === activeTaskId);

    return (
        <div className="p-4">
            {error && (
                <ErrorModal
                    errorMessage={error}
                    onRetry={retryAction}
                    onClose={() => setError(null)}
                />
            )}
            <TaskInput onAddTask={addTask} tasks={tasks} translations={translations} />
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
