const express = require('express');
const router = express.Router();
const session = require('express-session')
const loginController = require('../app/controllers/LoginController');

router.post('/', loginController.login)
router.use('/', loginController.index);

router.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000 // thời gian hết hạn là 30 phút (30*60*1000ms)
    }
}));

module.exports = router;