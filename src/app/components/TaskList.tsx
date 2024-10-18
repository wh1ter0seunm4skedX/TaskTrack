'use client';

import { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import { Task } from '../types';

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [deletedTask, setDeletedTask] = useState<Task | null>(null);
    const [isUndoVisible, setIsUndoVisible] = useState(false);
    const [undoTimer, setUndoTimer] = useState<NodeJS.Timeout | null>(null);

    // Load initial tasks with predefined tasks
    useEffect(() => {
        const loadTasks = async () => {
            console.log('Loading tasks...');
            const response: Task[] = [
                { id: '1', title: 'Apply for a full-stack developer job in a cool place', description: 'Complete and submit the job application.', completed: false },
                { id: '2', title: 'Get the cool job!', description: 'Celebrate the new opportunity!', completed: false },
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
            console.log(`Deleted task permanently: ${taskToDelete.id}`);
        }, 5000);

        setUndoTimer(timer);
    };

    const undoDelete = () => {
        if (deletedTask) {
            setTasks([...tasks, deletedTask]);
            setDeletedTask(null);
            setIsUndoVisible(false);
            console.log('Restored task:', deletedTask);
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
                    />
                ))}
            </div>

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
