const Cart = require('../models/Cart');
const mongoose = require('mongoose');
class CartController {
    async updateCartQuantity(req, res) {
        try {
            console.log('🔹 Nhận request cập nhật:', req.body); // Debug

            const { userId, productId, quantity } = req.body;

            if (
                !mongoose.Types.ObjectId.isValid(userId) ||
                !mongoose.Types.ObjectId.isValid(productId)
            ) {
                return res
                    .status(400)
                    .json({ message: 'Invalid userId or productId' });
            }

            const objectIdUser = new mongoose.Types.ObjectId(userId);
            const objectIdProduct = new mongoose.Types.ObjectId(productId);

            const existsCart = await Cart.findOne({
                userId: objectIdUser,
                productId: objectIdProduct,
            });

            if (!existsCart) {
                return res
                    .status(404)
                    .json({ message: 'Product not found in cart' });
            }

            await Cart.updateOne(
                { userId: objectIdUser, productId: objectIdProduct },
                { $set: { quantity: quantity } },
            );

            res.status(200).json({ message: 'Cart updated successfully' });
        } catch (error) {
            console.error('🔥 Error updating cart quantity:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    async getCartbyUserId(req, res) {
        try {
            const { userId } = req.params;
            console.log('Received userId:', userId); // Kiểm tra giá trị userId

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid userId format' });
            }

            const cartItems = await Cart.find({ userId });
            console.log('Cart items:', cartItems);

            res.json(cartItems);
        } catch (error) {
            console.error('Error fetching cart:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    async deleteCartItem(req, res) {
        try {
            const { userId, productId } = req.params;

            console.log(
                `🔹 Nhận request xóa: userId=${userId}, productId=${productId}`,
            );

            if (
                !mongoose.Types.ObjectId.isValid(userId) ||
                !mongoose.Types.ObjectId.isValid(productId)
            ) {
                return res
                    .status(400)
                    .json({ message: 'Invalid userId or productId' });
            }

            const objectIdUser = new mongoose.Types.ObjectId(userId);
            const objectIdProduct = new mongoose.Types.ObjectId(productId);

            const deletedItem = await Cart.findOneAndDelete({
                userId: objectIdUser,
                productId: objectIdProduct,
            });

            if (!deletedItem) {
                return res
                    .status(404)
                    .json({ message: 'Product not found in cart' });
            }

            console.log(`✅ Đã xóa sản phẩm ${productId} của user ${userId}`);
            res.status(200).json({ message: 'Cart item deleted successfully' });
        } catch (error) {
            console.error('🔥 Lỗi khi xóa sản phẩm:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    async addToCart(req, res) {
        try {
            const { userId, productId, title, image, price, quantity } =
                req.body;

            if (
                !mongoose.Types.ObjectId.isValid(userId) ||
                !mongoose.Types.ObjectId.isValid(productId)
            ) {
                return res
                    .status(400)
                    .json({ message: 'Invalid userId or productId' });
            }

            const objectIdUser = new mongoose.Types.ObjectId(userId);
            const objectIdProduct = new mongoose.Types.ObjectId(productId);

            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            let cartItem = await Cart.findOne({
                userId: objectIdUser,
                productId: objectIdProduct,
            });

            if (cartItem) {
                // Nếu có, cập nhật số lượng
                cartItem.quantity += quantity;
                await cartItem.save();
                return res
                    .status(200)
                    .json({ message: 'Cart updated successfully', cartItem });
            }

            // Nếu chưa có, thêm mới
            const newCartItem = new Cart({
                userId: objectIdUser,
                productId: objectIdProduct,
                title,
                image,
                price,
                quantity,
            });

            await newCartItem.save();
            return res
                .status(201)
                .json({ message: 'Added to cart', newCartItem });
        } catch (error) {
            console.error('🔥 Error adding to cart:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    getCart(req, res, next) {
        Cart.find({})
            .lean()
            .then((cart) => res.status(200).json({ success: true, cart: cart }))
            .catch(next);
    }
}

module.exports = new CartController();
