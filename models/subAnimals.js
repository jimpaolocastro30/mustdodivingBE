const mongoose = require('mongoose');

const subAnimalsSchema = new mongoose.Schema(
    {   

        subAnimalsId: {
            type: String,
            required: true
        },

        animalsId: {
            type: String,
            max: 32
        },
        subAnimals: {
            type: String,
            max: 32
        },
        DateCreated:{
            type:Date
        },
      
    },
    { timestamp: true }
);

module.exports = mongoose.model('subAnimals', subAnimalsSchema);
