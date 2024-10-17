import { useState } from 'react';

const TaskInput = ({ onAddTask }: { onAddTask: (title: string, description: string) => void }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = () => {
        if (title && description) {
            onAddTask(title, description);
            setTitle('');
            setDescription('');
        }
    };

    return (
        <div className="p-4">
            <input
                type="text"
                className="border p-2 w-full mb-2"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="border p-2 w-full mb-2"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white p-2 w-full"
                onClick={handleAddTask}
            >
                Add Task
            </button>
        </div>
    );
};

export default TaskInput;
