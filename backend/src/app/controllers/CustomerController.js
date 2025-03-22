const Customer = require('../models/Customer');
const mongoose = require('mongoose');
class CustomerController {
    // Đăng ký tài khoản (không cần xác thực)
    async register(req, res, next) {
        try {
            console.log('Request body:', req.body);

            const { email, password, name, address, photoURL, phone, dob } =
                req.body;

            if (!email) {
                return res.status(400).json({ message: 'Thiếu email.' });
            }

            const existingCustomer = await Customer.findOne({ email });
            if (existingCustomer) {
                return res
                    .status(400)
                    .json({ message: 'Người dùng đã tồn tại.' });
            }

            const newCustomer = new Customer({
                email,
                name: name || 'User',
                photoURL: photoURL || 'https://i.pravatar.cc/150',
                password: password || '',
                phone: phone || '',
                dob: dob || '',
            });

            await newCustomer.save();

            res.status(201).json({
                message: 'Đăng ký thành công!',
                user: newCustomer,
            });
        } catch (error) {
            console.error('Error in register:', error);
            res.status(500).json({
                message: 'Lỗi server',
                error: error.message,
            });
        }
    }

    // Đăng nhập (chỉ kiểm tra email, không kiểm tra mật khẩu)
    async login(req, res, next) {
        try {
            const { email } = req.body;

            const customer = await Customer.findOne({ email });

            if (!customer) {
                return res
                    .status(404)
                    .json({ message: 'Email không tồn tại!', user: null });
            }

            res.status(200).json({
                message: 'Đăng nhập thành công',
                user: customer,
            });
        } catch (error) {
            next(error);
        }
    }

    async getUser(req, res, next) {
        try {
            const { id } = req.query; // Lấy id từ query params

            if (!id) {
                return res.status(400).json({ message: 'Thiếu user ID' });
            }

            const customer = await Customer.findById(id).lean();

            if (!customer) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy người dùng' });
            }

            res.status(200).json(customer);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, address, phone, dob, photoURL } = req.body;

            // Kiểm tra ID có hợp lệ không
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'ID không hợp lệ!' });
            }

            const updatedCustomer = await Customer.findByIdAndUpdate(
                id,
                { name, phone, dob, photoURL },
                { new: true },
            );

            if (!updatedCustomer) {
                return res.status(404).json({ message: 'User không tồn tại!' });
            }

            res.status(200).json(updatedCustomer);
        } catch (error) {
            console.error(' Lỗi khi cập nhật:', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    }

    // Lấy danh sách tất cả khách hàng
    async index(req, res, next) {
        try {
            const customers = await Customer.find({}).lean();
            res.status(200).json(customers);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CustomerController();
