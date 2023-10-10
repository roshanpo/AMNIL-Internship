const storeController = require('../modules/store/storeController')
const basicAuth = require('../middleware/basicAuth')

const router = require("express").Router();


router.post("/",basicAuth,storeController.addStore);
router.post("/nearby", storeController.displayStore);

module.exports = router;