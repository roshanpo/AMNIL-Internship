const Users = require("../../models/User");

const userController = {};

userController.getAllUsers = async (req, res) => {
  const users = await Users.find({});

  return res.json({ message: "Users fetched successfully", data: users });
};

userController.create = async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email

}
const newUser = await Users.create(user);
newUser.save();

  res.send(req.body);
};

userController.delete = async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
      return res.send('User not found');
  }

  await Users.findByIdAndDelete(req.params.id);
  res.send('user deleted');
}

module.exports = userController;