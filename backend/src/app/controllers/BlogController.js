const Blog = require('../models/Blog');
const { faker } = require('@faker-js/faker');

class BlogController {
    addBlog(req, res, next) {
        for (let i = 0; i < 10; i++) {
            const blog = new Blog({
                _id: faker.number.int({ min: 1, max: 10000 }),
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                author: faker.person.fullName(),
                content: faker.lorem.paragraphs(),
                tags: Array.from({ length: 3 }, () => faker.lorem.word()),
                views: faker.number.int({ min: 1, max: 10000 }),
                image: faker.image.urlPicsumPhotos(),
                slug: faker.lorem.slug(),
                isPublished: faker.datatype.boolean(),
                isFeatured: faker.datatype.boolean(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
            });

            blog.save().catch((err) => next(err)); // Ensure we handle any save errors
        }

        res.status(201).json({ message: 'Blogs added successfully' }); // Response after adding blogs
    }

    index(req, res, next) {
        Blog.find({})
            .then((blogs) => {
                // res.render('blog/blog_view', { blogs });
                res.json(blogs);
            })
            .catch(next);
    }
}

module.exports = new BlogController();
