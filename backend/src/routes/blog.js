const express = require('express');
const router = express.Router();

const BlogController = require('../app/controllers/BlogController');

// Blog API routes
router.get('/api', BlogController.getAPI);
router.get('/api/:_id', BlogController.getAPIById);

// Blog render routes
router.put('/:_id', BlogController.update);
router.get('/:_id/detail', BlogController.getDetail);
router.get('/:_id/edit', BlogController.getEdit);
router.delete('/:_id', BlogController.delete);
router.post('/create', BlogController.store);
router.get('/add', BlogController.add);
router.get('/', BlogController.index);

module.exports = router;
