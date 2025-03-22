const mongoose = require('mongoose');
const { Schema } = mongoose;

const WishlistSchema = new Schema(
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
        title: { type: String, required: true }, // Xóa ref vì không phải ObjectId
        image: { type: String, required: true }, // Xóa ref
        price: { type: String, required: true }, // Xóa ref
    },
    {
        timestamps: true, // Mongoose sẽ tự động tạo createdAt & updatedAt
    },
);

module.exports = mongoose.model('Wishlist', WishlistSchema);
