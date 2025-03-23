const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cosmetic',
            required: true,
        },
        title: { type: String },
        image: { type: String },
        quantity: { type: Number, default: 1 },
        price: { type: String },
        totalPrice: { type: Number },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Cart', CartSchema, 'Cart');
