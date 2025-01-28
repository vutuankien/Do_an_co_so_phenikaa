const express = require('express');
const router = express.Router();

const BlogController = require('../app/controllers/BlogController');

// Blog page route
router.post('/add', BlogController.addBlog);
router.get('/', BlogController.index);

module.exports = router;
