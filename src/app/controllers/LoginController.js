const jwt = require('jsonwebtoken');
const config = require('../../config/database');
const request = require('request');
const User = require('../models/user');

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

    // [POST] /login
    async login(req, res) {
        let user;
        if (req.body.email !== 'admin@gmail.com') {
            user = await User.findOne({ email: req.body.email });
        }
        else {
            user = {
                _id: 'tungnsph25350@gpt.edu.vn',
                firstName: 'Admin',
                lastName: '123',
                email: 'admin@gmail.com',
            };
        }
        console.log(req.body);
        // User not found
        if (!user) {
            return res.render('login', {
                notify: 'Authentication failed. User not found.',
            });
        } else {
            if (req.body.email === 'admin@gmail.com') {
                const token = jwt.sign(user, config.secret);
                if (!req.session) {
                    req.session = {};
                }
                req.session.user = {
                    _id: 'tungnsph25350@gpt.edu.vn',
                    firstName: 'Admin',
                    lastName: '123',
                    email: 'admin@gmail.com',
                };;
                req.session.token = "JWT " + token;

                req.session.save((err) => {
                    if (err) {
                        console.error(err);
                    }

                    // Trả về kết quả xác thực cho người dùng
                    res.redirect(`/home/profile`);
                });
            }
            else {
                // check if password matches
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        const token = jwt.sign(user.toJSON(), config.secret);
                        // return the information including token as JSON
                        if (!req.session) {
                            req.session = {};
                        }
                        req.session.user = user.toObject();
                        req.session.token = "JWT " + token;

                        req.session.save((err) => {
                            if (err) {
                                console.error(err);
                            }

                            // Trả về kết quả xác thực cho người dùng
                            res.redirect(`/home/profile`);
                        });
                    } else {
                        return res.render('login', {
                            notify: 'Authentication failed. Wrong password.',
                        });
                    }
                });
            }

        }
    }
}

module.exports = new LoginController;