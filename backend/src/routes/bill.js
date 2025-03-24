const express = require('express');
const router = express.Router();

const BillController = require('../app/controllers/BillController');

// Bill API routes
router.get('/api/:userId', BillController.getBillByUserId);
router.post('/api/create', BillController.createBill);
router.delete('/api/delete/:orderId', BillController.deleteBill);
// router.patch('/api/update/:orderId', BillController.updateBillStatus);
router.patch('/api/update/:orderId', (req, res) => {
    console.log("🔥 API được gọi với orderId:", req.params.orderId);
    BillController.updateBillStatus(req, res);
});



router.get('/', BillController.renderUI)

module.exports = router;
