const Cosmetic = require('../../models/Cosmetic');

class ProductController {
    //[POST] /api/product/add
    add(req, res, next) {
        const cosmetic = new Cosmetic(req.body);
        cosmetic
            .save()
            .then((item) =>
                res.json({ message: 'Add successfully', item: item }),
            )
            .catch(next);
    }

    // [POST] /api/product/update
    update(req, res, next) {}

    // [POST] /api/product/delete
    delete(req, res, next) {
        Cosmetic.findByIdAndDelete(req.params.id)
            .then(() =>
                res
                    .status(200)
                    .json({ success: true, message: 'Deleted successfully' }),
            )
            .catch(next);
    }

    async detailProduct(req, res, next) {
        const id = req.params.id;
        if (!id) {
            return res
                .status(400)
                .json({ success: false, message: 'Missing id' });
        }
        const product = await Cosmetic.findById(id);
        if (!product) {
            return res
                .status(404)
                .json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    }

    // [GET] /api/product
    index(req, res, next) {
        Cosmetic.find({})
            .then((cosmetics) =>
                res.status(200).json({
                    success: true,
                    data: cosmetics,
                }),
            )
            .catch(next);
    }
}

module.exports = new ProductController();
