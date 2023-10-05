const productController = require("../modules/product/productController");

const router = require("express").Router();

router.get("/", productController.displayProduct);
router.get("/:productName", productController.searchProduct);
router.post("/", productController.addProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;