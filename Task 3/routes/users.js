const userController = require("../modules/user/userController");

const router = require("express").Router();

router.get("/", userController.getAllUSers);

router.post("/", userController.create);

module.exports = router;