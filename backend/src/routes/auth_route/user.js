const express = require('express');
const router = express.Router();
const UserController = require('../../app/controllers/Auth/UserController');

router.post('/login', UserController.userLogin);
router.post('/register', UserController.userRegister);
router.post('/admin', UserController.adminLogin);
router.get('/', UserController.index);

module.exports = router;
