const mongoose = require('mongoose');

const savePlaceSchema = new mongoose.Schema(
    {   
        userId : {
            type:String
        },
        savePlaceName:{
            type:String
        },
        long: {
            type: String
        },
        lat: {
            type: String
        },
        details: {
            type: String
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model('savePlace', savePlaceSchema);
