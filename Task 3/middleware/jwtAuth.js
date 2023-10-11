const jwt = require('jsonwebtoken');
const User = require('../models/User')
//const bcrypt = require('bcrypt')
const secretKey = 'secret'



  // Find the user in the database by username
  


const jwtAuth = async (req,res,next) =>{
    /*const { username, password } = req.body;
    const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Verify the password using bcrypt
  //const passwordMatch = await bcrypt.compare(password, User.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }*/

jwt.sign({User}, secretKey, {expiresIn: '1h'}, (err,token)=>{
    if(err){
        console.log(err);
    }
    res.json({token})
    //verifyToken();
})
const verifyToken = function (req,res,next){
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(401).send("Unauthorized");
    }
    const bearer = authHeader.split(" ")[1];
    req.token = bearer;
    next();
}


    //console.log(bearer);
    /*jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).send('Invalid token');
        }
    
        res.send(`Welcome, ${decoded.username}!`);
      });
      next()*/
}


module.exports = jwtAuth;