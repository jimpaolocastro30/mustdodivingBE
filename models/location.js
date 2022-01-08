const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
    {   

        locationId: {
            type: String,
            max: 32
        },
        locationName: {
            type: String,
            max: 32
        },
        DateCreated:{
            type:Date
        },
      
    },
    { timestamp: true }
);

module.exports = mongoose.model('location', locationSchema);
