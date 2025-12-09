import { Request, Response } from 'express';
import { firestore } from '../config/firebase';

export const listAllUsers = async (req: Request, res: Response) => {
    try {
        const userRecords = await firestore.collection('users').get();
        if (userRecords.empty) {
            return res.status(404).json({ message: 'No users found.' });
        }
        
        const users = userRecords.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(users);
    } catch (error) {
        console.error('Error listing users:', error);
        res.status(500).json({ error: 'Failed to retrieve user list.' });
    }
};
