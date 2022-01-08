const mongoose = require('mongoose');

const animalsSchema = new mongoose.Schema(
    {   

        animalsId: {
            type: String,
            max: 32
        },
        animalsMain: {
            type: String,
            max: 32
        },
        DateCreated:{
            type:Date
        },
      
    },
    { timestamp: true }
);

module.exports = mongoose.model('animals', animalsSchema);
