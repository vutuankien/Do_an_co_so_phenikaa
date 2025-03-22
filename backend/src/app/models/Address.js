const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema(
    {
        userId: { type: String, ref: 'Customer', required: true },
        address: [
            {
                id: { type: String, required: true },
                address: { type: String },
                default: { type: Boolean, default: false },
            },
        ],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Address', AddressSchema, 'Address');
