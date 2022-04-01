const mongoose = require('mongoose');

const managePhotoVideoSchema = new mongoose.Schema(
    {   
        photosId: {
            type: String,
            max: 32
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
        description: {
            type: String
        },
        isVideo:{
            type:String
        },
        isWatermark:{
            type:String
        },
        DateCreated:{
            type:Date
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model('managePhotoVideo', managePhotoVideoSchema);
