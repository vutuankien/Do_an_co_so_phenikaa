const express = require('express');
const router = express.Router();

const ProductController = require('../../app/controllers/APIController/productController');
const adminAuth = require('../../app/middlewares/adminAuth');

router.post('/add', adminAuth, ProductController.add);
router.post('/update', adminAuth, ProductController.update);
router.post('/delete', ProductController.delete);
router.get('/:id', ProductController.detailProduct);
router.get('/', ProductController.index);

module.exports = router;
