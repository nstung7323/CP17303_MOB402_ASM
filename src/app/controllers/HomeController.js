const User = require('../models/user');
const Product = require('../models/product');
const { json } = require('body-parser');

class HomeController {
    // [POST] /home
    index(req, res) {
        res.render('product_list', {
            layout: 'home'
        });
    }

    // [GET]
    

    // [POST] /home/search
    async search(req, res) {
        const token = req.session.token;

        if (token) {
            const referer = req.headers.referer.split('http://localhost:3000/home/')[1];

            if (referer === 'product_list') {
                const arr = await Product.find({}).lean().exec();

                const products = arr.filter(item => item.name.includes(req.body.value));

                return res.render('product_list', {
                    layout: 'home',
                    products,
                    helpers: {
                        inc(value) {
                            return parseInt(value) + 1;
                        },
                        getAllData() {
                            let content = '';

                            for (let item of products) {
                                console.log(item.name);
                                content += `${(JSON.stringify(item._id).split('"'))[1]}^${item.id}^${item.name}^${item.price}^${item.color}^${item.category}#`;
                            }

                            return content;
                        }
                    }
                });
            }
            else if (referer === 'user_list') {
                const arr = await User.find({}).lean().exec();

                const users = arr.filter(item => item.email.includes(req.body.value));

                console.log(users);

                return res.render('user_list', {
                    layout: 'home',
                    users,
                    check: true,
                    helpers: {
                        inc(value) {
                            return parseInt(value) + 1;
                        },
                        getAllData() {
                            let content = '';
    
                            for (let item of users) {
                                content += `${(JSON.stringify(item._id).split('"'))[1]}^${item.firstName}^${item.lastName}^${item.email}#`;
                            }
    
                            return content;
                        }
                    }
                });
            }
            else {

            }
        } else {
            res.redirect('/login');
        }

    }

    // [POST] /delete_product_list
    deleteProduct(req, res) {
        const token = req.session.token;

        if (token) {
            Product.deleteOne({ _id: req.body._id })
                .then(() => res.json({ success: true, redirectUrl: '/home/product_list' }));
        }
        else {
            res.redirect('/login');
        }
    }

    // [POST] /update_product_list
    updateProduct(req, res) {
        const token = req.session.token;
        const user = req.session.user;

        if (token) {
            const dataUpdate = {
                name: req.body.name,
                price: req.body.price,
                color: req.body.color,
                category: req.body.category,
                idUser: user._id,
                nameUser: user.firstName + ' ' + user.lastName,
            }

            Product.updateOne({ _id: req.body._id }, { $set: dataUpdate })
                .then(() => res.redirect(`/home/product_list`));
        }
        else {
            res.redirect('/login');
        }
    }

    // [POST] /product_list
    async addProductList(req, res) {
        const token = req.session.token;
        const user = req.session.user;

        if (token) {
            let newProduct = new Product({
                id: req.body.id,
                name: req.body.name,
                price: req.body.price,
                color: req.body.color,
                category: req.body.category,
                idUser: user._id,
                nameUser: user.firstName + ' ' + user.lastName,
            });

            await newProduct.save();

            return res.redirect('/home/product_list');
        }
        else {
            res.redirect('/login');
        }
    }

    // [GET] /product_list
    async productList(req, res) {
        const token = req.session.token;
        const user = req.session.user;

        if (token) {
            let check = user.email === 'admin@gmail.com' ? true : false;

            const products = await Product.find({}).lean().exec();

            return res.render('product_list', {
                layout: 'home',
                products,
                check,
                helpers: {
                    inc(value) {
                        return parseInt(value) + 1;
                    },
                    getAllData() {
                        let content = '';

                        for (let item of products) {
                            console.log(item.name);
                            content += `${(JSON.stringify(item._id).split('"'))[1]}^${item.id}^${item.name}^${item.price}^${item.color}^${item.category}#`;
                        }

                        return content;
                    },
                    check() { return check; }
                }
            });
        }
        else {
            res.redirect('/login');
        }
    }

    // [POST] /delete_user_list
    deleteUser(req, res) {
        const token = req.session.token;

        if (token) {
            User.deleteOne({ _id: req.body._id })
                .then(() => res.json({ success: true, redirectUrl: '/home/user_list' }));
        }
        else {
            res.redirect('/login');
        }
    }

    // [POST] /update_user_list
    updateUser(req, res) {
        const token = req.session.token;

        if (token) {
            const dataUpdate = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            }

            User.updateOne({ _id: req.body._id }, { $set: dataUpdate })
                .then(() => res.redirect(`/home/user_list`));
        }
        else {
            res.redirect('/login');
        }
    }

    // [GET] /user_list
    async userList(req, res) {
        const token = req.session.token;
        const user = req.session.user;

        if (token) {
            let check = user.email === 'admin@gmail.com' ? true : false;
            console.log(check);
            const users = await User.find({}).lean().exec();

            return res.render('user_list', {
                layout: 'home',
                users,
                check: check,
                helpers: {
                    inc(value) {
                        return parseInt(value) + 1;
                    },
                    getAllData() {
                        let content = '';

                        for (let item of users) {
                            content += `${(JSON.stringify(item._id).split('"'))[1]}^${item.firstName}^${item.lastName}^${item.email}#`;
                        }

                        return content;
                    }
                }
            });
        }
        else {
            res.redirect('/login');
        }
    }

    // [POST] /home/profile
    editProfile(req, res) {
        const token = req.session.token;
        const user = req.session.user;

        console.log(user);

        if (token) {
            const dataUpdate = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            }
            User.updateOne({ _id: user._id }, { $set: dataUpdate })
                .then(async () => {
                    const newUser = await User.findOne({ _id: user._id });
                    req.session.user = newUser.toObject();
                    req.session.save((err) => {
                        if (err) {
                            console.error(err);
                        }

                        // Trả về kết quả xác thực cho người dùng
                        res.redirect(`/home/profile`);
                    });
                });
        }
        else {
            res.redirect('/login');
        }
    }

    // [GET] /home/profile
    profile(req, res) {
        const token = req.session.token;
        const user = req.session.user;

        if (token) {
            console.log(user)

            res.render('profile', {
                layout: 'home',
                helpers: {
                    getFirstName() { return user.firstName },
                    getLastName() { return user.lastName },
                    getEmail() { return user.email },
                }
            });
        }
        else {
            res.redirect('/login');
        }


    }
}

module.exports = new HomeController;