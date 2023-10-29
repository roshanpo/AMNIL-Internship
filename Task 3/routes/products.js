const productController = require("../modules/product/productController");
const basicAuth = require('../middleware/basicAuth')
const Image = require("../helpers/imageUpload")
const router = require("express").Router();


/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Operations related to Product management
 */


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all product information
 *     tags:
 *       - Products
 *     description: Retrieve information about all products, including name, price, description, type and price. Requires JWT authentication.
 *     responses:
 *       200:
 *         description: Product information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               productPrice:
 *                 type: string
 *               productDescription:
 *                 type: string
 *               productType :
 *                  type: string
 *               quantity :
 *                  type: string
 *             example:
 *               productName: Smartphone
 *               productPrice: $200
 *               productDescription: Samsung. 48MP camera. Snapdragon 332.
 *               productType: Gadget
 *               quantity: 20
 *       404:
 *         description: Not found.
 */

router.get("/", productController.displayProduct);

/**
 * @swagger
 * /products/outofstock:
 *   get:
 *     summary: Get all product information which are out of stock.
 *     tags:
 *       - Products
 *     description: Retrieve information about all the products that are less than 5 in Quantity, including name, price, description, type and price.
 *     responses:
 *       200:
 *         description: Product information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               productPrice:
 *                 type: string
 *               productDescription:
 *                 type: string
 *               productType :
 *                  type: string
 *               quantity :
 *                  type: string
 *             example:
 *               productName: Smartphone
 *               productPrice: $200
 *               productDescription: Samsung. 48MP camera. Snapdragon 332.
 *               productType: Gadget
 *               quantity: 4
 *       404:
 *         description: Not found.
 */

router.get("/outofstock", productController.outOfStock);

/**
 * @swagger
 * /products/{productName}:
 *   get:
 *     summary: Find product by name.
 *     tags:
 *       - Products
 *     description: Retrieve information about the product that matches the query, including name, price, description, type and price.
 *     parameters:
 *       - in: path
 *         name: productName
 *         required: true
 *         description: The name of the product to find. 
*     responses:
 *       200:
 *         description: Product found successfully.
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               productPrice:
 *                 type: string
 *               productDescription:
 *                 type: string
 *               productType :
 *                  type: string
 *               quantity :
 *                  type: string
 *             example:
 *               productName: Smartphone
 *               productPrice: $200
 *               productDescription: Samsung. 48MP camera. Snapdragon 332.
 *               productType: Gadget
 *               quantity: 4
 *       404:
 *         description: Not found.
 */


router.get("/:productName", productController.searchProduct);
router.post("/",Image, productController.addProduct);

/**
 * @swagger
 * /products/updatequantity/{id}:
 *   put:
 *     summary: Update the product quantity by finding through ID.
 *     tags:
 *       - Products
 *     description: Update quantity of the product that matches the query.
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The ID of the product to update.
 *          schema:
 *            type: string
 *     security:
 *       - BasicAuth: []  # Reference to the security definition for basic authentication
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               quantity :
 *                  type: string
 *             example:
 *               quantity: 4
*     responses:
 *       200:
 *         description: Product quantity updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               productPrice:
 *                 type: string
 *               productDescription:
 *                 type: string
 *               productType :
 *                  type: string
 *               quantity :
 *                  type: string
 *             example:
 *               productName: Smartphone
 *               productPrice: $200
 *               productDescription: Samsung. 48MP camera. Snapdragon 332.
 *               productType: Gadget
 *               quantity: UpdatedQuantity
 *       404:
 *         description: Not found.
 */

router.put("/updatequantity/:id", productController.updateProductQuantity)

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete a product based on its unique ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     security:
 *       - BasicAuth: []
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized - Basic authentication failed
 *       404:
 *         description: Product not found
 */

router.delete("/:id", basicAuth, productController.deleteProduct);

module.exports = router;