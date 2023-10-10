const jwt = require('jsonwebtoken');
const User = require('../models/User')
const secretKey = 'secret'


const jwtAuth = async (req,res,next) =>{
jwt.sign({User}, secretKey, {expiresIn: '100s'}, (err,token)=>{
    res.json({token})
})
}

const verifyToken = function (req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send("Unauthorized");
    }
    //const bearer = authHeader.split(" ")[1];
    //console.log(bearer);
}


module.exports = jwtAuth;