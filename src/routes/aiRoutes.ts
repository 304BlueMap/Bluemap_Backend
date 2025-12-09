import { Router } from 'express';
import { identifyObject, logPlasticItem } from '../controllers/aiController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

// All AI routes require a valid token
router.use(verifyToken);

/**
 * @route POST /api/ai/identify
 * @description Identify an object in an image and return a knowledge card.
 * @access Private (user must be logged in)
 */
router.post('/identify', identifyObject);


/**
 * @route POST /api/ai/plastic/log
 * @description Log an identified piece of plastic for research purposes.
 * @access Private (user must be logged in)
 */
router.post('/plastic/log', logPlasticItem);


export { router as aiRoutes };
