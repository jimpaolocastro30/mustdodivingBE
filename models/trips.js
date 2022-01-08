const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
    {   

        tripId: {
            type: String,
            required: true
        },
        tripName: {
            type: String,
            required: true
        },
        month: {
            type: String
        },
        year:{
            type: Number
        } 
    },
    { timestamp: true }
);

module.exports = mongoose.model('trips', tripSchema);
