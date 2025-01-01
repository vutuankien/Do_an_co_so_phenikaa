const mongoose = require('mongoose');

async function connect() {
    mongoose
        .connect('mongodb://localhost:27017/do_an_co_so')
        .then(() => console.log('Connect to database successfully!'))
        .catch(() => console.log('Connect to database failed!'));
}

module.exports = { connect };
