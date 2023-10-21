const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         username:
 *           type: string
 *           unique: true
 *           required: true
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: ['viewer', 'editor', 'admin']
 *           default: 'viewer'
 */

const userSchema = new schema({
    name : String,
    email : String,
    username : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        //required : true
    },
    role : {
        type: String,
        enum : ['viewer', 'editor', 'admin'],
        default : 'viewer'
    },
    image: Buffer
},
{
    timestamps : true
}
);

userSchema.pre('save', async function (next){
    try {
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next()
    } catch (error) {
        next(error)
    }
})

module.exports = mongoose.model('Users', userSchema);