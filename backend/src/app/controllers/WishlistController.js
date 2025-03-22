const Wishlist = require('../models/WishList');
const mongoose = require('mongoose');
class WishListController {
    async addToWishlist(req, res) {
        try {
            console.log('Received Body:', req.body);

            let { userId, productId, title, image, price } = req.body;

            if (!userId || !productId || !title || !image || !price) {
                return res
                    .status(400)
                    .json({ error: 'Thiếu thông tin sản phẩm' });
            }

            userId = userId.replace(/"/g, '').trim();
            productId = productId.replace(/"/g, '').trim();

            if (
                !mongoose.Types.ObjectId.isValid(userId) ||
                !mongoose.Types.ObjectId.isValid(productId)
            ) {
                return res
                    .status(400)
                    .json({ error: 'userId hoặc productId không hợp lệ' });
            }

            const objectIdUserId = new mongoose.Types.ObjectId(userId);
            const objectIdProductId = new mongoose.Types.ObjectId(productId);

            const existingWishlistItem = await Wishlist.findOne({
                userId: objectIdUserId,
                productId: objectIdProductId,
            });

            if (existingWishlistItem) {
                return res
                    .status(400)
                    .json({ error: 'Sản phẩm đã có trong wishlist' });
            }

            const newWishlistItem = new Wishlist({
                userId: objectIdUserId,
                productId: objectIdProductId,
                title,
                image,
                price,
            });

            await newWishlistItem.save();

            res.status(201).json(newWishlistItem);
        } catch (error) {
            console.error('Lỗi khi thêm vào wishlist:', error);
            res.status(500).json({ error: 'Lỗi server' });
        }
    }

    async removeFromWishlist(req, res) {
        try {
            const { userId, productId } = req.query;
            const deletedItem = await Wishlist.findOneAndDelete({
                userId,
                productId,
            });

            if (!deletedItem) {
                return res
                    .status(404)
                    .json({
                        message: 'Không tìm thấy sản phẩm trong wishlist',
                    });
            }

            res.json({ message: 'Đã xóa sản phẩm khỏi wishlist' });
        } catch (error) {
            res.status(500).json({
                error: 'Lỗi khi xóa sản phẩm khỏi wishlist',
            });
        }
    }
    async getWishlistByUser(req, res) {
        try {
            const { userId } = req.params;

            const objectIdUser = new mongoose.Types.ObjectId(userId);

            const wishlists = await Wishlist.find({
                userId: objectIdUser,
            }).lean();

            if (!wishlists.length) {
                return res
                    .status(404)
                    .json({ message: 'No wishlist found for this user' });
            }

            res.status(200).json(wishlists);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
    index(req, res, next) {
        Wishlist.find({})
            .lean()
            .then((wishlists) => res.status(200).json(wishlists))
            .catch(next);
    }
}

module.exports = new WishListController();
