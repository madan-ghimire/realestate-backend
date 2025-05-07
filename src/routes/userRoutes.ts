import { Router } from "express";
import { getUsers } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * /api/users/getAll:
 *   get:
 *     summary: Retrieves a list of all users
 *     description: Returns an array of all users in the system. Requires authentication.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get("/getAll", authenticateToken, getUsers);

// Add more user routes here as needed

export default router;
