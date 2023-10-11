const userController = require("../modules/user/userController");
const basicAuth = require('../middleware/basicAuth')
const jwtAuth = require('../middleware/jwtAuth')

const router = require("express").Router();


router.get("/",jwtAuth, userController.getAllUsers);

router.post("/", userController.createUser);
router.post("/login", userController.loginUser);


router.delete("/:id",basicAuth, userController.deleteUser);

router.patch("/:id", userController.updateUser)

module.exports = router;