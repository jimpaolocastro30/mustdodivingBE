const mongoose = require('mongoose');

const fManagePageSchema = new mongoose.Schema(
    {   
        pageId: {
            type: String
        },
        path: {
            type: String
        },
        published: {
            type: String
        },
        description: {
            type: String
        },
        title: {
            type: String
        },
        socialMedia:{
            type: {},
            min: 200,
            max: 2000000
        },
        body:{
            type: {},
            min: 200,
            max: 2000000
        },
        logo:{
            type: {},
            min: 200,
            max: 2000000
        },
        menu:{
            type: {},
            min: 200,
            max: 2000000
        },
        socialMedia:{
            type: {},
            min: 200,
            max: 2000000
        },
        subscription:{
            type: {},
            min: 200,
            max: 2000000
        },
        topbar:{
            type: {},
            min: 200,
            max: 2000000
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

module.exports = mongoose.model('fmanageMediaPage', fManagePageSchema);
