const mongoose = require('mongoose');

const manageMediaSchema = new mongoose.Schema(
    {   
        mmediaId: {
            type: String
        },
        photosVideo: {
            type: String
        },
        animals: {
            type: String
        },
        location: {
            type: String
        },
        yearType: {
            type: String
        },
        Trips: {
            type: String
        },
        DateCreated:{
            type:Date
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model('manageMediaVideo', manageMediaSchema);
