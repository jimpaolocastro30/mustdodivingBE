const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {   

        urlId: {
            type: String,
            max: 32
        },
        urlMain: {
            type: String,
            max: 32
        }
      
    },
    { timestamp: true }
);

module.exports = mongoose.model('url', urlSchema);
