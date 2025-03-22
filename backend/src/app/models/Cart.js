const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema(
    {
        userId: {
            type: String,
            ref: 'Customer',
            required: true,
        },
        productId: { type: String, ref: 'Cosmetic', required: true },
        title: { type: String, ref: 'Cosmetic' },
        image: { type: String },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
        totalPrice: { type: Number },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Cart', CartSchema, 'Cart');
