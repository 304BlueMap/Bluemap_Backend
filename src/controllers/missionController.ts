import { Request, Response } from 'express';
import { firestore } from '../config/firebase';

// Approximate coordinates for Penang
const PENANG_BOUNDS = {
    minLat: 5.1,
    maxLat: 5.6,
    minLng: 100.1,
    maxLng: 100.6,
};

const isWithinPenang = (latitude: number, longitude: number): boolean => {
    return (
        latitude >= PENANG_BOUNDS.minLat &&
        latitude <= PENANG_BOUNDS.maxLat &&
        longitude >= PENANG_BOUNDS.minLng &&
        longitude <= PENANG_BOUNDS.maxLng
    );
};


export const submitMission = async (req: Request, res: Response) => {
    // The user object is attached by the verifyToken middleware
    const userId = req.user?.uid;
    const { missionId, latitude, longitude, photoUrl } = req.body;

    if (!missionId || latitude === undefined || longitude === undefined || !photoUrl) {
        return res.status(400).json({ error: 'Missing required fields: missionId, latitude, longitude, photoUrl.' });
    }

    // Geofencing validation
    if (!isWithinPenang(latitude, longitude)) {
        return res.status(400).json({ error: 'Submission rejected: Location is outside of the Penang operational area.' });
    }

    try {
        const submission = {
            userId,
            missionId,
            location: new admin.firestore.GeoPoint(latitude, longitude),
            photoUrl,
            status: 'pending_verification',
            submittedAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        const docRef = await firestore.collection('submissions').add(submission);

        res.status(201).json({ message: 'Submission received successfully.', submissionId: docRef.id });

    } catch (error) {
        console.error('Error submitting mission:', error);
        res.status(500).json({ error: 'Failed to process submission.' });
    }
};
