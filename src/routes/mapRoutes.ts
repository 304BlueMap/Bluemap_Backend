import { Router } from 'express';
import { getMapPoints } from '../controllers/mapController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

/**
 * @route GET /api/map/points
 * @description Get all points of interest for the interactive map.
 * @access Private (user must be logged in)
 */
router.get('/points', verifyToken, getMapPoints);

export { router as mapRoutes };
