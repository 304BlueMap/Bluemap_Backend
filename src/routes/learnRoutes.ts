import { Router } from 'express';
import { getQuizzes } from '../controllers/learnController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

// All learning routes require a valid token
router.use(verifyToken);

/**
 * @route GET /api/learn/quizzes
 * @description Get a list of quizzes for the learning hub.
 * @access Private
 */
router.get('/quizzes', getQuizzes);

export { router as learnRoutes };
