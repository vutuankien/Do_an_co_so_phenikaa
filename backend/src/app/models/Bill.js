const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, // Đảm bảo đúng kiểu ObjectId
            required: true, // Bắt buộc phải có userId
            ref: 'Customer', // Liên kết với collection User
        },
        bills: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                },
                productName: { type: String, required: true },
                image: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: String, required: true },
            },
        ],
        address: { type: String, required: true },
        paymentMethod: { type: String, required: true },
        status: { type: String, default: 'Pending' },
        orderDate: { type: Date, default: Date.now },
        totalPrice: { type: String, required: true },
        phone: { type: String, required: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Bill', BillSchema);
