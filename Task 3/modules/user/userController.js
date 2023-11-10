//const Users = require("../../models/User");
const bcrypt = require("bcrypt");
//const basicAuth = require('../../middleware/basicAuth')
require("dotenv").config();
const pool = require('../../db/config')
const userController = {};

/*
userController.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ username });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).send("Invalid password");
  }

  const payload = {
    user: {
      id: user._id,
      username: user.username,
    },
  };

  const authToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "1d",
  });

  res.status(200).send({ authToken, message: "Login successful" });
};
*/
userController.getAllUsers = async (req, res) => {
  const users = await pool.query('SELECT * FROM users')
  if (users.rowCount === 0) {
    return res.status(200).send('No users found')
}
else{
  return res.send(users.rows)
}

  //return res.json({ message: "Users fetched successfully", data: users });
};

userController.createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);



  const user = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
  };
  const newUser = await pool.query('INSERT INTO users (name, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *', [user.name,user.email, user.username, user.password]);
  /*try {
    const newUser = await Users.create(user);
    res.status(201);
  } catch (error) {
    res.status(400);
  }*/

  /*const payload = {
    user: {
      id: newUser._id,
      username: newUser.username,
    },
  };

  const authToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "1d",
  });

  newUser.image = getImageUrl(req, newUser.image);
  res.status(201).send({ newUser, authToken });

  newUser.save();
*/
  res.send(newUser.rows);
};

userController.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await pool.query('SELECT * FROM users WHERE username=$1',[username]);

  if (!user) {
    return res.status(404).send("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).send("Invalid password");
  }
}

userController.updateUser = async (req, res) => {
  const user = await pool.query('SELECT * FROM users WHERE id=$1', [req.params.id]);

  if (user.rowCount === 0) {
      return res.status(404).send('User not found');
  }
  const updateUser = {
    ...user.rows[0],
    name: req.body.name,
    email: req.body.email,
}


const result = await pool.query('UPDATE users SET name=$1, email=$2, WHERE id=$3 RETURNING *', [updateUser.name, updateUser.email, req.params.id]);

const updatedUser = result.rows[0];

res.status(200).send(updatedUser);
};

userController.deleteUser = async (req, res) => {
  const user = await pool.query('SELECT * FROM users WHERE user_id=$1', [req.params.id]);
  if (user.rowCount === 0) {
      return res.status(404).send('User not found');
  }

  await pool.query('DELETE FROM users WHERE user_id=$1', [req.params.id]);
  res.status(200).send('user deleted');
};

module.exports = userController;
