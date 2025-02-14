const express = require('express');

var router = express.Router();

const trashController = require('../app/controllers/TrashController');

// router.patch('/:id/restore', trashController.restore)
router.get('/storedCosmetic', trashController.storedCosmetic);

module.exports = router;
