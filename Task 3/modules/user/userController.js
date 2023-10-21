const Users = require("../../models/User");
const bcrypt = require("bcrypt")
//const basicAuth = require('../../middleware/basicAuth')
require('dotenv').config();
const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');

const userController = {};



userController.googleLogin = async (req, res) => {

  if (!admin.apps.length) {
    const firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  res.render('login')
  const loginData = req.body;
  const idToken = String(loginData.idToken);

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      console.log('User Verified');
      console.log('User ID:', decodedToken.uid);
      console.log('Email:', decodedToken.email);
      console.log('Name: ', decodedToken.name);


      // The token is valid. You can trust this user.
    })
    .catch((error) => {
      console.error('Token verification error:', error);
    });

}

userController.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ username });

  if (!user) {
    return res.status(404).send('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).send('Invalid password');
  }

  const payload = {
    user: {
      id: user._id,
      username: user.username
    }
  }

  const authToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '1d' });

  res.status(200).send({ authToken, message: "Login successful" });

}

userController.getAllUsers = async (req, res) => {
  const users = await Users.find({});

  return res.json({ message: "Users fetched successfully", data: users });
};

userController.createUser = async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password

  }
 // const newUser = await Users.create(user);
  try {
    const newUser = await Users.create(user);
    res.status(201);
    
  } catch (error) {
    res.status(400)
  }
  
  const payload = {
    user: {
      id: newUser._id,
      username: newUser.username
    }
  }

  const authToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '1d' });

  newUser.image = getImageUrl(req, newUser.image);
  res.status(201).send({ newUser, authToken });

  newUser.save();

  res.send(newUser);
};

userController.updateUser = async (req, res) => {
  const user = await Users.findOne(req.params.name);
  if (!user) {
    this.createUser;
  }
  const filter = req.params.id;
  const updateUser = {
    name: req.body.name,
    email: req.body.email,
  }
  const updatedUser = await Users.findByIdAndUpdate(filter, updateUser, { new: true });
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