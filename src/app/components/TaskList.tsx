'use client';

import { useState } from 'react';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import { Task } from '../types';

const TaskList = () => {
    // Initialize tasks state to manage the list of tasks
    const [tasks, setTasks] = useState<Task[]>([]);

    // Function to add a new task to the list
    const addTask = (title: string, description: string) => {
        const newTask: Task = {
            id: Date.now().toString(), // Generate a unique ID based on the current timestamp
            title,
            description,
            completed: false, // All new tasks start as incomplete
        };
        setTasks([...tasks, newTask]); // Update the state with the new task
    };

    // Function to toggle the completion status of a task
    const toggleComplete = (id: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    // Function to delete a task from the list by its ID
    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));  // Filter out the task with the given ID
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
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
