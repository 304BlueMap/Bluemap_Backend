import { Request, Response } from 'express';
import { firestore } from '../config/firebase';
import * as admin from 'firebase-admin';

const POINTS_FOR_CLEANUP = 100;
const POINTS_FOR_OBSERVATION = 50;

const BADGE_OCEAN_SAVIOR = {
    id: 'badge_ocean_savior',
    name: 'Ocean Savior',
    description: 'Cleaned over 50 plastic items.',
};

export const checkRewards = async (req: Request, res: Response) => {
    const userId = req.user?.uid;
    const { missionType } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is missing.' });
    }
    if (!['cleanup', 'observation'].includes(missionType)) {
        return res.status(400).json({ error: 'Invalid missionType. Must be "cleanup" or "observation".' });
    }

    const userRef = firestore.collection('users').doc(userId);

    try {
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const userData = userDoc.data()!;
        const pointsToAdd = missionType === 'cleanup' ? POINTS_FOR_CLEANUP : POINTS_FOR_OBSERVATION;

        // Transaction to ensure atomic updates
        const newBadge = await firestore.runTransaction(async (transaction) => {
            const freshUserDoc = await transaction.get(userRef);
            const freshUserData = freshUserDoc.data()!;

            const newPoints = (freshUserData.points || 0) + pointsToAdd;
            const newPlasticCount = missionType === 'cleanup' ? (freshUserData.total_plastic_cleaned || 0) + 1 : (freshUserData.total_plastic_cleaned || 0);

            const updates: { [key: string]: any } = {
                points: newPoints,
                total_plastic_cleaned: newPlasticCount,
            };

            // Badge Logic
            const currentBadges = freshUserData.badges_earned || [];
            const hasOceanSaviorBadge = currentBadges.some((badge: any) => badge.id === BADGE_OCEAN_SAVIOR.id);
            
            let awardedNewBadge = false;
            if (newPlasticCount > 50 && !hasOceanSaviorBadge) {
                updates.badges_earned = [...currentBadges, BADGE_OCEAN_SAVIOR];
                awardedNewBadge = true;
            }

            transaction.update(userRef, updates);
            return awardedNewBadge ? BADGE_OCEAN_SAVIOR : null;
        });

        res.status(200).json({
            message: 'Rewards calculated successfully.',
            pointsAwarded: pointsToAdd,
            newBadgeAwarded: newBadge,
        });

    } catch (error) {
        console.error('Error checking rewards:', error);
        res.status(500).json({ error: 'Failed to update user rewards.' });
    }
};
