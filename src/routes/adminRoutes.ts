import { Router } from 'express';
import { listAllUsers } from '../controllers/adminController';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware';

const router = Router();

// Protect all admin routes: first verify token, then check for admin role.
router.use(verifyToken, requireAdmin);

/**
 * @route GET /api/admin/users
 * @description Get a list of all users.
 * @access Admin
 */
router.get('/users', listAllUsers);

export { router as adminRoutes };
