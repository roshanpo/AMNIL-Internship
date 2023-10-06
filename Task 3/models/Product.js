const mongoose = require('mongoose');
const schema = mongoose.Schema;


const productSchema = new schema({
    productName :{type: String},
    productPrice : {type: Number},
    productDescription : {type: String},
    productType : {type : String},
    quantity : Number,
})

module.exports = mongoose.model('Product', productSchema)