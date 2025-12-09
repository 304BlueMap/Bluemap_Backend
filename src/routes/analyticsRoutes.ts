import { Router } from 'express';
import { getSummary } from '../controllers/analyticsController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

// Analytics routes are sensitive and should be protected
router.use(verifyToken);

/**
 * @route GET /api/analytics/summary
 * @description Get aggregated analytics data for the dashboard.
 * @access Private (Could be restricted to Admin in the future if needed)
 */
router.get('/summary', getSummary);

export { router as analyticsRoutes };
