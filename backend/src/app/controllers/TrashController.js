const Cosmetic = require('../models/Cosmetic');

class TrashController {
    storedCosmetic(req, res, next) {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const skip = page * limit;

        Promise.all([
            Cosmetic.findWithDeleted({ deleted: true })
                .lean()
                .skip(skip)
                .limit(limit),
            Cosmetic.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([cosmetics, totalCosmetics]) => {
                const totalPages = Math.ceil(totalCosmetics / limit);
                res.render('Trash/stored_cosmetic', {
                    cosmetics,
                    currentPage: page + 1,
                    totalPages,
                });
            })
            .catch(next);
    }
}

module.exports = new TrashController();
