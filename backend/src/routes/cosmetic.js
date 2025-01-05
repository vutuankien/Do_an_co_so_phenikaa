const express = require('express');
const router = express.Router();
const cosmeticController = require('../app/controllers/CosmeticController');

// API route
router.get('/api', cosmeticController.api);

router.get('/:id/edit', cosmeticController.edit);
router.put('/:id', cosmeticController.update);
// Create page route
router.get('/create', cosmeticController.create);

// Store cosmetic route
router.post('/store', cosmeticController.store);

// Slug route
router.get('/:slug', cosmeticController.getSlug);

// Default route (index page)
router.get('/', cosmeticController.index);

module.exports = router;
