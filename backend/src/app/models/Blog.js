const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');
const shortUniqueId = require('short-unique-id');
const mongooseDelete = require('mongoose-delete');

const uid = new shortUniqueId({ length: 5 });

const BlogSchema = new Schema(
    {
        _id: { type: Number },
        title: { type: String, maxLength: 255, require: true },
        description: { type: String, require: true, maxLength: 500 },
        author: { type: String, maxLength: 100 },
        content: { type: String, require: true },
        tags: [{ type: String, maxLength: 100 }],
        views: { type: Number, default: 0 },
        image: { type: String, require: true, maxLength: 300 },
        slug: { type: String, require: true, unique: true },
        isPublished: { type: Boolean, default: false },
        isFeatured: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
    },
    {
        timestamps: true,
        _id: false, // Tự động thêm createdAt và updatedAt
    },
);

BlogSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});
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
