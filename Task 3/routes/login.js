const userController = require("../modules/user/userController");

const router = require("express").Router();

/**
 * @swagger
 * /api/google-login:
 *   get:
 *     summary: Google Login
 *     description: Initiate the Google login process for authentication.
 *     tags:
 *       - Authentication
 *     responses:
 *       302:
 *         description: Redirect to Google login page
 *       401:
 *         description: Unauthorized - Authentication failed
 */
router.get('/', userController.googleLogin);

/**
 * @swagger
 * /api/loginData:
 *   post:
 *     summary: Receive Google login data
 *     description: Receive Google login data for authentication.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               loginData:
 *                 type: object
 *                 description: Google login data.
 *             required:
 *               - loginData
 *     responses:
 *       200:
 *         description: Google login data received successfully
 *       401:
 *         description: Unauthorized - Authentication failed
 */
router.post('/loginData', userController.googleLogin);


module.exports = router;

