const express = require('express');
const router = express.Router();

const BillController = require('../app/controllers/BillController');

// Blog API routes

router.get('/api/:userId', BillController.getBillByUserId);
router.post('/api/create', BillController.createBill);
router.delete('/api/delete/:orderId', BillController.deleteBill);
router.patch('/api/update/:orderId', BillController.updateBillStatus);
router.get('/api', BillController.index);

module.exports = router;
