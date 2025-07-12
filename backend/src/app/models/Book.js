const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        title: { type: String, maxLength: 255, required: true },
        author: { type: String, maxLength: 100, required: true },
        description: { type: String, required: true },
        publisher: { type: String, maxLength: 100 },
        publishedDate: { type: Date },
        pages: { type: Number },
        genres: [{ type: String, maxLength: 100 }],
        coverImage: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Book', BookSchema, 'Book');
