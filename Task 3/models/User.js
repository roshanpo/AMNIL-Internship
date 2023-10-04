const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema({
    name: {type:String},
    email: {type:String},
    phone : Number,
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

module.exports = mongoose.model('User', userSchema);