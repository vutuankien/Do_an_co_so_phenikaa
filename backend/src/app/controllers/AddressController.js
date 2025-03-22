const Address = require('../models/Address');
const mongoose = require('mongoose');
const Customer = require('../models/Customer');

class AddressController {
    // async addAddress(req, res, next) {
    //     try {
    //         const { userId, address } = req.body;

    //         // Tìm khách hàng theo userId
    //         const customer = await Customer.findOne({ userId });

    //         if (!customer) {
    //             return res.status(404).json({ message: "User not found" });
    //         }

    //         let userAddress = await Address.findOne({ userId: customer._id });

    //         if (!userAddress) {
    //             // Nếu chưa có danh sách địa chỉ -> Tạo mới với địa chỉ đầu tiên là mặc định
    //             userAddress = new Address({
    //                 userId: customer._id,
    //                 address: [{
    //                     id: new mongoose.Types.ObjectId(),
    //                     address,
    //                     default: true // Địa chỉ đầu tiên luôn là mặc định
    //                 }]
    //             });
    //         } else {
    //             // Kiểm tra trùng địa chỉ
    //             const isDuplicate = userAddress.address.some(addr => addr.address === address);
    //             if (isDuplicate) {
    //                 return res.status(400).json({ message: "Address already exists" });
    //             }

    //             // Nếu chưa có, thêm vào danh sách (không đặt mặc định)
    //             userAddress.address.push({
    //                 id: new mongoose.Types.ObjectId(),
    //                 address,
    //                 default: false
    //             });
    //         }

    //         await userAddress.save();
    //         res.status(200).json(userAddress.address); // Chỉ trả về danh sách địa chỉ
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    async updateAddress(req, res, next) {
        try {
            console.log('Nhận request update:', req.params.id, req.body);

            const { addresses } = req.body;
            if (!addresses) {
                return res
                    .status(400)
                    .json({ message: 'Danh sách địa chỉ không hợp lệ!' });
            }

            let userAddress = await Address.findOne({ userId: req.params.id });

            if (!userAddress) {
                console.log('Chưa có document trong Address, tạo mới!');
                userAddress = new Address({
                    userId: req.params.id,
                    address: addresses,
                });
                await userAddress.save();
            } else {
                userAddress.address = addresses;
                await userAddress.save();
                console.log('✅ Cập nhật thành công!');
            }

            res.status(200).json(userAddress);
        } catch (error) {
            console.error('Lỗi khi cập nhật địa chỉ:', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    }
    async getAddressByUser(req, res, next) {
        try {
            console.log('Received userId:', req.params.userId); // Log giá trị userId

            const { userId } = req.params;
            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }

            const userAddresses = await Address.findOne({ userId }).lean();
            console.log('User Addresses:', userAddresses); // Log dữ liệu tìm được

            if (!userAddresses || !userAddresses.address) {
                return res.status(200).json({ addresses: [] });
            }

            res.status(200).json(userAddresses.address);
        } catch (error) {
            console.error('Lỗi truy vấn MongoDB:', error);
            res.status(500).json({
                message: 'Lỗi server',
                error: error.message,
            });
        }
    }

    async setDefaults(req, res, next) {
        try {
            const { userId } = req.params;
            const { addresses } = req.body;

            if (!addresses || !Array.isArray(addresses)) {
                return res
                    .status(400)
                    .json({ message: 'Dữ liệu không hợp lệ' });
            }

            // Tìm user theo userId
            const userAddress = await Address.findOne({ userId });

            if (!userAddress) {
                return res
                    .status(404)
                    .json({ message: 'Người dùng không có địa chỉ nào' });
            }

            // Cập nhật danh sách địa chỉ
            userAddress.address = addresses.map((addr) => ({
                ...addr,
                default: addr.default === true, // Đảm bảo chỉ có 1 default
            }));

            // Lưu vào MongoDB
            await userAddress.save();

            res.json({
                message: 'Cập nhật địa chỉ mặc định thành công',
                address: userAddress.address,
            });
        } catch (error) {
            console.error('Lỗi cập nhật địa chỉ mặc định:', error);
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async deleteAddress(req, res, next) {
        try {
            const { userId, addressId } = req.params;

            // Tìm địa chỉ của user
            const userAddress = await Address.findOne({ userId });

            if (!userAddress) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy địa chỉ của người dùng' });
            }

            // Lọc bỏ địa chỉ cần xóa
            const updatedAddresses = userAddress.address.filter(
                (addr) => addr.id !== addressId,
            );

            if (updatedAddresses.length === userAddress.address.length) {
                return res
                    .status(404)
                    .json({ message: 'Địa chỉ không tồn tại' });
            }

            if (
                userAddress.address.find((addr) => addr.id === addressId)
                    ?.default &&
                updatedAddresses.length > 0
            ) {
                updatedAddresses[0].default = true;
            }

            // Cập nhật danh sách địa chỉ
            userAddress.address = updatedAddresses;
            await userAddress.save();

            res.json({ message: 'Đã xóa địa chỉ', address: updatedAddresses });
        } catch (error) {
            console.error('Lỗi khi xóa địa chỉ:', error);
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    index(req, res, next) {
        Address.find({})
            .lean()
            .then((addresses) => res.status(200).json(addresses))
            .catch(next);
    }
}

module.exports = new AddressController();
