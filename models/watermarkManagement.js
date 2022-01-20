const mongoose = require('mongoose');

const watermarkSchema = new mongoose.Schema(
    {   
        watermarkId: {
            type: String
        },
        watermark: {
            type: String
        },
        letterWatermark: {
            type: String
        },
        watermarkLocation: {
            type: String
        },
        DateCreated:{
            type:Date
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model('watermarkManagement', watermarkSchema);
