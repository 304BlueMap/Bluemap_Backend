import { Request, Response } from 'express';

// Mock data for quizzes. In a real application, this would come from Firestore.
const mockQuizzes = [
    {
        id: 'quiz1',
        title: 'Marine Life Identification',
        questions: [
            {
                question: 'What is the largest animal on Earth?',
                options: ['African Elephant', 'Blue Whale', 'Saltwater Crocodile', 'Great White Shark'],
                answer: 'Blue Whale',
            },
            {
                question: 'Which of these is a primary cause of coral bleaching?',
                options: ['Overfishing', 'Loud noises', 'Rising ocean temperatures', 'Plastic bags'],
                answer: 'Rising ocean temperatures',
            },
        ],
        source: 'Source: USM Marine Biology Department',
    },
    {
        id: 'quiz2',
        title: 'Plastic Pollution Facts',
        questions: [
            {
                question: 'How long does a plastic bottle take to decompose in the ocean?',
                options: ['10 years', '50 years', '100 years', 'Over 450 years'],
                answer: 'Over 450 years',
            },
        ],
        source: 'Source: WWF Malaysia',
    }
];

export const getQuizzes = async (req: Request, res: Response) => {
    try {
        // Here, we just return the mock data.
        // To extend, you could fetch this from a 'quizzes' collection in Firestore.
        res.status(200).json(mockQuizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Failed to retrieve quizzes.' });
    }
};
