const mongoose = require('mongoose')
const schema = mongoose.Schema;

const geoSchema =new schema({
    type: {
      type: String,
      enum: ['Point'], // You can use 'Point' for single point locations
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index : "2dsphere",
    },
})

const storeSchema = new schema({
    userID : {type : schema.Types.ObjectId, ref : "User"},
    name : {type: String},
    type : {
        type : String,
        enum : ['Electronics', 'Grocery', 'Clothing', 'Stationery']
    },
    location: geoSchema,
})

module.exports = mongoose.model('Store', storeSchema)