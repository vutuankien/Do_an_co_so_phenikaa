const Cosmetic = require('../../models/Cosmetic');
const User = require('../../models/User');
class cartDataController {
    async getCart(req, res, next) {
        const { userId } = req.body;
        const userData = await User.findById(userId);
        let cartData = await userData.cartData;

        res.status(200).json({ cartData: cartData });
    }

    async addToCart(req, res, next) {
        const { userId, itemId, size } = req.body;

        try {
            const user = await User.findById(userId);
            const cartData = user.cartData;

            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size] += 1;
                } else {
                    cartData[itemId][size] = 1;
                }
            } else {
                cartData[itemId] = {};
                cartData[itemId] = {
                    [size]: 1,
                };
            }

            await User.findByIdAndUpdate(userId, { cartData: cartData });

            res.status(200).json({ message: 'Add to cart successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
module.exports = new cartDataController();
