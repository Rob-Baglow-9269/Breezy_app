const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    savedCities: [{
        cityName: {
            type: String,
            required: true,
        }
    }]
});

module.exports = mongoose.model('Favourite', favouriteSchema);