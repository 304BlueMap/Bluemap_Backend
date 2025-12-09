import { Request, Response } from 'express';
import { firestore } from '../config/firebase';

export const getMapPoints = async (req: Request, res: Response) => {
    try {
        // Fetch static hotspots
        const hotspotsSnapshot = await firestore.collection('hotspots').get();
        const hotspots = hotspotsSnapshot.docs.map(doc => ({
            id: doc.id,
            type: 'hotspot',
            ...doc.data()
        }));

        // Fetch recently verified cleanup locations from completed missions
        const missionsSnapshot = await firestore.collection('missions').where('status', '==', 'completed').get();
        const recentCleanups = missionsSnapshot.docs.map(doc => ({
            id: doc.id,
            type: 'cleanup',
            ...doc.data()
        }));

        const allPoints = [...hotspots, ...recentCleanups];

        res.status(200).json(allPoints);
    } catch (error) {
        console.error('Error fetching map points:', error);
        res.status(500).json({ error: 'Failed to retrieve map points.' });
    }
};
