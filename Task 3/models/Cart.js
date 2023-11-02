const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    products : [{product_id: {type : mongoose.Schema.Types.ObjectId, ref : "Product"},
    productName : {type: String},
    quantity : {type: Number, default : 1},
    price : Number},
],
    totalPrice : Number
},
{
    timeStamps : true
});

module.exports = mongoose.model('Cart', cartSchema)