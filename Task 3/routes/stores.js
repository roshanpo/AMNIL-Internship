const storeController = require('../modules/store/storeController')
const basicAuth = require('../middleware/basicAuth')

const router = require("express").Router();

/**
 * @swagger
 * /stores:
 *   post:
 *     summary: Add a store
 *     description: Add a new store to the system.
 *     tags:
 *       - Stores
 *     security:
 *       - BasicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  userID: 
 *                      type : string
 *                  name:
 *                      type: string
 *                  storetype:
 *                      type : string
 *                  location: 
 *                      type: points 
 *              example:
 *                  userID: 609a867c149b840013c774a2
 *                  name: Sample Store
 *                  type: Grocery
 *                  location: longitude, latitude 
 *     responses:
 *       200:
 *         description: Store added successfully
 *         content:
 *           application/json:
 *              example:
 *                  userID: 609a867c149b840013c774a2
 *                  name: Sample Store
 *                  type: Grocery
 *                  location: longitude, latitude
 *       401:
 *         description: Unauthorized - Basic authentication failed
 */
router.post("/",basicAuth,storeController.addStore);

/**
 * @swagger
 * /stores/nearby:
 *   post:
 *     summary: Retrieve nearby stores
 *     description: Retrieve stores near a specified location based on longitude and latitude.
 *     tags:
 *       - Stores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longitude:
 *                 type: number
 *                 format: double
 *                 description: The longitude coordinate.
 *               latitude:
 *                 type: number
 *                 format: double
 *                 description: The latitude coordinate.
 *               page:
 *                 type: integer
 *                 description: The page number for paginating results.
 *               limit:
 *                 type: integer
 *                 description: The maximum number of stores to return per page.
 *             required:
 *               - longitude
 *               - latitude
 *     responses:
 *       200:
 *         description: Nearby stores retrieved successfully
 *         content:
 *           application/json:
 *              example:
 *                  name: Sample Store
 *                  type: Grocery
 *                  location: longitude, latitude
 *       400:
 *         description: Bad request - Invalid parameters
 */
router.post("/nearby", storeController.displayStore);

module.exports = router;