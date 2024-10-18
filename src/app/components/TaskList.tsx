'use client';

import { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';
import { Task } from '../types';

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
    const [deletedTask, setDeletedTask] = useState<Task | null>(null);
    const [isUndoVisible, setIsUndoVisible] = useState(false);
    const [undoTimer, setUndoTimer] = useState<NodeJS.Timeout | null>(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    useEffect(() => {
        const loadTasks = async () => {
            console.log('Loading tasks...');
            const response: Task[] = [
                { id: '1', title: 'Apply for a full-stack developer job in a cool place', description: 'Complete and submit the job application.', completed: true },
                { id: '2', title: 'Get the cool job!', description: 'Celebrate the new opportunity!', completed: true },
                { id: '3', title: 'Get to know the team and show them your skills!', description: 'Prepare to contribute and impress.', completed: false },
            ];

            setTasks(response);
        };

        loadTasks().catch(console.error);
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

    // Delete task with Grace time for undo
    const deleteTask = (id: string) => {
        const taskToDelete = tasks.find(task => task.id === id);
        if (!taskToDelete) return;

        setDeletedTask(taskToDelete);
        setTasks(tasks.filter(task => task.id !== id));
        setIsUndoVisible(true);

        // Clear any existing timer
        if (undoTimer) clearTimeout(undoTimer);

        // Automatically remove the deleted task after 5 seconds if not restored
        const timer = setTimeout(() => {
            setIsUndoVisible(false);
            setDeletedTask(null);
            console.log(`Deleted task permanently from server: ${taskToDelete.id}`);
        }, 5000);

        setUndoTimer(timer);
    };

    // Function to restore the deleted task
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
            <TaskInput onAddTask={addTask} />
            <div className="mt-4">
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggleComplete={toggleComplete}
                        onDelete={deleteTask}
                        onEdit={editTask}
                        onOpenModal={() => openModal(task.id)}
                    />
                ))}
            </div>

            {/* Render the TaskModal only when there's an active task */}
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
                >
                    <h2 className="text-xl font-bold mb-4">Edit Task</h2>
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

            {/* Undo Button and message for restoring deleted tasks */}
            {isUndoVisible && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-6 rounded-lg border text-center z-50">
                    <p className="text-red-600 font-bold mb-4">
                        The task has been deleted! Click undo within 5 seconds to restore it.
                    </p>
                    <button
                        className="bg-yellow-500 text-white p-2 transition-transform transform hover:scale-105 rounded"
                        onClick={undoDelete}
                    >
                        Undo Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskList;
