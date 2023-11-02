const orderController = require("../modules/order/orderController");
const router = require("express").Router();

router.post('/cart/add', orderController.addToCart);
router.post('/checkout', orderController.checkOut);


module.exports = router;