const express = require('express');
const router = express.Router();
const cosmeticController = require('../app/controllers/CosmeticController');

// API route
router.get('/api', cosmeticController.api);
router.get('/api/:id', cosmeticController.getIdAPI);
// router.post('/handle_form_action', cosmeticController.handleFormActions)
router.patch('/:id/restore', cosmeticController.restore);
router.delete('/:id/force', cosmeticController.destroy);
router.get('/:_id/edit', cosmeticController.edit);
router.put('/:_id', cosmeticController.update);
router.post('/exportData', cosmeticController.exportData);
// Create page route
router.get('/create', cosmeticController.create);

// Store cosmetic route
router.post('/store', cosmeticController.store);
router.delete('/:id', cosmeticController.delete);

// Slug route
router.get('/:_id', cosmeticController.getByID);

// Default route (index page)
router.get('/', cosmeticController.index);

module.exports = router;
