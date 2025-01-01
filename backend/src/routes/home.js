const express = require('express');

var router = express.Router();

const homeController = require('../app/controllers/HomeController');

router.use('/show', homeController.show);
router.use('/', homeController.index);

module.exports = router;
