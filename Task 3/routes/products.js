const productController = require("../modules/product/productController");

const router = require("express").Router();

router.post("/", productController.addProduct);

module.exports = router;