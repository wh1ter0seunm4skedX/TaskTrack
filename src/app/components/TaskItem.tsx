import { Task } from '../types';

const TaskItem = ({task, onToggleComplete, onDelete}: {
    task: Task,
    onToggleComplete: (id: string) => void,
    onDelete: (id: string) => void,
    key?: string
}) => {
    return (
        <div className={`p-4 border ${task.completed ? 'bg-green-100' : 'bg-white'}`}>
            <h3 className={`text-lg font-bold ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
            <p>{task.description}</p>
            <div className="mt-2">
                <button
                    className={`mr-2 ${task.completed ? 'bg-red-500' : 'bg-green-500'} text-white p-2`}
                    onClick={() => onToggleComplete(task.id)}
                >
                    {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                </button>
                <button
                    className="bg-red-500 text-white p-2"
                    onClick={() => onDelete(task.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
