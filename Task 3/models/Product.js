const mongoose = require('mongoose');
const schema = mongoose.Schema;


const productSchema = new schema({
    productName :{type: String},
    productPrice : {type: Number},
    productDescription : {type: String},
})

module.exports = mongoose.model('Product', productSchema)