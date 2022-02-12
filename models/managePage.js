const mongoose = require('mongoose');

const managePageSchema = new mongoose.Schema(
    {   
        pageId: {
            type: String
        },
        pageUrl: {
            type: String,
            unique: true
        },
        pageTitle:{
            type:String
        },
        pageDescription:{
            type:String
        },
        scientificName:{
            type:String
        },
        animalType:{
            type:String
        },
        diet:{
            type:String
        },
        averageLifeSpan:{
            type:String
        },
        estimatedSize:{
            type:String
        },
        estimatedWeight:{
            type:String
        },
        pageBody:{
            type:String
        },
        isActive:{
            type:String,
            default:1
        },
        dateCreated:{
            type:Date
        },
        dateUpdated:{
            type:Date
        },
    },
    { timestamp: true }
);

module.exports = mongoose.model('manageMediaPage', managePageSchema);
