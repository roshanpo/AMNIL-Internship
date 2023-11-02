const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cartItemSchema = new mongoose.Schema({
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    productName :{type : String},
    quantity: Number,
    price: Number,
    _id: mongoose.Schema.Types.ObjectId
  });

const userSchema = new mongoose.Schema({
  user_id : {type : schema.Types.ObjectId, ref : "User"},
  name : String,
  email : String
})
const orderSchema = new schema({
    user : userSchema,
    products : [cartItemSchema],
    totalPrice : Number,
    
},
{
  timestamps : true
});

module.exports = mongoose.model('Order', orderSchema)