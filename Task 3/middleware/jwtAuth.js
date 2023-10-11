const jwt = require('jsonwebtoken');
const User = require('../models/User')
require('dotenv').config();
//const bcrypt = require('bcrypt')


const jwtAuth = async (req,res,next) =>{
    try{
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(401).send("Unauthorized");
    }
    const bearer = authHeader.split(" ")[1];

    const verify  = jwt.verify(bearer, process.env.ACCESS_TOKEN_SECRET)

    if (!decoded.user) {
        return res.status(401).send('Access denied. Invalid token');
    }
    const validateUser = await User.findById(decoded.user.id);

    if (!validateUser) {
        return res.status(401).send('Access denied. User not found');
    }

    req.user = decoded.user;
    next();
} 
catch (error) {
    res.status(401).send('Invalid token');
}

}


module.exports = jwtAuth;