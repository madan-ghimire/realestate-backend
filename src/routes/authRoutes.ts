import { Router } from "express";
import { signup, signin } from "../controllers/authController";
import { getUsers } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Registers a new user
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - firstName
 *               - lastName
 *               - displayName
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: "user@example.com"
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: "johnDoe"
 *               firstName:
 *                 type: string
 *                 description: The user's first name
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: The user's last name
 *                 example: "Doe"
 *               displayName:
 *                 type: string
 *                 description: The user's public display name
 *                 example: "John D."
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "securePassword123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

router.post("/signup", signup);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Logs in a user and returns a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized, invalid credentials
 */
router.post("/signin", signin);
/**
 * @swagger
 * /api/users/getAll:
 *   get:
 *     summary: Retrieves a list of all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Ensures Bearer Token is required
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *       500:
 *         description: Internal server error
 */
router.get("/api/users/getAll", authenticateToken, getUsers);

export default router;
