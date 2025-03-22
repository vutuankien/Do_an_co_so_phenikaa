const express = require('express');
const router = express.Router();

const AddressController = require('../app/controllers/AddressController');

// router.post('/api/create', AddressController.addAddress);
router.put('/api/update/:id', AddressController.updateAddress);
router.put('/api/setDefault/:userId', AddressController.setDefaults);
router.delete(
    '/api/delete/:userId/:addressId',
    AddressController.deleteAddress,
);
router.get('/api/:userId', AddressController.getAddressByUser);
router.get('/api', AddressController.index);

module.exports = router;
