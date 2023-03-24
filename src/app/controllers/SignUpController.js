class SignUpController {
    // [GET] /signup
    index(req, res) {
        res.render('signup');
    }
}

module.exports = new SignUpController;