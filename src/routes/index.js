const loginRouter = require('./login');
const signupRouter = require('./signup');
const homeRouter = require('./home');

function route(app) {
    app.use('/login', loginRouter);
    app.use('/signup', signupRouter);
    app.use('/home', homeRouter);
}

module.exports = route;