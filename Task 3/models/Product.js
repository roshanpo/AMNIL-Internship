const mongoose = require('mongoose');
//const Image = require('./image')
const schema = mongoose.Schema;


const productSchema = new schema({
    productName :{type: String},
    productPrice : {type: Number},
    productDescription : {type: String},
    productType : {type : String},
    quantity : Number,
    image :String,
})

module.exports = mongoose.model('Product', productSchema)