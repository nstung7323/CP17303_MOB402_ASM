const passport = require('passport');
const User = require('../models/user');

class SignUpController {
    // [GET] /signup
    index(req, res) {
        res.render('signup');
    }

    // [POST] /signup
    async signUp(req, res) {
        // check username available
        let check = await User.findOne({ email: req.body.email })
            .lean()
            .exec();

        if (check) {
            return res.render('signup', {
                notify: "Email not available. Try another username"
            });
        }

        let newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });

        // Save the user DB
        await newUser.save();

        return res.redirect('/login');
    }
}

module.exports = new SignUpController;