import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const tasksCollection = collection(db, 'tasks');  // Reference to the tasks collection in Firestore

    // Handle GET request to fetch all tasks
    if (req.method === 'GET') {
        try {
            const tasksSnapshot = await getDocs(tasksCollection);
            const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json(tasks);  // Respond with fetched tasks
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch tasks', error });
        }
    }

    // Handle POST request to create a new task
    if (req.method === 'POST') {
        const { title, description, completed } = req.body;
        try {
            const newTask = await addDoc(tasksCollection, {
                title,
                description,
                completed: completed || false  // Defaults to false if not provided
            });
            res.status(201).json({ id: newTask.id, title, description, completed });
        } catch (error) {
            res.status(500).json({ message: 'Failed to add task', error });
        }
    }

    // Handle PUT request to update an existing task
    if (req.method === 'PUT') {
        const { id, title, description, completed } = req.body;
        try {
            const taskDoc = doc(db, 'tasks', id);  // Reference to the specific task document
            await updateDoc(taskDoc, { title, description, completed });  // Update the task fields
            res.status(200).json({ message: 'Task updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update task', error });
        }
    }

    // Handle DELETE request to remove a task
    if (req.method === 'DELETE') {
        const { id } = req.body;
        try {
            const taskDoc = doc(db, 'tasks', id);  // Reference to the specific task document
            await deleteDoc(taskDoc);  // Delete the document
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete task', error });
        }
    }

    res.status(405).json({ message: 'Method Not Allowed' });  // Respond with method not allowed for unsupported HTTP methods
}
