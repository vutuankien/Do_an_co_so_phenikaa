const homeController = require('./home');
const cosmeticController = require('./cosmetic');
function route(app) {
    // app.use('/show',homeController)
    app.use('/cosmetic', cosmeticController);
    app.use('/', homeController);
}

module.exports = route;
