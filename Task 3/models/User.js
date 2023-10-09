const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');


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
        required : true
    },
    role : {
        type: String,
        enum : ['viewer', 'editor', 'admin'],
        default : 'viewer'
    },
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