const mongoose = require('mongoose');

const managePhotoVideoSchema = new mongoose.Schema(
    {   
        photoId :{
            type: String
        }, 
        photosVideo: {
            type: String
        },
        animals: {
            type: String
        },
        subAnimal:{
            type:String
        },
        location: {
            type: String
        },
        subLocation: {
            type: String
        },
        month: {
            type: String
        },
        year: {
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
