class HomeController {
    async index(req, res) {
        return res.render('home');
    }
}

module.exports = new HomeController();
