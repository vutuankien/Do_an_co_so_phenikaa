const express = require('express');
const router = express.Router();

const StoreController = require('../app/controllers/StoreController');

router.get('/api', StoreController.getLocation);

module.exports = router;
