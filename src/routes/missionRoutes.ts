import { Router } from 'express';
import { submitMission } from '../controllers/missionController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

/**
 * @route POST /api/missions/submit
 * @description Submit a mission finding.
 * @access Private (user must be logged in)
 */
router.post('/submit', verifyToken, submitMission);


export { router as missionRoutes };
