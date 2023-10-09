const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const schema = mongoose.Schema;

const geoSchema =new schema({
    type: {
      type: String,
      enum: ['Point'], 
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
storeSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('Store', storeSchema)