const mongoose = require('mongoose');

const manageMediaSchema = new mongoose.Schema(
    {   
        logoId: {
            type: String
        },
        logoInputs: {
            type: String
        },
        DateCreated:{
            type:Date
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model('manageMediaVideo', manageMediaSchema);
