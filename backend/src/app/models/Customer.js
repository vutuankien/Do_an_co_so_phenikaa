const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
    {
        email: { type: String, required: true },
        name: { type: String, maxLength: 255 },
        // address: { type: String, maxLength: 500 },
        photoURL: { type: String, default: 'https://i.pravatar.cc/150' },
        phone: { type: String, maxLength: 40 },
        password: { type: String },
        dob: { type: Date },
    },
    {
        timestamps: true,
        minimize: false,
    },
);

module.exports = mongoose.model('Customer', CustomerSchema, 'Customer');
