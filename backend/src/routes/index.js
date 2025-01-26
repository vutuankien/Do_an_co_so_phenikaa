const homeRouter = require('./home');
const cosmeticRouter = require('./cosmetic');
const trashRouter = require('./trash');
function route(app) {
    // app.use('/show',homeRouter)
    app.use('/trash', trashRouter);
    app.use('/cosmetic', cosmeticRouter);
    app.use('/', homeRouter);
}

module.exports = route;
