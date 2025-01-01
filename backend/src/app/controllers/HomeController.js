class HomeController {
    index(req, res) {
        // res.send('Hello World');
        res.render('home');
    }

    show(req, res) {
        res.send('Show');
    }
}

module.exports = new HomeController();
