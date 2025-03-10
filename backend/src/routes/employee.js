const express = require('express');
const router = express.Router();

const EmployeeController = require('../app/controllers/EmployeeController');

// Blog API routes
router.delete('/:id', EmployeeController.deleteEmployee);

router.get('/api', EmployeeController.getEmployees);
router.get('/api/:id', EmployeeController.getEmployeesId);
router.get('/', EmployeeController.index);

module.exports = router;
