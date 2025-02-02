const express = require('express');
const router = express.Router();

const BlogController = require('../app/controllers/BlogController');

// Blog API routes
router.get('/api', BlogController.getAPI);
router.get('/api/:slug', BlogController.getAPIBySlug);

// Blog render routes
router.put('/:id', BlogController.update);
router.get('/:slug/detail', BlogController.getDetail);
router.get('/:slug/edit', BlogController.getEdit);
router.delete('/:id', BlogController.delete);
router.post('/create', BlogController.store);
router.get('/add', BlogController.add);
router.get('/', BlogController.index);

module.exports = router;
