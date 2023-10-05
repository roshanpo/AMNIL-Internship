const userController = require("../modules/user/userController");

const router = require("express").Router();


router.get("/", userController.getAllUsers);

router.post("/", userController.createUser);


router.delete("/:id", userController.deleteUser);

router.patch("/:id", userController.updateUser)

module.exports = router;