const Cosmetic = require('../models/Cosmetic');
const XLSX = require('xlsx');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
// const faker = require('faker')
class CosmeticController {
    // [GET] /cosmetic
    index(req, res, next) {
        const page = parseInt(req.query.page) || 1; // Ensure default page is 1
        const limit = parseInt(req.query.limit) || 10; // Ensure default limit is 5
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
    getByID(req, res, next) {
        const { _id } = req.params;

        // Kiểm tra ID có phải ObjectId hợp lệ không
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        Cosmetic.findById(_id)
            .lean()
            .then((cosmetic) => {
                if (!cosmetic) {
                    return res
                        .status(404)
                        .json({ error: 'Cosmetic not found' });
                }
                // res.status(200).json(cosmetic);
                res.render('cosmetic/cosmetic_detail', { cosmetic });
            })
            .catch((err) => next(err));
    }
    getIdAPI(req, res, next) {
        Cosmetic.findById(req.params.id)
            .lean()
            .then((cosmetic) => {
                res.status(200).json(cosmetic);
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
            title,
            price,
            description,
            image,
            salePrice,
            color,
            brand,
            category,
            tags,
            country,
            feature,
        } = req.body;

        // Chuyển đổi giá trị checkbox
        const onSale = req.body.onSale === 'true'; // Đảm bảo kiểu boolean

        // Đếm số lượng tài liệu để tạo ID tự tăng
        Cosmetic.countDocuments()
            .then((count) => {
                const newCosmetic = new Cosmetic({
                    _id: new ObjectId(),
                    id: count + 1, // ID tự tăng
                    title,
                    price,
                    description,
                    image,
                    salePrice,
                    color,
                    brand,
                    category,
                    tags,
                    feature,
                    country,
                    onSale,
                });

                return newCosmetic.save();
            })
            .then((cosmetic) => {
                console.log('Saved Cosmetic:', cosmetic);
                res.redirect('/cosmetic');
            })
            .catch((err) => next(err));
    }

    //[GET] /cosmetic/:id/edit
    edit(req, res, next) {
        const { _id } = req.params;

        // Kiểm tra ID có phải ObjectId hợp lệ không
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        Cosmetic.findById(_id)
            .lean()
            .then((cosmetic) => {
                if (!cosmetic) {
                    return res
                        .status(404)
                        .json({ error: 'Cosmetic not found' });
                }
                // res.status(200).json(cosmetic);
                res.render('cosmetic/cosmetic_edit', { cosmetic });
            })
            .catch((err) => next(err));
    }

    update(req, res, next) {
        req.body.onSale = req.body.onSale === 'true'; // Chuyển thành Boolean
        console.log('Received update: ', req.body);
        Cosmetic.findByIdAndUpdate(req.params._id, req.body, { new: true })
            .lean()
            .then((updatedCosmetic) => {
                console.log('Updated Cosmetic:', updatedCosmetic);
                res.redirect('/cosmetic');
            })
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

    exportData(req, res, next) {
        var wb = XLSX.utils.book_new();
        Cosmetic.find({})
            .lean()
            .then((cosmetics) => {
                var ws = XLSX.utils.json_to_sheet(cosmetics);
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                XLSX.writeFile(wb, 'cosmetics.xlsx');
                res.download('cosmetics.xlsx');
            })
            .catch((err) => next(err));
    }
}

module.exports = new CosmeticController();
