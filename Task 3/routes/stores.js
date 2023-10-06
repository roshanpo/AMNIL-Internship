const storeController = require('../modules/store/storeController')

const router = require("express").Router();


router.post("/", storeController.addStore);
router.post("/nearby", storeController.displayStore);

module.exports = router;