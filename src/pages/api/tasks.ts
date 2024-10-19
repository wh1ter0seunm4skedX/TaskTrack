import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig.ts';

// Define the handler for GET requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // Fetch tasks from Firestore collection 'tasks'
            const tasksCollection = collection(db, 'tasks');
            const tasksSnapshot = await getDocs(tasksCollection);
            const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Send tasks in response
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch tasks', error });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
