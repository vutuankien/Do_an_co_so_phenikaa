const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String, maxLength: 255, require: true },
        address: { type: String, maxLength: 500 },
        photoURL: { type: String, require: true, maxLength: 100 },
        phone: { type: String, maxLength: 40 },
        dob: { type: Date },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
    },
    {
        timestamps: true,
        minimize: false,
    },
);

module.exports = mongoose.model('Customer', CustomerSchema, 'Customer');
