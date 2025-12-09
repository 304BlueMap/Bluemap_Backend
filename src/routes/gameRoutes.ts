import { Router } from 'express';
import { checkRewards, getLeaderboard } from '../controllers/gameController';
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

/**
 * @route GET /api/game/leaderboard
 * @description Retrieves the top 10 users for the leaderboard.
 * @access Private
 */
router.get('/leaderboard', getLeaderboard);


export { router as gameRoutes };
