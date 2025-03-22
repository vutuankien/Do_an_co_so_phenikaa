const express = require('express');
const router = express.Router();

const WishListController = require('../app/controllers/WishlistController');

router.post('/api/add', WishListController.addToWishlist);
router.delete('/api/remove', WishListController.removeFromWishlist);
router.get('/api/:userId', WishListController.getWishlistByUser);
router.get('/api', WishListController.index);

module.exports = router;
