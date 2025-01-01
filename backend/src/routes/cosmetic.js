const express = require('express');

var router = express.Router();

const cosmeticController = require('../app/controllers/CosmeticController');

// router.use('//show',cosmeticController.show)
router.use('/api', cosmeticController.api);
router.use('/create', cosmeticController.create);
router.use('/:slug', cosmeticController.getSlug);
router.use('/', cosmeticController.index);

module.exports = router;
