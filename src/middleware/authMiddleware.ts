import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase';

// Augment the Express Request type to include our custom user property
declare global {
    namespace Express {
        interface Request {
            user?: {
                uid: string;
                email?: string;
                role?: string;
            };
        }
    }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
        return res.status(401).send({ error: 'Unauthorized: No token provided.' });
    }

    try {
        const decodedToken = await auth.verifyIdToken(token);
        // Here we are attaching the full decoded token, which includes custom claims like 'role'
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            role: decodedToken.role as string || 'user', // Default to 'user' if no role claim
        };
        next();
    } catch (error) {
        console.error('Error verifying auth token:', error);
        return res.status(403).send({ error: 'Forbidden: Invalid token.' });
    }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    // This middleware must run *after* verifyToken
    if (req.user?.role !== 'admin') {
        return res.status(403).send({ error: 'Forbidden: Administrator access required.' });
    }
    next();
};
