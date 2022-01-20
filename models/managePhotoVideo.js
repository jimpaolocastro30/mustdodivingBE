const mongoose = require('mongoose');

const managePhotoVideoSchema = new mongoose.Schema(
    {   

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

        isVideo:{
            type:String
        },
        isWatermark:{
            type:Number
        },
        DateCreated:{
            type:Date
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model('managePhotoVideo', managePhotoVideoSchema);
