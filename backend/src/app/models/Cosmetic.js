const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongooseDelete = require('mongoose-delete');

const CosmeticSchema = new Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        id: { type: Number },
        title: { type: String, maxLength: 255, require: true },
        description: [{ type: String, require: true, maxLength: 500 }],
        category: [{ type: String, require: true, maxLength: 100 }],
        tags: [{ type: String }],
        brand: { type: String, maxLength: 100 },
        image: { type: String, require: true, maxLength: 300 },
        isNewArrival: { type: Boolean },
        isBestSeller: { type: Boolean },
        isFavorite: { type: Boolean },
        price: { type: String, require: true },
        salePrice: { type: String },
        onSale: { type: Boolean },
        color: { type: String },
        size: { type: String, maxLength: 100 },
        country: { type: String },
        feature: { type: String },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
    },
    {
        timestamps: true,
    },
);

CosmeticSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Cosmetic', CosmeticSchema, 'Cosmetic');
