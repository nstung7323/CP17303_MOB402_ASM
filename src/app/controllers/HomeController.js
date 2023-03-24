const user = require('../models/user');

class HomeController {
    // [POST] /home
    index(req, res) {
        res.render('product_list', {
            layout: 'home'
        });
    }

    // [GET] /user_list
    showUserList(req, res) {
        res.render('user_list', {
            layout: 'home',
            helpers: {
                getData() {
                    let users = [];
                    let u = new user(1, 'nstung', 'nstung7323@gmail.com')
                    let x = new user(2, 'ph25350', 'tungnsph235@fpt.edu.vn.com')
                    // users.push(new user(1, 'nstung', 'nstung7323@gmail.com'))
                    // users.push(new user(2, 'tungnsph', 'tungnsph25350@fpt.edu.vn'))
                    // users.push(new user(3, 'nva', 'nva@gmail.com'))

                    users.push(u);
                    users.push(x);

                    return users.map(item => {
                        return item.id + ',' + item.name + ',' + item.email;
                    })
                }
            }
        });
    }

    // showUserList(req, res) {
    //     res.render('user_list', {
    //         layout: 'home'
    //     })
    //     let users = [];
    //     let u = new user(1, 'nstung', 'nstung7323@gmail.com')
    //     let x = new user(2, 'ph25350', 'tungnsph235@fpt.edu.vn.com')
    //     // users.push(new user(1, 'nstung', 'nstung7323@gmail.com'))
    //     // users.push(new user(2, 'tungnsph', 'tungnsph25350@fpt.edu.vn'))
    //     // users.push(new user(3, 'nva', 'nva@gmail.com'))

    //     users.push(u);
    //     users.push(x);

    //     for (let item of users) {
    //         res.send(`<p>${item.getInfo()}</p>`)
    //     }
    // }

    // [GET] /product_list

    showProductList(req, res) {
        let products = [];
        let u = new user(1, 'Tivi', '20000')
        let x = new user(2, 'Tu lanh', '30000')
        let y = new user(3, 'Dieu hoa', '22342')
        let z = new user(4, 'May giat', '12313')

        products.push(u);
        products.push(x);
        products.push(z);
        products.push(y);

        for (let item of products) { 
            res.send(item.getInfo());
        }
    }
}

module.exports = new HomeController;