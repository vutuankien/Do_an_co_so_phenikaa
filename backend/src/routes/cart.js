const express = require('express');
const router = express.Router();

const CartController = require('../app/controllers/CartController');

// Cart API routes
router.patch('/api/update', CartController.updateCartQuantity);
router.delete('/api/delete/:userId/:productId', CartController.deleteCartItem);
router.post('/api/add', CartController.addToCart);
router.get('/api/:userId', CartController.getCartbyUserId);
router.get('/api', CartController.getCart);

module.exports = router;
