const Users = require("../../models/User");
//const basicAuth = require('../../middleware/basicAuth')

const userController = {};

userController.getAllUsers = async (req, res) => {
  const users = await Users.find({});

  return res.json({ message: "Users fetched successfully", data: users });
};

userController.createUser = async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    username : req.body.username,
    password : req.body.password

}
const newUser = await Users.create(user);
newUser.save();

  res.send(newUser);
};

userController.updateUser = async (req,res) => {
  const user = await Users.findOne(req.params.name);
  if (!user){
    this.createUser;
  }
  const filter = req.params.id;
  const updateUser = {
    name : req.body.name,
    email : req.body.email,
  }
  const updatedUser = await Users.findByIdAndUpdate(filter, updateUser, {new : true});
  res.send(updatedUser)
}

userController.deleteUser = async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
      return res.send('User not found');
  }

  await Users.findByIdAndDelete(req.params.id);
  res.send('user deleted');
}

module.exports = userController;