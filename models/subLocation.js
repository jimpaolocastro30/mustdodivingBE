const mongoose = require('mongoose');

const subLocationSchema = new mongoose.Schema(
    {   

        subLocationId: {
            type: String,
            max: 32
        },
        locationId: {
            type: String,
            max: 32
        },
        subLocationName: {
            type: String,
            max: 32
        },
        DateCreated:{
            type:Date
        },
      
    },
    { timestamp: true }
);

module.exports = mongoose.model('subLocation', subLocationSchema);
