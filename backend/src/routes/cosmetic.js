const express = require('express');
const router = express.Router();
const cosmeticController = require('../app/controllers/CosmeticController');

// API route
router.get('/api', cosmeticController.api);
// router.post('/handle_form_action', cosmeticController.handleFormActions)
router.patch('/:id/restore', cosmeticController.restore);
router.delete('/:id/force', cosmeticController.destroy);
router.get('/:id/edit', cosmeticController.edit);
router.put('/:id', cosmeticController.update);
router.post('/exportData', cosmeticController.exportData);
// Create page route
router.get('/create', cosmeticController.create);

// Store cosmetic route
router.post('/store', cosmeticController.store);
router.delete('/:id', cosmeticController.delete);

// Slug route
router.get('/:slug', cosmeticController.getSlug);

// Default route (index page)
router.get('/', cosmeticController.index);

module.exports = router;
