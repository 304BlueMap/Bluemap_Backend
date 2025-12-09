import { Router } from 'express';
import { checkRewards } from '../controllers/gameController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

// All game routes require a valid token
router.use(verifyToken);

/**
 * @route POST /api/game/check-rewards
 * @description Checks and applies rewards (points, badges) for a user after mission completion.
 * @access Private
 */
router.post('/check-rewards', checkRewards);

export { router as gameRoutes };
