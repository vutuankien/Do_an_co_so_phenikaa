const Stores = require('../models/Store');

class StoreController {
    getLocation(req, res, next) {
        Stores.find({})
            .lean()
            .then((stores) => res.status(200).json(stores))
            .catch(next);
    }
}

module.exports = new StoreController();
