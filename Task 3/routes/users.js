const userController = require("../modules/user/userController");

const router = require("express").Router();


router.get("/", userController.getAllUsers);

router.post("/", userController.create);


router.delete("/:id", userController.delete);

module.exports = router;