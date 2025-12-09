import { Request, Response } from 'express';
import { firestore } from '../config/firebase';

export const getSummary = async (req: Request, res: Response) => {
    try {
        // Server-Side Aggregation

        // 1. Get total number of users (participants)
        // Note: In a large-scale app, you would use a counter document for efficiency.
        const usersSnapshot = await firestore.collection('users').get();
        const totalUsers = usersSnapshot.size;
        
        // 2. Get total missions completed
        const missionsSnapshot = await firestore.collection('missions').where('status', '==', 'completed').get();
        const totalMissionsCompleted = missionsSnapshot.size;

        // 3. Sum up total weight of debris from the pollution tracker
        // This assumes each document has a 'weight_kg' field.
        const pollutionSnapshot = await firestore.collection('pollution_tracker').get();
        let totalTrashKg = 0;
        if (!pollutionSnapshot.empty) {
            totalTrashKg = pollutionSnapshot.docs.reduce((sum, doc) => {
                // Assuming a 'weight_kg' field exists, otherwise default to 0.1kg per item.
                return sum + (doc.data().weight_kg || 0.1); 
            }, 0);
        }

        const summary = {
            totalUsers,
            totalMissionsCompleted,
            totalTrashKg: parseFloat(totalTrashKg.toFixed(2)),
        };

        res.status(200).json(summary);
    } catch (error) {
        console.error('Error generating analytics summary:', error);
        res.status(500).json({ error: 'Failed to generate analytics summary.' });
    }
};
