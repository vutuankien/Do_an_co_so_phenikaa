const Blog = require('../models/Blog');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

class BlogController {
    async store(req, res, next) {
        const { title, content, image, author, tags, category } = req.body;
        const views = Math.floor(Math.random() * 10000 + 1);
        const newBlog = new Blog({
            _id: new ObjectId(),
            title,
            content,
            image,
            author,
            tags,
            views,
            category,
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
            .then((blogs) => res.render('blog/blog_view', { blogs }))
            .catch(next);
    }

    delete(req, res, next) {
        Blog.deleteOne({ _id: id })
            .then(() => res.redirect('/blog'))
            .catch(next);
    }

    getDetail(req, res, next) {
        Blog.findById(req.params._id)
            .then((blog) => {
                const safeBlog = JSON.parse(JSON.stringify(blog));

                res.render('blog/blog_detail', { blog: safeBlog });
                // res.status(200).json(blog);
            })
            .catch(next);
    }
    getEdit(req, res, next) {
        Blog.findById(req.params._id)
            .lean()
            .then((blog) => res.render('blog/blog_edit', { blog }))
            .catch(next);
    }

    update(req, res, next) {
        Blog.findByIdAndUpdate(req.params._id, req.body, { new: true })
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
    getAPIById(req, res, next) {
        Blog.findById(req.params._id)
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
