const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        title: { type: String, maxLength: 255, required: true },
        author: { type: String, maxLength: 100 },
        content: [{ type: String, required: true }],
        tags: [{ type: String, required: true, maxLength: 100 }],
        views: { type: Number, default: 0 },
        image: [{ type: String, required: true }],
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
        category: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Blog', BlogSchema, 'Blog');
