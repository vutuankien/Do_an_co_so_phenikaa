const express = require('express');
const router = express.Router();

const CustomerController = require('../app/controllers/CustomerController');

// Blog API routes
router.patch('/api/update', CustomerController.update);
router.post('/api/login', CustomerController.login);
router.post('/api/register', CustomerController.register);
router.get('/api/user', CustomerController.getUser);
router.get('/api', CustomerController.index);

module.exports = router;
