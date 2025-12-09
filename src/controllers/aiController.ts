import { Request, Response } from 'express';
import { firestore } from '../config/firebase';
import * as admin from 'firebase-admin';

/**
 * Mocks a call to an external Computer Vision API.
 * In a real application, this would involve sending the image URL
 * to a service like Google Cloud Vision.
 * @param imageUrl The URL of the image to analyze.
 * @returns A mock identification label.
 */
const mockVisionAPI = async (imageUrl: string): Promise<string> => {
    console.log(`Analyzing image: ${imageUrl}`);
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real scenario, you'd have more complex logic.
    // Here, we just return a predefined value for demonstration.
    const mockLabels = ['green_turtle', 'plastic_bottle', 'fishing_net', 'coral_bleaching'];
    const randomLabel = mockLabels[Math.floor(Math.random() * mockLabels.length)];
    
    console.log(`Mock Vision API identified: ${randomLabel}`);
    return randomLabel;
};


// Module 3: AI Recognition
export const identifyObject = async (req: Request, res: Response) => {
    const { imageUrl } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ error: 'Missing required field: imageUrl.' });
    }

    try {
        const aiLabel = await mockVisionAPI(imageUrl);

        const knowledgeCardsRef = firestore.collection('knowledge_cards');
        const snapshot = await knowledgeCardsRef.where('tag', '==', aiLabel).limit(1).get();

        if (snapshot.empty) {
            return res.status(404).json({ message: 'No knowledge card found for the identified object.', identifiedObject: aiLabel });
        }
        
        const cardData = snapshot.docs[0].data();

        res.status(200).json({
            identifiedObject: aiLabel,
            knowledgeCard: cardData,
        });

    } catch (error) {
        console.error('Error in AI identification process:', error);
        res.status(500).json({ error: 'Failed to process image and retrieve information.' });
    }
};

// Module 4: AI vs Plastic
export const logPlasticItem = async (req: Request, res: Response) => {
    const { plasticType, latitude, longitude } = req.body;

    if (!plasticType || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ error: 'Missing required fields: plasticType, latitude, longitude.' });
    }

    try {
        const pollutionLog = {
            itemType: plasticType,
            location: new admin.firestore.GeoPoint(latitude, longitude),
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            source: 'ai_identification'
        };

        const docRef = await firestore.collection('pollution_tracker').add(pollutionLog);

        res.status(201).json({ message: 'Plastic item logged successfully for research.', logId: docRef.id });

    } catch (error) {
        console.error('Error logging plastic item:', error);
        res.status(500).json({ error: 'Failed to log plastic item.' });
    }
};
