const Cosmetic = require('../models/Cosmetic');

class CosmeticController {
    // [GET] /cosmetic
    index(req, res, next) {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5; // Lấy số lượng hiển thị mỗi trang từ query, mặc định là 2
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
}

module.exports = new CosmeticController();
