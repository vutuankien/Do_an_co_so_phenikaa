const express = require('express');
const router = express.Router();

const cartDataController = require('../../app/controllers/APIController/cartDataController');
const authUser = require('../../app/middlewares/auth');

router.get('/add', authUser, cartDataController.addToCart);
router.get('/', authUser, cartDataController.getCart);

module.exports = router;
