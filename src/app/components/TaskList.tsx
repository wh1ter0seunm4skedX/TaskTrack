'use client';


import { useState } from 'react';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import { Task } from '../types';

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Function to add a new task
    const addTask = (title: string, description: string) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            description,
            completed: false,
        };
        setTasks([...tasks, newTask]);
    };

    // Function to toggle the completion status of a task
    const toggleComplete = (id: string) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // Function to delete a task
    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // Function to edit a task
    const editTask = (id: string, title: string, description: string) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, title, description } : task
            )
        );
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
