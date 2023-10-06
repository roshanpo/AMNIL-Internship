const router = require("express").Router();

const userRoutes = require("./users");
router.use("/users", userRoutes);

const productRoutes = require("./products");
router.use("/products", productRoutes);

const storeRoutes = require("./stores");
router.use("/stores", storeRoutes)

module.exports = router;