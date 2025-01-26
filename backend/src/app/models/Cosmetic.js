const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortUniqueId = require('short-unique-id');
const slugify = require('slugify');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const uid = new shortUniqueId({ length: 5 });

const CosmeticSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, maxLength: 255, require: true },
        description: { type: String, require: true, maxLength: 500 },
        category: { type: String, require: true, maxLength: 100 },
        brand: { type: String, require: true, maxLength: 100 },
        stock: { type: Number, require: true },
        image: { type: String, require: true, maxLength: 300 },
        isNewArrival: { type: Boolean },
        isBestSeller: { type: Boolean },
        isFavorite: { type: Boolean },
        price: { type: Number, require: true },
        size: { type: String, maxLength: 100 },
        slug: { type: String, require: true, unique: true },
        expirationDate: { type: Date, require: true },
        manufacturingDate: { type: Date, require: true },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
        rating: { type: Number, default: 0 },
    },
    {
        timestamps: true,
        _id: false, // Tự động thêm createdAt và updatedAt
    },
);

CosmeticSchema.plugin(AutoIncrement);

CosmeticSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});
CosmeticSchema.pre('save', function (next) {
    let cosmetic = this;
    let cosmeticSlug = slugify(cosmetic.name, {
        lower: true,
        replacement: '_',
    });

    const existCosmetic = mongoose
        .model('Cosmetic')
        .findOne({ slug: cosmeticSlug })
        .lean();

    if (existCosmetic) {
        cosmeticSlug = `${cosmeticSlug}_${uid.randomUUID(5)}`;
    }
    cosmetic.slug = cosmeticSlug;
    next();
});

module.exports = mongoose.model('Cosmetic', CosmeticSchema, 'Cosmetic');
