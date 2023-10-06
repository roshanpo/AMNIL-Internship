const Store = require("../../models/Store")

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
    const {longitude, latitude} = req.body;
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
    ]);

    res.send(storesNearby)
}

module.exports = storeController