const mongoose = require('mongoose');

const managePageSchema = new mongoose.Schema(
    {   
        pageId: {
            type: String
        },
        pageUrl: {
            type: String
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
