const Store = require("../../models/Store")
//const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const storeController = {};

storeController.addStore = async (req,res)=>{
    const store = {
        userID : req.body.userID,
        name : req.body.name,
        type : req.body.type,
        location : req.body.location,
    }

    const newStore = new Store(store);
    await newStore.save()
    res.send(newStore);
}

storeController.displayStore = async(req,res)=>{
    const {longitude, latitude, page, limit} = req.body;
    const options = {
        page: page || 1,
        limit: limit || 2, 
      };
    const storesNearby =await Store.aggregate([
        {
        $geoNear : {
            near : {
                type : 'point',
                coordinates : [parseFloat(longitude), parseFloat(latitude)],
            },
            distanceField: 'distance',
          maxDistance: 1000, 
          spherical: true,
        },
      },
      {
        $match: {
          distance: { $gt: 1000 }, // Filtering out stores farther than 1000 meters
        },
      },

    ]);
    const paginatedStores = await Store.aggregatePaginate(storesNearby, options)
    res.send(paginatedStores)
}

module.exports = storeController