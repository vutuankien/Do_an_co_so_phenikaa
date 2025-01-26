const Cosmetic = require('../models/Cosmetic');

class CosmeticController {
    // [GET] /cosmetic
    index(req, res, next) {
        const page = parseInt(req.query.page) || 1; // Ensure default page is 1
        const limit = parseInt(req.query.limit) || 5; // Ensure default limit is 5
        const skip = (page - 1) * limit; // Calculate skip value for pagination

        // Get sorting details from the middleware
        const sort = {};
        if (res.locals._sort.enabled) {
            sort[res.locals._sort.column] =
                res.locals._sort.type === 'desc' ? -1 : 1;
        }

        Promise.all([
            // Fetch cosmetics with pagination and sorting
            Cosmetic.find({}).lean().skip(skip).limit(limit).sort(sort),
            // Count total documents for pagination
            Cosmetic.countDocuments({}),
            // Count deleted documents
            Cosmetic.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([cosmetics, totalCosmetics, deletedCount]) => {
                const totalPages = Math.ceil(totalCosmetics / limit); // Calculate total pages
                res.render('cosmetic/cosmetic_show', {
                    cosmetics,
                    currentPage: page,
                    totalPages,
                    deletedCount,
                    sort: res.locals._sort, // Pass sorting info to the view
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
        const isFavorite = req.body.isFavorite === 'true';

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
            isFavorite,
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
        req.body.isFavorite = req.body.isFavorite === 'true';

        Cosmetic.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .lean()
            .then(() => res.redirect('/cosmetic'))
            .catch((err) => next(err));
    }

    delete(req, res, next) {
        Cosmetic.delete({ _id: req.params.id })
            .then(() => res.redirect('/cosmetic'))
            .catch((err) => next(err));
    }

    restore(req, res, next) {
        Cosmetic.restore({ _id: req.params.id }) // Lấy `id` từ params
            .then(() => {
                console.log(
                    `Cosmetic with ID ${req.params.id} restored successfully`,
                );
                // res.status(200).json({ message: 'success' });
                res.render('Trash/stored_cosmetic');
                // res.redirect('back');
            })
            .catch((err) => {
                console.error('Error restoring cosmetic:', err);
                next(err);
            });
    }

    destroy(req, res, next) {
        Cosmetic.findByIdAndDelete(req.params.id)
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CosmeticController();
