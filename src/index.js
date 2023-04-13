const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const hbs = require('express-handlebars');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.engine('hbs', hbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
app.use(passport.initialize());
app.use(cookieParser());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000 // thời gian hết hạn là 30 phút (30*60*1000ms)
    }
}));

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

// Route app
route(app);


app.listen(port, () => console.log('listening on port ' + port));	