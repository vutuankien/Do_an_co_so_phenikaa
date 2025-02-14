const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');
const shortUniqueId = require('short-unique-id');

const uid = new shortUniqueId({ length: 5 });

const BlogSchema = new Schema(
    {
        _id: { type: Number },
        title: { type: String, maxLength: 255, required: true },
        description: { type: String, required: true, maxLength: 500 },
        author: { type: String, maxLength: 100 },
        content: { type: String, required: true },
        tags: { type: String, required: true, maxLength: 100 },
        views: { type: Number, default: 0 },
        image: { type: String, required: true, maxLength: 300 },
        slug: { type: String, unique: true },
        isPublished: { type: Boolean, default: false },
        isFeatured: { type: Boolean, default: false },
        isFavorited: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
    },
    {
        timestamps: true,
    },
);

BlogSchema.pre('save', function (next) {
    let blog = this;
    let blogSlug = slugify(blog.title, {
        lower: true,
        replacement: '_',
    });

    const existBlog = mongoose.model('Blog').findOne({ slug: blogSlug }).lean();

    if (existBlog) {
        blogSlug = `${blogSlug}_${uid.randomUUID(5)}`;
    }
    blog.slug = blogSlug;
    next();
});

module.exports = mongoose.model('Blog', BlogSchema, 'Blog');
