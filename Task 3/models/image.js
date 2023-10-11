const mongoose = require('mongoose');

const imageSchema = mongoose.Schema(
    {
        name: String,
        imageData: Buffer,
      }
);

module.exports = mongoose.model('Image', imageSchema)