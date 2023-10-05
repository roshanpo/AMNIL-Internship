const productController = require("../modules/product/productController");

const router = require("express").Router();

router.get("/", productController.displayProduct)
router.post("/", productController.addProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;