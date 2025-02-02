const Blog = require('../models/Blog');
const mongoose = require('mongoose');
const generateId = async () => {
    const lastBlog = await Blog.findOne().sort({ _id: -1 }).lean();
    return lastBlog ? lastBlog._id + 1 : 1;
};
class BlogController {
    async store(req, res, next) {
        const newId = await generateId();
        const { title, content, description, image, slug, author, tags } =
            req.body;

        // Chuyển đổi giá trị checkbox
        const isPublished = req.body.isPublished === 'true';
        const isFeatured = req.body.isFeatured === 'true';
        const isFavorited = req.body.isFavorited === 'true';
        const views = Math.floor(Math.random() * 10000 + 1);
        const newBlog = new Blog({
            _id: newId,
            title,
            content,
            description,
            image,
            slug,
            author,
            tags,
            views,
            isPublished,
            isFeatured,
            isFavorited,
        });
        newBlog
            .save()
            .then(() => {
                console.log(newBlog);
                res.redirect('/blog');
            })
            .catch(next);
    }
    add(req, res, next) {
        res.render('blog/blog_create');
    }

    index(req, res, next) {
        Blog.find({})
            .lean()
            .then((blogs) => {
                res.render('blog/blog_view', { blogs });
                // res.json(blogs);
            })
            .catch(next);
    }

    delete(req, res, next) {
        const id = req.params.id; // Chắc chắn id là số

        if (isNaN(id)) {
            console.log('id blog đang xóa: ' + id);
            console.log('type of id: ' + typeof id);
            return res.status(400).json({
                error: 'Invalid Blog ID',
                id: id,
            });
        }

        Blog.deleteOne({ _id: id })
            .then(() => res.redirect('/blog'))
            .catch(next);
    }

    getDetail(req, res, next) {
        Blog.findOne({ slug: req.params.slug })
            .lean()
            .then((blog) => res.render('blog/blog_detail', { blog }))
            .catch(next);
    }
    getEdit(req, res, next) {
        Blog.findOne({ slug: req.params.slug })
            .lean()
            .then((blog) => res.render('blog/blog_edit', { blog }))
            .catch(next);
    }

    update(req, res, next) {
        req.body.isFavorited = req.body.isFavorited === 'true';
        req.body.isFeatured = req.body.isFeatured === 'true';
        req.body.isPublished = req.body.isPublished === 'true';

        Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .lean()
            .then(() => res.redirect('/blog'))
            .catch((err) => next(err));
    }

    //API Functions
    getAPI(req, res, next) {
        Blog.find({})
            .lean()
            .then((blogs) => {
                res.status(200).json(blogs);
            })
            .catch((err) => next(err));
    }
    getAPIBySlug(req, res, next) {
        const slug = decodeURIComponent(req.params.slug); // Giải mã slug nếu cần
        console.log('Request Slug:', slug);

        Blog.findOne({ slug })
            .lean()
            .then((blog) => {
                if (!blog) {
                    return res.status(404).json({ error: 'Blog not found' });
                }
                res.status(200).json(blog);
            })
            .catch((err) => {
                console.error('Error fetching blog:', err);
                next(err);
            });
    }
}

module.exports = new BlogController();
