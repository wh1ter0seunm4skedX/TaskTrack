import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const tasksCollection = collection(db, 'tasks');

    if (req.method === 'GET') {
        try {
            const tasksSnapshot = await getDocs(tasksCollection);
            const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch tasks', error });
        }
    }

    // Handle POST request (Create a new task)
    if (req.method === 'POST') {
        const { title, description, completed } = req.body;
        try {
            const newTask = await addDoc(tasksCollection, {
                title,
                description,
                completed: completed || false // Boolean field to track if task is completed
            });
            res.status(201).json({ id: newTask.id, title, description, completed });
        } catch (error) {
            res.status(500).json({ message: 'Failed to add task', error });
        }
    }

    // Handle PUT request (Update an existing task)
    if (req.method === 'PUT') {
        const { id, title, description, completed } = req.body;
        try {
            const taskDoc = doc(db, 'tasks', id);
            await updateDoc(taskDoc, { title, description, completed });
            res.status(200).json({ message: 'Task updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update task', error });
        }
    }

    // Handle DELETE request (Delete an existing task)
    if (req.method === 'DELETE') {
        const { id } = req.body;
        try {
            const taskDoc = doc(db, 'tasks', id);
            await deleteDoc(taskDoc);
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete task', error });
        }
    }

    res.status(405).json({ message: 'Method Not Allowed' });
}
