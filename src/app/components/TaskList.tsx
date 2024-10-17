'use client'; // Ensures this is a Client Component

import { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import { Task } from '../types';

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [deletedTask, setDeletedTask] = useState<Task | null>(null); // State for storing the deleted task
    const [isUndoVisible, setIsUndoVisible] = useState(false); // State to show or hide the Undo button
    const [undoTimer, setUndoTimer] = useState<NodeJS.Timeout | null>(null); // Timer to hide the undo button

    // Simulate API call to load tasks from a server
    useEffect(() => {
        const loadTasks = async () => {
            console.log('Loading tasks from server...');
            const response: Task[] = [
                { id: '1', title: 'Sample Task 1', description: 'Description 1', completed: false },
                { id: '2', title: 'Sample Task 2', description: 'Description 2', completed: true },
            ];

            setTasks(response); // Update state with fetched tasks
        };

        loadTasks().catch(console.error); // Handle promise rejection
    }, []);

    // Function to add a new task
    const addTask = (title: string, description: string) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            description,
            completed: false,
        };
        setTasks([...tasks, newTask]);

        console.log('Adding task to server:', newTask);
    };

    // Function to toggle the completion status of a task
    const toggleComplete = (id: string) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );

        console.log(`Toggling completion status for task with id: ${id}`);
    };

    // Function to delete a task with Undo functionality
    const deleteTask = (id: string) => {
        const taskToDelete = tasks.find(task => task.id === id);
        if (!taskToDelete) return;

        setDeletedTask(taskToDelete); // Temporarily store the deleted task
        setTasks(tasks.filter(task => task.id !== id)); // Remove the task from the list
        setIsUndoVisible(true); // Show the Undo button

        // Clear any existing timer
        if (undoTimer) clearTimeout(undoTimer);

        // Automatically remove the deleted task after 5 seconds if not restored
        const timer = setTimeout(() => {
            setIsUndoVisible(false); // Hide the Undo button
            setDeletedTask(null); // Permanently remove the deleted task
            console.log(`Deleted task permanently from server: ${taskToDelete.id}`);
        }, 5000);

        setUndoTimer(timer); // Store the timer in state
    };

    // Function to restore the deleted task
    const undoDelete = () => {
        if (deletedTask) {
            setTasks([...tasks, deletedTask]); // Restore the deleted task
            setDeletedTask(null); // Clear the deleted task state
            setIsUndoVisible(false); // Hide the Undo button
            console.log('Task restored:', deletedTask);
            if (undoTimer) clearTimeout(undoTimer); // Clear the timer
        }
    };

    // Function to edit a task
    const editTask = (id: string, title: string, description: string) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, title, description } : task
            )
        );

        console.log(`Editing task with id: ${id}`, { title, description });
    };

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
                        onEdit={editTask}  // Make sure to pass the editTask function
                    />
                ))}
            </div>

            {/* Undo Button and message for restoring deleted tasks as a floating dialog */}
            {isUndoVisible && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-6 rounded-lg border text-center z-50">
                    <p className="text-red-600 font-bold mb-4">
                        Click the undo because in 3 seconds the task will be deleted forever!
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
