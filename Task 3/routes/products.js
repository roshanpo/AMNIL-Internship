const productController = require("../modules/product/productController");

const router = require("express").Router();

router.get("/", productController.displayProduct);
router.get("/outofstock", productController.outOfStock);
router.get("/:productName", productController.searchProduct);
router.post("/", productController.addProduct);

router.put("/updatequantity/:id", productController.updateProductQuantity)
router.delete("/:id", productController.deleteProduct);

module.exports = router;