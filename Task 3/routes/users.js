const userController = require("../modules/user/userController");
const basicAuth = require('../middleware/basicAuth')
const jwtAuth = require('../middleware/jwtAuth')

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations related to user management
 */


/**
 * @swagger
 * /users:

 *   get:
 *     summary: Get all user information
 *     tags:
 *       - Users
 *     description: Retrieve information about all users, including name, email, username, and timestamp. Requires JWT authentication.
 *     security:
 *       - JWTAuth: []  # Reference to the security definition for JWT authentication
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               timestamp :
 *                  type: string
 *             example:
 *               name: Ram
 *               email: ram@email.com
 *               role: Admin
 *               timestamp : 2023-10-16T10:00:00Z
 *       401:
 *         description: Unauthorized. Authentication required.
 */

router.get("/", jwtAuth, userController.getAllUsers);


//router.get("/",jwtAuth, userController.getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     description: Create a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               username:
 *                 type: string
 *                 description: The user's username.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *             example:
 *               name: Roshan Pokhrel
 *               email: roshan@example.com
 *               username: roshay
 *               password: secret123
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Invalid request data.
 */
router.post("/", userController.createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate a user
 *     tags:
 *       - Users
 *     description: Authenticate a user by providing a valid username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *             example:
 *               username: johndoe
 *               password: secret123
 *     responses:
 *       200:
 *         description: User authenticated successfully.
 *       401:
 *         description: Authentication failed. Invalid credentials.
 */
router.post("/login", userController.loginUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     description: Delete a user by their unique ID. Requires basic authentication.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *     security:
 *       - BasicAuth: []  # Reference to the security definition for basic authentication
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       404:
 *         description: User not found.
 */
router.delete("/:id",basicAuth, userController.deleteUser);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update user by ID. 
 *     tags:
 *       - Users
 *     description: Update a user's information by their unique ID and return the updated user data. Requires basic authentication.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *     security:
 *       - BasicAuth: []  # Reference to the security definition for basic authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *             example:
 *               name: Updated Name
 *               email: updated@email.com
 *               role: updated_role
 *     responses:
 *       200:
 *         description: User updated successfully, and the updated user data is returned.
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               timestamp :
 *                  type: string
 *             example:
 *               name: Updated Name
 *               email: updated@email.com
 *               role: updated_role
 *               timestamp : 2023-10-16T10:00:00Z
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       404:
 *         description: User not found.
 */
router.patch("/:id",basicAuth, userController.updateUser)

module.exports = router;