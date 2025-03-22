const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        bills: [
            {
                productId: { type: String, ref: 'Cosmetic' },
                quantity: { type: Number },
                price: { type: Number, ref: 'Cosmetic' },
                productName: { type: String, ref: 'Cosmetic' },
                image: { type: String, ref: 'Cosmetic' },
            },
        ],
        customerId: { type: String, ref: 'Customer' },
        address: { type: String, ref: 'Address' },
        paymentMethod: { type: String },
        status: { type: String },
        orderDate: { type: Date },
        totalPrice: { type: Number },
        phone: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Bill', BillSchema, 'Bill');
