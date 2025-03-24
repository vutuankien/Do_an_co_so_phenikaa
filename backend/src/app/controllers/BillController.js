const Bill = require('../models/Bill');
const Customer = require('../models/Customer');
const mongoose = require('mongoose');

class BillController {
    // TODO: API ROUTES
    async getBillByUserId(req, res, next) {
        try {
            const { userId } = req.params;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ error: 'Invalid user ID' });
            }

            const orders = await Bill.find({
                userId: new mongoose.Types.ObjectId(userId),
            }).sort({ orderDate: -1 });
            res.json(orders);
        } catch (error) {
            console.error('Lỗi lấy danh sách đơn hàng:', error);
            res.status(500).json({ error: 'Lỗi server' });
        }
    }

    async deleteBill(req, res) {
        try {
            const { orderId } = req.params;

            if (!mongoose.Types.ObjectId.isValid(orderId)) {
                return res.status(400).json({ error: 'Invalid order ID' });
            }

            const deletedBill = await Bill.findByIdAndDelete(orderId);

            if (!deletedBill) {
                return res.status(404).json({ error: 'Order not found' });
            }

            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            console.error('Error deleting order:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    async updateBillStatus(req, res) {
        try {
            const { orderId } = req.params;
            const { status } = req.body;

            if (!mongoose.Types.ObjectId.isValid(orderId)) {
                return res.status(400).json({ error: 'Invalid order ID' });
            }

            const updatedBill = await Bill.findByIdAndUpdate(
                orderId,
                { status },
                { new: true },
            );

            if (!updatedBill) {
                return res.status(404).json({ error: 'Order not found' });
            }

            res.status(200).json({
                message: 'Order status updated successfully',
                order: updatedBill,
            });
        } catch (error) {
            console.error('Error updating order status:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    async createBill(req, res, next) {
        try {
            const {
                userId,
                bills,
                address,
                paymentMethod,
                status,
                orderDate,
                totalPrice,
                phone,
            } = req.body;

            if (
                !userId ||
                !bills ||
                !Array.isArray(bills) ||
                bills.length === 0
            ) {
                return res.status(400).json({ error: 'Invalid input data' });
            }

            const userObjectId = new mongoose.Types.ObjectId(userId);

            console.log('🆕 Creating new bill...');

            // Tạo mới bill
            const newBill = new Bill({
                userId: userObjectId,
                bills,
                address,
                paymentMethod,
                status,
                orderDate,
                totalPrice: `$${parseFloat(totalPrice.replace('$', '')).toFixed(2)}`,
                phone,
            });

            console.log('🔍 New Bill _id Before Saving:', newBill._id);
            console.log('🔍 New Bill userId Before Saving:', newBill.userId);

            await newBill.save();

            console.log('✅ New bill created successfully!');
            res.status(201).json({
                message: 'New bill created successfully',
                bill: newBill,
            });
        } catch (error) {
            console.error('❌ Error creating new bill:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    index(req, res) {
        Bill.find({})
            .lean()
            .then((bills) => res.status(200).json(bills))
            .catch((err) => res.status(400).json('Error: ' + err));
    }



    //TODO:UI RENDER
    renderUI(req, res, next) {
        Bill.find({})
            .populate("userId") // Liên kết với bảng Customer
            .lean()
            .then((bills) => {
                console.log("📌 Bills với userId đã populate:", bills);
                res.render("Order/order_confirm", { bills });
            })
            .catch((err) => res.status(400).json("Error: " + err));
    }

}

module.exports = new BillController();
