const userController = require("../modules/user/userController");

const router = require("express").Router();


router.get('/', userController.googleLogin);
router.post('/loginData', userController.googleLogin);


module.exports = router;

