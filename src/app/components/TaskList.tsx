'use client'; // Ensures this is a Client Component

import { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import { Task } from '../types';

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Simulate API call to load tasks from a server
    useEffect(() => {
        // Fetch data (simulating an API call)
        const loadTasks = async () => {
            console.log('Loading tasks from server...');
            // Simulated response
            const response: Task[] = [
                { id: '1', title: 'Sample Task 1', description: 'Description 1', completed: false },
                { id: '2', title: 'Sample Task 2', description: 'Description 2', completed: true },
            ];

            setTasks(response); // Update state with fetched tasks
        };

        loadTasks(); // Call the function
    }, []); // Empty dependency array ensures this runs once on component mount

    // Function to add a new task
    const addTask = (title: string, description: string) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            description,
            completed: false,
        };
        setTasks([...tasks, newTask]);

        // Simulate sending task to the server (API)
        console.log('Adding task to server:', newTask);
    };

    // Function to toggle the completion status of a task
    const toggleComplete = (id: string) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );

        // Simulate sending updated status to the server (API)
        console.log(`Toggling completion status for task with id: ${id}`);
    };

    // Function to delete a task
    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));

        // Simulate deleting task from the server (API)
        console.log(`Deleting task with id: ${id}`);
    };

    // Function to edit a task
    const editTask = (id: string, title: string, description: string) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, title, description } : task
            )
        );

        // Simulate sending updated task to the server (API)
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
                        onEdit={editTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
