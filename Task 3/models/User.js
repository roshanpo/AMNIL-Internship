const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema({
    name : String,
    email : String,
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

module.exports = mongoose.model('Users', userSchema);