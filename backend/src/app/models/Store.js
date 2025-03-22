const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const storeSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    location: {
        type: [Number], // Mảng chứa [kinh độ, vĩ độ]
        required: true,
        validate: {
            validator: function (arr) {
                return arr.length === 2;
            },
            message:
                'Location must have exactly 2 elements: [longitude, latitude]',
        },
    },
    openingHours: {
        hour: { type: Number, required: true },
        minute: { type: Number, required: true },
    },
    closingHours: {
        hour: { type: Number, required: true },
        minute: { type: Number, required: true },
    },
});

module.exports = mongoose.model('Stores', storeSchema, 'Stores');
