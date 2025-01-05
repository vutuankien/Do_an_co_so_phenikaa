const Cosmetic = require('../models/Cosmetic');

class CosmeticController {
    // [GET] /cosmetic
    index(req, res, next) {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const skip = page * limit;

        Promise.all([
            Cosmetic.find({}).lean().skip(skip).limit(limit),
            Cosmetic.countDocuments({}), // Đếm tổng số tài liệu
        ])
            .then(([cosmetics, totalCosmetics]) => {
                const totalPages = Math.ceil(totalCosmetics / limit); // Tính tổng số trang
                res.render('cosmetic/cosmetic_show', {
                    cosmetics,
                    currentPage: page + 1,
                    totalPages,
                });
            })
            .catch((err) => next(err));
    }

    // [GET] /cosmetic/:slug
    getSlug(req, res, next) {
        Cosmetic.findOne({ slug: req.params.slug })
            .lean()
            .then((cosmetic) => {
                res.render('cosmetic/cosmetic_detail', { cosmetic });
            })
            .catch((err) => next(err));
    }

    // [GET] /cosmetic/create
    create(req, res) {
        res.render('cosmetic/cosmetic_create');
    }

    //[GET] /cosmetic/api
    api(req, res, next) {
        Cosmetic.find({})
            .lean()
            .then((cosmetics) => {
                res.status(200).json(cosmetics);
            })
            .catch((err) => next(err));
    }

    // [POST] /cosmetic/api/storeAPI
    store(req, res, next) {
        const {
            name,
            price,
            description,
            image,
            slug,
            brand,
            stock,
            category,
            rating,
            size,
            expirationDate,
            manufacturingDate,
        } = req.body;

        // Chuyển đổi giá trị checkbox
        const isNewArrival = req.body.isNewArrival === 'true';
        const isBestSeller = req.body.isBestSeller === 'true';

        const newCosmetic = new Cosmetic({
            name,
            price,
            description,
            image,
            slug,
            brand,
            stock,
            category,
            rating,
            size,
            expirationDate,
            manufacturingDate,
            isNewArrival,
            isBestSeller,
        });

        newCosmetic
            .save()
            .then((cosmetic) => {
                console.log('Saved Cosmetic:', cosmetic);
                res.redirect('/cosmetic');
            })
            .catch((err) => next(err));
    }

    //[GET] /cosmetic/:id/edit
    edit(req, res, next) {
        Cosmetic.findById(req.params.id)
            .then((cosmetic) => {
                if (!cosmetic) {
                    return res.status(404).send('Cosmetic not found');
                }
                const expirationDate = cosmetic.expirationDate
                    ? cosmetic.expirationDate.toISOString().split('T')[0]
                    : '';
                const manufacturingDate = cosmetic.manufacturingDate
                    ? cosmetic.manufacturingDate.toISOString().split('T')[0]
                    : '';
                const cosmeticData = {
                    ...cosmetic.toObject(),
                    expirationDate,
                    manufacturingDate,
                };
                res.render('cosmetic/cosmetic_edit', {
                    cosmetic: cosmeticData,
                });
            })
            .catch((err) => next(err));
    }

    update(req, res, next) {
        req.body.isNewArrival = req.body.isNewArrival === 'true';
        req.body.isBestSeller = req.body.isBestSeller === 'true';

        Cosmetic.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .lean()
            .then(() => res.redirect('/cosmetic'))
            .catch((err) => next(err));
    }
}

module.exports = new CosmeticController();
