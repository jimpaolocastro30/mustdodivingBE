const mongoose = require('mongoose');

const urlSubSchema = new mongoose.Schema(
    {   

        urlSubId: {
            type: String,
            max: 32
        },
        urlMainId: {
            type: String,
            max: 32
        },
        urlSub: {
            type: String,
            max: 32
        }
      
    },
    { timestamp: true }
);

module.exports = mongoose.model('urlSub', urlSubSchema);
