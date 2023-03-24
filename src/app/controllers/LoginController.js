class LoginController {
    // [GET] /login
    index(req, res) {
        res.render('login', {
            helpers: {
                getEmail() { return req.body.email },
                getPassword() { return req.body.password }
            }
        });
    }
}

module.exports = new LoginController;